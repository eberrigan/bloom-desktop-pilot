import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { PersonChooser } from "./PersonChooser";
import { PlantQrCodeTextBox } from "./PlantQrCodeTextBox";
import { parse } from "node:path";
import { BrowseScans } from "./BrowseScans";
import { ExperimentChooser } from "./ExperimentChooser";

const setScannerPlantQrCode = window.electron.scanner.setPlantQrCode;
const getScannerPlantQrCode = window.electron.scanner.getPlantQrCode;

const scanner = window.electron.scanner;

const ipcRenderer = window.electron.ipcRenderer;
const getScanData = window.electron.scanner.getScanData;
const getScannerSettings = window.electron.scanner.getScannerSettings;
const getScansDir = window.electron.scanner.getScansDir;

const saveCurrentScan = window.electron.scanner.saveCurrentScan;
const deleteCurrentScan = window.electron.scanner.deleteCurrentScan;

const getScannerId = window.electron.scanner.getScannerId;

export function CaptureScan() {
  const [nImages, setNImages] = useState<number>(0);

  const [images, setImages] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [numCaptured, setNumCaptured] = useState<number>(0);
  const [numSaved, setNumSaved] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [scansDir, setScansDir] = useState<string | null>(null);

  const [phenotyperId, setPhenotyperId] = useState<string | null>(null);
  const [experimentId, setExperimentId] = useState<string | null>(null);
  const [waveNumber, setWaveNumber] = useState<number | null>(NaN);
  const [plantAgeDays, setPlantAgeDays] = useState<number | null>(NaN);
  const [plantQrCode, setPlantQrCode] = useState<string | null>(null);
  const [scanMetadata, setScanMetadata] = useState<ScanMetadata | null>(null);

  const [scannerId, setScannerId] = useState<string | null>(null);

  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const successfullySaved = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const pullScanData = useCallback(async () => {
    const scanData = (await getScanData()) as {
      metadata: ScanMetadata | null;
      progress: ScanProgress;
      scanImages: ScanImages;
    };
    console.log("scanData: " + JSON.stringify(scanData));
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
    return ipcRenderer.on("scanner:scan-update", pullScanData);
  }, []);

  const startScan = useCallback(() => {
    if (!isScanning) {
      const name = uuidv4();
      setImages([]);
      setNumCaptured(0);
      setIsSaving(false);
      setIsScanning(true);
      setSelectedImage(0);
      ipcRenderer.sendMessage("scanner:start-scan", [name]);
    }
  }, [isScanning]);

  function mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }

  const handleSliderChange = (e: any) => {
    setSelectedImage(parseInt(e.target.value, 10));
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

  const scanDisabled =
    phenotyperId === null ||
    plantQrCode === null ||
    plantQrCode === "" ||
    experimentId === null ||
    experimentId === "" ||
    Number.isNaN(plantAgeDays) ||
    Number.isNaN(waveNumber) ||
    isScanning ||
    isSaving;

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
            {
              <div className="mb-2 text-left">
                <div className="block text-xs font-bold text-gray-700 text-left mt-1">
                  Wave Number
                </div>
                <div className="mt-1">
                  <input
                    type="number"
                    className="p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 w-[200px] focus:outline-none"
                    value={waveNumber}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setWaveNumber(value);
                      scanner.setWaveNumber(value);
                    }}
                  />
                  <FieldInfo info="Some experiments involve several waves of plants grown at different times. Optional field." />
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
                      "p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 w-[200px] focus:outline-none border border-gray-300"
                    }
                    value={plantAgeDays}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
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
                      "p-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 w-[200px] focus:outline-none border border-gray-300"
                    }
                    value={plantQrCode || ""}
                    onChange={(e) => {
                      const qrCode = e.target.value.replace(
                        /[^a-zA-Z0-9\+\-\_]/g,
                        ""
                      );
                      setPlantQrCode(qrCode);
                      setScannerPlantQrCode(qrCode);
                    }}
                  />
                  <FieldInfo info="Identifier for the plant (QR code or other identifier). Required field." />
                </div>
              </div>
            }
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
            {scanMetadata === null ? (
              <div className="flex-grow flex flex-col">
                <div className="flex-grow text-center flex flex-col ">
                  <div className="my-auto">
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
                </div>
              </div>
            ) : !(isScanning || isSaving) ? (
              <div className="flex-grow flex flex-col">
                <div className="flex-grow flex flex-col">
                  <div>
                    {/* button for saving current scan */}
                    <button
                      className={
                        "rounded-md border border-gray-300 px-4 py-2 text-sm font-medium mr-2 text-green-700 bg-green-100 hover:bg-green-200"
                      }
                      onClick={(e) => {
                        saveCurrentScan().then(() => {
                          successfullySaved();
                          deleteCurrentScan();
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 -mt-1 mr-1 inline"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      Save
                    </button>
                    {/* button for deleting current scan */}
                    <button
                      className={
                        "rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200"
                      }
                      onClick={(e) => deleteCurrentScan()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 -mt-1 mr-1 inline"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            {isScanning || isSaving ? (
              <div className="">
                <div className="">
                  📷 Scanning... {numCaptured} / {nImages}
                </div>
              </div>
            ) : null}
            {/* {isSaving ? (
              <div className="">
                <div className="">
                  💾 Saving... {numSaved} / {nImages}
                </div>
              </div>
            ) : null} */}
            {images.length > 0 && scansDir !== null ? (
              <div className="m-4 relative">
                <div className="absolute top-1 right-1 z-10 rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 select-none">
                  {scanMetadata.plant_qr_code}
                </div>
                <img
                  src={`file://${scansDir}/${images[selectedImage].replaceAll(
                    "\\",
                    "/"
                  )}`}
                  className="rounded-md z-0"
                />
              </div>
            ) : // <div style={{ width: "500px", height: "250px" }}></div>
            null}
            {images.length > 0 ? (
              <div className="text-center">
                <input
                  type="range"
                  min="0"
                  max={images.length - 1}
                  value={selectedImage}
                  onChange={handleSliderChange}
                  className="w-[200px] cursor-ew-resize"
                />
                {/* <div className="mt-2">
                  <span className="px-4">
                    {selectedImage + 1} / {images.length}
                  </span>
                </div> */}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {scannerId && (
        <div className="block text-xs font-bold text-gray-700 text-left mb-1">
          Recent scans
        </div>
      )}
      {scannerId && (
        <div className="border rounded-md p-4 flex flex-col min-h-0 min-w-0 overflow-scroll flex-grow">
          <BrowseScans showUploadButton={false} showTodayOnly={true} />
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
