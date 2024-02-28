import json
import sys
import os
import pathlib
from time import time, sleep

import imageio as iio
import nidaqmx
import numpy as np
from pypylon import pylon

# Slow Scanner @ GH
# ip_address = '10.0.0.45'

# Scanner @ PBIO
ip_address = '10.0.0.23'


# create a CameraSettings class with the following attributes:
#   - exposure_time
#   - gain
#   - gamma
#   - brightness
#   - contrast
#   - seconds_per_rot

class CameraSettings:
    def __init__(self, exposure_time, gain, gamma, brightness, contrast, seconds_per_rot):
        self.exposure_time = exposure_time
        self.gain = gain
        self.gamma = gamma
        self.brightness = brightness
        self.contrast = contrast
        self.seconds_per_rot = seconds_per_rot
        

def grab_frames(camera_settings):

    n = camera_settings.num_frames
    assert(n == 72)
    
    print('START', flush=True)

    # input params
    time_per_rev = camera_settings.seconds_per_rot
    n_photos = n
    # setup constants for DAQ / Cyth Scanner
    Fs = 40_000  # DAQ sampling rate (Hz)
    turntable_gear_teeth = 60
    motor_gear_teeth = 42
    microsteps_per_motor_rev = 20_000
    microsteps_per_rev = int(microsteps_per_motor_rev * turntable_gear_teeth / motor_gear_teeth)
    microsteps_betw_photos = int(microsteps_per_rev / n_photos)
    time_between_photos = time_per_rev / n_photos
    samples_between_photos = int(time_between_photos * Fs)
    samples_per_microstep = int(samples_between_photos / microsteps_betw_photos)
    half_samples_per_microstep = int(samples_per_microstep / 2)

    # The following calculations would let us "make up" any
    #   missing microsteps to reach one full rotation

    # missing_microsteps = microsteps_per_rev - (microsteps_betw_photos * n_photos)
    # print(f'missing_microsteps = {missing_microsteps}')

    samples = []
    for i in range(microsteps_betw_photos):
        samples = samples + half_samples_per_microstep * [0.0]
        samples = samples + half_samples_per_microstep * [1.0]
    z = np.array(samples) > 0
    data = np.tile(z.reshape(1, -1), (2, 1))
    data[1, :] = True

    # camera = pylon.InstantCamera(pylon.TlFactory.GetInstance().CreateFirstDevice())

    tlf = pylon.TlFactory.GetInstance()
    tl = tlf.CreateTl('BaslerGigE')
    cam_info = tl.CreateDeviceInfo()
    cam_info.SetIpAddress(ip_address)
    camera = pylon.InstantCamera(tlf.CreateDevice(cam_info))

    camera.RegisterConfiguration(
        pylon.SoftwareTriggerConfiguration(),
        pylon.RegistrationMode_ReplaceAll,
        pylon.Cleanup_Delete
    )

    camera.MaxNumBuffer.Value = n_photos  # defaults to 10

    camera.Open()
    camera.StartGrabbing(pylon.GrabStrategy_OneByOne)  # requires software triggering

    frames = []

    try:
        task = nidaqmx.Task("test_write_task")
        # print(f"Created task: {task}")

        # Create channel in the task.
        # Type: Digital output
        # Channels: cDAQ1Mod1/port0/line0:1
        # Line grouping: one channel per line
        stepper_channel = task.do_channels.add_do_chan(
            lines="cDAQ1Mod1/port0/line0:1",
            line_grouping=nidaqmx.constants.LineGrouping.CHAN_PER_LINE,  # CHAN_PER_LINE or CHAN_FOR_ALL_LINES
            # line_grouping=nidaqmx.constants.LineGrouping.CHAN_FOR_ALL_LINES,  # CHAN_PER_LINE or CHAN_FOR_ALL_LINES
        )
        # print(f"Added channel: {stepper_channel}")

        # Control task(?)
        # Action: reserve
        task.control(nidaqmx.constants.TaskMode.TASK_RESERVE)
        # print(f"Set task to TASK_RESERVE mode.")

        # Set timing.
        task.timing.cfg_samp_clk_timing(
            rate=Fs,
            sample_mode=nidaqmx.constants.AcquisitionType.FINITE,  # FINITE or CONTINUOUS
            samps_per_chan=data.shape[1],
        )
        # print(f"Set timing sample clock rate to {Fs}.")

        t0_all = time()
        for i in range(n_photos):

            t0 = time()
            # Write to digital output channel.
            task.write(data=data, auto_start=False)
            # print(f"Wrote data to output channels.")

            # Go!
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
            
            print(f"TRIGGER_CAMERA", flush=True)
            # Capture image from camera
            if camera.WaitForFrameTriggerReady(200, pylon.TimeoutHandling_ThrowException):
                camera.ExecuteSoftwareTrigger()
            
            # grabResult = camera.RetrieveResult(200, pylon.TimeoutHandling_ThrowException)

            # if grabResult.GrabSucceeded():
            #     img = grabResult.Array
            #     frames.append(img.copy())

            # grabResult.Release()
                
            dt = time() - t0
            # print(f"Finished task in {dt:.3f} secs.")

            # Stop task.
            # print("Stopping task...", end=" ")
            task.stop()
            # print("Stopped.")

        dt_all = time() - t0_all
        # print(f"Finished all {n_photos} in {dt_all:.3f} secs.")

        print('RETRIEVE_IMAGES_START', flush=True)
        for _ in range(n_photos):
            grabResult = camera.RetrieveResult(200, pylon.TimeoutHandling_ThrowException)
            if grabResult.GrabSucceeded():
                img = grabResult.Array
                frames.append(img.copy())

            grabResult.Release()
        print('RETRIEVE_IMAGES_END', flush=True)

    finally:
        task.close()
        camera.Close()

    return frames

if __name__ == '__main__':

    assert(len(sys.argv) == 2)
    
    output_path = sys.argv[1]
    camera_settings = json.loads(sys.argv[2])

    output_path = pathlib.Path(output_path)
    os.makedirs(output_path, exist_ok=True)

    frames = grab_frames(camera_settings)
    for (i, frame) in enumerate(frames):
        fname = output_path / f'{i + 1:03d}.png'
        iio.imwrite(str(fname), frame)
        print("IMAGE_PATH " + str(fname), flush=True)
