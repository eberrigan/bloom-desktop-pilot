import { useCallback, useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import { PersonChooser } from "./PersonChooser";
import { PlantQrCodeTextBox } from "./PlantQrCodeTextBox";
import { parse } from "node:path";
import { BrowseScans } from "./BrowseScans";
import { ExperimentChooser } from "./ExperimentChooser";
import { Streamer } from "./Streamer";
import { set } from "zod";
import { FileUploader } from "react-drag-drop-files";
import * as XLSX from "xlsx";

const getAccesionId = window.electron.electric.getAccessionId;
const setAccessionId = window.electron.scanner.setAccessionId;
const setScannerPlantQrCode = window.electron.scanner.setPlantQrCode;
const getScannerPlantQrCode = window.electron.scanner.getPlantQrCode;

const scanner = window.electron.scanner;

const ipcRenderer = window.electron.ipcRenderer;
const getScanData = window.electron.scanner.getScanData;
const getScannerSettings = window.electron.scanner.getScannerSettings;
const getScansDir = window.electron.scanner.getScansDir;

const getMostRecentScanDate = window.electron.scanStore.getMostRecentScanDate;

const saveCurrentScan = window.electron.scanner.saveCurrentScan;
const resetScanner = window.electron.scanner.resetScanner;
const deleteCurrentScan = window.electron.scanner.deleteCurrentScan;

const getScannerId = window.electron.scanner.getScannerId;

export function CaptureScan() {
  const [nImages, setNImages] = useState<number>(0);

  const [images, setImages] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [numCaptured, setNumCaptured] = useState<number>(0);
  const [numSaved, setNumSaved] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [scansDir, setScansDir] = useState<string | null>(null);

  const [mostRecentScanDate, setMostRecentScanDate] = useState<
    Date | null | undefined
  >(undefined);

  const [phenotyperId, setPhenotyperId] = useState<string | null>(null);
  const [accessionFileId, setAccessonFileId] = useState<string | null>(null);
  const [experimentId, setExperimentId] = useState<string | null>(null);
  const [waveNumber, setWaveNumber] = useState<number | null>(NaN);
  const [plantAgeDays, setPlantAgeDays] = useState<number | null>(NaN);
  const [plantQrCode, setPlantQrCode] = useState<string | null>(null);
  const [scanMetadata, setScanMetadata] = useState<ScanMetadata | null>(null);

  const [scannerId, setScannerId] = useState<string | null>(null);

  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showDeletedMessage, setShowDeletedMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [assgnAccesson, setAccession] = useState<string | null>(null);

  // Excel file preview vars
  const fileTypes = ["XLSX", "XLS"];
  const [excelfile, setFile] = useState(null);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null);
  const [selectedPlantId, setSelectPlantID] = useState<string | null>(null);
  const [selectedGenotypeId, setSelectGenotypeId] = useState<string | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [hoveredColIndex, setHoveredColIndex] = useState<number | null>(null);
  const plantIdIndex = columns.indexOf(selectedPlantId ?? "");
  const genotypeIdIndex = columns.indexOf(selectedGenotypeId ?? "");
  const tableRef = useRef(null);


  const handleChange = (file: File | null): void => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const ab = e.target?.result as ArrayBuffer;
      const workbook = XLSX.read(ab, { type: "array" });

      setSheetNames(workbook.SheetNames);

      const defaultSheet = workbook.SheetNames[0];
      const ws = workbook.Sheets[defaultSheet];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

      setSelectedSheet(defaultSheet);
      setColumns(jsonData[0] as string[]);
      setData(jsonData.slice(1));
    };
    reader.readAsArrayBuffer(file);
  };

  const successfullySaved = async () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const successfullyDeleted = async () => {
    setShowDeletedMessage(true);
    setTimeout(() => {
      setShowDeletedMessage(false);
    }, 3000);
  };

  useEffect(() => {
    return ipcRenderer.on("scanner:scan-error", (error: string) => {
      console.error("scan error: " + error);
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    });
  }, []);

  const pullScanData = useCallback(async () => {
    const scanData = (await getScanData()) as {
      metadata: ScanMetadata | null;
      progress: ScanProgress;
      scanImages: ScanImages;
    };
    console.log("scanData: " + JSON.stringify(scanData));
    console.log("CHECK SCAN DATA");
    setScanMetadata(scanData.metadata);
    setImages(scanData.scanImages);
    setIsScanning(scanData.progress.status === "capturing");
    setIsSaving(scanData.progress.status === "saving");
    setNumCaptured(scanData.progress.nImagesCaptured);
    setNumSaved(scanData.progress.nImagesSaved);
  }, []);

  useEffect(() => {
    getScansDir().then((dir) => {
      setScansDir(dir);
    });
  }, []);

  useEffect(() => {
    getScannerId().then((id) => {
      setScannerId(id);
    });
  }, []);

  useEffect(() => {
    getScannerSettings().then((settings) => {
      setNImages(settings.num_frames);
    });
  }, []);

  useEffect(() => {
    pullScanData();
  }, []);

  useEffect(() => {
    getScannerPlantQrCode().then((qrCode) => {
      setPlantQrCode(qrCode);
      console.log("got qr code from scanner: " + qrCode);
    });
  }, []);

  useEffect(() => {
    fetchAccessionId();
    console.log("current QR code:"+plantQrCode);
  }, [plantQrCode])

  const fetchAccessionId = async () => {
    if (!plantQrCode) return; 
    console.log("QR code set, trying to fetch accession ID...");
    try {
      console.log("Looking for....", plantQrCode, "...and...", experimentId);
      const accessionMapping = await getAccesionId(plantQrCode, experimentId);
      if (accessionMapping) {
        console.log("Found accession:", accessionMapping.accession_id);
        setAccession(accessionMapping.accession_id);
        setAccessionId(accessionMapping.accession_id);
      } else {
        setAccession(null);
        console.log("No accession mapping found for this QR code.");
      }
    } catch (err) {
      setAccession(null);
      console.error("Error fetching accession:", err);
    }
  };

  useEffect(() => {
    return ipcRenderer.on("streamer:streaming-stopped", () => {
      console.log("streaming stopped");
      setIsStreaming(false);
      const name = uuidv4();
      setTimeout(() => {
        if (!isScanning) {
          ipcRenderer.sendMessage("scanner:start-scan", [name]);
        }
      }, 3000);
    });
  }, []);

  useEffect(() => {
    return ipcRenderer.on("scanner:scan-update", pullScanData);
  }, []);

  const startScan = useCallback(() => {
    if (!isScanning) {
      setImages([]);
      setNumCaptured(0);
      setIsSaving(false);
      setIsScanning(true); // -> causes the Streamer not to be rendered, triggering a "streamer:streaming-stopped" event
      setSelectedImage(0);
      // don't send this until we receive the "streamer:streaming-stopped" event
      // const name = uuidv4();
      // ipcRenderer.sendMessage("scanner:start-scan", [name]);
    }
  }, [isScanning]);

  function mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }

  const handleSliderChange = (e: any) => {
    setSelectedImage(parseInt(e.target.value, 10));
  };

  const handleSheetChange = async (sheetName: string) => {
    setSelectedSheet(sheetName);
    const file = (document.querySelector('input[type="file"]') as HTMLInputElement)?.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (event) => {
      const ab = event.target?.result as ArrayBuffer;
      const workbook = XLSX.read(ab, { type: "array" });
      const ws = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
  
      setColumns(jsonData[0] as string[]);
      setData(jsonData.slice(1));
    };
    reader.readAsArrayBuffer(file);
  };

  const handlePlantId = async (plantId: string) => {
    setSelectPlantID(plantId);
  }

  const handleGenotypeId = async (GenotypeId: string) => {
    setSelectGenotypeId(GenotypeId);
  }

  const handleColumnClick = (colName: string) => {
    console.log("Clicked column:", colName);
  };
    
  useEffect(() => {
    if (numSaved === nImages && numSaved > 0) {
      setIsScanning(false);
      setIsSaving(false);
    }
  }, [numSaved]);

  useEffect(() => {
    scanner.getWaveNumber().then((waveNumber) => {
      setWaveNumber(waveNumber);
    });
  }, []);

  useEffect(() => {
    scanner.getPlantAgeDays().then((plantAgeDays) => {
      setPlantAgeDays(plantAgeDays);
    });
  }, []);

  useEffect(() => {
    setMostRecentScanDate(undefined);
    if (experimentId && plantQrCode) {
      getMostRecentScanDate(experimentId, plantQrCode).then((date) => {
        setMostRecentScanDate(date);
      });
    }
  }, [experimentId, plantQrCode]);

  useEffect(() => {
    if (selectedPlantId && selectedGenotypeId && tableRef.current) {
      tableRef.current.scrollTop = 0;
      tableRef.current.scrollLeft = 0;
    }
  }, [selectedPlantId, selectedGenotypeId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (experimentId && plantQrCode) {
        getMostRecentScanDate(experimentId, plantQrCode).then((date) => {
          setMostRecentScanDate(date);
        });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [experimentId, plantQrCode]);

  const scannedToday = mostRecentScanDate
    ? new Date().getDate() === mostRecentScanDate.getDate() &&
      new Date().getMonth() === mostRecentScanDate.getMonth() &&
      new Date().getFullYear() === mostRecentScanDate.getFullYear()
    : false;

  const scanDisabled =
    phenotyperId === null ||
    plantQrCode === null ||
    plantQrCode === "" ||
    experimentId === null ||
    experimentId === "" ||
    Number.isNaN(plantAgeDays) ||
    Number.isNaN(waveNumber) ||
    assgnAccesson === null ||
    isScanning ||
    isSaving ||
    isStreaming ||
    mostRecentScanDate === undefined ||
    scannedToday;

  const streamingDisabled = isScanning || isSaving;

  return (
    <div className="min-h-0 min-w-0 flex flex-col flex-grow pr-8 pb-8">
      <div className="flex flex-row pb-8">
        <div>
          <div className="block text-xs font-bold text-gray-700 text-left mb-1">
            Metadata
          </div>
          <div className="border rounded-md flex flex-col p-4">
            {
              <div className="mb-2 text-left">
                <div className="block text-xs font-bold text-gray-700 text-left">
                  Phenotyper
                </div>
                <div className="mt-1 flex flex-row items-center">
                  <PersonChooser
                    phenotyperIdChanged={(id: string) => setPhenotyperId(id)}
                  />
                  <FieldInfo info="The person operating the scanner. Required field." />
                </div>
              </div>
            }
            {
              <div className="mb-2 text-left">
                <div className="block text-xs font-bold text-gray-700 text-left mt-1">
                  Experiment
                </div>
                <div className="mt-1 flex flex-row items-center">
                  <ExperimentChooser
                    experimentIdChanged={(id: string) => {
                      setExperimentId(id);
                    }}
                  />
                  <FieldInfo info="Name of the experiment. Required field." />
                </div>
                {/* <input
                  type="text"
                  className={
                    "p-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 mt-1 focus:outline-none w-[200px] border border-gray-300"
                  }
                  value={experimentName || ""}
                  onChange={(e) => setExperimentName(e.target.value)}
                /> */}
                {/* <div className="mt-1">
              <select
                className="p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                value={experimentName || ""}
                onChange={(e) => setExperimentName(e.target.value)}
              >
                <option value="" disabled>
                  Select an experiment
                </option>
                {experiments.map((experiment) => (
                  <option key={experiment.id} value={experiment.name}>
                    {experiment.name}
                  </option>
                ))}
              </select>
            </div> */}
              </div>
            }
            {/* {
            <div className="mb-2 text-left">
              <div className="block text-xs font-bold text-gray-700 text-left">
                Accessions
              </div>
              <div className="mt-1 flex flex-row items-center">
                <PersonChooser
                  phenotyperIdChanged={(id: string) => setPhenotyperId(id)}
                />
                <FieldInfo info="Accesions Files, with PlantID(barcode)<->Genotype Mappings. Required Field" />
              </div>
            </div>
            } */}
            {
              <div className="mb-2 text-left">
                <div className="block text-xs font-bold text-gray-700 text-left mt-1">
                  Wave Number
                </div>
                <div className="mt-1">
                  <input
                    type="number"
                    className={
                      "p-2 rounded-md border bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 w-[200px] focus:outline-none" +
                      (waveNumber === null
                        ? " border-amber-300"
                        : " border-gray-300")
                    }
                    value={waveNumber}
                    onChange={(e) => {
                      const value =
                        e.target.value === "" ? null : parseInt(e.target.value);
                      setWaveNumber(value);
                      scanner.setWaveNumber(value);
                    }}
                    min={0}
                  />
                  <FieldInfo info="A group of plants grown at the same time. For experiments with only one such group, the Wave Number is 1. Required field." />
                </div>
              </div>
            }
            {
              <div className="mb-2 text-left">
                <div className="block text-xs font-bold text-gray-700 text-left mt-1">
                  Plant Age (Days)
                </div>
                <div className="mt-1">
                  <input
                    type="number"
                    min={0}
                    className={
                      "p-2 rounded-md border bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 w-[200px] focus:outline-none" +
                      (plantAgeDays === null
                        ? " border-amber-300"
                        : " border-gray-300")
                    }
                    value={plantAgeDays}
                    onChange={(e) => {
                      const value =
                        e.target.value === "" ? null : parseInt(e.target.value);
                      setPlantAgeDays(value);
                      scanner.setPlantAgeDays(value);
                    }}
                  />
                  <FieldInfo info="Number of days after germination that the plants are being scanned. Required field." />
                </div>
              </div>
            }
            {
              <div className="mb-2 text-left">
                <div className="block text-xs font-bold text-gray-700 text-left mt-1">
                  Plant ID
                </div>
                <div className="mt-1">
                  <input
                    type="text"
                    className={
                      "p-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 w-[200px] focus:outline-none border" +
                      (plantQrCode === null
                        ? " border-amber-300"
                        : " border-gray-300")
                    }
                    value={plantQrCode || ""}
                    onChange={(e) => {
                      const value =
                        e.target.value === "" ? null : e.target.value;
                      const qrCode = value ? value.replace(/[^a-zA-Z0-9\+\-\_]/g, "") : null;
                      setPlantQrCode(qrCode);
                      setScannerPlantQrCode(qrCode);
                    }}
                  />
                  <FieldInfo info="Identifier for the plant (QR code or other identifier). Required field." />
                </div>
                {mostRecentScanDate !== undefined && (
                  <div className="block text-xs text-left mt-1">
                    {mostRecentScanDate === null ? (
                      <span className="text-lime-700">New plant</span>
                    ) : scannedToday ? (
                      <>
                        <span className="text-amber-700">
                          Already scanned today
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="">Last scanned:</span>
                        &nbsp;
                        <span className="text-lime-700">
                          {formatDate(mostRecentScanDate)}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            }
            {
              <div className="mb-2 text-left">
                <div className="p-1 text-xs font-bold text-gray-700">
                  <span className="text-lime-700">Accession ID:</span>
                </div>

                <div className="flex items-center justify-between p-1 text-sm text-gray-800">
                  <div>
                    {assgnAccesson ? (
                      <span className="text-lime-700">{assgnAccesson}</span>
                    ) : (
                      <span className="italic text-lime-700">No accession ID found.</span>
                    )}
                  </div>
                  <FieldInfo info="This Accession ID is automatically taken from the file linked to this experiment. If you're unable to start the scan, please make sure the file you submitted earlier includes an Accession ID for the entered Plant QR code." />
                  </div>
              </div>
            }
            {/* {
              <div className="mb-2 text-left">
              <div className="block text-xs font-bold text-gray-700 text-left mt-1 p-1">
                Plant ID ↔ Genotype ID Mapping
                <FieldInfo info="Upload an excel file containing Plant ID to Genotype ID mapping" />
              </div>
              <div className="mt-1">
                <div className="p-1 border rounded-md border-amber-300">
                  <FileUploader 
                  handleChange={handleChange} 
                  name="file" 
                  types={fileTypes} 
                  label="Drag and drop your file here"
                />
                </div>
              </div>
            </div>
            } */}
          </div>
        </div>
        <div className="ml-4 flex flex-col flex-grow">
          <div className="block text-xs font-bold text-gray-700 text-left mb-1">
            Scan
          </div>
          <div className="border rounded-md flex-grow flex flex-col p-4 text-center items-center relative">
            {showSuccessMessage ? (
              <div className="absolute top-0 mx-auto mt-2 bg-amber-100 border border-amber-300 p-2 rounded-md text-amber-700 table">
                Successfully&nbsp;saved&nbsp;scan.
              </div>
            ) : null}
            {showDeletedMessage ? (
              <div className="absolute top-0 mx-auto mt-2 bg-amber-100 border border-amber-300 p-2 rounded-md text-amber-700 table">
                Successfully&nbsp;deleted&nbsp;scan.
              </div>
            ) : null}
            {errorMessage ? (
              <div className="absolute top-0 mx-auto mt-2 bg-red-100 border border-red-300 p-2 rounded-md text-red-700 table">
                {errorMessage}
              </div>
            ) : null}
            {
              <div className="flex-grow flex flex-col">
                <div className="flex-grow text-center flex flex-col ">
                  <div className="my-auto mb-4">
                    <button
                      className={
                        "rounded-md border border-gray-300 px-4 py-2 bg-white text-xl font-medium " +
                        (scanDisabled
                          ? "text-gray-400"
                          : "text-gray-700 hover:bg-gray-50")
                      }
                      onClick={(e) => {
                        startScan();
                      }}
                      disabled={scanDisabled}
                    >
                      Start scan
                    </button>
                    <FieldInfo info="Available after metadata is entered." />
                  </div>
                  {isScanning || isSaving ? (
                    <div className="">
                      <div className="">
                        📷 Scanning... {numCaptured} / {nImages}
                      </div>
                    </div>
                  ) : null}
                  {!streamingDisabled ? (
                    <Streamer />
                  ) : (
                    <div className="flex-grow"></div>
                  )}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      {/* {
        <>
        <div className="block text-xs font-bold text-gray-700 text-left mb-1">
          File Preview
        </div>
        <div className="border rounded-md p-4 flex flex-col min-h-0 min-w-0 overflow-scroll flex-grow">
        {sheetNames.length > 0 && (
        <>
        <h2 className="font-bold text-gray-700 text-xs">Please select the Plant ID and Genotype ID columns from your file.</h2>
        <h2 className="font-bold text-gray-700 text-xs">⚠️ Note: Once selected and uploaded, the Plant ID and Genotype ID columns <strong>cannot</strong> be changed.</h2>
        <div className="mt-4 flex items-center gap-2">
        
          <div className="mt-4 flex items-center gap-2">
            <h2 className="font-bold text-gray-700 text-xs">Select Sheet:</h2>
            <select
              value={selectedSheet ?? ""}
              onChange={(e) => {
                handleSheetChange(e.target.value);
              }}
            >
              {sheetNames.map((sheet) => (
                <option key={sheet} value={sheet}>
                  {sheet}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <h2 className="font-bold text-gray-700 text-xs">Select Plant ID (Barcode) Column:</h2>
            <select
              value={selectedPlantId ?? ""}
              onChange={(e) => {
                handlePlantId(e.target.value);
              }}
            >
              <option value="" disabled>Select...</option> 
              {columns.map((columnsNames) => (
                <option key={columnsNames} value={columnsNames}>
                  {columnsNames}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <h2 className="font-bold text-gray-700 text-xs">Select Genotype ID Column:</h2>
            <select
              value={selectedGenotypeId ?? ""}
              onChange={(e) => {
                handleGenotypeId(e.target.value);
              }}
            >
              <option value="" disabled>Select...</option> 
              {columns.map((columnsNames) => (
                <option key={columnsNames} value={columnsNames}>
                  {columnsNames}
                </option>
              ))}
            </select>
          </div>

        </div>
        </>
      )}

      {columns.length > 0 && (
          <div 
          ref={tableRef}
          className="mt-4 overflow-x-auto">
            <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                {columns.map((col, idx) => {
                  const isPlant = col === selectedPlantId;
                  const isGenotype = col === selectedGenotypeId;

                  return (
                    <th
                      key={idx}
                      className={`px-4 py-2 border text-sm text-left font-medium
                        ${isPlant ? "bg-green-200" : isGenotype ? "bg-blue-200" : ""}
                        ${hoveredColIndex === idx ? "bg-blue-200" : ""}
                      `}
                      onMouseEnter={() => setHoveredColIndex(idx)}
                      onMouseLeave={() => setHoveredColIndex(null)}
                    >
                      {col}
                      {isPlant && <span className="text-xs text-green-700 ml-2">🌱 Plant ID</span>}
                      {isGenotype && <span className="text-xs text-blue-700 ml-2">🏷️ Genotype ID</span>}
                    </th>
                  );
                })}
              </tr>
            </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="even:bg-gray-50">
                    {columns.map((_, colIndex) => {
                      const isPlantIdCol = colIndex === plantIdIndex;
                      const isGenotypeCol = colIndex === genotypeIdIndex;

                      return (
                        <td 
                          key={colIndex}
                          className={`px-4 py-2 border text-sm
                            ${isPlantIdCol ? "bg-green-100" : ""}
                            ${isGenotypeCol ? "bg-blue-100" : ""}
                            ${hoveredColIndex === colIndex ? "bg-blue-200" : ""}
                          `}
                        >
                          {row[colIndex]}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </>

      } */}
      {scannerId && (
        <div className="block text-xs font-bold text-gray-700 text-left mb-1">
          Recent scans
        </div>
      )}
      {scannerId && (
        <div className="border rounded-md p-4 flex flex-col min-h-0 min-w-0 overflow-scroll flex-grow">
          <BrowseScans
            showUploadButton={false}
            showTodayOnly={true}
            showOnlyScanner={scannerId || ""}
            onDeleted={successfullyDeleted}
          />
        </div>
      )}
    </div>
  );
}

export function Scan({ images }: { images: string[] }) {
  return (
    <div>
      <div>Scan</div>
      <div
        className="h-96 overflow-scroll"
        style={{ overflow: "scroll", height: "500px" }}
      >
        {images.map((image) => (
          <div key={image}>
            {image}
            <img
              src={"file://" + image.replaceAll("\\", "/")}
              style={{ width: "200px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function FieldInfo({ info }: { info: string }) {
  return (
    <div className="-mt-1 ml-2 inline-block group relative">
      <div className="absolute bg-white border border-gray-300 p-2 rounded-md text-xs w-48 mt-1 font-normal hidden group-hover:block z-10 left-8">
        {info}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 inline-block z-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
        />
      </svg>
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
