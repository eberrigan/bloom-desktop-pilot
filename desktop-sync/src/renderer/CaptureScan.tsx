import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { PersonChooser } from "./PersonChooser";
import { PlantQrCodeTextBox } from "./PlantQrCodeTextBox";
import { parse } from "node:path";

const setScannerPlantQrCode = window.electron.scanner.setPlantQrCode;
const getScannerPlantQrCode = window.electron.scanner.getPlantQrCode;

const ipcRenderer = window.electron.ipcRenderer;
const getScanData = window.electron.scanner.getScanData;
const getScannerSettings = window.electron.scanner.getScannerSettings;
const getScansDir = window.electron.scanner.getScansDir;

const saveCurrentScan = window.electron.scanner.saveCurrentScan;
const deleteCurrentScan = window.electron.scanner.deleteCurrentScan;

const experiments = [
  {
    name: "Arabidopsis Root Absorbance",
    id: "abcdefg",
    plants: 10,
    species: "Arabidopsis",
  },
  {
    name: "Soy Diversity Screen",
    id: "hijklmn",
    plants: 20,
    species: "Soybean",
  },
  {
    name: "Canola Root Depth Screen",
    id: "opqrstu",
    plants: 30,
    species: "Canola",
  },
];

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
  const [experimentName, setExperimentName] = useState<string | null>(null);
  const [waveNumber, setWaveNumber] = useState<number | null>(null);
  const [plantAgeDays, setPlantAgeDays] = useState<number | null>(null);
  const [plantQrCode, setPlantQrCode] = useState<string | null>(null);
  const [scanMetadata, setScanMetadata] = useState<ScanMetadata | null>(null);

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

  const nextImage = () => {
    if (images.length === 0) {
      return;
    }
    const nextIndex = mod(selectedImage + 1, images.length);
    setSelectedImage(nextIndex);
  };

  const prevImage = () => {
    if (images.length === 0) {
      return;
    }
    const nextIndex = mod(selectedImage - 1, images.length);
    setSelectedImage(nextIndex);
  };

  useEffect(() => {
    if (numSaved === nImages) {
      setScannerPlantQrCode("");
      setPlantQrCode("");
      setIsScanning(false);
      setIsSaving(false);
    }
  }, [numSaved]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        {
          <div className="mb-2 text-left">
            <div className="block text-xs font-bold text-gray-700 text-left">
              Phenotyper
            </div>
            <div className="mt-1">
              <PersonChooser
                phenotyperIdChanged={(id: string) => setPhenotyperId(id)}
              />
            </div>
          </div>
        }
        {
          <div className="mb-2 text-left">
            <div className="block text-xs font-bold text-gray-700 text-left mt-1">
              Experiment
            </div>
            <input
              type="text"
              className={
                "p-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 mt-1 focus:outline-none" +
                (experimentName === null || experimentName === ""
                  ? " border border-gray-300"
                  : // ? " border border-red-500"
                    " border border-gray-300 ")
              }
              value={experimentName || ""}
              onChange={(e) => setExperimentName(e.target.value)}
            />
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
                className="p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                value={waveNumber}
                onChange={(e) => setWaveNumber(parseInt(e.target.value))}
              />
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
                className={
                  "p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" +
                  (plantAgeDays === null
                    ? " border border-gray-300"
                    : // ? " border border-red-500"
                      " border border-gray-300 ")
                }
                value={plantAgeDays}
                onChange={(e) => setPlantAgeDays(parseInt(e.target.value))}
              />
            </div>
          </div>
        }
        {
          <div className="mb-2 text-left">
            <div className="block text-xs font-bold text-gray-700 text-left mt-1">
              Plant QR Code
            </div>
            <div className="mt-1">
              <input
                type="text"
                className={
                  "p-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" +
                  (plantQrCode === null || plantQrCode === ""
                    ? " border border-red-500"
                    : " border border-gray-300 ")
                }
                value={plantQrCode || ""}
                onChange={(e) => {
                  const qrCode = e.target.value;
                  setPlantQrCode(qrCode);
                  setScannerPlantQrCode(qrCode);
                }}
              />
            </div>
          </div>
        }
      </div>
      {phenotyperId === null ? null : (
        <div className="ml-8 border-l px-8">
          {
            <div className="">
              <div className="text-center" style={{ width: "500px" }}>
                {scanMetadata === null ? (
                  <button
                    className={
                      "rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium " +
                      (plantQrCode === null || plantQrCode === ""
                        ? "text-gray-400"
                        : "text-gray-700 hover:bg-gray-50")
                    }
                    onClick={(e) => startScan()}
                    disabled={
                      plantQrCode === null ||
                      plantQrCode === "" ||
                      isScanning ||
                      isSaving
                    }
                  >
                    Start Scan
                  </button>
                ) : !(isScanning || isSaving) ? (
                  <div>
                    {/* button for saving current scan */}
                    <button
                      className={
                        "rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 mr-2"
                      }
                      onClick={(e) => {
                        saveCurrentScan();
                        deleteCurrentScan();
                      }}
                    >
                      Save
                    </button>
                    {/* button for deleting current scan */}
                    <button
                      className={
                        "rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                      }
                      onClick={(e) => deleteCurrentScan()}
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          }
          <div className="text-center">
            {isScanning ? (
              <div className="">
                <div className="">
                  📷 Scanning... {numCaptured} / {nImages}
                </div>
              </div>
            ) : null}
            {isSaving ? (
              <div className="">
                <div className="" style={{ width: "500px" }}>
                  💾 Saving... {numSaved} / {nImages}
                </div>
              </div>
            ) : null}
          </div>
          <div className="m-4">
            <div className="">
              {images.length > 0 && scansDir !== null ? (
                <img
                  src={`file://${scansDir}/${images[selectedImage].replaceAll(
                    "\\",
                    "/"
                  )}`}
                  style={{ width: "500px" }}
                  className="rounded-md"
                />
              ) : (
                <div style={{ width: "500px", height: "250px" }}></div>
              )}
            </div>
          </div>
          <div className="">
            <div className="text-center w-[500px]">
              {images.length > 0 ? (
                <>
                  <input
                    type="range"
                    min="0"
                    max={images.length - 1}
                    value={selectedImage}
                    onChange={handleSliderChange}
                    className="w-[200px]"
                  />
                  <div className="mt-2">
                    <span className="px-4">
                      {selectedImage + 1} / {images.length}
                    </span>
                  </div>
                </>
              ) : null}
            </div>
          </div>
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
