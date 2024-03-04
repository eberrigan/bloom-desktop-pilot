import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";
import { useEffect, useState } from "react";
import { ScansWithPhenotypers } from "../types/electric.types";
import { Electric_cyl_images } from "../generated/client";

const getScannerId = window.electron.scanner.getScannerId;
const getScansDir = window.electron.scanner.getScansDir;

export function ScanPreview({
  scan,
  supabase,
  thumb,
}: {
  scan: ScansWithPhenotypers;
  supabase: SupabaseClient<Database>;
  thumb: boolean;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [scannerId, setScannerId] = useState<string | null>(null);
  const [scansDir, setScansDir] = useState<string | null>(null);

  useEffect(() => {
    getScansDir().then((dir) => setScansDir(dir));
  }, []);

  useEffect(() => {
    getScannerId().then((response: string) => setScannerId(response));
  }, []);

  useEffect(() => {
    if (scan.electric_cyl_images.length > 0) {
      const image = sortImages(scan.electric_cyl_images)[0];
      if (supabase) {
        getImageUrl({
          supabase,
          objectPath: image.supabase_object_path,
          thumb: thumb,
        }).then((url) => {
          setImageUrl(url);
        });
      }
    }
  }, [scan, supabase, thumb]);

  return (
    <div>
      {scannerId !== null &&
      scannerId == scan.scanner_id &&
      scansDir !== null ? (
        <img
          src={`file://${scansDir}/${
            sortImages(scan.electric_cyl_images)[0].path
          }`}
          className={thumb ? "h-20" : "w-[600px] rounded-md"}
        />
      ) : imageUrl === null ? (
        <LoadingImage />
      ) : (
        <img
          src={imageUrl}
          className={thumb ? "h-20" : "w-[600px] rounded-md"}
        />
      )}
    </div>
  );
}

function LoadingImage() {
  return (
    <div className="animate-pulse h-20 w-20 bg-stone-200 rounded-md"></div>
  );
}

async function getImageUrl({
  supabase,
  objectPath,
  thumb,
}: {
  supabase: SupabaseClient<Database>;
  objectPath: string;
  thumb: boolean;
}) {
  const { data, error } = await supabase.storage.from("images").createSignedUrl(
    objectPath,
    120,
    thumb
      ? {
          transform: {
            width: 200,
            quality: 100,
          },
        }
      : {}
  );

  const signedUrl = data?.signedUrl ?? "";
  return signedUrl;
}

function sortImages(images: Electric_cyl_images[]) {
  const imagesCopy = images.slice();
  return imagesCopy.sort((a, b) => {
    return a.frame_number > b.frame_number ? 1 : -1;
  });
}
