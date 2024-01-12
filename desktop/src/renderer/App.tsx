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
      const newImages = [...images, imagePath];
      setImages(newImages);
      if (newImages.length === nImages) {
        setIsSaving(false);
      }
    });
  }, [images])

  useEffect(() => {
    return ipcRenderer.on('image-captured', () => {
      const newNumCaptured = numCaptured + 1;
      setNumCaptured(newNumCaptured);
      if (newNumCaptured === nImages) {
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

  function mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }

  const nextImage = () => {
    const nextIndex = mod(selectedImage + 1, images.length)
    setSelectedImage(nextIndex)
  }

  const prevImage = () => {
    const nextIndex = mod(selectedImage - 1, images.length)
    setSelectedImage(nextIndex)
  }

  return (
    <div className='flex flex-col'>
        {
          <div className=''>
            <div
              className='text-center'
              style={{width: '500px'}}
              >
              <button  
                className=''
                onClick={(e) => startScan()}
                disabled={isScanning || isSaving}
                >
                Start Scan
              </button>  
            </div>      
          </div>
        }
        {
          isScanning
          ?
            <div className=''>
              <div className=''>📷 Scanning... { numCaptured } / {nImages}</div>
            </div>
          :
          null
        }
        {
          isSaving
          ?
            <div className=''>
              <div
                className=''
                style={{width: '500px'}}>
                💾 Saving... { images.length } / {nImages}
              </div>
            </div>
          :
          null
        }
      <div className=''>
        <div className=''>
        {
          images.length > 0
          ?
          <img
            src={'file://' + images[selectedImage].replaceAll('\\', '/')}
            style={{width: '500px'}} />
          :
          <div style={{width: '500px', height: '250px'}} >
          </div>
        }
        </div>
      </div>
      <div className=''>
        <div className=''>
          <button onClick={(e) => {prevImage()}}>&larr; Prev</button>
          &nbsp;
          <button onClick={(e) => {nextImage()}}>Next &rarr;</button>
          &nbsp;
          <span className='px-4'>{selectedImage + 1} / { images.length }</span>
        </div>
      </div>
    </div>
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