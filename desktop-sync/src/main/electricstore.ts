import Database from "better-sqlite3";
import { electrify } from "electric-sql/node";
import { schema } from "../generated/client";
import { ElectricClient, ClientTables } from "electric-sql/client/model";
import { Electric_cyl_images, Electric_cyl_scans } from "../generated/client";
import { ElectricConfig, ElectrifyOptions } from "electric-sql";
import { v4 as uuidv4 } from "uuid";
import { sleepAsync, uuid } from "electric-sql/util";

export class ElectricStore {
  public scansUpdated: () => void;

  private acquireJWT: () => Promise<string | null>;
  private localDB: string;
  private electric_service_url: string;
  private statusChanged: () => void;
  private finishedSyncing: boolean = false;

  private acquiringJWT: boolean = false;
  private connectingToElectric: boolean = false;

  private conn: Database.Database | null = null;
  private jwt: string | null = null;
  private electric: ElectricClient<typeof schema> | null = null;
  private reconnectInterval: NodeJS.Timeout | null = null;

  init = async () => {
    // initialize the electric client
    await this.electricUp();
    // set an interval to set it up again every 15 seconds
    this.reconnectInterval = setInterval(this.electricUp, 15000);
  };

  electricUp = async () => {
    // connect to the local database if not already connected
    if (this.conn === null) {
      console.log("Initializing local connection...");
      this.initLocalConn();
      console.log("Local connection initialized");
    }

    // check if the JWT if it's null or expired
    const jwtNullOrExpired = this.jwt === null || isJwtExpired(this.jwt);

    // acquire a new JWT if it's null or expired
    if (jwtNullOrExpired && !this.acquiringJWT) {
      console.log("JWT is null or expired, acquiring new JWT...");
      this.acquiringJWT = true;
      this.statusChanged();
      try {
        this.jwt = await this.acquireJWT();
      } catch (err) {
        console.error("Error acquiring JWT:");
        console.error(err);
      } finally {
        this.acquiringJWT = false;
        this.statusChanged();
      }
      console.log("JWT obtained");
    }

    // create a new electric client if it's null or the JWT is new
    const reconnect = this.electric === null || jwtNullOrExpired;

    if (reconnect && !this.connectingToElectric) {
      console.log("Electric client not connected, reconnecting...");
      const electric_config: ElectricConfig = {
        url: this.electric_service_url,
        timeout: 20000,
        auth: {
          token: this.jwt || "dummy-jwt",
        },
      };
      this.connectingToElectric = true;
      this.statusChanged();
      try {
        this.electric = await electrify(this.conn, schema, electric_config);
        // this.electric.connect(this.jwt || "dummy-jwt");
        console.log("Connected to the electric service");
        this.electric.notifier.subscribeToConnectivityStateChanges(() => {
          this.connectingToElectric = this.electric.isConnected;
          this.statusChanged();
        });

        // Subscribe to data changes.
        this.electric.notifier.subscribeToDataChanges((changeNotification) => {
          this.scansUpdated();
        });

        console.log("Syncing data...");
        await this.sync();
        console.log("Finished syncing.");
        this.finishedSyncing = true;
      } catch (err) {
        console.error("Error connecting to electric service:");
        console.error(err);
      } finally {
        this.connectingToElectric = false;
        this.statusChanged();
      }
    }
  };

  sync = async () => {
    if (this.electric === null) {
      return;
    }

    // sync the tables
    const scans = await this.electric.db.electric_cyl_scans.sync({
      include: { electric_phenotypers: true, electric_cyl_images: true },
    });
    await scans.synced;

    const phenotypers = await this.electric.db.electric_phenotypers.sync();
    await phenotypers.synced;

    const images = await this.electric.db.electric_cyl_images.sync({
      include: {
        electric_cyl_scans: { include: { electric_phenotypers: true } },
      },
    });
    await images.synced;
  };

  getPhenotypers = async () => {
    // if (this.electric === null || !this.finishedSyncing) {
    if (this.electric === null) {
      return [];
    }
    return this.electric.db.electric_phenotypers.findMany();
  };

  getImagesToUpload = async () => {
    if (this.electric === null) {
      return [];
    }
    return this.electric.db.electric_cyl_images
      .findMany({
        where: { status: { not: "UPLOADED" } },
        include: { electric_cyl_scans: true },
      })
      .then((images) => {
        const sorted_images = images.slice();
        sorted_images.sort((a, b) => {
          // check for undefined capture_date
          if (!("electric_cyl_scans" in a && "electric_cyl_scans" in b)) {
            return 0;
          }
          if (
            a.electric_cyl_scans.capture_date <
            b.electric_cyl_scans.capture_date
          ) {
            return -1;
          }
          if (
            a.electric_cyl_scans.capture_date >
            b.electric_cyl_scans.capture_date
          ) {
            return 1;
          }
          return 0;
        });
        return sorted_images;
      });
  };

