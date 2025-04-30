import path from "path";
import { v4 as uuidv4 } from "uuid";
import { spawn } from "node:child_process";
import fs from "fs";

class Scanner {
  private scanId: string | null = null;
  private phenotyperId: string | null = null;
  private experimentId: string | null = null;
  private waveNumber: number | null = null;
  private plantAgeDays: number | null = null;
  private scanPath: string | null = null;
  private scanPartialPath: string | null = null;
  private plantId: string | null = null;
  private accessionId: string | null = null;
  private python: string;
  private capture_scan_py: string;
  private scans_dir: string;
  private scanner_name: string;
  private scanMetadata: ScanMetadata | null = null;
  private scanProgress: ScanProgress | null = defaultProgress();
  private images: ScanImages = [];
  private cameraSettings: CameraSettings = defaultCameraSettings();
  private cameraIpAddress: string;
  private captureDate: Date | null = null;
  

  public onScanUpdate: () => void = () => {};
  public onScanComplete: (scan: Scan) => void = () => {};
  public onScanError: (message: string) => void = (message: string) => {};

  constructor(config: ScannerConfig, onScanUpdate: () => void = () => {}) {
    this.onScanUpdate = onScanUpdate;
    this.python = config.python;
    this.capture_scan_py = config.capture_scan_py;
    this.scans_dir = config.scans_dir;
    this.scanner_name = config.scanner_name;
    this.cameraIpAddress = config.camera_ip_address;
  }

  startScan = async (options: {
    onCaptureImage: () => void;
    onImageSaved: (imagePath: string) => void;
  }) => {
    this.images = [];

    this.scanId = uuidv4();
    this.captureDate = new Date();
    // get the date in the format YYYY-MM-DD in the local timezone
    this.scanPartialPath = path.join(
      getLocalDateInYYYYMMDD(this.captureDate),
      this.plantId,
      this.scanId
    );
    this.scanPath = path.join(this.scans_dir, this.scanPartialPath);

    this.captureMetadata();
    await writeMetadata(this.scanMetadata, this.scanPath);
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
      const longStr = data.toString();
      console.log(longStr);
      for (const str of longStr.split("\n")) {
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
      }
    });

    grab_frames.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      this.deleteCurrentScan();
      this.onScanError("Error capturing scan. Close other camera software.");
      // this.onScanError(data.toString());
    });
  };

  getCameraSettings = () => {
    return this.cameraSettings;
  };

  setCameraSettings = (settings: CameraSettings) => {
    this.cameraSettings = settings;
  };

  getScannerId = () => {
    return this.scanner_name;
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
    return this.plantId;
  };

  setPlantQrCode = (plantQrCode: string | null) => {
    this.plantId = plantQrCode;
  };

  setAccessionId = (accessionId: string | null) => {
    this.accessionId = accessionId;
  }

  getAccessionId = () => {
    return this.accessionId;
  }

  getExperimentId = () => {
    return this.experimentId;
  };

  setExperimentId = (experimentId: string | null) => {
    this.experimentId = experimentId;
  };

  getWaveNumber = () => {
    return this.waveNumber;
  };

  setWaveNumber = (waveNumber: number | null) => {
    this.waveNumber = waveNumber;
  };

  getPlantAgeDays = () => {
    return this.plantAgeDays;
  };

  setPlantAgeDays = (plantAgeDays: number | null) => {
    console.log(`setting plant age days: ${plantAgeDays}`);
    this.plantAgeDays = plantAgeDays;
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
    if (this.plantId === null) {
      throw new Error("plantQrCode is null");
    }
    if (this.accessionId === null) {
      throw new Error("accessionId is null");
    }
    if (this.captureDate === null) {
      throw new Error("captureDate is null");
    }
    const metadata = {
      id: this.scanId,
      phenotyper_id: this.phenotyperId,
      experiment_id: this.experimentId,
      wave_number: this.waveNumber,
      plant_age_days: this.plantAgeDays,
      scanner_name: this.scanner_name,
      plant_id: this.plantId,
      accession_id : this.accessionId,
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

  resetScanner = () => {
    this.scanMetadata = null;
    this.scanProgress = defaultProgress();
    this.images = [];
    this.onScanUpdate();
  };

  deleteCurrentScan = () => {
    // add "deleted" field to metadata.json
    if (this.scanMetadata === null) {
      throw new Error("scanMetadata is null");
    }
    // add "deleted" field to this.scanMetadata
    const metadata = Object.assign({}, this.scanMetadata, { deleted: true });
    writeMetadata(metadata, this.scanPath);
    this.resetScanner();
  };
}

async function writeMetadata(metadata: ScanMetadata, scanPath: string) {
  // create path if it doesn't exist
  if (!fs.existsSync(scanPath)) {
    fs.mkdirSync(scanPath, { recursive: true });
  }
  const metadataPath = path.join(scanPath, "metadata.json");
  const metadataJson = JSON.stringify(metadata, null, 2);
  console.log(`Writing metadata to ${metadataPath}`);
  console.log(metadataJson);

  await fs.writeFile(metadataPath, metadataJson, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function defaultCameraSettings(): CameraSettings {
  return {
    num_frames: 72,
    exposure_time: 10000,
    gain: 100,
    brightness: 0,
    contrast: 0,
    gamma: 1,
    seconds_per_rot: 7,
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

export { createScanner, defaultCameraSettings };
