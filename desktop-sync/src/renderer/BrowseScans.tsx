import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import {
  Electric_cyl_scans,
  Electric_phenotypers,
  Electric_cyl_images,
} from "../generated/client";
import { Database } from "../types/database.types";
import { ScansWithPhenotypers } from "../types/electric.types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { ScanPreview } from "./ScanPreview";
import { getSupabaseClient } from "./util";

const ipcRenderer = window.electron.ipcRenderer;
const getScans = window.electron.scanStore.getScans;
const uploadImages = window.electron.electric.uploadImages;
// const getScansWithEmail = window.electron.scanStore.getScansWithEmail;

export function BrowseScans() {
  const [scans, setScans] = useState<ScansWithPhenotypers[]>([]);
  const [selectedScan, setSelectedScan] = useState<number | null>(null);
  const [supabase, setSupabase] = useState<SupabaseClient<Database> | null>(
    null
  );

  const fetchScans = useCallback(() => {
    getScans().then((response: ScansWithPhenotypers[]) => setScans(response));
  }, []);

  useEffect(() => {
    fetchScans();
  }, []);

  useEffect(() => {
    return ipcRenderer.on("electric:scans-updated", fetchScans);
  }, []);

  useEffect(() => {
    getSupabaseClient().then((client) => {
      setSupabase(client);
    });
  }, []);

  return (
    <div>
      <UploadControls />
      <table className="rounded-md mb-8">
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
            <th className="text-xs text-left px-2 pb-4 align-bottom">Gain</th>
            <th className="text-xs text-left px-2 pb-4 align-bottom">
              Preview
            </th>
            <th className="text-xs text-left px-2 pb-4 align-bottom">Status</th>
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
                <td className="px-2 py-2">{scan.gain}</td>
                <td>
                  <ScanPreview scan={scan} supabase={supabase} thumb={true} />
                </td>
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
        <div className="text-amber-700 text-center">
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
              d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            />
          </svg>
        </div>
      ) : value < max ? (
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
