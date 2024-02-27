import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import {
  Electric_cyl_scans,
  Electric_phenotypers,
  Electric_cyl_images,
} from "../generated/client";

const ipcRenderer = window.electron.ipcRenderer;
const getScans = window.electron.scanStore.getScans;
const uploadImages = window.electron.electric.uploadImages;
// const getScansWithEmail = window.electron.scanStore.getScansWithEmail;

type ScansWithPhenotypers = Electric_cyl_scans & {
  electric_phenotypers: Electric_phenotypers;
  electric_cyl_images: Electric_cyl_images[];
};

export function BrowseScans() {
  const [scans, setScans] = useState<ScansWithPhenotypers[]>([]);
  const [selectedScan, setSelectedScan] = useState<number | null>(null);

  const fetchScans = useCallback(() => {
    getScans().then((response: ScansWithPhenotypers[]) => setScans(response));
  }, []);

  useEffect(() => {
    fetchScans();
  }, []);

  useEffect(() => {
    return ipcRenderer.on("electric:scans-updated", fetchScans);
  }, []);

  return (
    <div>
      <UploadControls />
      <table className="rounded-md">
        <thead>
          <tr>
            <th className="text-xs text-left px-2 pb-4 align-bottom">
              Plant QR Code
            </th>
            <th className="text-xs text-left px-2 pb-4 align-bottom">Date</th>
            <th className="text-xs text-left px-2 pb-4 align-bottom">
              Phenotyper
            </th>
            <th className="text-xs text-left px-2 pb-4 align-bottom">Device</th>
            <th className="text-xs text-left px-2 pb-4 align-bottom">
              Exposure
            </th>
            <th className="text-xs text-left px-2 pb-4 align-bottom">Upload</th>
          </tr>
        </thead>
        <tbody>
          {scans
            .sort((a, b) => a.capture_date.getTime() - b.capture_date.getTime())
            .reverse()
            .map((scan) => (
              <tr key={scan.id} className="odd:bg-stone-200">
                <td className="px-2 py-2">
                  {
                    <Link
                      to={`/browse-scans/${scan.id}`}
                      className="text-lime-700 hover:underline"
                    >
                      {scan.plant_qr_code || "No plant QR code"}
                    </Link>
                  }
                </td>
                <td className="px-2 py-2">{formatDate(scan.capture_date)}</td>
                <td className="px-2 py-2">
                  <Phenotyper phenotyper={scan?.electric_phenotypers} />
                </td>
                <td className="px-2 py-2">{scan.scanner_id}</td>
                <td className="px-2 py-2">{scan.exposure_time}</td>
                <td className="px-2 py-2">
                  <ProgressBar
                    value={
                      scan.electric_cyl_images.filter(
                        (image) => image.status == "UPLOADED"
                      ).length
                    }
                    max={scan.electric_cyl_images.length}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
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
          className="bg-stone-400 text-white px-4 py-2 rounded-md"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
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

function Phenotyper({ phenotyper }: { phenotyper: Electric_phenotypers }) {
  return (
    <div>
      <span className="inline-block">{formatName(phenotyper.name)}</span>
      <span className="text-xs font-bold text-stone-400 ml-2 inline-block">
        {phenotyper.email}
      </span>
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
        <span></span>
      ) : value < max ? (
        <div className="h-2 relative max-w-xs rounded-full overflow-hidden">
          <div className="w-full h-full border border-stone-800 absolute z-10 rounded-full"></div>
          <div
            className="h-full bg-lime-400 absolute z-1 rounded-full"
            style={{ width: `${(value / max) * 100}%` }}
          ></div>
        </div>
      ) : (
        <div className="text-lime-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="inline w-4 h-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
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
