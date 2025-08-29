# Enhanced Test Coverage Plan: Path to 100% Coverage

## Current State Analysis

### Coverage Metrics
- **Overall**: 68.83% (698/1014 lines)
- **Statements**: 68.83% 
- **Functions**: 70.73% (58/82)
- **Branches**: 88.42% (84/95)

### Architecture Overview
```
┌─────────────────────────────────────────────────┐
│                 Main Process                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  main.ts │  │scanner.ts│  │prismastore.ts│  │
│  └──────────┘  └──────────┘  └──────────────┘  │
│         │            │              │           │
│         └────────────┼──────────────┘           │
│                      ▼                          │
│                ┌──────────┐                     │
│                │preload.ts│                     │
│                └──────────┘                     │
└─────────────────────┼───────────────────────────┘
                      │ IPC
┌─────────────────────┼───────────────────────────┐
│                     ▼                           │
│              Renderer Process                   │
│  ┌────────┐  ┌──────────────┐  ┌────────────┐ │
│  │ App.tsx│  │CaptureScan.tsx│  │BrowseScans│ │
│  └────────┘  └──────────────┘  └────────────┘ │
└─────────────────────────────────────────────────┘
                      │
                      ▼
              Python Service (Camera)
```

## Testing Strategy Implementation

### Layer 1: Shared Contract Layer
Create a shared contract layer to decouple Electron from business logic:

#### 1.1 Create Contract Definitions
**File: `src/shared/contracts.ts`**
```typescript
import { z } from 'zod';

// Scanner Contract
export const ScanRequestSchema = z.object({
  scanId: z.string().uuid(),
  phenotyperId: z.string(),
  experimentId: z.string(),
  plantId: z.string(),
  settings: z.object({
    exposure_time: z.number(),
    gain: z.number(),
    num_frames: z.number()
  })
});

// Camera Service Contract
export const CameraStatusSchema = z.object({
  connected: z.boolean(),
  serialNumber: z.string().optional(),
  modelName: z.string().optional()
});

export const FrameCapturedSchema = z.object({
  frameIndex: z.number(),
  timestamp: z.string().datetime(),
  filePath: z.string()
});
```

#### 1.2 IPC Adapter Interface
**File: `src/shared/ipc-adapter.ts`**
```typescript
export interface IPCAdapter {
  send(channel: string, data: unknown): void;
  invoke<T>(channel: string, ...args: unknown[]): Promise<T>;
  on(channel: string, listener: (...args: unknown[]) => void): () => void;
}

// Production implementation
export class ElectronIPCAdapter implements IPCAdapter {
  // Implementation using actual Electron IPC
}

// Test implementation  
export class MockIPCAdapter implements IPCAdapter {
  // Mock implementation for testing
}
```

### Layer 2: Service Layer Testing

#### 2.1 Mock Python Camera Service
**File: `tools/mock-python-service.ts`**
```typescript
import { spawn } from 'child_process';
import { EventEmitter } from 'events';

export class MockPythonService extends EventEmitter {
  private responses = new Map<string, any>();
  
  constructor() {
    super();
    this.setupDefaultResponses();
  }
  
  private setupDefaultResponses() {
    this.responses.set('camera.connect', {
      status: 'connected',
      serialNumber: 'MOCK-12345',
      modelName: 'Mock Camera v1'
    });
    
    this.responses.set('camera.capture', {
      frameIndex: 0,
      timestamp: new Date().toISOString(),
      filePath: '/mock/path/frame_0.png'
    });
  }
  
  send(command: string, data: any) {
    const response = this.responses.get(command);
    if (response) {
      setTimeout(() => {
        this.emit('response', { command, data: response });
      }, 10);
    }
  }
}
```

### Layer 3: Unit Test Improvements

