import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { PersonChooser } from "./PersonChooser";
import { PlantQrCodeTextBox } from "./PlantQrCodeTextBox";

const ipcRenderer = window.electron.ipcRenderer;
const getScanData = window.electron.scanner.getScanData;
const getScannerSettings = window.electron.scanner.getScannerSettings;

export function CaptureScan() {
  const [nImages, setNImages] = useState<number>(0);

  const [images, setImages] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [numCaptured, setNumCaptured] = useState<number>(0);
  const [numSaved, setNumSaved] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const [phenotyperId, setPhenotyperId] = useState<string | null>(null);
  const [plantQrCode, setPlantQrCode] = useState<string | null>(null);

  const pullScanData = useCallback(async () => {
    const scanData = (await getScanData()) as {
      metadata: ScanMetadata;
      progress: ScanProgress;
      scanImages: ScanImages;
    };
    console.log("scanData: " + JSON.stringify(scanData));
    setImages(scanData.scanImages);
    setIsScanning(scanData.progress.status === "capturing");
    setIsSaving(scanData.progress.status === "saving");
    setNumCaptured(scanData.progress.nImagesCaptured);
    setNumSaved(scanData.progress.nImagesSaved);
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

  return (
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
      {phenotyperId === null ? null : (
        <div className="mb-2 text-left">
          <div className="block text-xs font-bold text-gray-700 text-left">
            Plant QR Code
          </div>
          <div className="mt-1">
            <PlantQrCodeTextBox
              plantQrCodeChanged={(qrCode) => setPlantQrCode(qrCode)}
            />
          </div>
        </div>
      )}
      {phenotyperId === null ||
      plantQrCode === null ||
      plantQrCode === "" ? null : (
        <div className="mt-4 mr-4 border-t p-4">
          {
            <div className="">
              <div className="text-center" style={{ width: "500px" }}>
                <button
                  className="rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={(e) => startScan()}
                  disabled={isScanning || isSaving}
                >
                  Start Scan
                </button>
              </div>
            </div>
          }
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
          <div className="m-4">
            <div className="">
              {images.length > 0 ? (
                <img
                  src={"file://" + images[selectedImage].replaceAll("\\", "/")}
                  style={{ width: "500px" }}
                  className="rounded-md"
                />
              ) : (
                <div style={{ width: "500px", height: "250px" }}></div>
              )}
            </div>
          </div>
          <div className="">
            <div className="text-center" style={{ width: "500px" }}>
              <button
                className="rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={(e) => {
                  prevImage();
                }}
              >
                &larr; Prev
              </button>
              &nbsp;
              <button
                className="rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={(e) => {
                  nextImage();
                }}
              >
                Next &rarr;
              </button>
              {images.length > 0 ? (
                <div className="mt-2">
                  <span className="px-4">
                    {selectedImage + 1} / {images.length}
                  </span>
                </div>
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
