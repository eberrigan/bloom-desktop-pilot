import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { Scans, Phenotypers } from "../generated/client";

const ipcRenderer = window.electron.ipcRenderer;
const getScans = window.electron.scanStore.getScans;
// const getScansWithEmail = window.electron.scanStore.getScansWithEmail;

type ScansWithPhenotypers = Scans & {
  phenotypers: Phenotypers;
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
                  <Phenotyper phenotyper={scan?.phenotypers} />
                </td>
                <td className="px-2 py-2">{scan.scanner_id}</td>
                <td className="px-2 py-2">{scan.exposure_time}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

function Phenotyper({ phenotyper }: { phenotyper: Phenotypers }) {
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
