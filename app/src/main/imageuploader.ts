import * as fs from "fs";
import path from "path";
import * as os from "os";
import * as yaml from "js-yaml";
import { createClient } from "@supabase/supabase-js";

import sharp from "sharp";
// import { LocalStorage } from './local-storage';
import type { SupabaseClient } from "@supabase/supabase-js";
import type { StorageError } from "@supabase/storage-js";

import { Database } from "@salk-hpi/bloom-fs/dist/types/database.types";
import { Image, Scan } from "@prisma/client";
import { PrismaStore } from "./prismastore";

import { uploadImages, CylImageMetadata } from "@salk-hpi/bloom-fs";
import { SupabaseStore, SupabaseUploader } from "@salk-hpi/bloom-js";

type ImageWithScanWithExperiment = Image & {
  scan: Scan & {
    phenotyper : Phenotyper;
    experiment: Experiment;
  };
};

export class ImageUploader {
  private supabase: SupabaseClient<Database> | null = null;
  private prismaStore: PrismaStore;
  private nWorkers: number;
  private pngCompression: number;
  private scans_dir: string;
  // private localStorage: LocalStorage = new LocalStorage();

  constructor(
    prismaStore: PrismaStore,
    scans_dir: string,
    nWorkers = 4,
    pngCompression = 9
  ) {
    this.prismaStore = prismaStore;
    this.scans_dir = scans_dir;
    this.nWorkers = nWorkers;
    this.pngCompression = pngCompression;
  }

  init = async () => {
    this.supabase = await getSupabaseClient(); // this.localStorage);
  };

  uploadImages = async (images: ImageWithScanWithExperiment[]) => {
    // const client = await createSupabaseClient();
    const uploader = new SupabaseUploader(this.supabase);
    const store = new SupabaseStore(this.supabase);

    const paths = images.map((image) => path.join(this.scans_dir, image.path));
    console.log("Uploading images:", paths);
    const metadata: CylImageMetadata[] = images.map((image) => {
      return {
        species: image.scan.experiment.species,
        experiment: image.scan.experiment.name,
        wave_number: image.scan.wave_number,
        germ_day: 0,
        germ_day_color: "none",
        plant_age_days: image.scan.plant_age_days,
        date_scanned: image.scan.capture_date.toISOString(),
        device_name: image.scan.scanner_name,
        plant_qr_code: image.scan.plant_id,
        frame_number: image.frame_number,
        accession_name: image.scan.accession_id,
        phenotyper_name: image.scan.phenotyper.name,
        phenotyper_email: image.scan.phenotyper.email || undefined,
        scientist_name: image.scan.experiment.scientist.name,
        scientist_email: image.scan.experiment.scientist.email || undefined,
      };
    });

    console.log("Uploading images:", metadata);

    await uploadImages(paths, metadata, uploader, store, {
      nWorkers: this.nWorkers,
      pngCompression: this.pngCompression,
      before: (index, m) => {
        console.log(`Uploading image ${index + 1}/${images.length}`);
      },
      result: async (index, m, created, error) => {
        if (error) {
          console.error(
            `Error uploading image ${index + 1}: ${JSON.stringify(error)}`
          );
        }
        if (created) {
          console.log(`Uploaded image ${index + 1}`);
          // update image metadata in prisma
          console.log("Updating image " + images[index].id);
          const { error: dbError } = await this.prismaStore.updateImageMetadata(
            images[index].id,
            {
              status: "UPLOADED",
            }
          );
          if (dbError) {
            console.error(
              `Error updating image metadata in prisma: ${JSON.stringify(
                dbError
              )}`
            );
          } else {
            console.log(`Updated image metadata in prisma`);
          }
        }
      },
    });
  };

  // uploadImages = async (images: ImageWithScan[]) => {
  //   const nWorkers = 4;
  //   const pngCompression = 9;
  //   await concurrentMap(images, nWorkers, async (image, i) => {
  //     const { created, error } = await this.uploadImage(image, {
  //       pngCompression,
  //     });
  //     if (error) {
  //       console.error(
  //         `Error uploading image ${image.path}: ${JSON.stringify(error)}`
  //       );
  //     }
  //     if (created) {
  //       console.log(`Uploaded image ${image.path}`);
  //     }
  //   });
  // };

  // uploadImage = async (
  //   image: ImageWithScan,
  //   opts?: { pngCompression: number }
  // ) => {
  //   const pngCompression = opts?.pngCompression || 9;

  //   const src = path.join(this.scans_dir, image.path);

  //   const dst = `bloom-desktop-cyl-scans/${
  //     image.scan.scanner_name
  //   }/${image.scan.capture_date.toISOString()}/scan_${image.scan.id}/${
  //     image.scan.plant_id
  //   }/${image.frame_number}.png`;

  //   // upload image to supabase
  //   const bucket = "images";
  //   const { error } = await this.uploadImageFile(src, dst, bucket, {
  //     pngCompression,
  //   });

  //   if (error) {
  //     if ("statusCode" in error && error.statusCode === "409") {
  //       console.log(`Image already exists: ${dst}`);
  //     } else {
  //       return { created: false, error };
  //     }
  //   }

  //   // update image metadata in prisma
  //   const { error: dbError } = await this.prismaStore.updateImageMetadata(
  //     image.id,
  //     {
  //       status: "UPLOADED",
  //     }
  //   );
  //   if (dbError) {
  //     return { created: false, error: dbError };
  //   }
  //   return { created: true, error: null };
  // };

  // uploadImageFile = async (
  //   src: string,
  //   dst: string,
  //   bucket: string,
  //   opts?: { pngCompression: number }
  // ) => {
  //   const pngCompression = opts?.pngCompression || 9;
  //   const inputBuffer = await fs.promises.readFile(src);

  //   // Re-encode the image with high compression using sharp
  //   const compressedBuffer = await sharp(inputBuffer)
  //     .png({ compressionLevel: pngCompression })
  //     .toBuffer();

  //   // const { fileTypeFromBuffer } = await import("file-type");
  //   // const type = await fileTypeFromBuffer(data);

  //   const type = { mime: "image/png" };
  //   const storageOptions = { contentType: type?.mime };
  //   const { error } = await this.supabase.storage
  //     .from(bucket)
  //     .upload(dst, compressedBuffer, storageOptions);

  //   return { error };
  // };
}

export async function createImageUploader(
  prismaStore: PrismaStore,
  scans_dir: string
) {
  const bloom_uploader = new ImageUploader(prismaStore, scans_dir);
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
