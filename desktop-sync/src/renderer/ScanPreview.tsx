import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";
import { useEffect, useState } from "react";
import { ScansWithPhenotypers } from "../types/electric.types";
import { Electric_cyl_images, Electric_cyl_scans } from "../generated/client";
import { Link } from "react-router-dom";

const getScannerId = window.electron.scanner.getScannerId;
const getScansDir = window.electron.scanner.getScansDir;

export function ScanPreview({
  scan,
  supabase,
  thumb,
  link,
}: {
  scan: ScansWithPhenotypers;
  supabase: SupabaseClient<Database>;
  thumb: boolean;
  link: string | undefined;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [scannerId, setScannerId] = useState<string | null>(null);
  const [scansDir, setScansDir] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState<number>(0);

  useEffect(() => {
    getScansDir().then((dir) => setScansDir(dir));
  }, []);

  useEffect(() => {
    getScannerId().then((response: string) => setScannerId(response));
  }, []);

  useEffect(() => {
    if (scan.electric_cyl_images.length > 0) {
      const image = sortImages(scan.electric_cyl_images)[imageIndex];
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
  }, [scan, supabase, thumb, imageIndex]);

  const image = sortImages(scan.electric_cyl_images)[0];

  return (
    <div className="group relative align-middle inline-block">
      <button
        className="absolute hidden group-hover:block text-lime-300 z-10 left-2 top-1/2 transform -translate-y-1/2 opacity-80 hover:opacity-100"
        onClick={() => {
          setImageIndex(
            (prev) =>
              (prev - 1 + scan.electric_cyl_images.length) %
              scan.electric_cyl_images.length
          );
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
      <button
        className="absolute hidden group-hover:block text-lime-300 right-2 z-10 top-1/2 transform -translate-y-1/2 opacity-80 hover:opacity-100"
        onClick={() => {
          setImageIndex((prev) => (prev + 1) % scan.electric_cyl_images.length);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
      <div className="absolute hidden group-hover:block text-lime-300 z-10 bottom-2 left-1/2 transform -translate-x-1/2 opacity-80 select-none">
        {imageIndex + 1} / {scan.electric_cyl_images.length}
      </div>
      <ScanImage
        image={image}
        imageUrl={imageUrl}
        scan={scan}
        scannerId={scannerId}
        scansDir={scansDir}
        link={link}
        thumb={thumb}
      />
    </div>
  );
}

function ScanImage({
  image,
  imageUrl,
  scan,
  scannerId,
  scansDir,
  link,
  thumb,
}: {
  image: Electric_cyl_images;
  scan: Electric_cyl_scans;
  scannerId: string | null;
  scansDir: string;
  imageUrl: string;
  link?: string;
  thumb?: boolean;
}) {
  const imageElement =
    scannerId !== null &&
    scannerId === scan.scanner_id &&
    scansDir !== null &&
    image.status !== "UPLOADED" ? (
      <img
        src={`file://${scansDir}/${image.path}`}
        className={thumb ? "h-30" : "w-[600px] rounded-md"}
      />
    ) : imageUrl === null ? (
      <LoadingImage />
    ) : (
      <img src={imageUrl} className={thumb ? "h-30" : "w-[800px] rounded-md"} />
    );
  return link ? (
    <Link to={link}>{imageElement}</Link>
  ) : (
    <div>{imageElement}</div>
  );
}

function LoadingImage() {
  return (
    <div className="animate-pulse h-30 w-30 bg-stone-200 rounded-md"></div>
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
            width: 300,
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
