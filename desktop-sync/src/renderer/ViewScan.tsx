import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { Electric_cyl_scans } from "../generated/client/prismaClient";
import {
  Electric_cyl_scans,
  Electric_cyl_images,
  Electric_phenotypers,
} from "../generated/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";
import { getSupabaseClient } from "./util";
import { ScanPreview } from "./ScanPreview";

const getScan = window.electron.scanStore.getScan;
// const getScanWithEmail = window.electron.scanStore.getScanWithEmail;

type ScansWithPhenotypers = Electric_cyl_scans & {
  electric_phenotypers: Electric_phenotypers;
  electric_cyl_images: Electric_cyl_images[];
};

export function ViewScan() {
  const params = useParams();
  const scanId = params.scanId;

  const [scan, setScan] = useState<ScansWithPhenotypers | null>(null);
  const [supabase, setSupabase] = useState<SupabaseClient<Database> | null>(
    null
  );

  useEffect(() => {
    getSupabaseClient().then((client) => {
      setSupabase(client);
    });
  }, []);

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
          <div className="py-2">
            <ScanPreview
              scan={scan}
              supabase={supabase}
              thumb={false}
              link={null}
            />
          </div>
          <div className="text-xs mt-2 font-bold">Plant QR Code</div>
          <div>{scan?.plant_qr_code}</div>
          <div className="text-xs mt-2 font-bold">Date</div>
          <div>{scan && formatDate(scan?.capture_date)}</div>
          <div className="text-xs mt-2 font-bold">Phenotyper</div>
          <Phenotyper phenotyper={scan?.electric_phenotypers} />
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
          <div className="mb-8">{scanId}</div>
        </div>
      ) : (
        <span>Loading scan...</span>
      )}
    </div>
  );
}

function Phenotyper({ phenotyper }: { phenotyper: Electric_phenotypers }) {
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
