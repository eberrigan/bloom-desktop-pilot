import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { Scans, Phenotypers } from "../generated/client";

const getScans = window.electron.scanStore.getScans;
// const getScansWithEmail = window.electron.scanStore.getScansWithEmail;

type ScansWithPhenotypers = Scans & {
  phenotypers: Phenotypers;
};

export function BrowseScans() {
  const [scans, setScans] = useState<ScansWithPhenotypers[]>([]);
  const [selectedScan, setSelectedScan] = useState<number | null>(null);
  useEffect(() => {
    getScans().then((response: ScansWithPhenotypers[]) => setScans(response));
  }, []);
  return (
    <div>
      <table className="rounded-md">
        <thead>
          <tr>
            <th className="text-xs text-left px-2 pb-4 align-bottom">
              Plant QR Code
            </th>
            <th className="text-xs text-left px-2 pb-4 align-bottom">Date</th>
            <th className="text-xs text-left px-2 pb-4 align-bottom">
              Person Email
            </th>
            <th className="text-xs text-left px-2 pb-4 align-bottom">
              Number <br /> of Frames
            </th>
            <th className="text-xs text-left px-2 pb-4 align-bottom">
              Exposure
            </th>
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
                <td className="px-2 py-2">{scan.phenotypers.email}</td>
                <td className="px-2 py-2">{scan.num_frames}</td>
                <td className="px-2 py-2">{scan.exposure_time}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

function formatDate(date: Date) {
  // Options to configure the output format
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  // Use Intl.DateTimeFormat to format the date according to the options
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