#### 3.1 Complete PrismaStore Tests
**File: `src/main/prismastore.test.ts` (additions)**
```typescript
describe('PrismaStore - Uncovered Methods', () => {
  let store: PrismaStore;
  let mockPrisma: any;
  
  beforeEach(() => {
    mockPrisma = createMockPrismaClient();
    store = new PrismaStore('/test/scans', vi.fn(), mockPrisma);
  });

  // Lines 62-100: Scientist operations
  describe('Scientist operations', () => {
    it('should get all scientists', async () => {
      const scientists = [
        { id: 'sci-1', name: 'Dr. Smith', email: 'smith@test.com' },
        { id: 'sci-2', name: 'Dr. Jones', email: 'jones@test.com' }
      ];
      mockPrisma.scientist.findMany.mockResolvedValue(scientists);
      
      const result = await store.getScientists();
      expect(result).toEqual(scientists);
      expect(mockPrisma.scientist.findMany).toHaveBeenCalled();
    });

    it('should create scientist successfully', async () => {
      mockPrisma.scientist.create.mockResolvedValue({
        id: 'new-sci',
        name: 'Dr. New',
        email: 'new@test.com'
      });
      
      const result = await store.createScientist('Dr. New', 'new@test.com');
      expect(result.error).toBeNull();
      expect(mockPrisma.scientist.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          name: 'Dr. New',
          email: 'new@test.com'
        })
      });
    });

    it('should handle scientist creation error', async () => {
      const error = new Error('Duplicate email');
      mockPrisma.scientist.create.mockRejectedValue(error);
      
      const result = await store.createScientist('Dr. Dup', 'dup@test.com');
      expect(result.error).toBe(error);
    });
  });

  // Lines 121-168: Accession operations
  describe('Accession operations', () => {
    it('should get accession by ID', async () => {
      const accession = { id: 'acc-1', name: 'Accession 1' };
      mockPrisma.accessions.findUnique.mockResolvedValue(accession);
      
      const result = await store.getAccessions('acc-1');
      expect(result).toEqual(accession);
    });

    it('should get accession ID for plant QR code', async () => {
      const mapping = {
        plant_barcode: 'QR123',
        accession_id: 'acc-1',
        accession: { id: 'acc-1', name: 'Test Accession' }
      };
      mockPrisma.plantAccessionMappings.findFirst.mockResolvedValue(mapping);
      
      const result = await store.getAccessionsID('QR123', 'exp-1');
      expect(result).toEqual({
        plant_barcode: 'QR123',
        accession_id: 'acc-1',
        accession_name: 'Test Accession'
      });
    });

    it('should throw error when mapping not found', async () => {
      mockPrisma.plantAccessionMappings.findFirst.mockResolvedValue(null);
      
      await expect(store.getAccessionsID('INVALID', 'exp-1'))
        .rejects.toThrow('Mapping not found for given plant QR code');
    });
  });

  // Lines 239-285: Experiment operations
  describe('Experiment operations', () => {
    it('should get all experiments', async () => {
      const experiments = [
        { id: 'exp-1', name: 'Experiment 1', species: 'Arabidopsis' }
      ];
      mockPrisma.experiment.findMany.mockResolvedValue(experiments);
      
      const result = await store.getExperiments();
      expect(result).toEqual(experiments);
    });

    it('should create experiment with accession', async () => {
      mockPrisma.experiment.create.mockResolvedValue({
        id: 'new-exp',
        name: 'New Experiment',
        species: 'Corn',
        scientist_id: 'sci-1',
        accession_id: 'acc-1'
      });
      
      const result = await store.createExperiment({
        name: 'New Experiment',
        species: 'Corn',
        scientist_id: 'sci-1',
        accession_id: 'acc-1'
      });
      
      expect(result.error).toBeNull();
    });

    it('should attach accession to existing experiment', async () => {
      mockPrisma.experiment.update.mockResolvedValue({
        id: 'exp-1',
        accession_id: 'acc-2'
      });
      
      const result = await store.attachAccessionToExperiment('exp-1', 'acc-2');
      expect(result.error).toBeNull();
      expect(mockPrisma.experiment.update).toHaveBeenCalledWith({
        where: { id: 'exp-1' },
        data: { accession_id: 'acc-2' }
      });
    });
  });

  // Lines 316-335: Scan filtering
  describe('Scan filtering operations', () => {
    it('should filter scans by date when showTodayOnly is true', async () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const scans = [
        { id: 's1', capture_date: today, deleted: false },
        { id: 's2', capture_date: yesterday, deleted: false }
      ];
      
      mockPrisma.scan.findMany.mockResolvedValue(scans);
      
      const result = await store.getScans(true);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('s1');
    });

    it('should return all non-deleted scans when showTodayOnly is false', async () => {
      const scans = [
        { id: 's1', capture_date: new Date(), deleted: false },
        { id: 's2', capture_date: new Date(), deleted: false }
      ];
      
      mockPrisma.scan.findMany.mockResolvedValue(scans);
      
      const result = await store.getScans(false);
      expect(result).toHaveLength(2);
    });
  });

  // Lines 343-379: Scan date operations  
  describe('Most recent scan date operations', () => {
    it('should get most recent scan date for plant', async () => {
      const recentDate = new Date('2024-01-15');
      mockPrisma.scan.findFirst.mockResolvedValue({
        capture_date: recentDate
      });
      
      const result = await store.getMostRecentScanDate('exp-1', 'plant-1');
      expect(result).toEqual(recentDate);
    });

    it('should return null when no scans found', async () => {
      mockPrisma.scan.findFirst.mockResolvedValue(null);
      
      const result = await store.getMostRecentScanDate('exp-1', 'plant-new');
      expect(result).toBeNull();
    });
  });

  // Lines 487-494: Image upload operations
  describe('Image upload operations', () => {
    it('should get images pending upload', async () => {
      const images = [
        {
          id: 'img-1',
          status: 'PENDING',
          scan: { 
            id: 'scan-1',
            experiment: { id: 'exp-1' }
          }
        }
      ];
      
      mockPrisma.image.findMany.mockResolvedValue(images);
      
      const result = await store.getImagesToUpload();
      expect(result).toEqual(images);
      expect(mockPrisma.image.findMany).toHaveBeenCalledWith({
        where: { status: { not: 'UPLOADED' } },
        include: { scan: { include: { experiment: true } } },
        orderBy: { scan: { capture_date: 'asc' } }
      });
    });
  });
});
```

