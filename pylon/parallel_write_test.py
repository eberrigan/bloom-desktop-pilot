import time
import glob
import asyncio
import numpy as np
from concurrent.futures import ThreadPoolExecutor
import imageio

async def save_image_async(executor, idx, array):
    loop = asyncio.get_running_loop()
    # Offload the blocking operation to the executor
    await loop.run_in_executor(executor, imageio.imwrite, f'image_{idx}.png', array)

async def main(arrays):
    # Create a ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=8) as executor:
        # Schedule all the save operations to run asynchronously
        tasks = [save_image_async(executor, idx, array) for idx, array in enumerate(arrays)]
        # Wait for all scheduled tasks to complete
        await asyncio.gather(*tasks)

def serial_write(images):
    for (i, image) in enumerate(images):
        imageio.imwrite(f'{i}.png', image)

if __name__ == "__main__":
    print('loading images')
    image_paths = glob.glob('../test/sample_scan/*.png')
    images = [imageio.imread(image_path) for image_path in image_paths]
    
    print('serial write')
    t0 = time.time()
    serial_write(images)
    t1 = time.time()
    print(f'time: {t1 - t0}')

    print('parallel write')
    t0 = time.time()
    asyncio.run(main(images))
    t1 = time.time()
    print(f'time: {t1 - t0}')

