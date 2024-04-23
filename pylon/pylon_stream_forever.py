import asyncio
from concurrent.futures import ThreadPoolExecutor
import json
import sys
import os
import pathlib
from time import time, sleep
import base64
from io import BytesIO
from PIL import Image

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
    def __init__(
        self, exposure_time, gain, gamma, brightness, contrast, seconds_per_rot
    ):
        self.exposure_time = exposure_time
        self.gain = gain
        self.gamma = gamma
        self.brightness = brightness
        self.contrast = contrast
        self.seconds_per_rot = seconds_per_rot


def grab_frames(camera_settings):

    ip_address = camera_settings["camera_ip_address"]

    print("START", flush=True)

    # camera = pylon.InstantCamera(pylon.TlFactory.GetInstance().CreateFirstDevice())

    tlf = pylon.TlFactory.GetInstance()
    tl = tlf.CreateTl("BaslerGigE")
    cam_info = tl.CreateDeviceInfo()
    cam_info.SetIpAddress(ip_address)
    camera = pylon.InstantCamera(tlf.CreateDevice(cam_info))

    camera.RegisterConfiguration(
        pylon.SoftwareTriggerConfiguration(),
        pylon.RegistrationMode_ReplaceAll,
        pylon.Cleanup_Delete,
    )

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

    try:

        t0_all = time()

        while True:

            t0 = time()

            print(f"TRIGGER_CAMERA", flush=True)

            # Capture image from camera
            if camera.WaitForFrameTriggerReady(
                200, pylon.TimeoutHandling_ThrowException
            ):
                camera.ExecuteSoftwareTrigger()

            grabResult = camera.RetrieveResult(
                200, pylon.TimeoutHandling_ThrowException
            )
            if grabResult.GrabSucceeded():
                img = grabResult.Array
                img_base64 = img_to_base64(img)
                print(f"IMAGE data:image/png;base64,{img_base64}", flush=True)

            grabResult.Release()

            dt = time() - t0

        dt_all = time() - t0_all
        # print(f"Finished all {n_photos} in {dt_all:.3f} secs.")

    finally:
        task.close()
        camera.Close()


def img_to_base64(img):
    buffer = BytesIO()
    pil_img = Image.fromarray(img)
    pil_img.save(buffer, format="PNG", compress_level=0)
    # iio.imwrite(buffer, img, ".png")
    base64_img = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return base64_img


if __name__ == "__main__":

    assert len(sys.argv) == 3

    output_path = sys.argv[1]
    camera_settings = json.loads(sys.argv[2])

    output_path = pathlib.Path(output_path)
    os.makedirs(output_path, exist_ok=True)

    grab_frames(camera_settings)
