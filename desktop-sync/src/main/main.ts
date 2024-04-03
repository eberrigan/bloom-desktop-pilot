import { app, BrowserWindow, ipcMain } from "electron";

import path from "path";
import { resolveHtmlPath } from "./util";
import { createBloomRetriever, getSupabaseJWT } from "./bloom";
import * as os from "node:os";
import * as fs from "node:fs";
import * as yaml from "js-yaml";
import { createScanner } from "./scanner";

// import { createScanStore } from "./scanstore";

import { createElectricStore } from "./electricstore";
import { createImageUploader } from "./imageuploader";
import { Electric_cyl_scans, Electric_cyl_images } from "../generated/client";

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow: BrowserWindow | null = null;

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      webSecurity: false, // TODO: remove this
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.menuBarVisible = false;
  mainWindow.setMenu(null);

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// ********************** Bloom core logic **********************

// Create a BloomRetriever object
// createBloomRetriever().then((bloom_retriever) => {
//   ipcMain.handle("bloom:get-people", bloom_retriever.getPeople);
// });

// Load config.yaml and create a Scanner object
const homedir = os.homedir();
const config_yaml = path.join(homedir, ".bloom", "desktop-config.yaml");
const config = yaml.load(fs.readFileSync(config_yaml, "utf8")) as {
  python: string;
  capture_scan_py: string;
  scans_dir: string;
  scanner_id: string;
  electric_service_url: string;
  electric_jwt: string;
  local_db_path: string;
  camera_ip_address: string;
  bloom_scanner_username: string;
  bloom_scanner_password: string;
  bloom_api_url: string;
  bloom_anon_key: string;
};

ipcMain.handle("bloom:get-credentials", (event, args) => ({
  email: config.bloom_scanner_username,
  password: config.bloom_scanner_password,
  bloom_api_url: config.bloom_api_url,
  bloom_anon_key: config.bloom_anon_key,
}));

const scanner = createScanner(config);
ipcMain.handle("scanner:get-scanner-id", scanner.getScannerId);
ipcMain.handle("scanner:get-phenotyper-id", scanner.getPhenotyperId);
ipcMain.on("scanner:set-phenotyper-id", async (event, args) => {
  scanner.setPhenotyperId(args[0]);
});
ipcMain.handle("scanner:get-plant-qr-code", scanner.getPlantQrCode);
ipcMain.handle("scanner:set-plant-qr-code", async (event, args) => {
  scanner.setPlantQrCode(args[0]);
});
ipcMain.handle("scanner:get-experiment-id", scanner.getExperimentId);
ipcMain.on("scanner:set-experiment-id", async (event, args) => {
  scanner.setExperimentId(args[0]);
});
ipcMain.handle("scanner:get-wave-number", scanner.getWaveNumber);
ipcMain.on("scanner:set-wave-number", async (event, args) => {
  scanner.setWaveNumber(args[0]);
});
ipcMain.handle("scanner:get-plant-age-days", scanner.getPlantAgeDays);
ipcMain.on("scanner:set-plant-age-days", async (event, args) => {
  scanner.setPlantAgeDays(args[0]);
});
ipcMain.handle("scanner:get-scan-data", scanner.getScanData);
scanner.onScanUpdate = () => {
  mainWindow?.webContents.send("scanner:scan-update");
};
ipcMain.handle("scanner:get-settings", scanner.getCameraSettings);
ipcMain.handle("scanner:set-settings", async (event, args) => {
  scanner.setCameraSettings(args[0]);
});
ipcMain.handle("scanner:get-scans-dir", scanner.getScansDir);
ipcMain.on("scanner:start-scan", (event, args) => {
  console.log("scanner:start-scan event received");
  scanner.startScan({
    onCaptureImage: () => {
      event.reply("image-captured");
    },
    onImageSaved: (imagePath: string) => {
      event.reply("image-saved", imagePath);
    },
  });
});

// Create a ScanStore object
// createScanStore().then((scanStore) => {
//   scanner.onScanComplete = (scan: Scan) => {
//     scanStore.addScan(scan);
//   };
//   ipcMain.handle("scan-store:get-scans", scanStore.getScans);
//   ipcMain.handle(
//     "scan-store:get-scans-with-email",
//     scanStore.getScansWithEmail
//   );
//   ipcMain.handle("scan-store:get-scan", async (event, args) => {
//     return scanStore.getScan(args[0]);
//   });
//   ipcMain.handle("scan-store:get-scan-with-email", async (event, args) => {
//     return scanStore.getScanWithEmail(args[0]);
//   });
// });

// If no 'scanner:start-scan' event for 5 minutes, emit a 'main:idle' event
let idleTimer: NodeJS.Timeout;
let idleTime = 10 * 60 * 1000;
const resetIdleTimer = () => {
  console.log("resetIdleTimer() called");
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    console.log("idleTimer expired");
    mainWindow?.webContents.send("main:idle");
    resetIdleTimer();
  }, idleTime);
};
ipcMain.on("scanner:start-scan", (event, args) => {
  resetIdleTimer();
});
ipcMain.on("scanner:set-person-id", (event, args) => {
  resetIdleTimer();
});
resetIdleTimer();

// *************************************************************

const acquireToken = async () => {
  const tokenPromise = new Promise(
    (resolve: (value: string) => void, reject) => {
      // resolve(auth.token);
      resolve(config.electric_jwt);
    }
  );
  return tokenPromise;
};

createElectricStore(
  config.electric_service_url,
  config.local_db_path,
  acquireToken,
  // getSupabaseJWT,
  () => {
    mainWindow?.webContents.send("electric:status-change");
  }
)
  .then((electricStore) => {
    console.log("electricStore created, setting up IPC handlers");
    ipcMain.handle("electric:get-phenotypers", electricStore.getPhenotypers);
    ipcMain.handle("electric:create-phenotyper", async (event, args) => {
      return electricStore.createPhenotyper(args[0], args[1]);
    });
    ipcMain.handle("electric:get-experiments", electricStore.getExperiments);
    ipcMain.handle("electric:create-experiment", async (event, args) => {
      return electricStore.createExperiment(args[0], args[1]);
    });
    ipcMain.handle("electric:get-scans", electricStore.getScans);
    // scanner.onScanComplete = (scan: Scan) => {
    //   electricStore.addScan(scan);
    // };
    ipcMain.handle("scanner:save-current-scan", async (event, args) => {
      const scan = scanner.getCurrentScan();
      electricStore.addScan(scan);
    });
    ipcMain.handle("scanner:delete-current-scan", async (event, args) => {
      scanner.deleteCurrentScan();
    });
    electricStore.scansUpdated = () => {
      mainWindow?.webContents.send("electric:scans-updated");
    };
    ipcMain.handle("electric:get-status", electricStore.getStatus);
    ipcMain.handle("scan-store:get-scans", electricStore.getScans);
    ipcMain.handle("scan-store:get-scan", async (event, args) => {
      return electricStore.getScan(args[0]);
    });

    async function uploadImages() {
      const images = (await electricStore.getImagesToUpload(
        config.scanner_id
      )) as (Electric_cyl_images & {
        electric_cyl_scans: Electric_cyl_images;
      })[];
      const imageUploader = await createImageUploader(
        electricStore,
        config.scans_dir
      );
      await imageUploader.uploadImages(images);
    }
    ipcMain.handle("electric:upload-images", uploadImages);
  })
  .catch((err) => {
    console.error("Error creating ElectricStore:", err);
  });