#### 3.2 Complete Scanner Tests
**File: `src/main/scanner.test.ts` (additions)**
```typescript
describe('Scanner - Uncovered Methods', () => {
  let scanner: Scanner;
  let mockLocalStorage: any;
  
  beforeEach(() => {
    mockLocalStorage = createMockLocalStorage();
    scanner = new Scanner(
      '/test/scans',
      'TestScanner',
      mockLocalStorage,
      vi.fn(),
      vi.fn(),
      vi.fn()
    );
  });

  // Lines 88-94: Scan data persistence
  describe('Scan data persistence', () => {
    it('should persist scan metadata', () => {
      scanner.setPhenotyperId('pheno-1');
      scanner.setPlantQrCode('QR123');
      scanner.setExperimentId('exp-1');
      scanner.setWaveNumber(1);
      scanner.setPlantAgeDays(14);
      
      scanner.startScan('scan-123');
      
      expect(scanner.scanMetadata).toMatchObject({
        id: 'scan-123',
        phenotyper_id: 'pheno-1',
        plant_id: 'QR123',
        experiment_id: 'exp-1',
        wave_number: 1,
        plant_age_days: 14
      });
    });

    it('should include camera settings in metadata', () => {
      const settings = {
        exposure_time: 100,
        gain: 50,
        brightness: 75,
        contrast: 50,
        gamma: 1.0,
        seconds_per_rot: 10,
        num_frames: 36
      };
      
      scanner.setCameraSettings(settings);
      scanner.setPhenotyperId('pheno-1');
      scanner.setPlantQrCode('QR123');
      scanner.setExperimentId('exp-1');
      
      scanner.startScan('scan-456');
      
      expect(scanner.scanMetadata).toMatchObject(settings);
    });
  });

  // Lines 134-152: Image capture simulation
  describe('Image capture flow', () => {
    it('should track image capture progress', () => {
      scanner.setPhenotyperId('pheno-1');
      scanner.setPlantQrCode('QR123');
      scanner.setExperimentId('exp-1');
      scanner.startScan('scan-789');
      
      expect(scanner.scanProgress.nImagesCaptured).toBe(0);
      
      scanner.imageCaptured();
      expect(scanner.scanProgress.nImagesCaptured).toBe(1);
      expect(scanner.scanProgress.status).toBe('capturing');
      
      scanner.imageCaptured();
      expect(scanner.scanProgress.nImagesCaptured).toBe(2);
    });

    it('should handle image save and completion', () => {
      const onComplete = vi.fn();
      scanner = new Scanner(
        '/test/scans',
        'TestScanner',
        mockLocalStorage,
        vi.fn(),
        vi.fn(),
        onComplete
      );
      
      scanner.setCameraSettings({ num_frames: 2 });
      scanner.setPhenotyperId('pheno-1');
      scanner.setPlantQrCode('QR123');
      scanner.setExperimentId('exp-1');
      scanner.startScan('scan-complete');
      
      scanner.imageSaved('/path/frame_0.png');
      expect(scanner.scanProgress.nImagesSaved).toBe(1);
      expect(scanner.scanProgress.status).toBe('saving');
      
      scanner.imageSaved('/path/frame_1.png');
      expect(scanner.scanProgress.nImagesSaved).toBe(2);
      expect(scanner.scanProgress.status).toBe('complete');
      expect(onComplete).toHaveBeenCalled();
    });
  });

  // Lines 207-232: Scan saving logic
  describe('Save current scan', () => {
    it('should save scan successfully', async () => {
      const mockSaveToDb = vi.fn().mockResolvedValue({ id: 'saved-scan' });
      scanner.saveToDb = mockSaveToDb;
      
      scanner.setPhenotyperId('pheno-1');
      scanner.setPlantQrCode('QR123');
      scanner.setExperimentId('exp-1');
      scanner.startScan('scan-save');
      
      scanner.imageSaved('/path/frame_0.png');
      
      await scanner.saveCurrentScan();
      
      expect(mockSaveToDb).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'scan-save',
          phenotyper_id: 'pheno-1',
          plant_id: 'QR123'
        }),
        ['/path/frame_0.png']
      );
    });

    it('should handle save errors', async () => {
      const mockSaveToDb = vi.fn().mockRejectedValue(new Error('DB Error'));
      scanner.saveToDb = mockSaveToDb;
      
      scanner.setPhenotyperId('pheno-1');
      scanner.setPlantQrCode('QR123');
      scanner.setExperimentId('exp-1');
      scanner.startScan('scan-error');
      
      await expect(scanner.saveCurrentScan()).rejects.toThrow('DB Error');
    });
  });

  // Lines 277-292: Current scan deletion
  describe('Delete current scan', () => {
    it('should delete scan and cleanup files', async () => {
      const mockRmSync = vi.spyOn(fs, 'rmSync').mockImplementation();
      const mockExistsSync = vi.spyOn(fs, 'existsSync').mockReturnValue(true);
      
      scanner.setPhenotyperId('pheno-1');
      scanner.setPlantQrCode('QR123');
      scanner.setExperimentId('exp-1');
      scanner.startScan('scan-delete');
      
      scanner.imageSaved('/test/scans/scan-delete/frame_0.png');
      
      await scanner.deleteCurrentScan();
      
      expect(mockRmSync).toHaveBeenCalledWith(
        '/test/scans/scan-delete',
        { recursive: true, force: true }
      );
      expect(scanner.scanMetadata).toBeNull();
      expect(scanner.scanProgress).toBeNull();
      expect(scanner.images).toEqual([]);
      
      mockRmSync.mockRestore();
      mockExistsSync.mockRestore();
    });

    it('should handle deletion when scan directory does not exist', async () => {
      const mockExistsSync = vi.spyOn(fs, 'existsSync').mockReturnValue(false);
      const mockRmSync = vi.spyOn(fs, 'rmSync').mockImplementation();
      
      scanner.setPhenotyperId('pheno-1');
      scanner.setPlantQrCode('QR123');
      scanner.setExperimentId('exp-1');
      scanner.startScan('scan-no-dir');
      
      await scanner.deleteCurrentScan();
      
      expect(mockRmSync).not.toHaveBeenCalled();
      expect(scanner.scanMetadata).toBeNull();
      
      mockExistsSync.mockRestore();
      mockRmSync.mockRestore();
    });
  });

  // Lines 306-311: Error handling
  describe('Error handling', () => {
    it('should handle errors in resetScanner', () => {
      scanner.scanMetadata = null;
      scanner.scanProgress = null;
      
      expect(() => scanner.resetScanner()).not.toThrow();
      
      expect(scanner.scanMetadata).toBeNull();
      expect(scanner.scanProgress).toBeNull();
      expect(scanner.images).toEqual([]);
    });

    it('should validate required fields before scan', () => {
      expect(() => scanner.startScan('test')).toThrow('Phenotyper ID is not set');
      
      scanner.setPhenotyperId('pheno-1');
      expect(() => scanner.startScan('test')).toThrow('Plant QR code is not set');
      
      scanner.setPlantQrCode('QR123');
      expect(() => scanner.startScan('test')).toThrow('Experiment ID is not set');
    });
  });
});
```

