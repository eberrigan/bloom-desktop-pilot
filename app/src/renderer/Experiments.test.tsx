
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as yaml from 'js-yaml';
import { createClient } from '@supabase/supabase-js';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent, within } from '@testing-library/react';
import { PrismaClient } from '@prisma/client';
import userEvent from '@testing-library/user-event';
// import { Experiments } from './Experiments';


async function loadConfig() {
  const configPath = path.join(os.homedir(), ".bloom", "desktop-config.yaml");
  const config = yaml.load(fs.readFileSync(configPath, 'utf8')) as {
    local_db_path: string;
    bloom_api_url: string;
    bloom_anon_key: string;
    bloom_scanner_username: string;
    bloom_scanner_password: string;
  };
  return config;
}

let Experiments: React.FC;
let prisma: PrismaClient;

// Mock window.electron structure
const mockElectron = {
  ipcRenderer: {
    sendMessage: vi.fn(),
    on: vi.fn(() => () => {}),
    once: vi.fn()
  },
  electric: {
    getExperiments: vi.fn(),
    getExperimentsWithScans: vi.fn(),
    getScientists: vi.fn(),
    getAccessionFiles: vi.fn(),
    createExperiment: vi.fn(),
    attachAccessionToExperiment: vi.fn()
  }
};

  beforeEach(async () => {
  vi.clearAllMocks();

  Object.defineProperty(window as any, "electron", {
    value: mockElectron,
    configurable: true,
  });

  ({ Experiments } = await import('./Experiments'));
});

  const mockExperiments = [
    {
      id: 'exp-1',
      name: 'Drought Resistance Study',
      species: 'Arabidopsis',
      scientist: { 
        id: 'sci-1',
        name: 'Jane',
        email: 'jane.smith@example.com'
      },
      scientist_id: 'sci-1',
      accession_id: 'acc-1',
      scans: [
        { id: 'scan-1', plant_id: 'PLANT-001' },
        { id: 'scan-2', plant_id: 'PLANT-002' }
      ]
    },
    {
      id: 'exp-2',
      name: 'Growth Rate Analysis',
      species: 'Canola',
      scientist: {
        id: 'sci-2',
        name: 'John',
        email: 'john.doe@example.com'
      },
      scientist_id: 'sci-2',
      accession_id: 'acc-2',
      scans: []
    },
    {
      id: 'exp-3',
      name: 'Nutrient Deficiency',
      species: 'Lotus',
      scientist: {
        id: 'sci-1',
        name: 'Jane',
        email: 'jane.smith@example.com'
      },
      scientist_id: 'sci-1',
      accession_id: null,
      scans: [
        { id: 'scan-3', plant_id: 'PLANT-003' }
      ]
    }
  ];

  const mockScientists = [
    {
      id: 'sci-1',
      name: 'Jane',
      email: 'jane.smith@example.com'
    },
    {
      id: 'sci-2',
      name: 'John',
      email: 'john.doe@example.com'
    },
    {
      id: 'sci-3',
      name: 'Alice',
      email: 'alice.johnson@example.com'
    }
  ];

  const mockAccessionFiles = [
    {
      id: 'acc-1',
      name: 'Accession_Set_A.csv',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'acc-2',
      name: 'Accession_Set_B.csv',
      createdAt: '2024-01-05T00:00:00Z'
    },
    {
      id: 'acc-3',
      name: 'Accession_Set_C.csv',
      createdAt: '2024-01-10T00:00:00Z'
    }
  ];

    beforeEach(() => {
    vi.clearAllMocks();
        
    // Setup default mock responses
    mockElectron.electric.getExperimentsWithScans.mockResolvedValue(mockExperiments);
    mockElectron.electric.getExperiments.mockResolvedValue(mockExperiments);
    mockElectron.electric.getScientists.mockResolvedValue(mockScientists);
    mockElectron.electric.getAccessionFiles.mockResolvedValue(mockAccessionFiles);
    mockElectron.electric.createExperiment.mockImplementation((args) => {
      const [name, species, scientist_id, accession_id] = args || [];
      return Promise.resolve({ 
        error: null,
        data: { id: 'exp-new', name, species, scientist_id, accession_id }
      });
    });
    mockElectron.electric.attachAccessionToExperiment.mockResolvedValue({ error: null });
  });

  afterEach(() => {
    vi.clearAllMocks();
    if ((global as any).window) {
      delete (global as any).window.electron;
    }
  });

