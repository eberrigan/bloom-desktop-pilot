import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ScanPreview } from "./ScanPreview";
import { Phenotyper, Scan } from "@prisma/client";
import { ScanWithPhenotyper } from "../types/electric.types";

const getScan = window.electron.scanStore.getScan;
// const getScanWithEmail = window.electron.scanStore.getScanWithEmail;

export function ViewScan() {
  const params = useParams();
  const scanId = params.scanId;

  const [scan, setScan] = useState<ScanWithPhenotyper | null>(null);

  let navigate = useNavigate();

  function goBack() {
    navigate(-1); // Equivalent to history.goBack()
  }

  useEffect(() => {
    if (!scanId) return;
    getScan(scanId).then((response: ScanWithPhenotyper) => setScan(response));
  }, [scanId]);

  return (
    <div>
      <div
        onClick={goBack}
        className="cursor-pointer text-lime-700 hover:underline inline-block"
      >
        &larr; Back
      </div>
      {scan ? (
        <div>
          <div className="py-2">
            <ScanPreview scan={scan} thumb={false} link={null} />
          </div>
          <div className="text-xs mt-2 font-bold">Plant QR Code</div>
          <div>{scan?.plant_id}</div>
          <div className="text-xs mt-2 font-bold">Accession ID</div>
          <div>{scan?.accession_id}</div>
          <div className="text-xs mt-2 font-bold">Date</div>
          <div>{scan && formatDate(scan?.capture_date)}</div>
          <div className="text-xs mt-2 font-bold">Phenotyper</div>
          <Phenotyper phenotyper={scan?.phenotyper} />
          <div className="text-xs mt-2 font-bold">Scanner</div>
          <div>{scan?.scanner_name}</div>
          <div className="text-xs mt-2 font-bold">
            Exposure, Gamma, Contrast, Brightness, Gain
          </div>
          <div>
            {scan?.exposure_time}, {scan?.gamma}, {scan?.contrast},{" "}
            {scan?.brightness}, {scan?.gain}
          </div>
          <div className="text-xs mt-2 font-bold">Scan ID</div>
          <div className="mb-8">{scanId}</div>
        </div>
      ) : (
        <span>Loading scan...</span>
      )}
    </div>
  );
}

function Phenotyper({ phenotyper }: { phenotyper: Phenotyper }) {
  return (
    <div>
      {phenotyper.name} ({phenotyper.email})
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
