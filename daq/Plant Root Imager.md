# Plant Root Imager

This document details efforts to reverse engineer Cyth's cylinder imaging LabView app.

See [this Colab](https://colab.research.google.com/drive/19aJCWIx5oOpDU9kquj83EZwpi0JZVOBi?usp=sharing) for a basic Python re-implementation.

## DeQ block

Cyth has a DeQ block that manages a command queue.
    - It works by queuing up commands in a structure that contains metadata to go with each command.
    - Each command is specified as a string.
    - Multiple commands can be sent in by sending a multi-line string.
    - Additional parameters can be sent in by using a colon and specifying additional strings delimited by a comma.

The "Consumer Loop" block does most of the heavy lifting by processing commands from the queue in a loop. It passes around a lot of globals-like data in a "Main Cluster" structure.

---

## [Consumer Loop] "Initialize" block

- Called in the very beginning
- Figures out settings.ini path (default: `C:\ProgramData\Cyth Systems\Plant Root Imager\settings.ini`)
- Sends out more startup commands:
    ```
    InitializeGUI
    Check Settings Exist
    Settings:Read
    Front Panel:Load
    Camera Initialize
    Get References
    ```
- [Consumer Loop] "Settings:Read" --> calls Cyth Settings block
    - Replaces the values in the "Main Cluster"
    - Front panel contains defaults

---

## Acquisition workflow

1. Start button in front panel --> Event Loop --> "Start" Value Change --> queue "Cycle Start" command
2. [Consumer Loop] "Cycle Start"
    - Does some input validation (camera status, save path)
    - Sends out multiple commands:
        ```
        Cycle Controls:Disabled
        Calculate Tick Count
        Calculate Final Move
        Tasks Start:%s,CYCLE
        Cycle Done?
        ```
    - %s above is replaced with "HIGH" if clockwise or "LOW" if CCW direction is set
3. [Consumer Loop] "Cycle Controls:Disabled" --> disable GUI controls
4. [Consumer Loop] "Calculate Tick Count" --> compute ticks from degrees/photo
5. [Consumer Loop] "Calculate Final Move" --> compute ticks to reset to initial position after last photo
6. [Consumer Loop] "Tasks Start"
    - Does the heavy business logic of setting up the NI DAQ tasks
    - Calls "START 2.0" block (see below)
    - Store "Tasks", "motor waveform", and "Running" status in globals
7. [Consumer Loop] "Cycle Done?"
    - Update GUI progress
    - Queue up "Wait for Task" command


---

## "Calculate Tick Count" command

- Computes ticks needed per photo, which is then used to build waveform
- Called from "Cycle Start" command
- Used in "Tasks Start" command --> "Accell Digital Waveform"

## `Calculate Tick Trigger and Ratios.vi`
- Input: Degrees/Photo
- Constants:
    - Turn Table Gear Teeth: 60
    - Stepper Gear Teeth: 42
    - Encoder Resolution: 20000
- Compute:
    ```py
    ticks_between_photos = (
            encoder_resolution * turn_table_gear_teeth ** 2 * degrees_per_photo
        ) / (
            360 * stepper_gear_teeth ** 2
        )

    full_revolution_ticks = (turn_table_gear_teeth / stepper_gear_teeth) * encoder_resolution
    ```
    


---

## "Tasks Start" command --> "START 2.0" Block

- Called in "Tasks Start" block in Consumer Loop
- Creates motor waveform from the computed ticks, accounting for motor speed
    - Most of the heavy lifting in "Accell Digital Waveform" block
- Creates NI DAQ tasks

### Task creation:

1. Always in "Counter" mode
2. Create Digital Output channel ("Stepper")
    - Channels: lines to select
        - Gets as input from Main Cluster --> Stepper (originally in "Settings" command)
        - From settings.ini: `cDAQ1Mod1/port0/line0:1`
    - Line grouping: one channel for each line
3. Control task
    - Takes Stepper channel as input
    - Action: reserve
4. Create Counter Input channel ("Encoder")
    - Counter: channel specifier
        - Gets as input from Main Cluster --> Encoder (originally in "Settings" command)
        - From settings.ini: `cDAQ1/ctr0`
    - Type: Counter Input, Positional, Angular Encoder
    - Units: degrees
    - Pulses per Revolution: 4000  (labeled "Encoder Resolution" in code)
5. "Use chassis counter to free up module counter"
    - Sets a couple of properties on the Encoder channel:
        - CI.Encoder.AInputTerm = "/cDAQ1Mod1/PFI6"
        - CI.Encoder.BInputTerm = "/cDAQ1Mod1/PFI7"
6. Start Encoder task
7. Set timing on Stepper task
    - Rate: sampling rate, comes from "Accell Digital Waveform" block (hardcoded to 40000)
    - Everything else defaults (e.g., source is None)


---

## "Accell Digital Waveform" block

- Computes waveform that will be sent to the Stepper Digital Output channel (in "Wait for Task" command)
- Some logic for motor speed is in the parent "START 2.0" block

1. Compute motor speed with scaling
    - `r = max_speed * exp(total_photos * -0.007) * motor_scale`
        - `max_speed`: "Max Speed" from settings.ini (8000)
        - `total_photos`: Number of photos (72)
        - `motor_scale`: Scale factor depending on the "Motor Speed" from settings.ini (always "Fast"):
            - "Slow" = 0.5
            - "Medium" = 0.75
            - "Fast" = 1.0
2. Map inputs into "Accell Digital Waveform" block:
    - "ticks between photos" --> "Distance"
        - Computed in "Calculate Tick Count" command
    - "r" --> "Vmax"
        - Computed in step 1 above
    - "Acceleration" --> "A"
        - From settings.ini (10000000000)
3. Compute distance to max accel
    - `Da = A * t1 ^ 2`
        - `A`: Acceleration input
        - `t1`: `Vmax / A`
        - If `NaN`, replace with 0
        - Store in "Distance to Accel to Vmax"
4. Compute time to max accel
    ```py
    if Da > Distance:
        t = np.sqrt(Distance / A)
        t1 = t
        t2 = 0
    else:
        t = Vmax / A
        t1 = t
        t2 = (Distance - Da) / Vmax
    ```
5. Compute samples to accel
    - Rate = 40000 (harcoded)
    - Samples to accel = t * Rate
    - This is the number of samples during which the voltage is ramping up/down
6. Build acceleration ramp part of the waveform
    - Ramp from 0 to Vmax in "Samples to accel" number of samples
7. Compute samples for Vmax
    - "Samples for Vmax" = t2 * Rate
8. Build array of samples at Vmax
    - Fill array of length "Samples for Vmax" with "Vmax" value
9. Concatenate ramp up, plateau, ramp down
    - Ramp up from step 6
    - Plateau from step 8
    - Ramp down by reversing array from ramp up
    - Store concatenated array length in "Samples"
10. Make digital waveform
    - "make digital thing for me.vi"
    - Takes concatenated array from 9 as input

The digital waveform is calculated like:

```py
x = ...  # input vector
Fs = 40_000  # hardcoded sampling rate

y = []
phase = 0
for i in range(len(x)):
    x0 = x[0] if i == 0 else x[i - 1]
    t = i / Fs

    z1 = 2 * np.pi * (x[i] - x0) * t

    z2 = 2 * np.pi * x[i] * t

    z3 = phase - z1

    z4 = z2 + z3

    z5 = np.sin(z4)

    z_out = z5 > 0

    y.append(z_out)
    phase = z3

y = np.array(y)  # boolean array
```

---

## [Consumer Loop] "Wait for Task" command

- "new version uses this instead of encoder read to change from polling based architecture to sequence driven"
- "This is because encoder read would occasionally miss a read most likely due to polling error. This will force a camera photo after every rotation"
- Does all the work in the "Wait for Task" block
    - "start waveform >> wait for task to finish >> take photo >> check if complete >> start waveform >> reset and finish"

1. Main Cluster inputs to "Wait for Task" block:
    - `# taken`: Number of photos so far
    - `ticks between photos`: calculated in "Calculate Tick Count" command
    - `Stepper`: DO channel created in "Tasks Start" command
    - `motor waveform`: waveform created in "Tasks Start" command
2. Write motor waveform to Stepper channel
    - NI DAQmx API: Digital 1D Wfm NChan NSamp
3. Start Stepper task
4. Poll task for being done (DAQmx Task is Done.vi) every 1 ms
5. Stop task
6. Queue commands:
    ```
    Camera Save:Auto
    Cycle Done?
    ```