describe('Experiments component  - Basic Componnet Rendering', () => {

  it('renders the component without crashing', () => {
  render(<Experiments />);
  });

  it('renders all static headings', () => {
  render(<Experiments />);
    expect(screen.getByText(/Experiments/i)).toBeInTheDocument();
  expect(screen.getByText(/Create New Experiment/i)).toBeInTheDocument();
  expect(screen.getByText(/Attach Accession File to Existing Experiment/i)).toBeInTheDocument();
  });

  it('shows experiment list after fetching', async () => {
  render(<Experiments />);
  const list = await screen.findByRole('list');
  const items = await within(list).findAllByRole('listitem');

  expect(items).toHaveLength(mockExperiments.length);
  });

  it('renders species dropdown with correct options', () => {
  render(<Experiments />);
  const speciesSelect = screen.getByTestId('experiment-species-select');

  const options = within(speciesSelect).getAllByRole('option');
  const expectedSpecies = [
    "Amaranth", "Arabidopsis", "Canola", "Lotus", "Maize", "Pennycress", "Rice",
    "Sorghum", "Pennycress", "Canola", "Soybean", "Spinach", "Sugar_Beet", "Tomato", "Wheat"
  ];

  const optionTexts = options.map((o) => o.textContent);
  for (const species of expectedSpecies) {
    expect(optionTexts).toContain(species);
  }
  });
  
  it('renders scientist dropdown with values from getScientists', async () => {
  render(<Experiments />);
  const scientistSelect = await screen.findByTestId('experiment-scientist-select');
  const options = within(scientistSelect).getAllByRole('option');

  const expectedScientists = mockScientists.map((s) => s.name);
  expect(options.map((o) => o.textContent)).toEqual(expectedScientists);
  });

  it('renders accession dropdown with values from getAccessionFiles', async () => {
    render(<Experiments />);
    const accessionSelect = await screen.findByTestId('experiment-accession-select');
    const options = within(accessionSelect).getAllByRole('option');

    const expectedAccessions = mockAccessionFiles.map((a) => `${a.name} - ${a.id}`);
    expect(options.map((o) => o.textContent)).toEqual(expectedAccessions);
  });

  it('renders experiment list on load with species name <-> experiment name <-> scientist name', async () => {
    render(<Experiments />);
    const list = screen.getByRole('list');
    const items = await within(list).findAllByRole('listitem'); 
    expect(items).toHaveLength(mockExperiments.length);

    await waitFor(() => {
    // Check for Experiment Names 
    expect(within(items[0]).getByText(/Drought Resistance Study/)).toBeInTheDocument();
    expect(within(items[1]).getByText(/Growth Rate Analysis/)).toBeInTheDocument();
    expect(within(items[2]).getByText(/Nutrient Deficiency/)).toBeInTheDocument();

    // Check for Speceis 
    expect(within(items[0]).getByText(/Arabidopsis/)).toBeInTheDocument();
    expect(within(items[1]).getByText(/Canola/)).toBeInTheDocument();
    expect(within(items[2]).getByText(/Lotus/)).toBeInTheDocument();

    // Check for Scientists 
    expect(within(items[0]).getByText(/Jane/)).toBeInTheDocument();
    expect(within(items[1]).getByText(/John/)).toBeInTheDocument();
    });
  });

  it('renders create experiment section', async () => {
    render(<Experiments />);
    
    const createButton = screen.getByRole('button', { name: /create/i });
    
    await waitFor(() => {
      expect(screen.getByTestId('experiment-name-input')).toBeInTheDocument();
      expect(screen.getByTestId('experiment-species-select')).toBeInTheDocument();
      expect(screen.getByTestId('experiment-species-select')).toBeInTheDocument();
      expect(screen.getByTestId('experiment-accession-select')).toBeInTheDocument();
    });
  });

});


