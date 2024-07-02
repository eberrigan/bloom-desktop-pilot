import { Scan, Phenotyper, Experiment, Image } from "@prisma/client";

export type ScanWithPhenotyper = Scan & {
  phenotyper: Phenotyper;
  images: Image[];
};

export type ExperimentWithScans = Experiment & {
  scans: ScanWithPhenotyper[];
};
