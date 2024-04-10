import React, { useCallback, useEffect, useState } from "react";

// UI to control:
// - gain
// - exposure time
// - brightness
// - contrast
// - gamma
// - seconds per rotation
// - number of frames

// with a "save" button to save the settings to the scanner
// and a "reset" button to reset to the previous settings

const getScannerSettings = window.electron.scanner.getScannerSettings;
const setScannerSettings = window.electron.scanner.setScannerSettings;

export function CameraSettings() {
  const [settings, setSettings] = useState<CameraSettings | null>(null);
  const [newSettings, setNewSettings] = useState<CameraSettings | null>(null);
  const [dirty, setDirty] = useState<boolean>(false);

  useEffect(() => {
    getScannerSettings().then((settings) => {
      setSettings(settings);
      setNewSettings(settings);
    });
  }, []);

  const handleSetSettings = useCallback(
    (setter: (settings: CameraSettings) => CameraSettings) => {
      setNewSettings(setter);
      setDirty(true);
    },
    []
  );

  const handleReset = useCallback(() => {
    if (settings === null) {
      return;
    }
    setNewSettings(settings);
    setDirty(false);
  }, [settings]);

  const handleSave = useCallback(() => {
    if (newSettings === null) {
      return;
    }
    setScannerSettings(newSettings);
    setDirty(false);
  }, [newSettings]);

  return (
    <div>
      {settings === null ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="mb-4">
            <div className="block text-xs font-bold text-gray-700 text-left">
              Seconds per rotation
            </div>
            <input
              className="w-40 h-8 px-2 border rounded-md text-xl"
              type="number"
              max={10}
              min={4}
              value={newSettings?.seconds_per_rot}
              onChange={(e) =>
                handleSetSettings((settings) => ({
                  ...settings,
                  seconds_per_rot: parseInt(e.target.value, 10),
                }))
              }
            />
          </div>
          <div className="mb-4">
            <div className="block text-xs font-bold text-gray-700 text-left">
              Images per rotation
            </div>
            <input
              className="w-40 h-8 px-2 border rounded-md text-xl"
              type="number"
              value={newSettings?.num_frames}
              onChange={(e) =>
                handleSetSettings((settings) => ({
                  ...settings,
                  num_frames: parseInt(e.target.value, 10),
                }))
              }
            />
          </div>
          <div className="mb-4">
            <div className="block text-xs font-bold text-gray-700 text-left">
              Exposure (microseconds)
            </div>
            <input
              className="w-40 h-8 px-2 border rounded-md text-xl"
              type="number"
              value={newSettings?.exposure_time}
              onChange={(e) =>
                handleSetSettings((settings) => ({
                  ...settings,
                  exposure_time: parseInt(e.target.value, 10),
                }))
              }
            />
          </div>
          <div className="mb-4">
            <div className="block text-xs font-bold text-gray-700 text-left">
              Gain
            </div>
            <input
              className="w-40 h-8 px-2 border rounded-md text-xl"
              type="number"
              value={newSettings?.gain}
              onChange={(e) =>
                handleSetSettings((settings) => ({
                  ...settings,
                  gain: parseInt(e.target.value, 10),
                }))
              }
            />
          </div>
          {/* <div className="mb-4">
            <div className="block text-xs font-bold text-gray-700 text-left">
              Brightness
            </div>
            <input
              className="w-40 h-8 px-2 border rounded-md text-xl"
              type="number"
              value={newSettings?.brightness}
              onChange={(e) =>
                handleSetSettings((settings) => ({
                  ...settings,
                  brightness: parseInt(e.target.value, 10),
                }))
              }
            />
          </div>
          <div className="mb-4">
            <div className="block text-xs font-bold text-gray-700 text-left">
              Contrast
            </div>
            <input
              className="w-40 h-8 px-2 border rounded-md text-xl"
              type="number"
              value={newSettings?.contrast}
              onChange={(e) =>
                handleSetSettings((settings) => ({
                  ...settings,
                  contrast: parseInt(e.target.value, 10),
                }))
              }
            />
          </div> */}
          <div className="mb-4">
            <div className="block text-xs font-bold text-gray-700 text-left">
              Gamma
            </div>
            <input
              className="w-40 h-8 px-2 border rounded-md text-xl"
              type="number"
              step="0.1"
              value={newSettings?.gamma}
              onChange={(e) =>
                handleSetSettings((settings) => ({
                  ...settings,
                  gamma: parseFloat(e.target.value),
                }))
              }
            />
          </div>
          <div>
            <button
              className={`rounded-md border border-gray-300 px-4 py-2 mr-2 text-sm font-medium ${
                !dirty
                  ? "text-gray-300"
                  : "text-green-700 bg-green-100 hover:bg-gray-50"
              }`}
              disabled={!dirty}
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className={`rounded-md border border-gray-300 px-4 py-2 mr-2 text-sm font-medium ${
                !dirty
                  ? "text-gray-300"
                  : "text-red-700 bg-red-100 hover:bg-gray-50"
              }`}
              disabled={!dirty}
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
