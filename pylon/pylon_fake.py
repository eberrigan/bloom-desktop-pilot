import asyncio
from concurrent.futures import ThreadPoolExecutor
import glob
import json
import os
import sys
import time
import pathlib

import imageio.v2 as iio


# Test images are in "test/sample_scan" directory from the root of the repo
sample_scan = pathlib.Path(__file__).parent.parent / "test" / "sample_scan"


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

    asyncio.run(parallel_imwrite(frames, output_path))