### Layer 4: React Component Testing

#### 4.1 Main App Component Test
**File: `src/renderer/App.test.tsx`**
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { App } from './App';

describe('App Component', () => {
  beforeEach(() => {
    // Reset all mocks from setup.ts
    vi.clearAllMocks();
  });

  it('renders navigation and main content', () => {
    render(<App />);
    
    expect(screen.getByText(/Capture/)).toBeInTheDocument();
    expect(screen.getByText(/Browse/)).toBeInTheDocument();
    expect(screen.getByText(/Export/)).toBeInTheDocument();
  });

  it('switches between tabs on navigation', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const browseTab = screen.getByText(/Browse/);
    await user.click(browseTab);
    
    await waitFor(() => {
      expect(screen.getByText(/Recent Scans/)).toBeInTheDocument();
    });
  });

  it('displays connection status badge', () => {
    window.electron.electric.getStatus.mockResolvedValue({
      connected: true,
      synced: true
    });
    
    render(<App />);
    
    expect(window.electron.electric.getStatus).toHaveBeenCalled();
  });
});
```

#### 4.2 CaptureScan Component Test
**File: `src/renderer/CaptureScan.test.tsx`**
```typescript
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CaptureScan } from './CaptureScan';

describe('CaptureScan Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup default mock responses
    window.electron.scanner.getScannerId.mockResolvedValue('SCANNER-001');
    window.electron.scanner.getScannerSettings.mockResolvedValue({
      num_frames: 36,
      exposure_time: 100,
      gain: 50
    });
    window.electron.scanner.getScanData.mockResolvedValue({
      metadata: null,
      progress: { status: 'idle', nImagesCaptured: 0, nImagesSaved: 0 },
      scanImages: []
    });
  });

  describe('Metadata Form', () => {
    it('renders all required metadata fields', () => {
      render(<CaptureScan />);
      
      expect(screen.getByText('Phenotyper')).toBeInTheDocument();
      expect(screen.getByText('Experiment')).toBeInTheDocument();
      expect(screen.getByText('Wave Number')).toBeInTheDocument();
      expect(screen.getByText('Plant Age (Days)')).toBeInTheDocument();
      expect(screen.getByText('Plant ID')).toBeInTheDocument();
    });

    it('validates required fields before enabling scan', async () => {
      render(<CaptureScan />);
      
      const scanButton = screen.getByText('Start scan');
      expect(scanButton).toBeDisabled();
      
      // Fill in required fields
      const phenotyperSelect = screen.getByRole('combobox', { name: /phenotyper/i });
      await userEvent.selectOptions(phenotyperSelect, 'pheno-1');
      
      // Button should still be disabled until all fields are filled
      expect(scanButton).toBeDisabled();
    });

    it('shows Plant ID autocomplete suggestions', async () => {
      window.electron.electric.getAccessionIdFiles.mockResolvedValue([
        { plant_barcode: 'PLANT-001' },
        { plant_barcode: 'PLANT-002' }
      ]);
      
      render(<CaptureScan />);
      
      const plantIdInput = screen.getByLabelText(/Plant ID/);
      await userEvent.type(plantIdInput, 'PLANT');
      
      await waitFor(() => {
        expect(screen.getByText('PLANT-001')).toBeInTheDocument();
        expect(screen.getByText('PLANT-002')).toBeInTheDocument();
      });
    });

    it('fetches and displays accession ID', async () => {
      window.electron.electric.getAccessionId.mockResolvedValue({
        accession_id: 'ACC-123',
        accession_name: 'Test Accession'
      });
      
      render(<CaptureScan />);
      
      // Set experiment and plant ID
      const experimentSelect = screen.getByRole('combobox', { name: /experiment/i });
      await userEvent.selectOptions(experimentSelect, 'exp-1');
      
      const plantIdInput = screen.getByLabelText(/Plant ID/);
      await userEvent.type(plantIdInput, 'PLANT-001');
      
      await waitFor(() => {
        expect(screen.getByText('ACC-123')).toBeInTheDocument();
      });
    });
  });

  describe('Scanning Workflow', () => {
    it('starts scan when all metadata is provided', async () => {
      render(<CaptureScan />);
      
      // Fill all required fields
      await fillAllRequiredFields();
      
      const scanButton = screen.getByText('Start scan');
      expect(scanButton).toBeEnabled();
      
      await userEvent.click(scanButton);
      
      expect(window.electron.scanner.startScan).toHaveBeenCalled();
    });

    it('displays scan progress', async () => {
      render(<CaptureScan />);
      
      // Simulate scan in progress
      window.electron.scanner.getScanData.mockResolvedValue({
        metadata: { id: 'scan-1' },
        progress: { status: 'capturing', nImagesCaptured: 5, nImagesSaved: 0 },
        scanImages: []
      });
      
      // Trigger update
      fireEvent(window, new CustomEvent('scanner:scan-update'));
      
      await waitFor(() => {
        expect(screen.getByText(/Scanning... 5 \/ 36/)).toBeInTheDocument();
      });
    });

    it('handles scan completion', async () => {
      const { rerender } = render(<CaptureScan />);
      
      // Simulate completed scan
      window.electron.scanner.getScanData.mockResolvedValue({
        metadata: { id: 'scan-1' },
        progress: { status: 'complete', nImagesCaptured: 36, nImagesSaved: 36 },
        scanImages: Array(36).fill('/path/to/image.png')
      });
      
      fireEvent(window, new CustomEvent('scanner:scan-update'));
      
      await waitFor(() => {
        expect(screen.queryByText(/Scanning.../)).not.toBeInTheDocument();
      });
    });
  });

  describe('Recent Scans Display', () => {
    it('shows recent scans for current scanner', async () => {
      window.electron.scanStore.getScans.mockResolvedValue([
        {
          id: 'scan-1',
          plant_id: 'PLANT-001',
          capture_date: new Date(),
          phenotyper: { name: 'Dr. Smith' },
          images: []
        }
      ]);
      
      render(<CaptureScan />);
      
      await waitFor(() => {
        expect(screen.getByText('PLANT-001')).toBeInTheDocument();
      });
    });
  });
});

