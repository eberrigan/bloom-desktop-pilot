import path from "path";
import { v4 as uuidv4 } from "uuid";
import { spawn } from "node:child_process";

import { Electric_cyl_scans } from "../generated/client";

const numFrames = 72;

class Scanner {
  private scanId: string | null = null;
  private phenotyperId: string | null = null;
  private scanPath: string | null = null;
  private scanPartialPath: string | null = null;
  private plantQrCode: string | null = null;
  private python: string;
  private capture_scan_py: string;
  private scans_dir: string;
  private scanner_id: string;
  private scanMetadata: ScanMetadata | null = null;
  private scanProgress: ScanProgress | null = defaultProgress();
  private images: ScanImages = [];
  private cameraSettings: CameraSettings = defaultCameraSettings();
  private cameraIpAddress: string;
  private captureDate: Date | null = null;

  public onScanUpdate: () => void = () => {};
  public onScanComplete: (scan: Scan) => void = () => {};

  constructor(config: ScannerConfig, onScanUpdate: () => void = () => {}) {
    this.onScanUpdate = onScanUpdate;
    this.python = config.python;
    this.capture_scan_py = config.capture_scan_py;
    this.scans_dir = config.scans_dir;
    this.scanner_id = config.scanner_id;
    this.cameraIpAddress = config.camera_ip_address;
  }

  startScan = (options: {
    onCaptureImage: () => void;
    onImageSaved: (imagePath: string) => void;
  }) => {
    this.images = [];

    this.scanId = uuidv4();
    this.captureDate = new Date();
    // get the date in the format YYYY-MM-DD in the local timezone
    this.scanPartialPath = path.join(
      getLocalDateInYYYYMMDD(this.captureDate),
      this.scanId
    );
    this.scanPath = path.join(this.scans_dir, this.scanPartialPath);

    this.captureMetadata();
    this.resetProgress();

    console.log(
      `calling: ${this.python} ${this.capture_scan_py} ${
        this.scanPath
      } ${JSON.stringify(this.cameraSettings)}`
    );

    const grab_frames = spawn(this.python, [
      this.capture_scan_py,
      this.scanPath,
      JSON.stringify({
        ...this.cameraSettings,
        camera_ip_address: this.cameraIpAddress,
      }),
    ]);

    grab_frames.stdout.on("data", (data) => {
      console.log("JS received data from python");
      const str = data.toString();
      console.log(str);
      if (str.slice(0, 14) === "TRIGGER_CAMERA") {
        console.log("data matches TRIGGER_CAMERA");
        options.onCaptureImage();
        this.imageCaptured();
      }
      if (str.slice(0, 10) === "IMAGE_PATH") {
        console.log("data matches IMAGE_PATH");
        const imagePath = str.slice(11).trim();
        const imagePartialPath = path.join(this.scanPartialPath, imagePath);
        options.onImageSaved(imagePartialPath);
        this.imageSaved(imagePartialPath);
      }
    });

    grab_frames.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });
  };

  getCameraSettings = () => {
    return this.cameraSettings;
  };

  setCameraSettings = (settings: CameraSettings) => {
    this.cameraSettings = settings;
  };

  getScannerId = () => {
    return this.scanner_id;
  };

  getScansDir = () => {
    return this.scans_dir;
  };

  getPhenotyperId = () => {
    return this.phenotyperId;
  };

  setPhenotyperId = (phenotyperId: string | null) => {
    this.phenotyperId = phenotyperId;
  };

  getPlantQrCode = () => {
    return this.plantQrCode;
  };

  setPlantQrCode = (plantQrCode: string | null) => {
    this.plantQrCode = plantQrCode;
  };

  getScanData = () => {
    return {
      metadata: this.scanMetadata,
      progress: this.scanProgress,
      scanImages: this.getImagePaths(),
    };
  };

  getImagePaths = () => {
    // return a copy of the images array
    return this.images.slice();
  };

  captureMetadata = () => {
    if (this.phenotyperId === null) {
      throw new Error("personId is null");
    }
    if (this.scanPartialPath === null) {
      throw new Error("scanPartialPath is null");
    }
    if (this.plantQrCode === null) {
      throw new Error("plantQrCode is null");
    }
    if (this.captureDate === null) {
      throw new Error("captureDate is null");
    }
    const metadata = {
      id: this.scanId,
      phenotyper_id: this.phenotyperId,
      scanner_id: this.scanner_id,
      plant_qr_code: this.plantQrCode,
      path: this.scanPartialPath,
      capture_date: this.captureDate.toISOString(),
      ...this.cameraSettings,
    };
    this.scanMetadata = metadata;
    this.onScanUpdate();
  };

  resetProgress = () => {
    this.scanProgress = defaultProgress();
    this.scanProgress.status = "capturing";
    this.onScanUpdate();
  };

  imageCaptured = () => {
    if (this.scanProgress === null) {
      throw new Error("scanProgress is null");
    }
    this.scanProgress.nImagesCaptured += 1;
    this.scanProgress.status = "capturing";
    this.onScanUpdate();
  };

  imageSaved = (imagePath: string) => {
    if (this.scanMetadata === null) {
      throw new Error("scanMetadata is null");
    }
    if (this.scanProgress === null) {
      throw new Error("scanProgress is null");
    }
    this.images.push(imagePath);
    this.scanProgress.nImagesSaved += 1;
    this.scanProgress.status = "saving";
    if (this.scanProgress.nImagesSaved === this.scanMetadata.num_frames) {
      this.scanProgress.status = "complete";
      this.onScanComplete(makeScan(this.scanMetadata, this.images));
    }
    this.onScanUpdate();
  };

  getCurrentScan = () => {
    if (this.scanMetadata === null) {
      throw new Error("scanMetadata is null");
    }
    return makeScan(this.scanMetadata, this.images);
  };

  deleteCurrentScan = () => {
    this.scanMetadata = null;
    this.scanProgress = null;
    this.images = [];
    this.onScanUpdate();
  };
}

function defaultCameraSettings(): CameraSettings {
  return {
    num_frames: 72,
    exposure_time: 10000,
    gain: 100,
    brightness: 0,
    contrast: 0,
    gamma: 1,
    seconds_per_rot: 10,
  };
}

function makeScan(metadata: ScanMetadata, images: ScanImages): Scan {
  return {
    metadata,
    images,
  };
}

function defaultProgress(): ScanProgress {
  return {
    nImagesCaptured: 0,
    nImagesSaved: 0,
    status: "idle",
  };
}

function getLocalDateInYYYYMMDD(date: Date) {
  // Convert offset to milliseconds
  const timeZoneOffsetInMs = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - timeZoneOffsetInMs);
  const yyyyMMdd = localDate.toISOString().slice(0, 10);
  return yyyyMMdd;
}

function createScanner(config: ScannerConfig) {
  const scanner = new Scanner(config);
  return scanner;
}

export { createScanner };
