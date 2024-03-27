import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";
import { WheelEventHandler, useCallback, useEffect, useState } from "react";
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
        className={thumb ? "h-30" : "w-[800px] rounded-md"}
      />
    ) : imageUrl === null ? (
      <LoadingImage />
    ) : (
      <ZoomableImage src={imageUrl} alt={image.path} thumb={thumb} />
      // <img
      //   draggable={false}
      //   src={imageUrl}
      //   className={thumb ? "h-30" : "w-[800px] rounded-md"}
      // />
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

const ZoomableImage = ({
  src,
  alt,
  thumb,
}: {
  src: string;
  alt: string;
  thumb: boolean;
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 3));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 1));
  };

  const startDrag: React.MouseEventHandler = (e) => {
    setDragging(true);
    setStartDragPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const onDrag: React.MouseEventHandler = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - startDragPosition.x,
        y: e.clientY - startDragPosition.y,
      });
    }
  };

  const endDrag = () => {
    setDragging(false);
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      style={{ overflow: "hidden", cursor: "grab", position: "relative" }}
      // onWheel={handleWheel}
      onMouseDown={startDrag}
      onMouseMove={onDrag}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transition: "transform 0.2s",
          // transformOrigin: "top left",
        }}
        className={thumb ? "h-30" : "w-[800px] rounded-md cursor-grab"}
      />
      {thumb ? null : (
        <div className="absolute top-2 right-2 flex flex-col">
          <button
            onClick={zoomIn}
            className="rounded-md border border-gray-300 w-8 h-8 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 mb-1"
          >
            +
          </button>
          <button
            onClick={zoomOut}
            className="rounded-md border border-gray-300 w-8 h-8 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
          >
            -
          </button>
        </div>
      )}
    </div>
  );
};
