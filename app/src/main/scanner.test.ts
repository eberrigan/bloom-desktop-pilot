import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { createScanner, defaultCameraSettings } from './scanner';
import { scannerFixtures } from '../test/fixtures';

// Mock uuid first
vi.mock('uuid', () => ({
  v4: () => 'test-uuid-1234',
}));

// Mock fs module
vi.mock('fs', () => ({
  default: {
    existsSync: vi.fn(() => false),
    mkdirSync: vi.fn(),
    writeFile: vi.fn((path, data, cb) => cb && cb(null)),
  },
}));

// Mock child_process with partial mocking
vi.mock('node:child_process', async () => {
  const actual = await vi.importActual('node:child_process');
  return {
    ...actual,
    spawn: vi.fn(() => ({
      stdout: { on: vi.fn() },
      stderr: { on: vi.fn() },
      stdin: { on: vi.fn() },
      kill: vi.fn(() => true),
    })),
  };
});

describe('Scanner', () => {
  let scanner: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    
    // Import spawn after mocking
    const { spawn } = await import('node:child_process');
    const mockSpawn = spawn as any;
    
    // Setup mock child process
    mockSpawn.mockReturnValue({
      stdout: { on: vi.fn() },
      stderr: { on: vi.fn() },
      stdin: { on: vi.fn() },
      kill: vi.fn(() => true),
    });
    
    scanner = createScanner(scannerFixtures.testConfig);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Constructor and basic getters', () => {
    it('creates scanner with config', () => {
      expect(scanner.getScannerId()).toBe('test-scanner');
      expect(scanner.getScansDir()).toBe('test/output');
    });

    it('initializes with default camera settings', () => {
      const settings = scanner.getCameraSettings();
      expect(settings).toEqual(defaultCameraSettings());
    });

    it('returns default camera settings', () => {
      const settings = defaultCameraSettings();
      expect(settings).toEqual({
        num_frames: 72,
        exposure_time: 10000,
        gain: 100,
        brightness: 0,
        contrast: 0,
        gamma: 1,
        seconds_per_rot: 7,
      });
    });
  });

  describe('Property setters and getters', () => {
    it('sets and gets phenotyper ID', () => {
      expect(scanner.getPhenotyperId()).toBeNull();
      scanner.setPhenotyperId('phenotyper-123');
      expect(scanner.getPhenotyperId()).toBe('phenotyper-123');
    });

    it('sets and gets plant QR code', () => {
      expect(scanner.getPlantQrCode()).toBeNull();
      scanner.setPlantQrCode('PLANT-ABC123');
      expect(scanner.getPlantQrCode()).toBe('PLANT-ABC123');
    });

    it('sets and gets accession ID', () => {
      expect(scanner.getAccessionId()).toBeNull();
      scanner.setAccessionId('ACC-001');
      expect(scanner.getAccessionId()).toBe('ACC-001');
    });

    it('sets and gets experiment ID', () => {
      expect(scanner.getExperimentId()).toBeNull();
      scanner.setExperimentId('exp-456');
      expect(scanner.getExperimentId()).toBe('exp-456');
    });

    it('sets and gets wave number', () => {
      expect(scanner.getWaveNumber()).toBeNull();
      scanner.setWaveNumber(2);
      expect(scanner.getWaveNumber()).toBe(2);
    });

    it('sets and gets plant age days', () => {
      expect(scanner.getPlantAgeDays()).toBeNull();
      scanner.setPlantAgeDays(14);
      expect(scanner.getPlantAgeDays()).toBe(14);
    });

    it('sets and gets camera settings', () => {
      const newSettings = {
        ...defaultCameraSettings(),
        gain: 150,
      };
      scanner.setCameraSettings(newSettings);
      expect(scanner.getCameraSettings()).toEqual(newSettings);
    });
  });

  describe('getScanData', () => {
    it('returns initial scan data', () => {
      const data = scanner.getScanData();
      expect(data).toEqual({
        metadata: null,
        progress: {
          nImagesCaptured: 0,
          nImagesSaved: 0,
          status: 'idle',
        },
        scanImages: [],
      });
    });
  });

  describe('startScan validation', () => {
    const mockCallbacks = {
      onCaptureImage: vi.fn(),
      onImageSaved: vi.fn(),
    };

    it('throws error if phenotyper ID is not set', async () => {
      scanner.setPlantQrCode('PLANT-123');
      scanner.setAccessionId('ACC-001');
      scanner.setExperimentId('exp-001');
      scanner.setWaveNumber(1);
      scanner.setPlantAgeDays(7);
      
      await expect(scanner.startScan(mockCallbacks)).rejects.toThrow('personId is null');
    });

    it('throws error if plant QR code causes path issue', async () => {
      scanner.setPhenotyperId('phenotyper-001');
      scanner.setPlantQrCode(null); // This will cause path.join to fail
      scanner.setAccessionId('ACC-001');
      scanner.setExperimentId('exp-001');
      scanner.setWaveNumber(1);
      scanner.setPlantAgeDays(7);
      
      // When plantId is null, path.join will fail with this error
      await expect(scanner.startScan(mockCallbacks)).rejects.toThrow('The "path" argument must be of type string');
    });

    it('throws error if accession ID is not set', async () => {
      scanner.setPhenotyperId('phenotyper-001');
      scanner.setPlantQrCode('PLANT-123');
      scanner.setAccessionId(null);
      scanner.setExperimentId('exp-001');
      scanner.setWaveNumber(1);
      scanner.setPlantAgeDays(7);
      
      await expect(scanner.startScan(mockCallbacks)).rejects.toThrow('accessionId is null');
    });
  });

  describe('startScan execution', () => {
    const mockCallbacks = {
      onCaptureImage: vi.fn(),
      onImageSaved: vi.fn(),
    };

    beforeEach(() => {
      // Set required metadata
      scanner.setPhenotyperId('phenotyper-001');
      scanner.setPlantQrCode('PLANT-123');
      scanner.setAccessionId('ACC-001');
      scanner.setExperimentId('exp-001');
      scanner.setWaveNumber(1);
      scanner.setPlantAgeDays(7);
    });

    it.skip('starts scan and spawns python process', async () => {
      // Import spawn to ensure mock is ready
      const childProcess = await import('node:child_process');
      
      await scanner.startScan(mockCallbacks);
      
      // The spawn function should have been called
      expect(childProcess.spawn).toHaveBeenCalled();
      
      // Check the arguments
      const spawnCall = (childProcess.spawn as any).mock.calls[0];
      expect(spawnCall[0]).toBe('python');
      expect(spawnCall[1][0]).toBe('test/mock_capture.py');
      expect(spawnCall[1][1]).toContain('test-uuid-1234');
      expect(spawnCall[1][2]).toContain('"num_frames":72');
    });

    it.skip('creates scan directory and writes metadata', async () => {
      const fs = await import('fs');
      
      await scanner.startScan(mockCallbacks);
      
      expect(fs.default.mkdirSync).toHaveBeenCalledWith(
        expect.stringContaining('test-uuid-1234'),
        { recursive: true }
      );
      
      // Check that writeFile was called and the metadata contains the expected plant_id
      expect(fs.default.writeFile).toHaveBeenCalled();
      const writeFileCall = (fs.default.writeFile as any).mock.calls[0];
      expect(writeFileCall[0]).toContain('metadata.json');
      expect(writeFileCall[1]).toContain('"plant_id":"PLANT-123"');
    });
  });

  describe('resetScanner', () => {
    it('resets scan state but preserves configuration', () => {
      // Set some values
      scanner.setPhenotyperId('phenotyper-001');
      scanner.setPlantQrCode('PLANT-123');
      scanner.setExperimentId('exp-001');
      scanner.setWaveNumber(2);
      scanner.setPlantAgeDays(14);
      
      // Reset
      scanner.resetScanner();
      
      // Check only scan-related values are reset
      const scanData = scanner.getScanData();
      expect(scanData.metadata).toBeNull();
      expect(scanData.progress.status).toBe('idle');
      expect(scanData.scanImages).toEqual([]);
      
      // These values should still be set
      expect(scanner.getPhenotyperId()).toBe('phenotyper-001');
      expect(scanner.getPlantQrCode()).toBe('PLANT-123');
      expect(scanner.getExperimentId()).toBe('exp-001');
      expect(scanner.getWaveNumber()).toBe(2);
      expect(scanner.getPlantAgeDays()).toBe(14);
    });
  });
});