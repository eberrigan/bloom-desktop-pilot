import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const ipcRenderer = window.electron.ipcRenderer;

function Hello() {
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
}

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
  // 📷💾

  const nImages = 72;

  const [images, setImages] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [numCaptured, setNumCaptured] = useState<number>(0)
  const [scanName, setScanName] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  useEffect(() => {
    return ipcRenderer.on('image-saved', (arg) => {
      const imagePath: string = arg as string;
      // eslint-disable-next-line no-console
      console.log(imagePath);
      setImages([...images, imagePath])
    });
  }, [images])

  useEffect(() => {
    return ipcRenderer.on('image-captured', () => {
      const newNumCaptured = numCaptured + 1;
      setNumCaptured(newNumCaptured);
      if (newNumCaptured == nImages) {
        setIsScanning(false);
        setIsSaving(true);
      }
    });
  }, [numCaptured])

  const startScan = () => {
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
  }

  return (
    <>
      <button onClick={(e) => startScan()}>Start Scan</button>
      <div>{ isScanning ? 'scanning' : 'not scanning'  }</div>
      <div>{ isSaving ? 'saving' : 'not saving' }</div>
      <div>numCaptured: { numCaptured }</div>
      <div>scanName: { scanName }</div>
      <div>selectedImage: { selectedImage }</div>
      <Scan images={images} />
    </>
  )
}

export function Scan({images}: {images: string[]}) {
  return (
    <div>
      <div>Scan</div>
      <div className="h-96 overflow-scroll" style={{overflow: 'scroll', height: '500px'}}>
        {
          images.map((image) => (
            <div key={image}>
              {image}
              <img src={'file://' + image.replaceAll('\\', '/')} style={{width: '200px'}} />
            </div>
          ))
        }
      </div>
    </div>
  )
}