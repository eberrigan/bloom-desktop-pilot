import { getPrismaClient } from "../lib/prisma";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { Image, Prisma, PrismaClient } from "@prisma/client";
// import { Phenotypers } from "src/renderer/Phenotypers";

// define type
type ScanMetadataParsed = {
  id: string;
  experiment_id: string;
  phenotyper_id: string;
  scanner_name: string;
  plant_id: string;
  path: string;
  capture_date: Date;
  num_frames: number;
  exposure_time: number;
  gain: number;
  brightness: number;
  contrast: number;
  gamma: number;
  seconds_per_rot: number;
  wave_number: number;
  plant_age_days: number;
};

export class PrismaStore {
  private scansDir: string;
  private statusChanged;
  private prisma: PrismaClient<{
    datasourceUrl: string;
    log: {
      level: "query";
      emit: "event";
    }[];
  }>;

  public scansUpdated: () => void;

  init = async () => {};

  sync = async () => {};

  getPhenotypers = async () => {
    return this.prisma.phenotyper.findMany();
  };

  createPhenotyper = async (name: string, email: string) => {
    try {
      await this.prisma.phenotyper.create({
        data: { id: uuidv4(), name, email },
      });
      return { error: null };
    } catch (err) {
      return { error: err };
    }
  };

  getScientists = async () => {
    return this.prisma.scientist.findMany();
  };

  createScientist = async (name: string, email: string) => {
    try {
      await this.prisma.scientist.create({
        data: { id: uuidv4(), name, email },
      });
      return { error: null };
    } catch (err) {
      return { error: err };
    }
  };

  getExperiments = async () => {
    return this.prisma.experiment.findMany({
      include: { scientist: true },
    });
  };

  getExperimentsWithScans = async () => {
    return this.prisma.experiment.findMany({
      include: {
        scans: { include: { phenotyper: true } },
      },
    });
  };

  createExperiment = async (
    name: string,
    species: string,
    scientist_id: string
  ) => {
    console.log(`Creating experiment: ${name}, ${species}, ${scientist_id}`);
    try {
      await this.prisma.experiment.create({
        data: { id: uuidv4(), name, species, scientist_id },
      });
      return { error: null };
    } catch (err) {
      return { error: err };
    }
  };

  getScans = async (showTodayOnly: boolean = false) => {
    const scans = await this.prisma.scan.findMany({
      include: { phenotyper: true, images: true },
      orderBy: { capture_date: "desc" },
      where: { deleted: false },
    });
    return scans.filter((scan) => {
      if (showTodayOnly) {
        // Only show scans from today
        const today = new Date();
        return (
          scan.capture_date.getDate() === today.getDate() &&
          scan.capture_date.getMonth() === today.getMonth() &&
          scan.capture_date.getFullYear() === today.getFullYear()
        );
      }
      return true;
    });
  };

  getScan = async (scanId: string) => {
    return this.prisma.scan.findUnique({
      where: { id: scanId },
      include: { phenotyper: true, images: true },
    });
  };

  getMostRecentScanDate = async (
    experimentId: string,
    plantId: string
  ): Promise<Date | null> => {
    const scans = await this.prisma.scan.findMany({
      where: {
        plant_id: plantId,
        experiment_id: experimentId,
        NOT: { deleted: true },
      },
      orderBy: { capture_date: "desc" },
    });
    if (scans.length === 0) {
      return null;
    } else {
      return scans[0].capture_date;
    }
  };

  updateImageMetadata = async (imageId: string, metadata: Partial<Image>) => {
    try {
      await this.prisma.image.update({
        data: metadata,
        where: { id: imageId },
      });
      return { error: null };
    } catch (err) {
      return { error: err };
    }
  };

  addScan = async (scan: Scan) => {
    // break out the images into Images objects
    const scanMetadata = parseCaptureDate(scan.metadata) as ScanMetadataParsed;

    console.log("Adding scan to PrismaStore:", JSON.stringify(scan.metadata));

    const images = scan.images.map((path, index) => {
      return {
        id: uuidv4(),
        path,
        frame_number: index + 1,
        status: "CAPTURED",
      };
    });

    const newScan = await this.prisma.scan.create({
      data: {
        ...scanMetadata,
        images: { create: images },
      },
    });
  };

  deleteScan = async (scanId: string) => {
    await this.prisma.scan.update({
      data: { deleted: true },
      where: { id: scanId },
    });

    const scan = await this.prisma.scan.findUnique({
      where: { id: scanId },
      include: { phenotyper: true, images: true },
    });

    const metadata_path = path.join(this.scansDir, scan.path, "metadata.json");
    const metadata = JSON.parse(
      fs.readFileSync(metadata_path, {
        encoding: "utf-8",
      })
    );
    metadata.deleted = true;
    fs.writeFileSync(metadata_path, JSON.stringify(metadata, null, 2));
  };

  getStatus = () => {
    // return {
    //   acquiringJWT: this.acquiringJWT,
    //   connectingToElectric: this.connectingToElectric,
    //   jwt: this.jwt,
    //   electricIsNull: this.electric === null,
    //   electricIsConnected: this.electric !== null && this.electric.isConnected,
    //   finishedSyncing: this.finishedSyncing,
    // };
    return {};
  };

  // initLocalConn = () => {
  //   this.conn = new Database(this.localDB);
  //   this.conn.pragma("journal_mode = WAL");
  // };

  getImagesToUpload = async () => {
    return this.prisma.image.findMany({
      where: { status: { not: "UPLOADED" } },
      include: { scan: { include: { experiment: true } } },
      orderBy: { scan: { capture_date: "asc" } },
    });
  };

  constructor(
    scansDir: string,
    statusChanged: () => void,
    prisma: PrismaClient<{
      datasourceUrl: string;
      log: {
        level: "query";
        emit: "event";
      }[];
    }>
  ) {
    this.scansDir = scansDir; // path to scans directory
    this.statusChanged = statusChanged;
    this.prisma = prisma;
    this.prisma.$on("query", (event) => {
      if (!event.query.includes("SELECT")) {
        console.log("Query: " + event.query);
        console.log("Calling scansUpdated");
        this.scansUpdated();
      }
    });
  }
}

export async function createPrismaStore(
  scans_dir: string,
  statusChanged: () => void,
  dbUrl: string
) {
  console.log("Creating PrismaStore...");
  const prisma = getPrismaClient(dbUrl);
  const store = new PrismaStore(scans_dir, statusChanged, prisma);
  console.log("ElectricStore created, initializing...");
  // await store.init();
  store.init();
  console.log("ElectricStore initialized");
  return store;
}

function isJwtExpired(token: string) {
  const jsonPayload = getJsonPayload(token);
  const { exp } = JSON.parse(jsonPayload);
  const currentTime = Math.floor(Date.now() / 1000);
  // console.log(`token: ${token}`);
  // console.log(`exp: ${exp}, currentTime: ${currentTime}`);
  return exp < currentTime;
}

function getJsonPayload(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(base64, "base64").toString();
}

function parseCaptureDate(scan_metadata: ScanMetadata) {
  // parses the capture_date string into a Date object and keeps all other fields
  const { capture_date, ...rest } = scan_metadata;
  return {
    ...rest,
    capture_date: new Date(capture_date),
  } as ScanMetadataParsed;
}
