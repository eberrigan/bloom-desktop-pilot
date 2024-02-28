import "tailwindcss/tailwind.css";
import "./App.css";

import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { CaptureScan } from "./CaptureScan";
import { Layout } from "./Layout";
import { BrowseScans } from "./BrowseScans";
import { ViewScan } from "./ViewScan";
import { CameraSettings } from "./CameraSettings";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CaptureScan />} />
          <Route path="browse-scans" element={<BrowseScans />} />
          <Route path="browse-scans/:scanId" element={<ViewScan />} />
          <Route path="camera-settings" element={<CameraSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}
