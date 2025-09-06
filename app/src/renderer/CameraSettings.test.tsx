import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

let CameraSettings: React.FC;

const mockGetScannerSettings = vi.fn();
const mockSetScannerSettings = vi.fn();

const initialSettings = {
  seconds_per_rot: 6,
  num_frames: 180,
  exposure_time: 5000,
  gain: 2,
  gamma: 1.2,
  brightness: 50,
  contrast: 10,
};

beforeEach(async () => {
  vi.resetAllMocks();
  vi.resetModules();

  (window as any).electron = {
    scanner: {
      getScannerSettings: mockGetScannerSettings,
      setScannerSettings: mockSetScannerSettings,
    },
  };

  mockGetScannerSettings.mockResolvedValue(initialSettings);

  ({ CameraSettings } = await import("./CameraSettings"));
});

function inputNextTo(labelText: RegExp | string) {
  const labelNode = screen.getByText(labelText);
  const section = labelNode.closest("div")?.parentElement as HTMLElement;
  return within(section).getByRole("spinbutton") as HTMLInputElement;
}


describe("CameraSettings - editing, Save & Reset", () => {
  it("enables Save/Reset when a value changes, and Save sends new settings then resets dirty", async () => {
    render(<CameraSettings />);

    await screen.findByText(/Seconds per rotation/i);

    const seconds = inputNextTo(/Seconds per rotation/i);
    const saveBtn = screen.getByRole("button", { name: /Save/i });
    const resetBtn = screen.getByRole("button", { name: /Reset/i });

    await userEvent.clear(seconds);
    await userEvent.type(seconds, "7");
    expect(seconds.value).toBe("7");

    expect(saveBtn).not.toBeDisabled();
    expect(resetBtn).not.toBeDisabled();

    await userEvent.click(saveBtn);

    await waitFor(() => {
      expect(mockSetScannerSettings).toHaveBeenCalledTimes(1);
    });

    const savedArg = mockSetScannerSettings.mock.calls[0][0];
    expect(savedArg).toEqual({
      ...initialSettings,
      seconds_per_rot: 7,
    });

    expect(saveBtn).toBeDisabled();
    expect(resetBtn).toBeDisabled();
  });

  it("Reset restores original values and clears dirty state", async () => {
    render(<CameraSettings />);

    await screen.findByText(/Images per rotation/i);

    const frames = inputNextTo(/Images per rotation/i);
    const saveBtn = screen.getByRole("button", { name: /Save/i });
    const resetBtn = screen.getByRole("button", { name: /Reset/i });

    await userEvent.clear(frames);
    await userEvent.type(frames, "200");
    expect(frames.value).toBe("200");
    expect(saveBtn).not.toBeDisabled();
    expect(resetBtn).not.toBeDisabled();

    await userEvent.click(resetBtn);

    expect(inputNextTo(/Images per rotation/i).value).toBe(String(initialSettings.num_frames));
    expect(saveBtn).toBeDisabled();
    expect(resetBtn).toBeDisabled();
  });

  it("parses integers correctly (seconds, frames, exposure, gain) and float for gamma", async () => {
    render(<CameraSettings />);

    await screen.findByText(/Gamma/i);

    const seconds = inputNextTo(/Seconds per rotation/i);      
    const frames = inputNextTo(/Images per rotation/i);        
    const exposure = inputNextTo(/Exposure \(microseconds\)/i);
    const gain = inputNextTo(/Gain/i);                       
    const gamma = inputNextTo(/Gamma/i);                    

    await userEvent.clear(seconds);
    await userEvent.type(seconds, "8");
    await userEvent.clear(frames);
    await userEvent.type(frames, "250");
    await userEvent.clear(exposure);
    await userEvent.type(exposure, "7500");
    await userEvent.clear(gain);
    await userEvent.type(gain, "3");
    await userEvent.clear(gamma);
    await userEvent.type(gamma, "1.7");

    await userEvent.click(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(mockSetScannerSettings).toHaveBeenCalledTimes(1);
    });

    const saved = mockSetScannerSettings.mock.calls[0][0];
    expect(saved).toEqual({
      ...initialSettings,
      seconds_per_rot: 8,
      num_frames: 250,
      exposure_time: 7500,
      gain: 3,
      gamma: 1.7,
    });
  });

  it("respects min/max on Seconds per rotation input (attributes present)", async () => {
    render(<CameraSettings />);
    await screen.findByText(/Seconds per rotation/i);

    const seconds = inputNextTo(/Seconds per rotation/i);
    expect(seconds).toHaveAttribute("min", "4");
    expect(seconds).toHaveAttribute("max", "10");
  });
});
