// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import {
  Electric_cyl_scans,
  Electric_phenotypers,
  Electric_cyl_images,
} from "../generated/client";

export type Channels =
  | "ipc-example"
  | "scanner:start-scan"
  | "scanner:scan-update"
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
  scanner: {
    getScannerId: () => ipcRenderer.invoke("scanner:get-scanner-id"),
    getPhenotyperId: () => ipcRenderer.invoke("scanner:get-phenotyper-id"),
    setPhenotyperId: (phenotyperId: string | null) =>
      ipcRenderer.send("scanner:set-phenotyper-id", [phenotyperId]),
    getPlantQrCode: () => ipcRenderer.invoke("scanner:get-plant-qr-code"),
    setPlantQrCode: (plantQrCode: string | null) =>
      ipcRenderer.invoke("scanner:set-plant-qr-code", [plantQrCode]),
    startScan: () => ipcRenderer.send("scanner:start-scan"),
    getScanData: () => ipcRenderer.invoke("scanner:get-scan-data"),
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
  },
  electric: {
    getPhenotypers: () => ipcRenderer.invoke("electric:get-phenotypers"),
    getStatus: () => ipcRenderer.invoke("electric:get-status"),
    uploadImages: () => ipcRenderer.invoke("electric:upload-images"),
  },
};

contextBridge.exposeInMainWorld("electron", electronHandler);

export type ElectronHandler = typeof electronHandler;
