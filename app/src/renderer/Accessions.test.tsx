import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("./AccessionRowAdder", () => ({
  default: ({ file_id }: { file_id: string }) => (
    <div data-testid={`row-adder-${file_id}`}>RowAdder</div>
  ),
}));

const mockAccessionFiles = [
  {
    id: "file-1",
    name: "Spring_2024_Accessions.csv",
    createdAt: "2024-01-15T10:00:00Z",
    experiments: [{ name: "Drought Study" }, { name: "Growth Analysis" }],
  },
  {
    id: "file-2",
    name: "Winter_2023_Accessions.csv",
    createdAt: "2023-12-01T14:30:00Z",
    experiments: [],
  },
  {
    id: "file-3",
    name: "Fall_2023_Accessions.csv",
    createdAt: "2023-09-20T09:15:00Z",
    experiments: [{ name: "Temperature Stress" }],
  },
];

const previewRows = [
  { id: "row-1", plant_barcode: "PLANT-001", accession_id: "ACC-001" },
  { id: "row-2", plant_barcode: "PLANT-002", accession_id: "ACC-002" },
];

let Accessions: any;
const mockGetAccessionFiles = vi.fn();
const mockGetAccessionListWithFileId = vi.fn();
const mockUpdateAccessionFile = vi.fn();

beforeEach(async () => {
  vi.resetAllMocks();
  vi.resetModules();

  (window as any).electron = {
    ipcRenderer: { sendMessage: vi.fn(), on: vi.fn(), once: vi.fn() },
    electric: {
      getAccessionFiles: mockGetAccessionFiles.mockResolvedValue(mockAccessionFiles),
      getAccessionListWithFileId: mockGetAccessionListWithFileId.mockResolvedValue(previewRows),
      updateAccessionFile: mockUpdateAccessionFile,
      createAccession: vi.fn(),
      createPlantAccessionMap: vi.fn(),
    },
  };

  ({ Accessions } = await import("./Accessions"));
});

describe("Accessions Component - Basic Render - Accession File Section", () => {
  it("renders accession files list on load", async () => {
    render(<Accessions />);

    await waitFor(() => expect(mockGetAccessionFiles).toHaveBeenCalledTimes(1));

    const list = await screen.findByRole("list");
    const items = await within(list).findAllByRole("listitem");
    expect(items).toHaveLength(mockAccessionFiles.length);

    for (const f of mockAccessionFiles) {
      expect(await screen.findByText(new RegExp(f.name.replace(".", "\\."), "i"))).toBeInTheDocument();
      expect(await screen.findByText(new RegExp(`ID:\\s*${f.id}`))).toBeInTheDocument();
      expect(screen.getByTestId(`row-adder-${f.id}`)).toBeInTheDocument();
    }
    expect(screen.getByText(/Accession Files:/i)).toBeInTheDocument();
  });
});

describe("Accessions UL - Interactions", () => {
  it("expands/collapses an accession to show experiments and preview table", async () => {
    const user = userEvent.setup();
    render(<Accessions />);

    const firstItem = await screen.findByText(/Spring_2024_Accessions\.csv/i);
    await user.click(firstItem);

    expect(await screen.findByText(/Linked Experiments:/i)).toBeInTheDocument();
    expect(await screen.findByText(/Drought Study/i)).toBeInTheDocument();
    expect(await screen.findByText(/Growth Analysis/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(mockGetAccessionListWithFileId).toHaveBeenCalledWith("file-1")
    );

    expect(await screen.findByText(/plant barcode/i)).toBeInTheDocument();
    expect(await screen.findByText(/accession id/i)).toBeInTheDocument();

    expect(await screen.findByText(/PLANT-001/i)).toBeInTheDocument();
    expect(await screen.findByText(/ACC-001/i)).toBeInTheDocument();

    await user.click(screen.getByText(/Linked Experiments:/i));
    expect(screen.getByText(/Drought Study/i)).toBeInTheDocument();

    await user.click(firstItem);
    await waitFor(() =>
      expect(screen.queryByText(/Linked Experiments:/i)).not.toBeInTheDocument()
    );
  });

  describe("Accessions Component - Extra Cases", () => {
  it("renders empty state when no files are returned", async () => {
    mockGetAccessionFiles.mockResolvedValueOnce([]);
    render(<Accessions />);

    const list = await screen.findByRole("list");
    const items = within(list).queryAllByRole("listitem");
    expect(items).toHaveLength(0);
  });

  it("shows 'No experiments linked' when experiments array is empty", async () => {
    render(<Accessions />);
    const winter = await screen.findByText(/Winter_2023_Accessions\.csv/i);

    await userEvent.click(winter);
    expect(await screen.findByText(/No experiments linked/i)).toBeInTheDocument();
  });

  it("allows multiple accessions to be expanded at once", async () => {
    render(<Accessions />);
    const spring = await screen.findByText(/Spring_2024_Accessions\.csv/i);
    const fall = await screen.findByText(/Fall_2023_Accessions\.csv/i);

    await userEvent.click(spring);
    await userEvent.click(fall);

    expect(await screen.findByText(/Drought Study/i)).toBeInTheDocument();
    expect(await screen.findByText(/Temperature Stress/i)).toBeInTheDocument();
  });

  it("calls getAccessionListWithFileId with the correct id on expand", async () => {
    render(<Accessions />);
    const spring = await screen.findByText(/Spring_2024_Accessions\.csv/i);

    await userEvent.click(spring);

    await waitFor(() => {
      expect(mockGetAccessionListWithFileId).toHaveBeenCalledWith("file-1");
    });
  });

  it("renders preview table headers based on keys", async () => {
    render(<Accessions />);
    const spring = await screen.findByText(/Spring_2024_Accessions\.csv/i);

    await userEvent.click(spring);

    expect(await screen.findByText(/plant barcode/i)).toBeInTheDocument();
    expect(await screen.findByText(/accession id/i)).toBeInTheDocument();
  });

  it("only allows accession_id cell to be edited", async () => {
    render(<Accessions />);
    const spring = await screen.findByText(/Spring_2024_Accessions\.csv/i);
    await userEvent.click(spring);

    const plantCell = await screen.findByText(/PLANT-001/i);
    await userEvent.click(plantCell);
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();

    const accessionCell = await screen.findByText(/ACC-001/i);
    await userEvent.click(accessionCell);

    expect(await screen.findByDisplayValue("ACC-001")).toBeInTheDocument();
  });

  it("cancels inline edit on Escape without saving", async () => {
    render(<Accessions />);
    const spring = await screen.findByText(/Spring_2024_Accessions\.csv/i);
    await userEvent.click(spring);

    const accessionCell = await screen.findByText(/ACC-001/i);
    await userEvent.click(accessionCell);

    const input = await screen.findByDisplayValue("ACC-001");
    await userEvent.type(input, "SHOULD-NOT-SAVE{escape}");

    await waitFor(() =>
      expect(mockUpdateAccessionFile).not.toHaveBeenCalled()
    );
    expect(screen.queryByDisplayValue("SHOULD-NOT-SAVE")).not.toBeInTheDocument();
  });
});


});
