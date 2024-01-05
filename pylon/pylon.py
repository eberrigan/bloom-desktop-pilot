import sys
import os
import pathlib
import time

import imageio as iio
from pypylon import pylon

# Slow Scanner @ GH
# ip_address = '10.0.0.45'

# Scanner @ PBIO
ip_address = '10.0.0.23'

def grab_frames(n):

    # camera = pylon.InstantCamera(pylon.TlFactory.GetInstance().CreateFirstDevice())

    tlf = pylon.TlFactory.GetInstance()
    tl = tlf.CreateTl('BaslerGigE')
    cam_info = tl.CreateDeviceInfo()
    cam_info.SetIpAddress(ip_address)
    camera = pylon.InstantCamera(tlf.CreateDevice(cam_info))

    camera.Open()

    # demonstrate some feature access
    # new_width = camera.Width.Value - camera.Width.Inc
    # if new_width >= camera.Width.Min:
    #     camera.Width.Value = new_width

    numberOfImagesToGrab = n
    camera.StartGrabbingMax(numberOfImagesToGrab)

    frames = []
    while camera.IsGrabbing():
        grabResult = camera.RetrieveResult(5000, pylon.TimeoutHandling_ThrowException)

        # replace this with DAQ code to move stepper motor
        time.sleep(0.1)

        if grabResult.GrabSucceeded():
            img = grabResult.Array
            frames.append(img.copy())

        grabResult.Release()
    camera.Close()

    return frames

if __name__ == '__main__':

    assert(len(sys.argv) == 2)
    
    output_path = sys.argv[1]

    output_path = pathlib.Path(output_path)
    os.makedirs(output_path, exist_ok=True)

    frames = grab_frames(72)
    for (i, frame) in enumerate(frames):
        fname = output_path / f'{i + 1:03d}.png'
        iio.imwrite(str(fname), frame)
        print(str(fname), flush=True)
