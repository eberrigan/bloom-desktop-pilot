// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { Image, Phenotyper, Scan } from "@prisma/client";
import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

export type Channels =
  | "ipc-example"
  | "scanner:start-scan"
  | "scanner:scan-update"
  | "scanner:scan-error"
  | "streamer:image-captured"
  | "streamer:streaming-stopped"
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
    getPlantQrCodeList: () => ipcRenderer.invoke("scanner:get-plant-qr-code-list"),
    setPlantQrCode: (plantQrCode: string | null) =>
      ipcRenderer.invoke("scanner:set-plant-qr-code", [plantQrCode]),
    setAccessionId: (accessionId : string | null) => 
      ipcRenderer.invoke("scanner:set-accession-id", [accessionId]),
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
    getScans: (showTodayOnly: boolean) =>
      ipcRenderer.invoke("scan-store:get-scans", [showTodayOnly]) as Promise<
        (Scan & {
          phenotyper: Phenotyper;
          images: Image[];
        })[]
      >,
    getScan: (scanId: string) =>
      ipcRenderer.invoke("scan-store:get-scan", [scanId]) as Promise<
        Scan & {
          phenotyper: Phenotyper;
          images: Image[];
        }
      >,
    getMostRecentScanDate: (experimentId: string, plantId: string) =>
      ipcRenderer.invoke("scan-store:get-most-recent-scan-date", [
        experimentId,
        plantId,
      ]) as Promise<Date | null>,
    deleteScan: (scanId: string) =>
      ipcRenderer.invoke("scan-store:delete-scan", [scanId]),
  },
  electric: {
    getPhenotypers: () => ipcRenderer.invoke("electric:get-phenotypers"),
    createPhenotyper: (name: string, email: string) =>
      ipcRenderer.invoke("electric:create-phenotyper", [name, email]),
    getScientists: () => ipcRenderer.invoke("electric:get-scientists"),
    createScientist: (name: string, email: string) =>
      ipcRenderer.invoke("electric:create-scientist", [name, email]),
    createAccession: (name: string) =>
      ipcRenderer.invoke("electric:create-accession", [name]),
    createPlantAccessionMap: (accession_id: string, plant_barcode:string, accession_file_id:string ) =>
      ipcRenderer.invoke("electric:create-plant-accession-map", [accession_id, plant_barcode, accession_file_id]),
    getAccession: (id: string) =>
      ipcRenderer.invoke("electric:get-accession", id),
    getAccessionId : (plantQRcode : string, experiment_id : string) => 
      ipcRenderer.invoke("electric:get-accession-id", plantQRcode, experiment_id),
    getAccessionFiles: () =>
      ipcRenderer.invoke("electric:get-accession-files"),
    getAccessionIdFiles: (experiment_Id : string) =>
      ipcRenderer.invoke("electric:get-accession-id-file",[experiment_Id]),
    getAccessionListWithFileId: (accession_id:string) =>
      ipcRenderer.invoke("electric:get-accession-list-with-file-id",[accession_id]),
    updateAccessionFile: (editing_field:string, editing_row_id:string, editing_value:string) =>
      ipcRenderer.invoke("electric:update-accession-file", editing_field, editing_row_id, editing_value),
      // ipcRenderer.invoke("electric:update-accession-file",[editing_field, editing_row_id, editing_value]),
    getExperiments: () => ipcRenderer.invoke("electric:get-experiments"),
    createExperiment: (name: string, species: string, scientist_id: string, accession_id:string) =>
    {
      console.log("Creating experiment with accession ID:", accession_id);
      return ipcRenderer.invoke("electric:create-experiment", [
        name,
        species,
        scientist_id,
        accession_id,
      ])
    },
    attachAccessionToExperiment: (experiment_id: string, accession_id: string) =>
      {
        return ipcRenderer.invoke("electric:attach-accession-to-experiment", [
        experiment_id,
        accession_id,
      ])},
    getStatus: () => ipcRenderer.invoke("electric:get-status"),
    uploadImages: () => ipcRenderer.invoke("electric:upload-images"),
    getExperimentsWithScans: () =>
      ipcRenderer.invoke("electric:get-experiments-with-scans"),
    getWaveNumbers: (experimentId: string) =>
      ipcRenderer.invoke("electric:get-wave-numbers", [experimentId]),
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
