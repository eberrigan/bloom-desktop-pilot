/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { createBloomRetriever } from './bloom';
import * as os from 'node:os';
import * as fs from 'node:fs';
import * as yaml from 'js-yaml';
import { createScanner } from './scanner';
import { Scan } from '../renderer/CaptureScan';
import { createScanStore } from './scanstore';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

// ********************** Bloom core logic **********************

// Create a BloomRetriever object
createBloomRetriever().then((bloom_retriever) => {
  ipcMain.handle('bloom:get-people', bloom_retriever.getPeople);
});

// Load config.yaml and create a Scanner object
const homedir = os.homedir();
const config_yaml = path.join(homedir, '.bloom', 'desktop-config.yaml');
const config = yaml.load(fs.readFileSync(config_yaml, 'utf8')) as {
  python: string;
  capture_scan_py: string;
  scans_dir: string;
};

const scanner = createScanner(config);
ipcMain.handle('scanner:get-person-id', scanner.getPersonId);
ipcMain.handle('scanner:set-person-id', async (event, args) => {
  scanner.setPersonId(args[0]);
});
ipcMain.handle('scanner:get-plant-qr-code', scanner.getPlantQrCode);
ipcMain.handle('scanner:set-plant-qr-code', async (event, args) => {
  scanner.setPlantQrCode(args[0]);
});
ipcMain.handle('scanner:get-scan-data', scanner.getScanData);
scanner.onScanUpdate = () => {
  mainWindow?.webContents.send('scanner:scan-update');
};
ipcMain.on('scanner:start-scan', (event, args) => {
  scanner.startScan({
    onCaptureImage: () => {
      event.reply('image-captured');
    },
    onImageSaved: (imagePath: string) => {
      event.reply('image-saved', imagePath);
    },
  });
});

// Create a ScanStore object
createScanStore().then((scanStore) => {
  scanner.onScanComplete = (scan: Scan) => {
    scanStore.addScan(scan);
  };
  ipcMain.handle('scan-store:get-scans', scanStore.getScans);
  ipcMain.handle(
    'scan-store:get-scans-with-email',
    scanStore.getScansWithEmail,
  );
  ipcMain.handle('scan-store:get-scan', async (event, args) => {
    return scanStore.getScan(args[0]);
  });
  ipcMain.handle('scan-store:get-scan-with-email', async (event, args) => {
    return scanStore.getScanWithEmail(args[0]);
  });
});

// If no 'scanner:start-scan' event for 5 minutes, emit a 'main:idle' event
let idleTimer: NodeJS.Timeout;
let idleTime = 10 * 60 * 1000;
const resetIdleTimer = () => {
  console.log('resetIdleTimer() called');
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    console.log('idleTimer expired');
    mainWindow?.webContents.send('main:idle');
    resetIdleTimer();
  }, idleTime);
};
ipcMain.on('scanner:start-scan', (event, args) => {
  resetIdleTimer();
});
ipcMain.on('scanner:set-person-id', (event, args) => {
  resetIdleTimer();
});
resetIdleTimer();

// *************************************************************

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      webSecurity: false, // TODO: remove this
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
