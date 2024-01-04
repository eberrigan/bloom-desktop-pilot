"""
Install with:

```
pip install nidaqmx
```

Refs:
    - https://nidaqmx-python.readthedocs.io/en/latest/
    - https://github.com/talmo/leap_rigs/blob/main/leap_rigs/daq.py
"""

import nidaqmx
import numpy as np
from time import time, sleep


def system_info():
    devices = nidaqmx.system.System.local().devices
    print(f"Devices: {len(devices)}")

    for device in devices:  # nidaqmx.system.device.Device
        print(f"Device: {device}")
        print(f"Serial number: {device.serial_num}")

        print("Terminals:")
        print("  \n".join(device.terminals))

        print()

        print("Channels:")
        print("AI:")
        for channel in device.ai_physical_chans:
            print(f"\tAI Channel: {channel.name}")
        print("AO:")
        for channel in device.ao_physical_chans:
            print(f"\tAO Channel: {channel.name}")
        print("DI:")
        for channel in device.di_lines:
            print(f"\tDI Channel: {channel.name}")
        print("DO:")
        for channel in device.do_lines:
            print(f"\tDO Channel: {channel.name}")
        print("CI:")
        for channel in device.ci_physical_chans:
            print(f"\tCI Channel: {channel.name}")
        print("CO:")
        for channel in device.co_physical_chans:
            print(f"\tCO Channel: {channel.name}")
        
        print()
        print()


def test_read():

    try:
        task = nidaqmx.Task("test_read_task")
        print(f"Created task: {task}")

        # task.ci_channels  # nidaqmx._task_modules.ci_channel_collection.CIChannelCollection

        # Set up channel.
        channel = task.ci_channels.add_ci_ang_encoder_chan(
            counter="cDAQ1Mod1/ctr0",
            units=nidaqmx.constants.AngleUnits.DEGREES,
            pulses_per_rev=4000,  # resolution in LabView? (default 24 in nidaqmx)
        )  # nidaqmx._task_modules.channels.ci_channel.CIChannel
        print(f"Added channel: {channel}")

        # from Settings.ini:
        # Steps Full Rev = "40816.300000"

        # Stepper:
        # Channel type: Digital output
        # Channel: cDAQ1Mod1/port0/line0:1
        # 
        # Encoder:
        # Channel type: CI Angular Encoder
        # Channel: cDAQ1/ctr0 ??
        # Resolution: 4000
        # degrees?
        #
        # Unused?
        # PFI6 -> CI Encoder (A input terminal)
        # PFI7 -> CI Encoder (B input terminal)


        # Set up timing.
        sampling_rate = 40_000  # Hz
        duration = 2.0  # seconds
        n_samples = int(sampling_rate * duration)  # samples
        task.timing.cfg_samp_clk_timing(
            rate=sampling_rate,  # sampling rate (Hz)
            # source=None, # default, should use onboard
            source="/cDAQ1Mod1/PFI0",
            sample_mode=nidaqmx.constants.AcquisitionType.FINITE,  # nidaqmx.constants.AcquisitionType
            samps_per_chan=n_samples,
        )
        print(f"Set up timing. Fs = {sampling_rate}, samples = {n_samples:,}")

        # Run the task and block (since we're in finite mode).
        print("Starting task.")
        task.start()

        # Read data.
        print("Reading data.")
        data = task.read()
        # data = task.read(number_of_samples_per_channel=n_samples)

        print(data)

    finally:
            print(f"Closing task: {task}")
            task.close()


