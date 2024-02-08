import { useEffect, useState } from 'react';

const getPlantQrCode = window.electron.scanner.getPlantQrCode;
const setPlantQrCode = window.electron.scanner.setPlantQrCode;

export function PlantQrCodeTextBox({
  plantQrCodeChanged,
}: {
  plantQrCodeChanged: (plantQrCode: string | null) => void;
}) {
  const [plantQrCode, setPlantQrCodeLocal] = useState<string | null>('');

  useEffect(() => {
    getPlantQrCode().then((response: string) => {
      const plantQrCode = response as string;
      setPlantQrCodeLocal(plantQrCode);
      plantQrCodeChanged(plantQrCode);
    });
  }, []);

  const setPlantQrCodeAndCallback = (plantQrCode: string | null) => {
    setPlantQrCode(plantQrCode);
    setPlantQrCodeLocal(plantQrCode);
    plantQrCodeChanged(plantQrCode);
  };

  return (
    <div>
      <input
        type="text"
        className="p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        value={plantQrCode || ''}
        onChange={(e) => setPlantQrCodeAndCallback(e.target.value)}
      />
    </div>
  );
}
