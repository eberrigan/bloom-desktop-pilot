import * as fs from "fs";
import path from "path";
import * as os from "os";
import * as yaml from "js-yaml";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
// import { LocalStorage } from './local-storage';
import type { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "../types/database.types";
import { Electric_cyl_images, Electric_cyl_scans } from "../generated/client";
import { ElectricStore } from "./electricstore";

type ImagesWithScans = Electric_cyl_images & {
  electric_cyl_scans: Electric_cyl_scans;
};

export class ImageUploader {
  private supabase: SupabaseClient<Database> | null = null;
  private electricStore: ElectricStore;
  // private localStorage: LocalStorage = new LocalStorage();

  constructor(electricStore: ElectricStore) {
    this.electricStore = electricStore;
  }

  init = async () => {
    this.supabase = await getSupabaseClient(); // this.localStorage);
  };

  uploadImages = async (images: ImagesWithScans[]) => {
    const nWorkers = 4;
    const pngCompression = 9;
    await concurrentMap(images, nWorkers, async (image, i) => {
      const { created, error } = await this.uploadImage(image, {
        pngCompression,
      });
      if (error) {
        console.error(`Error uploading image ${image.path}: ${error}`);
      }
      if (created) {
        console.log(`Uploaded image ${image.path}`);
      }
    });
  };

  uploadImage = async (
    image: ImagesWithScans,
    opts?: { pngCompression: number }
  ) => {
    const pngCompression = opts?.pngCompression || 9;

    const src = image.path;

    const dst = `bloom-desktop-cyl-scans/${
      image.electric_cyl_scans.scanner_id
    }/${image.electric_cyl_scans.capture_date.toISOString()}/scan_${
      image.electric_cyl_scans.id
    }/${image.electric_cyl_scans.plant_qr_code}/${image.frame_number}.png`;

    // upload image to supabase
    const bucket = "images";
    const { error } = await this.uploadImageFile(src, dst, bucket, {
      pngCompression,
    });

    if (error) {
      return { created: false, error };
    }

    // update image metadata in electric
    const { error: dbError } = await this.electricStore.updateImageMetadata(
      image.id,
      {
        status: "UPLOADED",
        supabase_object_path: dst,
      }
    );
    if (dbError) {
      return { created: false, error: dbError };
    }
    return { created: true, error: null };
  };

  uploadImageFile = async (
    src: string,
    dst: string,
    bucket: string,
    opts?: { pngCompression: number }
  ) => {
    const pngCompression = opts?.pngCompression || 9;
    const inputBuffer = await fs.promises.readFile(src);

    // Re-encode the image with high compression using sharp
    const compressedBuffer = await sharp(inputBuffer)
      .png({ compressionLevel: pngCompression })
      .toBuffer();

    // const { fileTypeFromBuffer } = await import("file-type");
    // const type = await fileTypeFromBuffer(data);

    const type = { mime: "image/png" };
    const storageOptions = { contentType: type?.mime };
    const { error } = await this.supabase.storage
      .from(bucket)
      .upload(dst, compressedBuffer, storageOptions);

    return { error };
  };
}

export async function createImageUploader(electricStore: ElectricStore) {
  const bloom_uploader = new ImageUploader(electricStore);
  await bloom_uploader.init();
  return bloom_uploader;
}

export async function getSupabaseJWT() {
  const supabase = await getSupabaseClient();
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) {
    throw new Error("No token");
  }
  return token;
}

async function getSupabaseClient() {
  // (localStorage: LocalStorage) {
  // Compute path to desktop-config.yaml
  const homedir = os.homedir();
  const config_yaml = path.join(homedir, ".bloom", "desktop-config.yaml");

  // Load desktop-config.yaml
  const config = yaml.load(fs.readFileSync(config_yaml, "utf8")) as {
    python: string;
    capture_scan_py: string;
    scans_dir: string;
    bloom_scanner_username: string;
    bloom_scanner_password: string;
    bloom_scanner_id: string;
    bloom_api_url: string;
    bloom_anon_key: string;
  };

  const clientOptions = {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      // storage: localStorage,
    },
  };

  const clientCredentials = {
    email: config.bloom_scanner_username,
    password: config.bloom_scanner_password,
    // clientOptions,
  };

  const supabase = createClient<Database>(
    config.bloom_api_url,
    config.bloom_anon_key
  );
  await supabase.auth.signInWithPassword(clientCredentials);

  return supabase;
}

/**
 * Concurrently maps an array to a new array using an asynchronous function.
 * @param array The input array to map.
 * @param nWorkers The maximum number of concurrent workers to use.
 * @param asyncFunc The asynchronous function to apply to each element of the array.
 * @returns A new array with the results of applying the asyncFunc to each element of the input array.
 */
async function concurrentMap<T, U>(
  array: T[],
  nWorkers: number,
  asyncFunc: (t: T, index: number) => Promise<U>
) {
  let result: U[] = [];
  let index = 0;

  // Each "worker" will process items from the array in a loop
  const workers = Array.from({ length: nWorkers }, async () => {
    while (index < array.length) {
      const currentIndex = index++;
      result[currentIndex] = await asyncFunc(array[currentIndex], currentIndex);
    }
  });

  // Wait for all the workers to finish.
  await Promise.all(workers);

  return result;
}

// export async function uploadImages(
//   imagePaths: string[],
//   metadata: CylImageMetadata[],
//   uploader: FileUploader,
//   store: DataStore,
//   opts?: {
//     nWorkers?: number;
//     pngCompression?: number;
//     before?: (index: number, m: CylImageMetadata) => void;
//     result?: (
//       index: number,
//       m: CylImageMetadata,
//       created: number | null,
//       error: any
//     ) => void;
//   }
// ) {
//   const { before, result } = opts || {};
//   const nWorkers = opts?.nWorkers || 4;
//   const pngCompression = opts?.pngCompression || 9;
//   await concurrentMap(metadata, nWorkers, async (m, i) => {
//     if (before) {
//       before(i, metadata[i]);
//     }
//     const { created, error } = await uploadImage(
//       imagePaths[i],
//       metadata[i],
//       uploader,
//       store,
//       { pngCompression }
//     );
//     if (result) {
//       result(i, metadata[i], created, error);
//     }
//   });
// }

// async function uploadImage(
//   imagePath: string,
//   metadata: CylImageMetadata,
//   uploader: FileUploader,
//   store: DataStore,
//   opts?: { pngCompression?: number }
// ) {
//   const pngCompression = opts?.pngCompression || 9;
//   // check that imagePath exists
//   if (!fs.existsSync(imagePath)) {
//     return { created: null, error: new Error("imagePath does not exist") };
//   }
//   const { created, error: dbError } = await store.insertImageMetadata(metadata);
//   // if created, then attempt to upload image
//   let uploadError;
//   if (created !== null && dbError === null) {
//     const bucket = "images";
//     const dir = "cyl-images";
//     const filename = `cyl-image_${created}_${uuid.v4()}.png`;
//     let targetPath = path.join(dir, filename);
//     ({ error: uploadError } = await uploader.uploadImage(
//       imagePath,
//       targetPath,
//       bucket,
//       { pngCompression }
//     ));
//     // if upload succeeds, set image.object_path and image.status = 'SUCCESS'
//     if (uploadError === null) {
//       const { error } = await store.updateImageMetadata(created, {
//         object_path: targetPath,
//         status: "SUCCESS",
//       });
//     } else {
//       const { error } = await store.updateImageMetadata(created, {
//         status: "ERROR",
//       });
//     }
//   } else {
//     uploadError = null;
//   }

//   return { created, error: dbError || uploadError };
// }
