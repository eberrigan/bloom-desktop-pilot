import asyncio
from concurrent.futures import ThreadPoolExecutor
import json
import sys
import os
import pathlib
from time import time, sleep

import imageio.v2 as iio
import nidaqmx
import numpy as np
from pypylon import pylon

# Slow Scanner @ GH
# ip_address = '10.0.0.45'


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
        

async def save_image_async(executor, output_path, idx, array):
    loop = asyncio.get_running_loop()
    # Offload the blocking operation to the executor
    # output_path = pathlib.Path(output_dir) / f'{idx + 1}.png'
    await loop.run_in_executor(executor, iio.imwrite, str(output_path), array)


async def parallel_imwrite(images, output_path):

    image_paths = [f'{idx + 1}.png' for idx in range(len(frames))]
    output_paths = [pathlib.Path(output_path) / image_path for image_path in image_paths]

    # Create a ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=8) as executor:
        # Schedule all the save operations to run asynchronously
        tasks = [save_image_async(executor, output_paths[idx], idx, array) for idx, array in enumerate(images)]
        # Wait for all scheduled tasks to complete
        await asyncio.gather(*tasks)

    for image_path in image_paths:
        print("IMAGE_PATH " + str(image_path), flush=True)
        time.sleep(0.01)

def grab_frames(camera_settings):

    n = camera_settings['num_frames']
    assert(n == 72)

    ip_address = camera_settings['camera_ip_address']
    
    print('START', flush=True)

    # input params
    time_per_rev = camera_settings['seconds_per_rot']
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

    # Set exposure time

    # The following might also be necessary
    # camera.ExposureMode.Value = "Timed"
    # Set the exposure time mode to Standard
    # camera.ExposureTimeMode.Value = "Standard"
    # Set the exposure time 
    camera.ExposureTimeAbs.Value = camera_settings["exposure_time"]    

    # Set gain

    camera.GainAuto.Value = "Off"
    camera.GainRaw.Value = camera_settings["gain"]

    # Set gamma

    # Enable the Gamma feature
    camera.GammaEnable.Value = True
    # Set the gamma type to User
    camera.GammaSelector.Value = "User"
    # Set the Gamma value
    camera.Gamma.Value = camera_settings["gamma"]

    # Set brightness (not supported for our Basler camera aca2000-50gm)

    # camera.BslBrightness.Value = camera_settings["brightness"]

    # Set contrast (not supported for our Basler camera aca2000-50gm)

    # Set the contrast mode to Linear
    # camera.BslContrastMode.Value = "Linear"
    # Set the Contrast parameter
    # camera.BslContrast.Value = camera_settings["contrast"]

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

    assert(len(sys.argv) == 3)
    
    output_path = sys.argv[1]
    camera_settings = json.loads(sys.argv[2])

    output_path = pathlib.Path(output_path)
    os.makedirs(output_path, exist_ok=True)

    frames = grab_frames(camera_settings)

    asyncio.run(parallel_imwrite(frames, output_path))
