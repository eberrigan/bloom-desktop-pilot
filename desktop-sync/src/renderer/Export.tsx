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

export function Export() {
  return (
    <div className="text-lg">
      <span className="italic">Coming soon:</span> export scans to a directory
      of your choice.
      {/* <button
        className={
          "rounded-md border border-gray-300 px-4 py-2 mr-2 text-sm font-medium text-green-700 bg-green-100 hover:bg-gray-50"
        }
      >
        Export
      </button> */}
    </div>
  );
}
