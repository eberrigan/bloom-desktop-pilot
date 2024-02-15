import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

// const getScans = window.electron.scanStore.getScans;
const getScansWithEmail = window.electron.scanStore.getScansWithEmail;

export function BrowseScans() {
  const [scans, setScans] = useState<ScanWithEmail[]>([]);
  const [selectedScan, setSelectedScan] = useState<number | null>(null);
  useEffect(() => {
    getScansWithEmail().then((response: ScanWithEmail[]) => setScans(response));
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
          {scans.map((scan) => (
            <tr key={scan.metadata.scanId} className="odd:bg-stone-200">
              <td className="px-2 py-2">
                {
                  <Link
                    to={`/browse-scans/${scan.metadata.scanId}`}
                    className="text-lime-700 hover:underline"
                  >
                    {scan.metadata.plantQrCode || 'No plant QR code'}
                  </Link>
                }
              </td>
              <td className="px-2 py-2">
                {formatDateString(scan.metadata.date)}
              </td>
              <td className="px-2 py-2">{scan.metadata.personEmail}</td>
              <td className="px-2 py-2">{scan.metadata.numFrames}</td>
              <td className="px-2 py-2">{scan.metadata.exposureTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatDateString(dateString: string) {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Options to configure the output format
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };

  // Use Intl.DateTimeFormat to format the date according to the options
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
