import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let CaptureScan: React.FC;

const mockElectron = {
  ipcRenderer: {
    sendMessage: vi.fn(),
    on: vi.fn(),
    once: vi.fn(),
  },
  scanner: {
    getScansDir: vi.fn(),
    setPlantQrCode: vi.fn(),
    getScannerId: vi.fn(),
    getScanData: vi.fn(),            
    getScannerSettings: vi.fn(),     
    getPlantQrCode: vi.fn(),        
    getPhenotyperId: vi.fn(),       
    getExperimentId: vi.fn(),        
    getWaveNumber: vi.fn(),           
    getPlantAgeDays: vi.fn(),         
    startScan: vi.fn(), 
    getScannerPlantQrCode: vi.fn(),
    setWaveNumber : vi.fn(),
    setPlantAgeDays : vi.fn(),
    getPlantSuggestions: vi.fn(),
  },
  streamer: {},
  scanStore: {
    getMostRecentScanDate: vi.fn(),
    getScans: vi.fn(),
  },
  electric: {
    getPhenotypers: vi.fn(),
    getAccessionId: vi.fn(),
    getAccessionIdFiles: vi.fn(),
    plantQRcodeList:vi.fn(),
  },
};

beforeEach(async () => {
  vi.clearAllMocks();

  mockElectron.scanner.getScansDir.mockResolvedValue('/mock/scans/dir');
  mockElectron.scanner.getScannerId.mockResolvedValue('scanner-123');
  mockElectron.scanner.getScannerSettings.mockResolvedValue({ /* ... */ });
  mockElectron.scanner.getScanData = vi.fn().mockResolvedValue({
    metadata: {
    id: 'mock-id',
    experiment_id: 'exp-1',
    phenotyper_id: '1',
    scanner_name: 'MockScanner',
    plant_id: 'PLANT-001',
    accession_id: 'ACC-001',
    path: '/mock/path',
    capture_date: '2023-09-01T12:00:00Z',
    num_frames: 180,
    exposure_time: 50,
    gain: 1.5,
    brightness: 0.8,
    contrast: 1.2,
    gamma: 1.0,
    seconds_per_rot: 20,
    wave_number: 3,
    plant_age_days: 12,
  },
    scanImages: ['img1.png', 'img2.png'],
    progress: {
      status: 'capturing',
      nImagesCaptured: 5,
      nImagesSaved: 3,
    }
  });
  // mockElectron.scanner.setPlantQrCode = vi.fn().mockResolvedValue('MOCK-QR-CODE-123');
  mockElectron.scanner.getScannerPlantQrCode.mockResolvedValue('MOCK-QR-CODE-123');
  mockElectron.scanner.getPlantQrCode.mockResolvedValue(['MOCK-QR-CODE-123']);
  mockElectron.scanner.getPhenotyperId.mockResolvedValue('1');
  mockElectron.scanner.getExperimentId.mockResolvedValue('exp-1');
  mockElectron.scanner.getWaveNumber.mockResolvedValue(3);
  mockElectron.scanner.getPlantAgeDays.mockResolvedValue(10);
  mockElectron.scanner.startScan = vi.fn().mockResolvedValue(undefined);
  mockElectron.electric.getAccessionIdFiles.mockResolvedValue([
    { plant_barcode: 'PLANT-1' },
    { plant_barcode: 'PLANT-2' }
  ]);
  mockElectron.scanStore.getMostRecentScanDate.mockResolvedValue(new Date('2023-09-01T12:00:00Z'));
  mockElectron.electric.getPhenotypers.mockResolvedValue([
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
  ]);

  mockElectron.electric.plantQRcodeList.mockResolvedValue([
        [{ plant_barcode: 'TEST-QR-123' },{ plant_barcode: 'TEST-QR-456' },{ plant_barcode: 'TEST-QR-789' },{ plant_barcode: 'TEST-QR-111' }],
  ])
  mockElectron.scanStore.getScans.mockResolvedValue(
     {scans: [],
        totalCount: 0,
    })

  Object.defineProperty(window, 'electron', {
    value: mockElectron,
    configurable: true,
  });

  ({ CaptureScan } = await import('./CaptureScan'));
});

vi.mock('./PersonChooser', () => ({
  PersonChooser: ({ value, phenotyperIdChanged }: any) => (
    <div>
      <label htmlFor="person">Phenotyper</label>
      <select
        data-testid="person-chooser"
        id="person"
        value={value}
        onChange={(e) => phenotyperIdChanged(e.target.value)}
      >
        <option value="">Select...</option>
        <option value="1">John Doe</option>
        <option value="2">Jane Smith</option>
      </select>
    </div>
  ),
}));


