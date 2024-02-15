type ScannerConfig = {
  python: string;
  capture_scan_py: string;
  scans_dir: string;
  scanner_id: string;
};

type ScanMetadata = Readonly<{
  scanId: string;
  personId: number;
  plantQrCode: string;
  path: string;
  date: string;
  numFrames: number;
  exposureTime: number;
  gain: number;
  brightness: number;
  contrast: number;
  gamma: number;
}>;

type ScanStatus = 'idle' | 'capturing' | 'saving' | 'complete';

type ScanProgress = {
  nImagesCaptured: number;
  nImagesSaved: number;
  status: ScanStatus;
};

type ScanImages = string[];

type Scan = {
  metadata: ScanMetadata;
  images: ScanImages;
};

// extend the ScanMetadata type to include the email field
type ScanMetadataWithEmail = ScanMetadata & {
  personEmail: string;
};

type ScanWithEmail = {
  metadata: ScanMetadataWithEmail;
  images: ScanImages;
};
