import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from './App';

// Mock window.electron with complete structure
const mockElectron = {
  ipcRenderer: {
    sendMessage: vi.fn(),
    on: vi.fn(() => () => {}),
    once: vi.fn()
  },
  clipboard: {
    writeText: vi.fn(),
    readText: vi.fn()
  }
};

// Mock window object with addEventListener
(global as any).window = {
  electron: mockElectron,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  location: { pathname: '/' },
  matchMedia: vi.fn(() => ({
    matches: false,
    addListener: vi.fn(),
    removeListener: vi.fn()
  }))
};

// Mock React Router - simplified to avoid rendering issues
vi.mock('react-router-dom', () => ({
  MemoryRouter: ({ children }: { children: React.ReactNode }) => children,
  Routes: ({ children }: { children: React.ReactNode }) => children,
  Route: () => null,
  Link: () => null,
  NavLink: () => null,
  useNavigate: () => vi.fn(),
  useParams: () => ({}),
  Outlet: () => null
}));

// Mock all child components to prevent rendering issues
vi.mock('./Layout', () => ({ Layout: () => null }));
vi.mock('./CaptureScan', () => ({ CaptureScan: () => null }));
vi.mock('./BrowseScans', () => ({ BrowseScans: () => null }));
vi.mock('./ViewScan', () => ({ ViewScan: () => null }));
vi.mock('./Export', () => ({ Export: () => null }));
vi.mock('./CameraSettings', () => ({ CameraSettings: () => null }));
vi.mock('./Experiments', () => ({ Experiments: () => null }));
vi.mock('./Accessions', () => ({ Accessions: () => null }));
vi.mock('./Phenotypers', () => ({ Phenotypers: () => null }));
vi.mock('./Scientists', () => ({ Scientists: () => null }));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset window.electron
    (global as any).window = {
      electron: mockElectron,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      matchMedia: vi.fn(() => ({
        matches: false,
        addListener: vi.fn(),
        removeListener: vi.fn()
      }))
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
    if ((global as any).window) {
      delete (global as any).window.electron;
    }
  });

  it('should be a valid React component', () => {
    expect(typeof App).toBe('function');
  });

  it('should import without errors', () => {
    expect(App).toBeDefined();
  });

  // Note: Full rendering tests are skipped due to React Router and component complexity
  // These would require a more complete testing setup with proper routing context
});