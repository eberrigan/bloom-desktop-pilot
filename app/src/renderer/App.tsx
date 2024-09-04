import "tailwindcss/tailwind.css";
import "./App.css";

import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { CaptureScan } from "./CaptureScan";
import { Layout } from "./Layout";
import { BrowseScans } from "./BrowseScans";
import { ViewScan } from "./ViewScan";
import { CameraSettings } from "./CameraSettings";
import { Export } from "./Export";
import { Phenotypers } from "./Phenotypers";
import { Scientists } from "./Scientists";
import { Experiments } from "./Experiments";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CaptureScan />} />
          <Route path="browse-scans" element={<BrowseScans />} />
          <Route path="browse-scans/:scanId" element={<ViewScan />} />
          <Route path="camera-settings" element={<CameraSettings />} />
          <Route path="export" element={<Export />} />
          <Route path="experiments" element={<Experiments />} />
          <Route path="phenotypers" element={<Phenotypers />} />
          <Route path="scientists" element={<Scientists />} />
        </Route>
      </Routes>
    </Router>
  );
}