describe('Experiments component - mocked electron API and state setup', () => {
  it('calls getExperiments and renders returned experiments on mount', async () => {

  window.electron.electric.getExperiments = vi.fn().mockResolvedValue(mockExperiments);

  render(<Experiments />);
  const items = await screen.findAllByRole('listitem');
  expect(items).toHaveLength(mockExperiments.length);

  expect(screen.getByText((content) =>
  content.includes("Arabidopsis") &&
  content.includes("Drought Resistance Study") &&
  content.includes("Jane")
  )).toBeInTheDocument();

  expect(screen.getByText((content) =>
  content.includes("Canola") &&
  content.includes("Growth Rate Analysis") &&
  content.includes("John")
  )).toBeInTheDocument();

expect(screen.getByText((content) =>
  content.includes("Lotus") &&
  content.includes("Nutrient Deficiency") &&
  content.includes("Jane")
  )).toBeInTheDocument();

  });

  it('calls getScientists and sets the default scientist', async () => {

  window.electron.electric.getScientists = vi.fn().mockResolvedValue(mockScientists);

  render(<Experiments />);

  const scientistSelect = await screen.findByTestId('experiment-scientist-select');
  
  expect(scientistSelect).toHaveValue('sci-1');
  });

 it('renders create new experiment section accession dropdown with correct options', async () => {
  window.electron.electric.getAccessionFiles = vi.fn().mockResolvedValue(mockAccessionFiles);
  render(<Experiments />);
  const accessionSelect = await screen.findByTestId('experiment-accession-select');
  const options = within(accessionSelect).getAllByRole('option');
  expect(options.map((opt) => opt.textContent?.replace(/\s+/g, ' ').trim())).toEqual([
    "Accession_Set_A.csv - acc-1",
    "Accession_Set_B.csv - acc-2",
    "Accession_Set_C.csv - acc-3",
  ]);
});

//TODO :  Revisit this test to check for fails of all window.electron.electric API calls
// it('logs error if getScientists fails', async () => {
//   const error = new Error("Mock getScientists failure");
//   window.electron.electric.getScientists = vi.fn().mockRejectedValue(error);
//   const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
//   render(<Experiments />);
//   await waitFor(() => {
//     const calls = consoleSpy.mock.calls;
//     const loggedError = calls.find(call => call[0] instanceof Error && call[0].message.includes("Mock getScientists failure"));
//     expect(loggedError).toBeTruthy();
//   });
//   consoleSpy.mockRestore();
// });

});

