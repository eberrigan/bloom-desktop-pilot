import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { useEffect, useState } from 'react';

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

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    return ipcRenderer.on('grab-frames', (arg) => {
      const imagePath: string = arg as string;
      // eslint-disable-next-line no-console
      console.log(imagePath);
      setImages([...images, imagePath])
    });
  }, [images])

  useEffect(() => {
    ipcRenderer.sendMessage('grab-frames', ['ping']);
  }, []);

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Scan images={images} />} />
      </Routes>
    </Router>
  );
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