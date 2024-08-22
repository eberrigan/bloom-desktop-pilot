import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ScanWithPhenotyper } from "../types/electric.types";
import { ScanPreview } from "./ScanPreview";

const ipcRenderer = window.electron.ipcRenderer;
const getScans = window.electron.scanStore.getScans;
const deleteScan = window.electron.scanStore.deleteScan;
const uploadImages = window.electron.electric.uploadImages;
// const getScansWithEmail = window.electron.scanStore.getScansWithEmail;

export function BrowseScans({
  showUploadButton = true,
  showTodayOnly = false,
  showOnlyScanner = null,
  onDeleted = () => {},
}: {
  showUploadButton?: boolean;
  showTodayOnly?: boolean;
  showOnlyScanner?: string | null;
  onDeleted?: () => void;
}) {
  const [scans, setScans] = useState<ScanWithPhenotyper[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const fetchScans = useCallback(() => {
    getScans(showTodayOnly).then((response: ScanWithPhenotyper[]) =>
      setScans(response)
    );
  }, []);

  useEffect(() => {
    fetchScans();
  }, []);

  useEffect(() => {
    return ipcRenderer.on("electric:scans-updated", fetchScans);
  }, []);

  const numPages = Math.ceil(scans.length / pageSize);

  return (
    <div className="min-h-0 min-w-0 flex-grow flex flex-col items-stretch relative">
      {showUploadButton && <UploadControls />}
      <div className="bg-stone-100 border-b flex flex-row pb-1 text-sm">
        <div className="pr-4">
          <button
            onClick={() => {
              setPageNumber(Math.max(pageNumber - 1, 1));
            }}
          >
            &larr;
          </button>
        </div>
        <div className="pr-4">
          <button
            onClick={() => {
              setPageNumber(Math.min(pageNumber + 1, numPages));
            }}
          >
            &rarr;
          </button>
        </div>
        <div className="pr-4">
          Page{" "}
          <input
            type="text"
            value={pageNumber}
            size={3}
            onChange={(e) => {
              if (e.target.value === "") {
                setPageNumber(1);
              } else {
                const parsedPageNumber = parseInt(e.target.value) || 1;
                const clippedPageNumber = Math.max(
                  1,
                  Math.min(parsedPageNumber, numPages)
                );
                setPageNumber(clippedPageNumber);
              }
            }}
          />{" "}
          of {numPages} ({scans.length} scans)
        </div>
      </div>
      <div className="min-h-0 min-w-0 flex-grow overflow-scroll">
        <table className="rounded-md mb-8">
          <thead>
            <tr>
              <th className="text-xs text-left px-2 pb-4 align-bottom">
                Plant ID
              </th>
              <th className="text-xs text-left px-2 pb-4 align-bottom">Date</th>
              <th className="text-xs text-left px-2 pb-4 align-bottom">
                Phenotyper
              </th>
              <th className="text-xs text-left px-2 pb-4 align-bottom">
                Device
              </th>
              <th className="text-xs text-left px-2 pb-4 align-bottom">
                Exposure
              </th>
              <th className="text-xs text-left px-2 pb-4 align-bottom">Gain</th>
              <th className="text-xs text-left px-2 pb-4 align-bottom text-center">
                Preview
              </th>
              <th className="text-xs text-left px-2 pb-4 align-bottom">
                Upload status
              </th>
              {showTodayOnly && (
                <th className="text-xs text-left px-2 pb-4 align-bottom">
                  Delete
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {scans
              .slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
              .map((scan) => (
                <tr key={scan.id} className="odd:bg-stone-200">
                  <td className="px-2 py-2">
                    {
                      <Link
                        to={`/browse-scans/${scan.id}`}
                        className="text-lime-700 hover:underline"
                      >
                        {scan.plant_id || "No plant QR code"}
                      </Link>
                    }
                  </td>
                  <td className="px-2 py-2">{formatDate(scan.capture_date)}</td>
                  <td className="px-2 py-2">
                    <Phenotyper phenotyper={scan?.phenotyper} />
                  </td>
                  <td className="px-2 py-2">{scan.scanner_name}</td>
                  <td className="px-2 py-2">{scan.exposure_time}</td>
                  <td className="px-2 py-2">{scan.gain}</td>
                  <td>
                    <ScanPreview
                      scan={scan}
                      thumb={true}
                      link={`/browse-scans/${scan.id}`}
                    />
                  </td>
                  <td className="px-2 py-2">
                    <ProgressBar
                      value={
                        scan.images.filter(
                          (image) => image.status == "UPLOADED"
                        ).length
                      }
                      max={scan.images.length}
                    />
                  </td>
                  {showTodayOnly && (
                    <td>
                      <button
                        onClick={() => {
                          console.log(`Deleting scan ${scan.id}`);
                          deleteScan(scan.id).then(() => {
                            onDeleted();
                          });
                        }}
                        className="text-red-700 hover:underline"
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UploadControls() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const upload = useCallback(() => {
    setUploading(true);
    uploadImages()
      .then((response) => {
        setUploadProgress(response);
      })
      .finally(() => {
        setUploading(false);
      });
  }, []);

  return (
    <div className="mb-4">
      <div>
        <button
          onClick={upload}
          className="bg-lime-700 text-white px-4 py-2 rounded-md opacity-80 hover:opacity-100"
          disabled={uploading}
        >
          {uploading ? "Uploading in progress..." : "Start uploading"}
        </button>
        {uploadProgress && (
          <span className="text-stone-400 ml-2">
            {uploadProgress} images uploaded
          </span>
        )}
      </div>
    </div>
  );
}

function Phenotyper({ phenotyper }: { phenotyper: Phenotyper }) {
  return (
    <div>
      <span className="inline-block">{formatName(phenotyper.name)}</span>
      {/* <span className="text-xs font-bold text-stone-400 ml-2 inline-block">
        {phenotyper.email}
      </span> */}
    </div>
  );
}

function formatName(name: string) {
  // Give the name as first name and the first initial of each subsequent name
  const names = name.split(" ");
  return names
    .map((name, index) => (index === 0 ? name : name[0]))
    .join(" ")
    .trim();
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  return (
    <div>
      {value == 0 ? (
        <div className="text-xs">Not uploaded</div>
      ) : // <div className="text-amber-700 text-center">
      //   <svg
      //     xmlns="http://www.w3.org/2000/svg"
      //     fill="none"
      //     viewBox="0 0 24 24"
      //     strokeWidth={1.5}
      //     stroke="currentColor"
      //     className="inline w-6 h-6"
      //   >
      //     <path
      //       strokeLinecap="round"
      //       strokeLinejoin="round"
      //       d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
      //     />
      //     {/* <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l18 18" /> */}
      //     <path
      //       strokeLinecap="round"
      //       strokeLinejoin="round"
      //       d="M10 11v4.5 M13 11v4.5"
      //     />
      //   </svg>
      // </div>
      value < max ? (
        <div className="flex flex-col">
          <div className="text-lime-700 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="inline w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
              />
            </svg>
          </div>

          <div className="h-2 relative max-w-xs rounded-full overflow-hidden">
            <div className="w-full h-full border border-stone-800 absolute z-10 rounded-full"></div>
            <div
              className="h-full bg-lime-400 absolute z-1 rounded-full"
              style={{ width: `${(value / max) * 100}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="text-lime-700 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="inline w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.5 13.75 10.75 16 14.5 10.75"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

function formatDate(date: Date) {
  // Options to configure the output format
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    // hour12: true,
  };

  // Use Intl.DateTimeFormat to format the date according to the options
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
