import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Scans } from "../generated/client/prismaClient";
import { Images, Phenotypers } from "../generated/client";

const getScan = window.electron.scanStore.getScan;
// const getScanWithEmail = window.electron.scanStore.getScanWithEmail;

type ScansWithPhenotypers = Scans & {
  phenotypers: Phenotypers;
  images: Images[];
};

export function ViewScan() {
  const params = useParams();
  const scanId = params.scanId;

  const [scan, setScan] = useState<ScansWithPhenotypers | null>(null);

  useEffect(() => {
    if (!scanId) return;
    getScan(scanId).then((response: ScansWithPhenotypers) => setScan(response));
  }, [scanId]);

  return (
    <div>
      <Link to="/browse-scans" className="text-lime-700 hover:underline">
        &larr; All scans
      </Link>
      {scan ? (
        <div>
          <div className="text-xs mt-2 font-bold">Plant QR Code</div>
          <div>{scan?.plant_qr_code}</div>
          <div className="text-xs mt-2 font-bold">Date</div>
          <div>{scan && formatDate(scan?.capture_date)}</div>
          <div className="text-xs mt-2 font-bold">Phenotyper</div>
          <Phenotyper phenotyper={scan?.phenotypers} />
          <div className="text-xs mt-2 font-bold">Scanner</div>
          <div>{scan?.scanner_id}</div>
          <div className="text-xs mt-2 font-bold">
            Exposure, Gamma, Contrast, Brightness, Gain
          </div>
          <div>
            {scan?.exposure_time}, {scan?.gamma}, {scan?.contrast},{" "}
            {scan?.brightness}, {scan?.gain}
          </div>
          <div className="text-xs mt-2 font-bold">Scan ID</div>
          <div>{scanId}</div>
          <img
            src={"file://" + scan?.images[0].path}
            style={{ width: "500px" }}
            className="rounded-md mt-2"
          />
        </div>
      ) : (
        <span>Loading scan...</span>
      )}
    </div>
  );
}

function Phenotyper({ phenotyper }: { phenotyper: Phenotypers }) {
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
