import React, { useCallback, useEffect, useState } from "react";
import {
  Electric_cyl_experiments,
  Electric_cyl_scans,
  Electric_phenotypers,
} from "../generated/client";
import { date } from "zod";

const electric = window.electron.electric;
const fs = window.electron.fs;
const getScannerId = window.electron.scanner.getScannerId;

type ScansWithPhenotypers = Electric_cyl_scans & {
  electric_phenotypers: Electric_phenotypers;
};

type ExperimentWithScans = Electric_cyl_experiments & {
  electric_cyl_scans: ScansWithPhenotypers[];
};

type ExperimentDateSelected = {
  [key: string]: boolean;
};

type ExperimentDateScans = {
  [key: string]: ScansWithPhenotypers[];
};

export function Export() {
  const [experiments, setExperiments] = useState<ExperimentWithScans[] | null>(
    null
  );
  const [selectedExpDates, setSelectedExpDates] = useState<any | null>(null);

  const [selectedExpScans, setSelectedExpScans] = useState<any | null>(null);

  const [targetDir, setTargetDir] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const [showExportedMessage, setShowExportedMessage] = useState(false);
  const [scannerId, setScannerId] = useState<string | null>(null);

  const successfullyExported = () => {
    setShowExportedMessage(true);
    setTimeout(() => {
      setShowExportedMessage(false);
    }, 3000);
  };

  useEffect(() => {
    getScannerId().then((id) => {
      setScannerId(id);
    });
  }, []);

  useEffect(() => {
    electric
      .getExperimentsWithScans()
      .then((response) => {
        const experiments = response as any[];
        setExperiments(experiments);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (!experiments || !scannerId) {
      return;
    }
    const newSelectedMap: any = {};
    const newScans: any = {};
    experiments.forEach((experiment) => {
      const dates = getDates(experiment, scannerId);
      dates.forEach((date: number) => {
        const scans = getScansForDate(experiment, date, scannerId);
        const key = getKey(experiment, date);
        newSelectedMap[key] = false;
        newScans[key] = scans;
      });
    });
    setSelectedExpDates(newSelectedMap);
    setSelectedExpScans(newScans);
  }, [experiments]);

  const selectedScans = Object.keys(selectedExpDates || {})
    .filter((key) => selectedExpDates[key])
    .map((key) => selectedExpScans![key])
    .reduce((acc, val) => acc.concat(val), []);

  const numSelected = selectedScans.length;

  const exportDisabled = !targetDir || numSelected === 0 || exporting;

  const onProgress = useCallback(
    (progress: number) => {
      console.log("Progress", progress);
    },
    [exporting]
  );

  return (
    <div className="">
      {/* target directory */}
      <div className="mt-8">
        <div className="text-xs font-bold mt-4">Target directory</div>
        <div className="flex flex-row">
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 mt-1 block w-[400px]"
            value={targetDir || ""}
            readOnly
          />
          <button
            className="mt-2 bg-lime-700 text-white px-4 py-2 ml-2 rounded-md opacity-80 hover:opacity-100"
            onClick={() => {
              fs.pickDir().then((dir: string | null) => {
                console.log(dir);
                setTargetDir(dir);
              });
            }}
          >
            Select directory
          </button>
        </div>
      </div>
      <div className="block text-xs font-bold text-gray-700 text-left mb-1  mt-8">
        Experiments
      </div>
      <div className="border rounded-md flex flex-col p-4">
        {experiments && scannerId && (
          <div>
            {experiments.map((experiment, i) => (
              <div key={experiment.id} className={i !== 0 ? " mt-4" : ""}>
                <div className="">{experiment.name}</div>
                {getDates(experiment, scannerId).map((date: number) => (
                  <div className="pl-4 flex items-center mt-2" key={date}>
                    <div>
                      {selectedExpDates && (
                        <input
                          type="checkbox"
                          checked={selectedExpDates[getKey(experiment, date)]}
                          onChange={(e) => {
                            const newScansMap = { ...selectedExpDates };
                            newScansMap[getKey(experiment, date)] =
                              e.target.checked;
                            setSelectedExpDates(newScansMap);
                          }}
                        />
                      )}
                    </div>
                    <div className="ml-2">
                      {formatDate(new Date(date))}&nbsp;(
                      {dateLabel(
                        getScansForDate(experiment, date, scannerId).length
                      )}
                      )
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-1 text-xs font-bold text-gray-700 text-left">
        {numSelected} scan{numSelected === 1 ? "" : "s"} selected
      </div>

      <button
        className={
          "mt-8 bg-lime-700 text-white px-4 py-2 rounded-md" +
          (exportDisabled
            ? " opacity-50 cursor-not-allowed"
            : " opacity-80 hover:opacity-100")
        }
        disabled={exportDisabled}
        onClick={() => {
          if (!targetDir) {
            return;
          }
          setExporting(true);
          const paths = selectedScans.map((scan: any) => scan.path);
          fs.copyScans(paths, targetDir).then(() => {
            setExporting(false);
            successfullyExported();
          });
        }}
      >
        {exporting
          ? "Exporting " +
            numSelected +
            " scan" +
            (numSelected === 1 ? "" : "s") +
            "..."
          : "Export " + numSelected + " scan" + (numSelected === 1 ? "" : "s")}
      </button>
      {showExportedMessage && (
        <div className="absolute top-0 mx-auto mt-2 bg-amber-100 border border-amber-300 p-2 rounded-md text-amber-700 table">
          Successfully&nbsp;exported&nbsp;scans.
        </div>
      )}
    </div>
  );
}

function getScansForDate(experiment: any, date: number, scannerId: string) {
  return experiment.electric_cyl_scans
    .filter((scan: any) => !scan.deleted)
    .filter((scan: any) => scan.scanner_id === scannerId)
    .filter((scan: any) => {
      const d = new Date(scan.capture_date);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === date;
    });
}

function dateLabel(count: number) {
  return count === 1 ? "1 scan" : `${count} scans`;
}

function getDates(experiment: any, scannerId: string) {
  if (!experiment.electric_cyl_scans) {
    return [];
  }
  const s = new Set(
    experiment.electric_cyl_scans
      .filter((scan: any) => !scan.deleted)
      .filter((scan: any) => scan.scanner_id === scannerId)
      .map((scan: any) => {
        // ignore the time part of the date
        const d = new Date(scan.capture_date);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      })
  );
  return Array.from(s);
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

function getKey(experiment: any, date: number) {
  const formattedDate = formatDate(new Date(date)).replace(/ /g, "-");
  const key = `${experiment.id}-${formattedDate}`;
  return key;
}
