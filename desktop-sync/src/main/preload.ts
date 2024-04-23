// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import {
  Electric_cyl_scans,
  Electric_phenotypers,
  Electric_cyl_images,
  Electric_cyl_experiments,
} from "../generated/client";

export type Channels =
  | "ipc-example"
  | "scanner:start-scan"
  | "scanner:scan-update"
  | "scanner:scan-error"
  | "streamer:image-captured"
  | "main:idle"
  | "image-captured"
  | "image-saved"
  | "electric:scans-updated";

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  // bloom: {
  //   getPeople: () => ipcRenderer.invoke("bloom:get-people"),
  // },
  fs: {
    pickDir: () => ipcRenderer.invoke("fs:pick-dir"),
    copyScans: (scanPaths: string[], dir: string) =>
      ipcRenderer.invoke("fs:copy-scans", scanPaths.concat([dir])),
  },
  scanner: {
    getScannerId: () => ipcRenderer.invoke("scanner:get-scanner-id"),
    getPhenotyperId: () => ipcRenderer.invoke("scanner:get-phenotyper-id"),
    setPhenotyperId: (phenotyperId: string | null) =>
      ipcRenderer.send("scanner:set-phenotyper-id", [phenotyperId]),
    getPlantQrCode: () => ipcRenderer.invoke("scanner:get-plant-qr-code"),
    setPlantQrCode: (plantQrCode: string | null) =>
      ipcRenderer.invoke("scanner:set-plant-qr-code", [plantQrCode]),
    getExperimentId: () => ipcRenderer.invoke("scanner:get-experiment-id"),
    setExperimentId: (experimentId: string | null) =>
      ipcRenderer.send("scanner:set-experiment-id", [experimentId]),
    getWaveNumber: () => ipcRenderer.invoke("scanner:get-wave-number"),
    setWaveNumber: (waveNumber: number | null) =>
      ipcRenderer.send("scanner:set-wave-number", [waveNumber]),
    getPlantAgeDays: () => ipcRenderer.invoke("scanner:get-plant-age-days"),
    setPlantAgeDays: (plantAgeDays: number | null) =>
      ipcRenderer.send("scanner:set-plant-age-days", [plantAgeDays]),
    startScan: () => ipcRenderer.send("scanner:start-scan"),
    getScanData: () => ipcRenderer.invoke("scanner:get-scan-data"),
    getScansDir: () => ipcRenderer.invoke("scanner:get-scans-dir"),
    getScannerSettings: () => ipcRenderer.invoke("scanner:get-settings"),
    setScannerSettings: (settings: {
      exposure_time: number;
      gain: number;
      brightness: number;
      contrast: number;
      gamma: number;
      seconds_per_rot: number;
      num_frames: number;
    }) => ipcRenderer.invoke("scanner:set-settings", [settings]),
    saveCurrentScan: () => ipcRenderer.invoke("scanner:save-current-scan"),
    deleteCurrentScan: () => ipcRenderer.invoke("scanner:delete-current-scan"),
    resetScanner: () => ipcRenderer.invoke("scanner:reset-scanner"),
  },
  streamer: {
    startStreaming: () => ipcRenderer.invoke("streamer:start-streaming"),
    stopStreaming: () => ipcRenderer.invoke("streamer:stop-streaming"),
    getCameraSettings: () => ipcRenderer.invoke("streamer:get-camera-settings"),
    setCameraSettings: (settings: {
      exposure_time: number;
      gain: number;
      brightness: number;
      contrast: number;
      gamma: number;
    }) => ipcRenderer.invoke("streamer:set-camera-settings", [settings]),
  },
  scanStore: {
    getScans: () =>
      ipcRenderer.invoke("scan-store:get-scans") as Promise<
        (Electric_cyl_scans & {
          electric_phenotypers: Electric_phenotypers;
          electric_cyl_images: Electric_cyl_images[];
        })[]
      >,
    getScan: (scanId: string) =>
      ipcRenderer.invoke("scan-store:get-scan", [scanId]) as Promise<
        Electric_cyl_scans & {
          electric_phenotypers: Electric_phenotypers;
          electric_cyl_images: Electric_cyl_images[];
        }
      >,
    deleteScan: (scanId: string) =>
      ipcRenderer.invoke("scan-store:delete-scan", [scanId]),
  },
  electric: {
    getPhenotypers: () => ipcRenderer.invoke("electric:get-phenotypers"),
    createPhenotyper: (name: string, email: string) =>
      ipcRenderer.invoke("electric:create-phenotyper", [name, email]),
    getExperiments: () => ipcRenderer.invoke("electric:get-experiments"),
    createExperiment: (name: string, species: string) =>
      ipcRenderer.invoke("electric:create-experiment", [name, species]),
    getStatus: () => ipcRenderer.invoke("electric:get-status"),
    uploadImages: () => ipcRenderer.invoke("electric:upload-images"),
    getExperimentsWithScans: () =>
      ipcRenderer.invoke("electric:get-experiments-with-scans"),
  },
  bloom: {
    getCredentials: () =>
      ipcRenderer.invoke("bloom:get-credentials") as Promise<{
        email: string;
        password: string;
        bloom_api_url: string;
        bloom_anon_key: string;
      }>,
  },
};

contextBridge.exposeInMainWorld("electron", electronHandler);

export type ElectronHandler = typeof electronHandler;