// Helper function to fill required fields
async function fillAllRequiredFields() {
  // Implementation details...
}
```

### Layer 5: Integration Testing

#### 5.1 Main-Renderer Integration Test
**File: `src/test/integration/main-renderer.test.ts`**
```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { spawn } from 'child_process';
import { MockIPCAdapter } from '../../shared/ipc-adapter';

describe('Main-Renderer Integration', () => {
  let mockIPC: MockIPCAdapter;
  
  beforeEach(() => {
    mockIPC = new MockIPCAdapter();
  });

  it('handles scan workflow end-to-end', async () => {
    // Simulate renderer requesting scan start
    const scanRequest = {
      scanId: 'test-scan-1',
      phenotyperId: 'pheno-1',
      experimentId: 'exp-1',
      plantId: 'PLANT-001'
    };
    
    const result = await mockIPC.invoke('scanner:start-scan', scanRequest);
    expect(result).toMatchObject({ status: 'started' });
    
    // Simulate frame captures
    for (let i = 0; i < 36; i++) {
      mockIPC.send('scanner:frame-captured', {
        frameIndex: i,
        filePath: `/scans/test-scan-1/frame_${i}.png`
      });
    }
    
    // Verify scan completion
    const scanData = await mockIPC.invoke('scanner:get-scan-data');
    expect(scanData.progress.status).toBe('complete');
    expect(scanData.scanImages).toHaveLength(36);
  });
});
```

### Layer 6: E2E Testing with Playwright

#### 6.1 E2E Test Configuration
**File: `playwright.config.ts`**
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    // Launch Electron app
    launchOptions: {
      executablePath: require('electron'),
      args: ['.', '--test-mode'],
      env: {
        ...process.env,
        MOCK_SERVICE: '1', // Use mock Python service
        DATABASE_URL: 'file:./test.db' // Use test database
      }
    }
  }
});
```