describe('Experiments component - create new experiment behaviour', () => {

    it('creates a new experiment', async () => {
    render(<Experiments />);
  
    const nameInput = screen.getByTestId('experiment-name-input');
    await userEvent.type(nameInput, 'Temperature Stress');
    
    const speciesInput = screen.getByTestId('experiment-species-select');
    await userEvent.selectOptions(speciesInput, 'Amaranth');
    
    const scientistSelect = screen.getByTestId('experiment-scientist-select');
    fireEvent.change(scientistSelect, { target: { value: 'sci-3' } });
    
    const accessionSelect = screen.getByTestId('experiment-accession-select');
    fireEvent.change(accessionSelect, { target: { value: 'acc-3' } });
    
    await waitFor(() => {
      expect(screen.getByText('Create New Experiment')).toBeInTheDocument();
      expect(nameInput).toHaveValue('Temperature Stress');
      expect(speciesInput).toHaveValue('Amaranth');
      expect(scientistSelect).toHaveValue('sci-3');
      expect(accessionSelect).toHaveValue('acc-3');
    });
    
    const createButton = screen.getByRole('button', { name: /create/i });
    await userEvent.click(createButton);
    
    await waitFor(() => {
      expect(mockElectron.electric.createExperiment).toHaveBeenLastCalledWith(
        'Temperature Stress',
        'Amaranth',
        'sci-3',
        'acc-3'
      );
    });
  });

  it('updates selected experiment and accession', async () => {
  render(<Experiments />);

    const experimentSelect = await screen.findByTestId('select-existing-experiment');
    const accessionSelect  = await screen.findByTestId('select-accession-for-existing-experiment');

    await within(experimentSelect).findByRole('option', {
      name: /canola - growth rate analysis - \(john\)/i,
    });
    await within(accessionSelect).findByRole('option', {
      name: /Accession_Set_C\.csv - acc-3/i,
    });

    await userEvent.selectOptions(experimentSelect, 'exp-2');
    await userEvent.selectOptions(accessionSelect,  'acc-3');

    await waitFor(() => {
      expect(screen.getByText('Attach Accession File to Existing Experiment')).toBeInTheDocument();
      expect(experimentSelect).toHaveValue('exp-2');
      expect(accessionSelect).toHaveValue('acc-3');
    });

    const attachBtn = screen.getByRole('button', { name: /attach accession/i });
    await userEvent.click(attachBtn);

    await waitFor(() => {
      expect(mockElectron.electric.attachAccessionToExperiment).toHaveBeenLastCalledWith(
        'exp-2',
        'acc-3'
      );
    });
  });

  it("doesn't allow creation with empty experiment name", async () => {
    render(<Experiments />);

    const createButton = screen.getByRole('button', { name: /create/i });
    await userEvent.click(createButton);

    await waitFor(() => {
    expect(mockElectron.electric.createExperiment).not.toHaveBeenCalled();
    });

    expect(screen.getByText(/Please fill in all required fields./i)).toBeInTheDocument();
  });

  //TODO: Revisit this test to check for fails of createExperiment API call 
  // it("shows error if createExperiment returns error", async () => {
  //   mockElectron.electric.createExperiment.mockResolvedValueOnce({
  //   error: new Error("Failed to create experiment"),
  //   data: null,
  //   });

  //   render(<Experiments />);

  //   const nameInput = screen.getByTestId('experiment-name-input');
  //   await userEvent.type(nameInput, 'Bad Experiment');
  //   const speciesInput = screen.getByTestId('experiment-species-select');
  //   const scientistInput = screen.getByTestId('experiment-scientist-select');
  //   const accessionInput = screen.getByTestId('experiment-accession-select');

  //   await userEvent.selectOptions(speciesInput, 'Arabidopsis');
  //   await userEvent.selectOptions(scientistInput, 'sci-1');
  //   await userEvent.selectOptions(accessionInput, 'acc-1');

  //   const createButton = screen.getByRole('button', { name: /create/i });
  //   await userEvent.click(createButton);

  //   await waitFor(() => {
  //   expect(mockElectron.electric.createExperiment).toHaveBeenCalled();
  //   expect(screen.getByTestId('experiment-error-msg')).toHaveTextContent(/Failed to create experiment/i);
  //   });
  //   });
  
  it("shows error if no existing experiment is selected during attach of accession file", async () => {
    render(<Experiments />);

    const experimentSelect = await screen.findByTestId('select-existing-experiment');
    const accessionSelect = await screen.findByTestId('select-accession-for-existing-experiment');

    fireEvent.change(experimentSelect, { target: { value: '' } });
    await userEvent.selectOptions(accessionSelect, 'acc-2');

    const attachButton = screen.getByRole('button', { name: /attach accession/i });
    await userEvent.click(attachButton);

    await waitFor(() => {
    expect(mockElectron.electric.attachAccessionToExperiment).not.toHaveBeenCalled();
    expect(screen.getByText(/Please make selection for experiment and an accession file/i)).toBeInTheDocument();
    });
    });

    //TODO : Revisit this test to check for fails of attachAccessionToExperiment API call
    // it("shows error if attachAccessionToExperiment fails", async () => {
    //   mockElectron.electric.attachAccessionToExperiment.mockResolvedValueOnce({ error: new Error("Attach failed") });

    //   render(<Experiments />);

    //   const experimentSelect = await screen.findByTestId('select-existing-experiment');
    //   const accessionSelect = await screen.findByTestId('select-accession-for-existing-experiment');

    //   await userEvent.selectOptions(experimentSelect, 'exp-2');
    //   await userEvent.selectOptions(accessionSelect, 'acc-2');

    //   const attachButton = screen.getByRole('button', { name: /attach accession/i });
    //   await userEvent.click(attachButton);

    //   await waitFor(() => {
    //   expect(mockElectron.electric.attachAccessionToExperiment).toHaveBeenCalled();
    //   expect(screen.getByText(/failed to attach accession/i)).toBeInTheDocument();
    //   });
    //   });

});



