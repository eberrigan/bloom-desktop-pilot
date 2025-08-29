import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Ensure window exists with proper properties for React
if (typeof window === 'undefined') {
  global.window = {} as any;
}

// Mock window.electron globally for all renderer tests
// This runs before any test files are imported
Object.defineProperty(window, 'electron', {
  value: {
      ipcRenderer: {
        sendMessage: vi.fn(),
        on: vi.fn((channel: string, callback: Function) => vi.fn()),
        once: vi.fn(),
      },
      fs: {
        pickDir: vi.fn(),
        copyScans: vi.fn(),
      },
      scanner: {
        getScannerId: vi.fn(),
        getPhenotyperId: vi.fn(),
        setPhenotyperId: vi.fn(),
        getPlantQrCode: vi.fn(),
        getPlantQrCodeList: vi.fn(),
        setPlantQrCode: vi.fn(),
        setAccessionId: vi.fn(),
        getExperimentId: vi.fn(),
        setExperimentId: vi.fn(),
        getWaveNumber: vi.fn(),
        setWaveNumber: vi.fn(),
        getPlantAgeDays: vi.fn(),
        setPlantAgeDays: vi.fn(),
        startScan: vi.fn(),
        getScanData: vi.fn(),
        getScansDir: vi.fn(),
        getScannerSettings: vi.fn(),
        setScannerSettings: vi.fn(),
        saveCurrentScan: vi.fn(),
        deleteCurrentScan: vi.fn(),
        resetScanner: vi.fn(),
      },
      streamer: {
        startStreaming: vi.fn(),
        stopStreaming: vi.fn(),
        getCameraSettings: vi.fn(),
        setCameraSettings: vi.fn(),
      },
      scanStore: {
        getScans: vi.fn(),
        getScan: vi.fn(),
        deleteScan: vi.fn(),
        getMostRecentScanDate: vi.fn(),
      },
      electric: {
        getStatus: vi.fn(),
        getPhenotypers: vi.fn(),
        createPhenotyper: vi.fn(),
        getScientists: vi.fn(),
        createScientist: vi.fn(),
        getExperiments: vi.fn(),
        getWaveNumbers: vi.fn(),
        createExperiment: vi.fn(),
        attachAccessionToExperiment: vi.fn(),
        getExperimentsWithScans: vi.fn(),
        scanPresentOnSupabase: vi.fn(),
        uploadImages: vi.fn(),
        getImagesToUpload: vi.fn(),
        getAccessionFiles: vi.fn(),
        createAccessionFile: vi.fn(),
        getAccessionListFile: vi.fn(),
        getAccessionListFileWID: vi.fn(),
        updateAcFile: vi.fn(),
        getAccessionIdFiles: vi.fn(),
        getAccessionId: vi.fn(),
        createAccession: vi.fn(),
        createPlantAccessionMapping: vi.fn(),
      },
      imageUploader: {
        uploadImages: vi.fn(),
      },
    },
  writable: true,
  configurable: true,
});

afterEach(() => {
  cleanup();
});