#### 6.2 E2E Scan Workflow Test
**File: `e2e/scan-workflow.spec.ts`**
```typescript
import { test, expect, ElectronApplication, Page } from '@playwright/test';
import { _electron as electron } from 'playwright';

let app: ElectronApplication;
let page: Page;

test.beforeAll(async () => {
  app = await electron.launch({
    args: ['.', '--test-mode'],
    env: { MOCK_SERVICE: '1' }
  });
  page = await app.firstWindow();
});

test.afterAll(async () => {
  await app.close();
});

test('complete scan workflow', async () => {
  // Navigate to capture tab
  await page.click('text=Capture');
  
  // Fill metadata
  await page.selectOption('[data-testid=phenotyper-select]', 'pheno-1');
  await page.selectOption('[data-testid=experiment-select]', 'exp-1');
  await page.fill('[data-testid=wave-number]', '1');
  await page.fill('[data-testid=plant-age]', '14');
  await page.fill('[data-testid=plant-id]', 'PLANT-001');
  
  // Wait for accession ID to load
  await expect(page.locator('[data-testid=accession-id]')).toContainText('ACC-');
  
  // Start scan
  await page.click('text=Start scan');
  
  // Wait for scan completion
  await expect(page.locator('text=Scanning...')).toBeVisible();
  await expect(page.locator('text=Scanning...')).toBeHidden({ timeout: 30000 });
  
  // Verify scan appears in recent scans
  await expect(page.locator('text=PLANT-001')).toBeVisible();
  
  // Take screenshot for debugging
  await page.screenshot({ path: 'e2e/screenshots/scan-complete.png' });
});

test('export scan data', async () => {
  await page.click('text=Export');
  
  await page.selectOption('[data-testid=export-format]', 'csv');
  await page.click('text=Export All Scans');
  
  // Verify download started
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('text=Download')
  ]);
  
  expect(download.suggestedFilename()).toContain('scans_export');
});
```

