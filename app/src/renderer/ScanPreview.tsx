import { useEffect, useState } from "react";
import { ScanWithPhenotyper } from "../types/electric.types";
import { Link } from "react-router-dom";
import { Image } from "@prisma/client";

const getScansDir = window.electron.scanner.getScansDir;

export function ScanPreview({
  scan,
  thumb,
  link,
}: {
  scan: ScanWithPhenotyper;
  thumb: boolean;
  link: string | undefined;
}) {
  const [scansDir, setScansDir] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState<number>(0);

  useEffect(() => {
    getScansDir().then((dir) => setScansDir(dir));
  }, []);

  const image = sortImages(scan.images)[imageIndex];

  return (
    <div className="group relative align-middle inline-block">
      <button
        className="absolute hidden group-hover:block text-lime-300 z-10 left-2 top-1/2 transform -translate-y-1/2 opacity-80 hover:opacity-100"
        onClick={() => {
          setImageIndex(
            (prev) => (prev - 1 + scan.images.length) % scan.images.length
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
          setImageIndex((prev) => (prev + 1) % scan.images.length);
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
        {imageIndex + 1} / {scan.images.length}
      </div>
      <ScanImage image={image} scansDir={scansDir} link={link} thumb={thumb} />
    </div>
  );
}

function ScanImage({
  image,
  scansDir,
  link,
  thumb,
}: {
  image: Image;
  scansDir: string;
  link?: string;
  thumb?: boolean;
}) {
  const imageElement = (
    <ZoomableImage
      src={`file://${scansDir}/${image.path}`}
      alt={image.path}
      thumb={thumb}
    />
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

function sortImages(images: Image[]) {
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
      style={{ overflow: "hidden", position: "relative" }}
      onMouseDown={thumb ? null : startDrag}
      onMouseMove={thumb ? null : onDrag}
      onMouseUp={thumb ? null : endDrag}
      onMouseLeave={thumb ? null : endDrag}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        }}
        className={thumb ? "h-28" : "w-[800px] rounded-md cursor-grab"}
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
