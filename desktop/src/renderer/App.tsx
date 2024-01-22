import 'tailwindcss/tailwind.css';
import './App.css';

import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ipcRenderer = window.electron.ipcRenderer;

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Scanner />} />
      </Routes>
    </Router>
  );
}

export function Scanner() {
  const nImages = 72;

  const [images, setImages] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [numCaptured, setNumCaptured] = useState<number>(0);
  const [scanName, setScanName] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  useEffect(() => {
    return ipcRenderer.on('image-saved', (arg) => {
      const imagePath: string = arg as string;
      // eslint-disable-next-line no-console
      console.log(imagePath);
      const newImages = [...images, imagePath];
      setImages(newImages);
      if (newImages.length === nImages) {
        setIsSaving(false);
      }
    });
  }, [images]);

  useEffect(() => {
    return ipcRenderer.on('image-captured', () => {
      const newNumCaptured = numCaptured + 1;
      setNumCaptured(newNumCaptured);
      if (newNumCaptured === nImages) {
        setIsScanning(false);
        setIsSaving(true);
      }
    });
  }, [numCaptured]);

  const startScan = useCallback(() => {
    if (!isScanning) {
      const name = 'scan_' + uuidv4();
      setScanName(name);
      setImages([]);
      setNumCaptured(0);
      setIsSaving(false);
      setIsScanning(true);
      setSelectedImage(0);
      ipcRenderer.sendMessage('start-scan', [name]);
    }
  }, [isScanning]);

  function mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }

  const nextImage = () => {
    const nextIndex = mod(selectedImage + 1, images.length);
    setSelectedImage(nextIndex);
  };

  const prevImage = () => {
    const nextIndex = mod(selectedImage - 1, images.length);
    setSelectedImage(nextIndex);
  };

  return (
    <div className="flex flex-col">
      {
        <div className="">
          <div className="text-center" style={{ width: '500px' }}>
            <button
              className="rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={(e) => startScan()}
              disabled={isScanning || isSaving}
            >
              Start Scan
            </button>
          </div>
        </div>
      }
      {isScanning ? (
        <div className="">
          <div className="">
            📷 Scanning... {numCaptured} / {nImages}
          </div>
        </div>
      ) : null}
      {isSaving ? (
        <div className="">
          <div className="" style={{ width: '500px' }}>
            💾 Saving... {images.length} / {nImages}
          </div>
        </div>
      ) : null}
      <div className="">
        <div className="">
          {images.length > 0 ? (
            <img
              src={'file://' + images[selectedImage].replaceAll('\\', '/')}
              style={{ width: '500px' }}
            />
          ) : (
            <div style={{ width: '500px', height: '250px' }}></div>
          )}
        </div>
      </div>
      <div className="">
        <div className="text-center" style={{ width: '500px' }}>
          <button
            className="rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={(e) => {
              prevImage();
            }}
          >
            &larr; Prev
          </button>
          &nbsp;
          <button
            className="rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={(e) => {
              nextImage();
            }}
          >
            Next &rarr;
          </button>
        </div>
      </div>
      {images.length > 0 ? (
        <div>
          <span className="px-4">
            {selectedImage + 1} / {images.length}
          </span>
        </div>
      ) : null}
    </div>
  );
}

export function Scan({ images }: { images: string[] }) {
  return (
    <div>
      <div>Scan</div>
      <div
        className="h-96 overflow-scroll"
        style={{ overflow: 'scroll', height: '500px' }}
      >
        {images.map((image) => (
          <div key={image}>
            {image}
            <img
              src={'file://' + image.replaceAll('\\', '/')}
              style={{ width: '200px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
