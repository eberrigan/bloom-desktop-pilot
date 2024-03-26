import sys
import time
import glob
import asyncio
import numpy as np
from concurrent.futures import ThreadPoolExecutor
import imageio
from pathlib import Path

async def save_image_async(executor, output_dir, idx, array):
    loop = asyncio.get_running_loop()
    # Offload the blocking operation to the executor
    output_path = Path(output_dir) / f'{idx + 1}.png'
    await loop.run_in_executor(executor, imageio.imwrite, str(output_path), array)

async def parallel_imwrite(images, output_dir):
    # Create a ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=8) as executor:
        # Schedule all the save operations to run asynchronously
        tasks = [save_image_async(executor, output_dir, idx, array) for idx, array in enumerate(images)]
        # Wait for all scheduled tasks to complete
        await asyncio.gather(*tasks)

def serial_imwrite(images, output_dir):
    for (i, image) in enumerate(images):
        output_path = Path(output_dir) / f'{i + 1}.png'    
        imageio.imwrite(output_path, image)

if __name__ == "__main__":

    output_dir = sys.argv[1]

    print('loading images')

    image_paths = glob.glob('../test/sample_scan/*.png')
    images = [imageio.imread(image_path) for image_path in image_paths]
    
    print('serial write')

    t0 = time.time()
    serial_imwrite(images, output_dir)
    t1 = time.time()
    
    print(f'time: {t1 - t0}')

    print('parallel write')

    t0 = time.time()
    asyncio.run(parallel_imwrite(images, output_dir))
    t1 = time.time()

    print(f'time: {t1 - t0}')