def test_write():
    Fs = 40_000  # Sampling rate (Hz)
    n_photos = 72
    microsteps_per_rev = 20_000
    microsteps_betw_photos = microsteps_per_rev // n_photos
    print(f'microsteps_betw_photos = {microsteps_betw_photos}')

    time_per_rev = 2  # seconds
    time_between_photos = time_per_rev / n_photos
    samples_between_photos = int(time_between_photos * Fs)
    samples_per_microstep = samples_between_photos // microsteps_betw_photos
    half_samples_per_microstep = samples_per_microstep // 2
    print(f'samples_per_microstep = {samples_per_microstep}')

    samples = []
    for i in range(microsteps_betw_photos):
        samples = samples + half_samples_per_microstep * [0.0]
        samples = samples + half_samples_per_microstep * [1.0]
    
    print(f'len(samples) = {len(samples)}')
    print(f'samples_between_photos = {samples_between_photos}')

    z = np.array(samples) > 0
    print(z)

    data = np.tile(z.reshape(1, -1), (2, 1))
    data[1, :] = True
    # data = z.reshape(1, -1)
    print(f"Prepared data for writing with shape: {data.shape}")

    try:
        task = nidaqmx.Task("test_write_task")
        print(f"Created task: {task}")

        # Create channel in the task.
        # Type: Digital output
        # Channels: cDAQ1Mod1/port0/line0:1
        # Line grouping: one channel per line
        stepper_channel = task.do_channels.add_do_chan(
            lines="cDAQ1Mod1/port0/line0:1",
            line_grouping=nidaqmx.constants.LineGrouping.CHAN_PER_LINE,  # CHAN_PER_LINE or CHAN_FOR_ALL_LINES
            # line_grouping=nidaqmx.constants.LineGrouping.CHAN_FOR_ALL_LINES,  # CHAN_PER_LINE or CHAN_FOR_ALL_LINES
        )
        print(f"Added channel: {stepper_channel}")

        # Control task(?)
        # Action: reserve
        task.control(nidaqmx.constants.TaskMode.TASK_RESERVE)
        print(f"Set task to TASK_RESERVE mode.")

        # Set timing.
        task.timing.cfg_samp_clk_timing(
            rate=Fs,
            sample_mode=nidaqmx.constants.AcquisitionType.FINITE,  # FINITE or CONTINUOUS
            samps_per_chan=data.shape[1],
        )
        print(f"Set timing sample clock rate to {Fs}.")

        t0_all = time()
        for i in range(n_photos):

            t0 = time()
            # Write to digital output channel.
            task.write(data=data, auto_start=False)
            # print(f"Wrote data to output channels.")

            # Go!
            print(f"[{i + 1} / {n_photos}] Starting task...", end=" ")
            task.start()

            # Poll until finished.
            done = False
            while not done:
                # print(".")
                # done = task.is_task_done()
                # if not done:
                #     sleep(0.005)

                try:
                    task.wait_until_done(timeout=0.005)
                    done = True
                except:
                    continue
            dt = time() - t0
            print(f"Finished task in {dt:.3f} secs.")

            # Stop task.
            # print("Stopping task...", end=" ")
            task.stop()
            # print("Stopped.")

        dt_all = time() - t0_all
        print(f"Finished all {n_photos} in {dt_all:.3f} secs.")

    finally:
        print(f"Closing task: {task}")
        task.close()

