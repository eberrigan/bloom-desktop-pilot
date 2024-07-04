import { useEffect, useState } from "react";

export function PlantQrCodeTextBox({
  qrCode,
  plantQrCodeChanged,
}: {
  qrCode: string | null;
  plantQrCodeChanged: (plantQrCode: string | null) => void;
}) {
  return (
    <div>
      <input
        type="text"
        className="p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        value={qrCode || ""}
        onChange={(e) => plantQrCodeChanged(e.target.value)}
      />
    </div>
  );
}
