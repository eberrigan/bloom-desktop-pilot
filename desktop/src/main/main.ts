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
import { spawn } from 'node:child_process';
import * as os from 'node:os';
import * as fs from 'node:fs';
import * as yaml from 'js-yaml';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

// Settings for the Slow Scanner @ Greenhouse

// const python = 'C:\\Users\\PBIOB-GH.PBIOB-GH-05\\.conda\\envs\\pylon\\python.exe'
// const pylon = 'C:\\Users\\PBIOB-GH.PBIOB-GH-05\\Documents\\bloom\\pylon\\pylon.py'
// const image_dir = 'C:\\Users\\PBIOB-GH.PBIOB-GH-05\\Documents\\scans\\' + 'foobar'

// Settings for the Scanner @ PBIO

// const python = 'C:\\Users\\Salk Root Imager\\.conda\\envs\\bloom-desktop\\python.exe'
// const pylon = 'C:\\repos\\bloom-desktop-pilot\\pylon\\pylon_rot.py'
// const image_dir = 'C:\\Users\\Salk Root Imager\\bloom-data\\images'

const homedir = os.homedir();
const config_yaml = path.join(homedir, '.bloom', 'desktop-config.yaml');
console.log(config_yaml);

// Load config.yaml
const config = yaml.load(fs.readFileSync(config_yaml, 'utf8')) as {
  python: string;
  capture_scan_py: string;
  scans_dir: string;
};
console.log(config);

const python = config.python;
const capture_scan_py = config.capture_scan_py;
const scans_dir = config.scans_dir;

ipcMain.on('start-scan', async (event, args) => {
  // event.reply('start-scan', `main received data: ${arg}`);

  const [scan_name] = args;

  const grab_frames = spawn(python, [
    capture_scan_py,
    path.join(scans_dir, scan_name),
  ]);

  grab_frames.stdout.on('data', (data) => {
    console.log('JS received data from python');
    const str = data.toString();
    console.log(str);
    if (str.slice(0, 14) === 'TRIGGER_CAMERA') {
      console.log('data matches TRIGGER_CAMERA');
      event.reply('image-captured');
    }
    if (str.slice(0, 10) === 'IMAGE_PATH') {
      console.log('data matches IMAGE_PATH');
      event.reply('image-saved', str.slice(11));
    }
  });
});

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
      webSecurity: false,
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
