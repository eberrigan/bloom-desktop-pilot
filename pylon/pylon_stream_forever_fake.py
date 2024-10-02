import asyncio
from concurrent.futures import ThreadPoolExecutor
import glob
import json
import os
import sys
import time
import pathlib
import logging

import base64
from io import BytesIO
from PIL import Image


import imageio.v2 as iio

logging.basicConfig(level=logging.INFO)

# Test images are in "test/sample_scan" directory from the root of the repo
sample_scan = pathlib.Path(__file__).parent.parent / "test" / "sample_scan"
logging.info(f"sample_scan: {sample_scan}")



def stream_frames(camera_settings):
    n = camera_settings["num_frames"]
    src_frames = glob.glob(os.path.join(sample_scan, "*.png"))
    logging.debug(f"Found {len(src_frames)} frames.")
    src_frames.sort(key=lambda x: int(os.path.basename(x).split(".")[0]))
    i = 0
    while True:
        time.sleep(0.2)
        src_frame = src_frames[i % len(src_frames)]
        i += 1
        # time the function call
        start = time.time()
        img = iio.imread(src_frame)
        logging.debug(f"Read {src_frame}.")
        end = time.time()
        # print(f"iio.imread took {end - start} seconds", file=sys.stderr)
        # time the function call
        start = time.time()
        base64_img = img_to_base64(img)
        end = time.time()
        # print(f"img_to_base64 took {end - start} seconds", file=sys.stderr)
        print(f"TRIGGER_CAMERA", flush=True)
        print("IMAGE data:image/png;base64,{}".format(base64_img), flush=True)


def img_to_base64(img):
    if img is None or img.size == 0:
        logging.error("Invalid image encountered!")
        return ""

    with BytesIO() as buffer:
        with Image.fromarray(img) as pil_img:
            logging.debug(f"{pil_img} opened.")
            pil_img.save(buffer, format="PNG", compress_level=0)
            logging.debug(f"{pil_img} saved to buffer.")
        base64_img = base64.b64encode(buffer.getvalue()).decode("utf-8")
        logging.debug(f"base64_img: {base64_img[:100]}")
    return base64_img


if __name__ == "__main__":

    assert len(sys.argv) == 2

    camera_settings = json.loads(sys.argv[1])

    # time the function call
    start = time.time()
    stream_frames(camera_settings)
    end = time.time()
    print(f"stream_frames took {end - start} seconds", file=sys.stderr)
