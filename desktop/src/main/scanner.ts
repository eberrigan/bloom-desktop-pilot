import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { spawn } from 'node:child_process';

const numFrames = 72;

class Scanner {
  private personId: number | null = null;
  private scanPath: string | null = null;
  private plantQrCode: string | null = null;
  private python: string;
  private capture_scan_py: string;
  private scans_dir: string;
  private scanMetadata: ScanMetadata | null = null;
  private scanProgress: ScanProgress | null = defaultProgress();
  private images: ScanImages = [];

  public onScanUpdate: () => void = () => {};
  public onScanComplete: (scan: Scan) => void = () => {};

  constructor(config: ScannerConfig, onScanUpdate: () => void = () => {}) {
    this.onScanUpdate = onScanUpdate;
    this.python = config.python;
    this.capture_scan_py = config.capture_scan_py;
    this.scans_dir = config.scans_dir;
  }

  startScan = (options: {
    onCaptureImage: () => void;
    onImageSaved: (imagePath: string) => void;
  }) => {
    this.images = [];

    const scan_name = 'scan_' + uuidv4();
    this.scanPath = path.join(this.scans_dir, scan_name);

    this.captureMetadata();
    this.resetProgress();

    const grab_frames = spawn(this.python, [
      this.capture_scan_py,
      this.scanPath,
    ]);

    grab_frames.stdout.on('data', (data) => {
      console.log('JS received data from python');
      const str = data.toString();
      console.log(str);
      if (str.slice(0, 14) === 'TRIGGER_CAMERA') {
        console.log('data matches TRIGGER_CAMERA');
        options.onCaptureImage();
        this.imageCaptured();
      }
      if (str.slice(0, 10) === 'IMAGE_PATH') {
        console.log('data matches IMAGE_PATH');
        const imagePath = str.slice(11);
        options.onImageSaved(imagePath);
        this.imageSaved(imagePath);
      }
    });
  };

  getPersonId = () => {
    return this.personId;
  };

  setPersonId = (personId: number | null) => {
    this.personId = personId;
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
    if (this.personId === null) {
      throw new Error('personId is null');
    }
    if (this.scanPath === null) {
      throw new Error('scanPath is null');
    }
    if (this.plantQrCode === null) {
      throw new Error('plantQrCode is null');
    }
    const metadata = {
      scanId: 'scan_' + uuidv4(),
      personId: this.personId,
      plantQrCode: this.plantQrCode,
      path: this.scanPath,
      date: new Date().toISOString(),
      numFrames,
      exposureTime: 0,
      gain: 0,
      brightness: 0,
      contrast: 0,
      gamma: 0,
    };
    this.scanMetadata = metadata;
    this.onScanUpdate();
  };

  resetProgress = () => {
    this.scanProgress = defaultProgress();
    this.scanProgress.status = 'capturing';
    this.onScanUpdate();
  };

  imageCaptured = () => {
    if (this.scanProgress === null) {
      throw new Error('scanProgress is null');
    }
    this.scanProgress.nImagesCaptured += 1;
    this.scanProgress.status = 'capturing';
    this.onScanUpdate();
  };

  imageSaved = (imagePath: string) => {
    if (this.scanMetadata === null) {
      throw new Error('scanMetadata is null');
    }
    if (this.scanProgress === null) {
      throw new Error('scanProgress is null');
    }
    this.images.push(imagePath);
    this.scanProgress.nImagesSaved += 1;
    this.scanProgress.status = 'saving';
    if (this.scanProgress.nImagesSaved === this.scanMetadata.numFrames) {
      this.scanProgress.status = 'complete';
      this.onScanComplete(makeScan(this.scanMetadata, this.images));
    }
    this.onScanUpdate();
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
    status: 'idle',
  };
}

function createScanner(config: ScannerConfig) {
  const scanner = new Scanner(config);
  return scanner;
}

export { createScanner };