if __name__ == "__main__":
    # system_info()
    """
Devices: 2
Device: Device(name=cDAQ1)
Serial number: 32832207
Terminals:
/cDAQ1/20MHzTimebase
/cDAQ1/80MHzTimebase
/cDAQ1/ai/ReferenceTrigger
/cDAQ1/ai/SampleClock
/cDAQ1/ai/StartTrigger
/cDAQ1/ao/SampleClock
/cDAQ1/ao/StartTrigger
/cDAQ1/di/SampleClock
/cDAQ1/di/StartTrigger
/cDAQ1/di/ReferenceTrigger
/cDAQ1/do/SampleClock
/cDAQ1/do/StartTrigger
/cDAQ1/te0/ReferenceTrigger
/cDAQ1/te0/SampleClock
/cDAQ1/te0/StartTrigger
/cDAQ1/te1/ReferenceTrigger
/cDAQ1/te1/SampleClock
/cDAQ1/te1/StartTrigger
/cDAQ1/ChangeDetectionEvent
/cDAQ1/AnalogComparisonEvent
/cDAQ1/ai/PauseTrigger
/cDAQ1/ai/SampleClockTimebase
/cDAQ1/ao/PauseTrigger
/cDAQ1/ao/SampleClockTimebase
/cDAQ1/di/SampleClockTimebase
/cDAQ1/di/PauseTrigger
/cDAQ1/do/PauseTrigger
/cDAQ1/do/SampleClockTimebase
/cDAQ1/te0/PauseTrigger
/cDAQ1/te0/SampleClockTimebase
/cDAQ1/te1/PauseTrigger
/cDAQ1/te1/SampleClockTimebase
/cDAQ1/100kHzTimebase
/cDAQ1/SyncPulse0
/cDAQ1/Ctr0Source
/cDAQ1/Ctr1Source
/cDAQ1/Ctr2Source
/cDAQ1/Ctr3Source
/cDAQ1/Ctr0Gate
/cDAQ1/Ctr1Gate
/cDAQ1/Ctr2Gate
/cDAQ1/Ctr3Gate
/cDAQ1/Ctr0Aux
/cDAQ1/Ctr1Aux
/cDAQ1/Ctr2Aux
/cDAQ1/Ctr3Aux
/cDAQ1/Ctr0SampleClock
/cDAQ1/Ctr1SampleClock
/cDAQ1/Ctr2SampleClock
/cDAQ1/Ctr3SampleClock
/cDAQ1/Ctr0ArmStartTrigger
/cDAQ1/Ctr1ArmStartTrigger
/cDAQ1/Ctr2ArmStartTrigger
/cDAQ1/Ctr3ArmStartTrigger
/cDAQ1/Ctr0InternalOutput
/cDAQ1/Ctr1InternalOutput
/cDAQ1/Ctr2InternalOutput
/cDAQ1/Ctr3InternalOutput
/cDAQ1/Ctr0A
/cDAQ1/Ctr1A
/cDAQ1/Ctr2A
/cDAQ1/Ctr3A
/cDAQ1/Ctr0B
/cDAQ1/Ctr1B
/cDAQ1/Ctr2B
/cDAQ1/Ctr3B
/cDAQ1/Ctr0Z
/cDAQ1/Ctr1Z
/cDAQ1/Ctr2Z
/cDAQ1/Ctr3Z
/cDAQ1/PairedCtrInternalOutput
/cDAQ1/PairedCtrOutputPulse
/cDAQ1/FrequencyOutput

Channels:
AI:
AO:
DI:
DO:
CI:
CO:


Device: Device(name=cDAQ1Mod1)
Serial number: 32815752
Terminals:
/cDAQ1Mod1/PFI0
/cDAQ1Mod1/PFI1
/cDAQ1Mod1/PFI2
/cDAQ1Mod1/PFI3
/cDAQ1Mod1/PFI4
/cDAQ1Mod1/PFI5
/cDAQ1Mod1/PFI6
/cDAQ1Mod1/PFI7

Channels:
AI:
AO:
DI:
        DI Channel: cDAQ1Mod1/port0/line0
        DI Channel: cDAQ1Mod1/port0/line1
        DI Channel: cDAQ1Mod1/port0/line2
        DI Channel: cDAQ1Mod1/port0/line3
        DI Channel: cDAQ1Mod1/port0/line4
        DI Channel: cDAQ1Mod1/port0/line5
        DI Channel: cDAQ1Mod1/port0/line6
        DI Channel: cDAQ1Mod1/port0/line7
DO:
        DO Channel: cDAQ1Mod1/port0/line0
        DO Channel: cDAQ1Mod1/port0/line1
        DO Channel: cDAQ1Mod1/port0/line2
        DO Channel: cDAQ1Mod1/port0/line3
        DO Channel: cDAQ1Mod1/port0/line4
        DO Channel: cDAQ1Mod1/port0/line5
        DO Channel: cDAQ1Mod1/port0/line6
        DO Channel: cDAQ1Mod1/port0/line7
CI:
        CI Channel: cDAQ1Mod1/ctr0
        CI Channel: cDAQ1Mod1/ctr1
        CI Channel: cDAQ1Mod1/ctr2
        CI Channel: cDAQ1Mod1/ctr3
CO:
        CO Channel: cDAQ1Mod1/ctr0
        CO Channel: cDAQ1Mod1/ctr1
        CO Channel: cDAQ1Mod1/ctr2
        CO Channel: cDAQ1Mod1/ctr3
        CO Channel: cDAQ1Mod1/freqout
    """

    # test_read()

    test_write()