vi.mock('./ExperimentChooser', () => ({
  ExperimentChooser: ({ value, experimentIdChanged }: any) => (
    <div>
      <label htmlFor="experiment">Experiment</label>
      <select
        data-testid="experiment-chooser"
        id="experiment"
        value={value}
        onChange={(e) => experimentIdChanged(e.target.value)}
      >
        <option value="">Select...</option>
        <option value="exp-1">Drought Resistance</option>
        <option value="exp-2">Growth Study</option>
      </select>
    </div>
  ),
}));


vi.mock('./PlantQrCodeTextBox', () => ({
  PlantQrCodeTextBox: ({ value, onChange }: any) => (
    <div>
      <input
        data-testid="plant-qr-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={() => onChange('TEST-QR-123')}>Scan</button>
    </div>
  ),
}));

vi.mock('./Streamer', () => ({
  Streamer: () => <div data-testid="streamer">Camera Stream</div>,
}));

vi.mock('xlsx', () => ({
  read: vi.fn(),
  utils: { sheet_to_json: vi.fn() },
}));

describe('CaptureScan component - Basic component rendering', () => {
  it('renders basic UI components', async () => {
    render(<CaptureScan />);
    await waitFor(() => {
      expect(screen.getByTestId('phenotyper-section')).toBeInTheDocument();
      expect(screen.getByTestId('experiment-section')).toBeInTheDocument();
      expect(screen.getByTestId('wave-number-section')).toBeInTheDocument();
      expect(screen.getByTestId('plant-age-section')).toBeInTheDocument();
      expect(screen.getByTestId('plant-id-section')).toBeInTheDocument();
      expect(screen.getByTestId('accession-id-section')).toBeInTheDocument();
    });
  });

  it('renders scan button with correct label and disabled state', async () => {
    render(<CaptureScan />);
    const scanButton = await screen.findByRole('button', { name: /Start Scan/i });
    expect(scanButton).toBeInTheDocument();
    expect(scanButton).toBeDisabled();
  });

});

describe('CaptureScan component - form input and interactions', () => {

  it('allows input of Wave Number and triggers setter', async () => {
      render(<CaptureScan />);
      const waveSection = await screen.findByTestId('wave-number-section');
      expect(waveSection).toBeInTheDocument();
      
      const input = within(waveSection).getByRole('spinbutton');
      await userEvent.clear(input);
      await userEvent.type(input, '5');
      expect((input as HTMLInputElement).value).toBe('5');
  });

  it('allows input of Plant Age Days and updates state', async () => {
    render(<CaptureScan />);
    const plantAge = await screen.findByTestId('plant-age-section');
    expect(plantAge).toBeInTheDocument();

    const input = within(plantAge).getByRole('spinbutton');
    await userEvent.clear(input);
    await userEvent.type(input, '5');
    expect((input as HTMLInputElement).value).toBe('5');
  });

  
  it('Start Scan button is disabled until all fields are valid', async () => {
    render(<CaptureScan />);
    const scanButton = await screen.findByRole('button', { name: /Start Scan/i });
    expect(scanButton).toBeDisabled(); 

    await userEvent.selectOptions(screen.getByTestId('person-chooser'), '1');
    await userEvent.selectOptions(screen.getByTestId('experiment-chooser'), 'exp-1');

    // await userEvent.click(screen.getByText('Scan'));

    const waveSection = screen.getByTestId('wave-number-section');
    const waveInput = within(waveSection).getByRole('spinbutton');
    await userEvent.clear(waveInput);
    await userEvent.type(waveInput, '3');

    const plantAgeSection = screen.getByTestId('plant-age-section');
    const plantAge = within(plantAgeSection).getByRole('spinbutton');
    await userEvent.clear(plantAge);
    await userEvent.type(plantAge, '10');

    const plantInput = within(screen.getByTestId('plant-id-section')).getByRole('textbox');
    await userEvent.clear(plantInput);
    await userEvent.type(plantInput, '123');

    //TODO : Revisit await for suggestion box to be displayaed check barcode accession mapping
    //const suggestionList = await screen.findByTestId('suggestion-plant-qr-code');
    //expect(within(suggestionList).getByText('MOCK-QR-CODE-123')).toBeInTheDocument();

    await waitFor(() => {
      expect(scanButton).toBeDisabled();
    });
  });




});
