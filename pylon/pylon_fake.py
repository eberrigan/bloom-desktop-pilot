import glob
import json
import os
import sys
import time
import pathlib

import imageio as iio


sample_scan = '/Users/djbutler/dev/bloom-desktop-pilot/test/sample_scan'


def grab_frames(camera_settings):
    n = camera_settings['num_frames']
    src_frames = glob.glob(os.path.join(sample_scan, '*.png'))
    src_frames.sort(key=lambda x: int(os.path.basename(x).split('.')[0]))
    frames = []
    for src_frame in src_frames[:n]:
        print(f"TRIGGER_CAMERA", flush=True)
        time.sleep(0.1)
        frames.append(iio.imread(src_frame))
    return frames

if __name__ == '__main__':

    assert(len(sys.argv) == 3)
    
    output_path = sys.argv[1]
    camera_settings = json.loads(sys.argv[2])


    output_path = pathlib.Path(output_path)
    os.makedirs(output_path, exist_ok=True)

    frames = grab_frames(camera_settings)
    for (i, frame) in enumerate(frames):
        fname = output_path / f'{i + 1:03d}.png'
        iio.imwrite(str(fname), frame)
        print("IMAGE_PATH " + str(fname), flush=True)
