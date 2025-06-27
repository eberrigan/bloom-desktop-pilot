type ScannerConfig = {
  python: string;
  capture_scan_py: string;
  stream_scans_py?: string;
  scans_dir: string;
  scanner_name: string;
  camera_ip_address: string;
};

type ScanMetadata = Readonly<{
  id: string;
  experiment_id: string;
  phenotyper_id: string;
  scanner_name: string;
  plant_id: string;
  accession_id:string;
  path: string;
  capture_date: string;
  num_frames: number;
  exposure_time: number;
  gain: number;
  brightness: number;
  contrast: number;
  gamma: number;
  seconds_per_rot: number;
  wave_number: number;
  plant_age_days: number;
}>;

type ScanStatus = "idle" | "capturing" | "saving" | "complete";

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
  email: string;
};

type ScanWithEmail = {
  metadata: ScanMetadataWithEmail;
  images: ScanImages;
};

type Phenotyper = {
  id: string;
  name: string;
  email: string;
};

type Scientist = {
  id: string;
  name: string;
  email: string;
};

type Accessions = {
  id : string,
  name : string
}

type ExperimentWithScientist = Experiment & {
  scientist: Scientist;
};

type Experiment = {
  id: string;
  name: string;
  species: string;
  scientist_id: string;
  scientist:Scientist
};

interface PhenotyperRetriever {
  getPhenotypers: () => [Phenotyper];
}

type CameraSettings = {
  exposure_time: number;
  gain: number;
  brightness: number;
  contrast: number;
  gamma: number;
  seconds_per_rot: number;
  num_frames: number;
};