### Layer 7: Coverage Aggregation

#### 7.1 Coverage Collection Script
**File: `scripts/collect-coverage.js`**
```javascript
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Run TypeScript/JavaScript tests with coverage
console.log('Running Vitest with coverage...');
execSync('npm run test:coverage', { stdio: 'inherit' });

// Run Python tests with coverage (if applicable)
if (fs.existsSync('python')) {
  console.log('Running Python tests with coverage...');
  execSync('cd python && pytest --cov=. --cov-report=xml', { stdio: 'inherit' });
}

// Merge coverage reports
const coverageSummary = JSON.parse(
  fs.readFileSync('coverage/coverage-summary.json', 'utf-8')
);

console.log('\n📊 Coverage Summary:');
console.log(`Statements: ${coverageSummary.total.statements.pct}%`);
console.log(`Branches: ${coverageSummary.total.branches.pct}%`);
console.log(`Functions: ${coverageSummary.total.functions.pct}%`);
console.log(`Lines: ${coverageSummary.total.lines.pct}%`);

// Fail if coverage is below threshold
const threshold = 100;
if (coverageSummary.total.lines.pct < threshold) {
  console.error(`\n❌ Coverage ${coverageSummary.total.lines.pct}% is below threshold ${threshold}%`);
  process.exit(1);
} else {
  console.log(`\n✅ Coverage meets threshold of ${threshold}%`);
}
```

## Implementation Timeline

### Week 1: Core Testing (Days 1-5)
- **Day 1**: Complete prismastore.test.ts (13 new tests)
- **Day 2**: Complete scanner.test.ts (11 new tests)  
- **Day 3**: Create shared contracts and IPC adapter
- **Day 4**: Test main.ts and preload.ts
- **Day 5**: Test imageuploader.ts and electricstore.ts

### Week 2: Component & Integration (Days 6-10)
- **Day 6**: Test App.tsx, Layout.tsx, CaptureScan.tsx
- **Day 7**: Test data management components
- **Day 8**: Test remaining UI components
- **Day 9**: Integration tests
- **Day 10**: E2E tests and final coverage check

## CI/CD Integration

### GitHub Actions Workflow
**File: `.github/workflows/test-coverage.yml`**
```yaml
name: Test Coverage

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
          
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: app/package-lock.json
          
      - name: Install dependencies
        run: |
          cd app
          npm ci
          
      - name: Setup test database
        run: |
          cd app
          npx prisma migrate reset --force
          npx prisma db seed
          
      - name: Run tests with coverage
        run: |
          cd app
          npm run test:coverage
          
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./app/coverage/lcov.info
          fail_ci_if_error: true
          
      - name: Check coverage threshold
        run: |
          cd app
          node scripts/collect-coverage.js
          
      - name: Run E2E tests
        run: |
          cd app
          npx playwright test
          
      - name: Upload test artifacts
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: test-artifacts
          path: |
            app/coverage/
            app/e2e/screenshots/
            app/playwright-report/
```

## Success Metrics
✅ Line coverage: 100%
✅ Branch coverage: 100%  
✅ Function coverage: 100%
✅ All critical paths tested
✅ Integration tests passing
✅ E2E tests for main workflows
✅ CI/CD pipeline with coverage gates
✅ Mock services for hardware dependencies
✅ Contract tests for Python service