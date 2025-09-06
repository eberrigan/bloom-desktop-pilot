import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from 'react-router-dom';
import { ScanWithPhenotyper } from "../types/electric.types";
import { electron } from "process";

let BrowseScans: React.FC<{
  showUploadButton?: boolean;
  showTodayOnly?: boolean;
  onDelete?:() => void;
}>;

const mockScan: ScanWithPhenotyper = {
  id: "scan-123",
  experiment_id: "exp-123",
  phenotyper_id: "pheno-123",
  scanner_name: "Scanner A",
  plant_id: "plant-001",
  accession_id: "acc-001",
  path: "/fake/path/scan-123",
  capture_date: new Date("2023-09-01T12:00:00Z"),
  num_frames: 100,
  exposure_time: 2000,
  gain: 100,
  brightness: 70,
  contrast: 60,
  gamma: 1.0,
  seconds_per_rot: 4,
  wave_number: 1,
  plant_age_days: 12,
  deleted: false,
  images : [
    { id: "img-2", status: "PENDING" } as any,
    { id: "img-3", status: "PENDING" } as any,
    { id: "img-4", status: "PENDING" } as any,
    { id: "img-5", status: "PENDING" } as any,
    { id: "img-6", status: "SUCCESS" } as any,
    { id: "img-7", status: "PENDING" } as any,
    { id: "img-8", status: "FAILED" } as any,
    { id: "img-9", status: "UPLOADING" } as any,
  ],
  phenotyper: {
    id: "1",
    name: "Jane Smith",
    email: "jane@example.com",
  },
};
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
    attachAccessionToExperiment: vi.fn(),
    uploadImages : vi.fn()
  },
  scanStore: {
    getScans: vi.fn(),
    deleteScan: vi.fn(),
  },
};

vi.mock('./ScanPreview', () => ({
  ScanPreview: ({ scan, thumb, link }: any) => (
    <div data-testid="mock-scan-preview">
      MockPreview: {scan.plant_id}, {thumb ? "thumb" : "full"} → {link}
    </div>
  ),
}));

beforeEach(async () => {
  vi.clearAllMocks();

  Object.defineProperty(window as any, "electron", {
    value: mockElectron,
    configurable: true,
  });

  mockElectron.scanStore.getScans.mockResolvedValue({
    scans: [mockScan],
    totalCount: 1,
  });

  mockElectron.scanStore.deleteScan.mockResolvedValue(true);

  ({ BrowseScans } = await import('../renderer/BrowseScans'));
});

describe("BrowseScans Page Basic Render Test", () => {
  it('renders the component without crashing', () => {
    
    render(<MemoryRouter><BrowseScans /></MemoryRouter>);
  });

  it("renders scans table with data", async () => {
   render(<MemoryRouter><BrowseScans /></MemoryRouter>);

    await waitFor(() => {
      expect(screen.getByText("plant-001")).toBeInTheDocument();
      expect(screen.getByText("acc-001")).toBeInTheDocument();
      expect(screen.getByText("Scanner A")).toBeInTheDocument();
      expect(screen.getByText(2000)).toBeInTheDocument();
      expect(screen.getByText(100)).toBeInTheDocument();
    });
  });

  it("ProgressBarc - Child component - renders proper upload status", async () => {
    render(<MemoryRouter><BrowseScans /></MemoryRouter>);

    await waitFor(() => {
      expect(screen.getByText("Not uploaded")).toBeInTheDocument();
    });
  });

  it("paginates to next and previous pages", async () => {
      mockElectron.scanStore.getScans.mockImplementation(({ page }) => {
        if (page === 1) {
          return Promise.resolve({
            scans: [mockScan],
            totalCount: 20, 
          });
        } else if (page === 2) {
          return Promise.resolve({
            scans: [{
              ...mockScan,
              id: "scan-456",
              plant_id: "plant-002",
              accession_id: "acc-002",
            }],
            totalCount: 20,
          });
        } else {
          return Promise.resolve({ scans: [], totalCount: 20 });
        }
      });
      render(<MemoryRouter><BrowseScans /></MemoryRouter>);

      const nextButton = await screen.findByTestId("rightbutton");
      const prevButton = await screen.findByTestId("leftbutton");
      
      expect(prevButton).toBeDisabled();

      await userEvent.click(nextButton);

      await waitFor(() => {
        expect(mockElectron.scanStore.getScans).toHaveBeenCalledWith({
          page: 2,
          pageSize: 10,
          showTodayOnly: false,
        });
      });

      expect(screen.getByText("plant-002")).toBeInTheDocument();
    });

    it("renders upload button and handles upload flow", async () => {
      mockElectron.electric.uploadImages.mockImplementation(() => {
        return new Promise((resolve) => setTimeout(() => resolve(5), 100));
      });

      render(<MemoryRouter><BrowseScans /></MemoryRouter>);

      const button = screen.getByRole("button", { name: /start uploading/i });
      expect(button).toBeInTheDocument();

      await userEvent.click(button);

      await waitFor(() => {
        expect(mockElectron.electric.uploadImages).toHaveBeenCalled();
        expect(screen.getByText("5 images uploaded")).toBeInTheDocument();
      });
    });

  });


  describe("BrowseScans Page as child component on Capture Scan page", () => {
    it("does not render upload controls when showUploadButton is false used in Capture Scan", () => {
      render(
        <MemoryRouter>
          <BrowseScans showUploadButton={false} />
        </MemoryRouter>
      );
    expect(screen.queryByRole("button", { name: "Start uploading" })).not.toBeInTheDocument();
    });

    it("shows delete button only when showTodayOnly is true", async () => {
      render(
        <MemoryRouter>
          <BrowseScans showTodayOnly={true} />
        </MemoryRouter>
      );
      await waitFor(() => {
        const deleteButtons = screen.getAllByTestId("delete-on-capture");
        expect(deleteButtons.length).toBeGreaterThan(0);
      });
    });

  })

describe("BrowseScans Page functionality test", () => {
  it("calls onDeleted when delete is clicked", async () => {
    const onDeletedMock = vi.fn().mockResolvedValue(undefined);
    render(
      <MemoryRouter>
        <BrowseScans showTodayOnly={true} onDelete={onDeletedMock} />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getAllByTestId("delete-on-capture").length).toBeGreaterThan(0);
    });
    const deleteBtn = screen.getAllByTestId("delete-on-capture")[0];
    await userEvent.click(deleteBtn);
    await waitFor(() => {
      expect(window.electron.scanStore.deleteScan).toHaveBeenCalled();
    });

  });
});
