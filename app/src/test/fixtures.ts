/**
 * Test fixtures for camera, scanner, and other hardware-related components
 * Based on configurations from app/README.md and desktop-config.yaml.example
 */

export const cameraFixtures = {
  defaultSettings: {
    gain: 100,
    exposure_time: 10000,
    brightness: 50,
    contrast: 50,
    gamma: 1.0,
    seconds_per_rot: 7,
    num_frames: 72,
  } as CameraSettings,
  
  minimalSettings: {
    gain: 0,
    exposure_time: 1000,
    brightness: 0,
    contrast: 0,
    gamma: 0.5,
    seconds_per_rot: 4,
    num_frames: 36,
  } as CameraSettings,
  
  maximalSettings: {
    gain: 200,
    exposure_time: 50000,
    brightness: 100,
    contrast: 100,
    gamma: 2.0,
    seconds_per_rot: 10,
    num_frames: 144,
  } as CameraSettings,
};

export const scannerFixtures = {
  defaultConfig: {
    scanner_id: 'test-scanner-001',
    camera_ip_address: '10.0.0.23', // Production camera IP from pylon.py
    scans_dir: 'test/sample_scan',
    db_path: ':memory:', // Use in-memory DB for tests
  },
  
  fakeCameraConfig: {
    scanner_id: 'test-scanner-fake',
    camera_ip_address: 'fake', // Triggers fake camera mode
    scans_dir: 'test/sample_scan',
    db_path: ':memory:',
  },
};

export const scanDataFixtures = {
  completeScan: {
    id: 'scan-001',
    phenotyper_id: 'phenotyper-001',
    plant_qr_code: 'PLANT-12345',
    experiment_id: 'exp-001',
    wave_number: 1,
    plant_age_days: 14,
    deleted: false,
    completed: true,
    uploaded: false,
    capture_date: new Date('2024-01-15T10:30:00'),
    num_frames: 72,
    path: 'test/sample_scan',
  },
  
  inProgressScan: {
    id: 'scan-002',
    phenotyper_id: 'phenotyper-001',
    plant_qr_code: 'PLANT-67890',
    experiment_id: 'exp-001',
    wave_number: 1,
    plant_age_days: 7,
    deleted: false,
    completed: false,
    uploaded: false,
    capture_date: new Date(),
    num_frames: 0,
    path: null,
  },
};

export const experimentFixtures = {
  defaultExperiment: {
    id: 'exp-001',
    name: 'Test Experiment',
    species: 'Arabidopsis thaliana',
    scientist_id: 'scientist-001',
    accession_id: 'acc-001',
  },
};

export const phenotyperFixtures = {
  defaultPhenotyper: {
    id: 'phenotyper-001',
    name: 'Test User',
    email: 'test@example.com',
  },
};

// Mock electron API for testing
export const mockElectronAPI = {
  scanner: {
    getScannerSettings: () => Promise.resolve(cameraFixtures.defaultSettings),
    setScannerSettings: (settings: CameraSettings) => Promise.resolve(),
    getScannerId: () => Promise.resolve('test-scanner-001'),
    getPhenotyperId: () => Promise.resolve('phenotyper-001'),
    setPhenotyperId: (id: string | null) => Promise.resolve(),
    getPlantQrCode: () => Promise.resolve('PLANT-12345'),
    getPlantQrCodeList: () => Promise.resolve(['PLANT-12345', 'PLANT-67890']),
    setPlantQrCode: (code: string | null) => Promise.resolve(),
    setAccessionId: (id: string | null) => Promise.resolve(),
    getExperimentId: () => Promise.resolve('exp-001'),
    setExperimentId: (id: string | null) => Promise.resolve(),
    getWaveNumber: () => Promise.resolve(1),
    setWaveNumber: (num: number | null) => Promise.resolve(),
    getPlantAgeDays: () => Promise.resolve(14),
    setPlantAgeDays: (days: number | null) => Promise.resolve(),
    startScan: () => Promise.resolve(),
    getScanData: () => Promise.resolve(scanDataFixtures.inProgressScan),
    getScansDir: () => Promise.resolve('test/sample_scan'),
    deleteCurrentScan: () => Promise.resolve(),
    resetScanner: () => Promise.resolve(),
  },
  
  streamer: {
    startStreaming: () => Promise.resolve(),
    stopStreaming: () => Promise.resolve(),
  },
  
  electric: {
    getPhenotypers: () => Promise.resolve([phenotyperFixtures.defaultPhenotyper]),
    createPhenotyper: (name: string, email: string) => Promise.resolve({ id: 'new-id', name, email }),
    getScientists: () => Promise.resolve([]),
    createScientist: (name: string, email: string) => Promise.resolve({ id: 'new-id', name, email }),
    getExperiments: () => Promise.resolve([experimentFixtures.defaultExperiment]),
    createExperiment: (name: string, species: string, scientist_id: string, accession_id: string) => 
      Promise.resolve({ id: 'new-id', name, species, scientist_id, accession_id }),
    getStatus: () => Promise.resolve({
      acquiringJWT: false,
      connectingToElectric: false,
      jwt: '',
      electricIsNull: true,
      electricIsConnected: false,
      finishedSyncing: false,
    }),
  },
  
  bloom: {
    getCredentials: () => Promise.resolve({
      bloom_api_url: 'https://test.supabase.co',
      bloom_anon_key: 'test-anon-key',
      email: 'test@example.com',
      password: 'test-password',
    }),
  },
  
  fs: {
    pickDir: () => Promise.resolve('/test/directory'),
    copyScans: (scanPaths: string[], dir: string) => Promise.resolve(),
  },
};

/**
 * Helper to setup window.electron mock for tests
 * Usage: setupElectronMocks() in beforeEach or at top of test file
 */
export function setupElectronMocks(overrides = {}) {
  const mocks = { ...mockElectronAPI, ...overrides };
  
  if (typeof window !== 'undefined') {
    (window as any).electron = mocks;
  } else {
    (global as any).window = { electron: mocks };
  }
  
  return mocks;
}