  getScans = async () => {
    // if (this.electric === null || !this.finishedSyncing) {
    if (this.electric === null) {
      return [];
    }
    const scans = await this.electric.db.electric_cyl_scans.findMany({
      include: { electric_phenotypers: true, electric_cyl_images: true },
    });
    // remove duplicate scans
    const seen = new Set();
    return scans.filter((scan) => {
      const duplicate = seen.has(scan.id);
      seen.add(scan.id);
      return !duplicate;
    });
  };

  getScan = async (scanId: string) => {
    // if (this.electric === null || !this.finishedSyncing) {
    if (this.electric === null) {
      return null;
    }
    return this.electric.db.electric_cyl_scans.findUnique({
      where: { id: scanId },
      include: { electric_phenotypers: true, electric_cyl_images: true },
    });
  };

  updateImageMetadata = async (
    imageId: string,
    metadata: Partial<Electric_cyl_images>
  ) => {
    if (this.electric === null) {
      return { error: "Electric client is null" };
    }
    try {
      await this.electric.db.electric_cyl_images.update({
        data: metadata,
        where: { id: imageId },
      });
      return { error: null };
    } catch (err) {
      return { error: err };
    }
  };

  addScan = async (scan: Scan) => {
    // if (this.electric === null || !this.finishedSyncing) {
    if (this.electric === null) {
      return;
    }

    // break out the images into Images objects
    const scans = parseCaptureDate(scan.metadata) as {
      id: string;
      phenotyper_id: string;
      scanner_id: string;
      plant_qr_code: string;
      path: string;
      capture_date: Date;
      num_frames: number;
      exposure_time: number;
      gain: number;
      brightness: number;
      contrast: number;
      gamma: number;
      seconds_per_rot: number;
    };

    const images = scan.images.map((path, index) => {
      return {
        id: uuidv4(),
        path,
        frame_number: index + 1,
        url: null,
        status: "CAPTURED",
      };
    });

    // add the scan to the electric database
    await this.electric.db.electric_cyl_scans.create({
      data: {
        ...scans,
        electric_cyl_images: { create: images },
      },
    });
  };

  getStatus = () => {
    return {
      acquiringJWT: this.acquiringJWT,
      connectingToElectric: this.connectingToElectric,
      jwt: this.jwt,
      electricIsNull: this.electric === null,
      electricIsConnected: this.electric !== null && this.electric.isConnected,
      finishedSyncing: this.finishedSyncing,
    };
  };

  initLocalConn = () => {
    this.conn = new Database(this.localDB);
    this.conn.pragma("journal_mode = WAL");
  };

  constructor(
    electric_service_url: string,
    localDB: string,
    acquireJWT: () => Promise<string | null>,
    statusChanged: () => void
  ) {
    this.electric_service_url = electric_service_url; // "http://localhost:5133"
    this.localDB = localDB; // path to sqlite3 db file
    this.acquireJWT = acquireJWT;
    this.statusChanged = statusChanged;
  }
}

export async function createElectricStore(
  service_url: string,
  db_path: string,
  acquireJWT: () => Promise<string | null>,
  statusChanged: () => void
) {
  console.log("Creating ElectricStore...");
  const store = new ElectricStore(
    service_url,
    db_path,
    acquireJWT,
    statusChanged
  );
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
  } as Electric_cyl_scans;
}

// electrify(conn, schema, electric_config)
//   .then(async (electric) => {
//     // Use your electrified database here.
//     console.log("Connected to the database");
//     const { db } = electric;

//     await db.scans.sync({ include: { phenotypers: true } });

//     // Resolves when the shape subscription has been established.
//     // const shape = await db.scans.sync({ include: { phenotypers: true } });
//     // Resolves when the data has been synced into the local database.
//     // await shape.synced;

//     // Subscribe to data changes.
//     electric.notifier.subscribeToDataChanges((changeNotification) => {
//       changeNotification.dbName;
//       changeNotification.changes.map((change) => {
//         console.log(`table ${change.qualifiedTablename} changed`);
//         console.log(`rows ${change.rowids} changed`);
//       });
//     });

//     // set up callbacks
//     ipcMain.handle("scans:get-all", async () => {
//       const scans = await db.scans.findMany();
//       return scans;
//     });

//     db.phenotypers
//       .sync()
//       .then(() => {
//         db.phenotypers
//           .findMany()
//           .then((results) => {
//             console.log("results from db.phenotypers.findMany() ->");
//             console.log(results);
//           })
//           .catch((err) => {
//             console.error("error calling db.phenotypers.findMany() ->");
//             console.error(err);
//           });
//       })
//       .catch((err) => {
//         console.error("error calling db.phenotypers.sync() ->");
//         console.error(err);
//       });
//   })
//   .catch((err) => {
//     console.error("error calling electrify(conn, schema, config) ->");
//     console.error(err);
//   });
