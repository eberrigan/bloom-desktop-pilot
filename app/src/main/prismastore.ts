import { getPrismaClient } from "../lib/prisma";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { Image, Prisma, PrismaClient } from "@prisma/client";
import exp from "constants";
// import { Phenotypers } from "src/renderer/Phenotypers";

// define type
type ScanMetadataParsed = {
  id: string;
  experiment_id: string;
  phenotyper_id: string;
  scanner_name: string;
  plant_id: string;
  accession_id:string;
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

  createAccessions = async (name: string): Promise<{ error: any; file_id: string | null }> => {
    try {
      const newAccession = await this.prisma.accessions.create({
        data: {
          name,
        },
      });
  
      console.log("New accession created ID:", newAccession.id);
      return { error: null, file_id: newAccession.id };
    } catch (err) {
      console.error("Error creating accession:", err);
      return { error: err, file_id: null };
    }
  };

  createPlantAccessionMap = async ({
    accession_id,
    plant_barcode,
    accession_file_id,
  }: {
    accession_id: string;
    plant_barcode: string;
    accession_file_id: string;
  }): Promise<{ error: any }> => {
    try {
      console.log("Creating plant accession mapping:", { accession_id, plant_barcode, accession_file_id });
      await this.prisma.plantAccessionMappings.create({
        data: {
          accession_id,
          plant_barcode,
          accession_file_id,
        },
      });
  
      return { error: null };
    } catch (err) {
      console.error("Error creating accession mapping:", err);
      return { error: err };
    }
  };

  // getAccessions = async (id: string) => {
  //   try {
  //     const accession = await this.prisma.accessions.findUnique({
  //       where: { id },
  //     });
  
  //     if (!accession) {
  //       return false; 
  //     }
  
  //     return accession;
  //   } catch (err) {
  //     console.error("Error fetching accession:", err);
  //     throw err;
  //   }
  // };

  getAccessions = async (id: string): Promise<Accessions | null> => {
    try {
      const accession = await this.prisma.accessions.findUnique({
        where: { id },
      });
      return accession; 
    } catch (err) {
      console.error("Error fetching accession:", err);
      throw err;
    }
  };
  


  getAccessionsID = async (plantQRcode: string, experiment_Id: string) => {
    try {
      // get the accesion file Id for the experiment
      const experiment = await this.prisma.experiment.findUnique({
        where: {
          id: experiment_Id,
        },
        select: {
          accession_id: true,
        },
      });
  
      if (!experiment || !experiment.accession_id) {
        throw new Error("Experiment or accession ID not found.");
      }
  
      // find PlantAccessionMappings
      const mapping = await this.prisma.plantAccessionMappings.findFirst({
        where: {
          accession_file_id: experiment.accession_id,
          plant_barcode: plantQRcode,
        },
      });
  
      if (!mapping) {
        throw new Error("Mapping not found for given plant QR code.");
      }

      return mapping; 
    } catch (err) {
      console.error("Error in getAccessionsID:", err);
      throw err;
    }
  }

  getAccessionList = async(experimentId: string)=> {
    try{
      console.log("PLANTQRCODE");

      const accessionsWithMappings = await this.prisma.accessions.findMany({
        where: {
          experiments: {
            some: {
              id: experimentId,
            },
          },
        },
        include: {
          mappings: true,
        },
      });
      const allMappings = accessionsWithMappings.flatMap(accession => accession.mappings);   
      return allMappings;   
    }
    catch (err){
      console.error("Error in getting accessions list:", err);
      throw err;
    }
  }

  getAccessionListwithFileID = async(accession_file_id: string)=> {
    try {
      // console.log("Fetching accession mappings for file ID:", accession_file_id);
      const mappings = await this.prisma.plantAccessionMappings.findMany({
        where: {
          accession_file_id: accession_file_id, 
        },
      });
      return mappings;
    } catch (err) {
      console.error("Error fetching accession files:", err);
      return [];
    }
  }

  updateAccessionFile = async (editingField:string, editingRowId:string, editingValue:string)=>{
    try {

      const updated = await this.prisma.plantAccessionMappings.update({
        where: { id: editingRowId },
        data: { ["accession_id"]: editingValue },
      });
  
      return { success: true, data: updated };
    } catch (err) {
      console.error("Error updating accession file:", err);
      return { error: err };
    }
  }

  getAccessionFiles = async (): Promise<any[]> => {
    try {
      const accessionFiles = await this.prisma.accessions.findMany({
        select: {
          id: true,
          name: true,
          createdAt: true,
          experiments: {
            select: {
              name: true,
            },
          },
        },
      });
      return accessionFiles;
    } catch (err) {
      console.error("Error fetching accession files:", err);
      return [];
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
    scientist_id: string,
    accession_id: string,
  ) => {
    try {
      await this.prisma.experiment.create({
        data: { id: uuidv4(), name, species, scientist_id, accession_id },
      });
      return { error: null };
    } catch (err) {
      return { error: err };
    }
  };

  attachAccessionToExperiment = async (
    experiment_id: string,
    accession_id: string
  ) => {
    try {
      await this.prisma.experiment.update({
        where: { id: experiment_id },
        data: { accession_id },
      });
      return { error: null };
    } catch (err) {
      return { error: err };
    }
  };

  getScans = async (
    page: number = 1,
    pageSize: number = 10,
    showTodayOnly: boolean = false
  ) => {
    try {
      const where: any = {
      deleted: false,
      };

      if (showTodayOnly) {
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));

      where.capture_date = {
        gte: startOfDay,
        lte: endOfDay,
        };
      }

      const [scans, totalCount] = await Promise.all([
      this.prisma.scan.findMany({
        where,
        orderBy: { capture_date: "desc" },
        include: { phenotyper: true, images: true },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.scan.count({ where }),
      ]);

      return { scans, totalCount };
    } catch (err) {
      console.error("Error fetching scans:", err);
      return { scans: [], totalCount: 0 };
    }
    // const scans = await this.prisma.scan.findMany({
    //   include: { phenotyper: true, images: true },
    //   orderBy: { capture_date: "desc" },
    //   where: { deleted: false },
    // });
    // return scans.filter((scan) => {
    //   if (showTodayOnly) {
    //     // Only show scans from today
    //     const today = new Date();
    //     return (
    //       scan.capture_date.getDate() === today.getDate() &&
    //       scan.capture_date.getMonth() === today.getMonth() &&
    //       scan.capture_date.getFullYear() === today.getFullYear()
    //     );
    //   }
    //   return true;
    // });
  };

  // getScans = async (showTodayOnly: boolean = false) => {
  //   const scans = await this.prisma.scan.findMany({
  //     include: { phenotyper: true, images: true },
  //     orderBy: { capture_date: "desc" },
  //     where: { deleted: false },
  //   });
  //   return scans.filter((scan) => {
  //     if (showTodayOnly) {
  //       // Only show scans from today
  //       const today = new Date();
  //       return (
  //         scan.capture_date.getDate() === today.getDate() &&
  //         scan.capture_date.getMonth() === today.getMonth() &&
  //         scan.capture_date.getFullYear() === today.getFullYear()
  //       );
  //     }
  //     return true;
  //   });
  // };

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
 const images = await this.prisma.image.findMany({
   where: { status: { not: "UPLOADED" } },
   include: {
     scan: {
       include: {
         phenotyper: true,
         experiment: {
           include: {
             scientist: true,
           },
         },
       },
     },
   },
   orderBy: { scan: { capture_date: "asc" } },
 });
 return images;
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