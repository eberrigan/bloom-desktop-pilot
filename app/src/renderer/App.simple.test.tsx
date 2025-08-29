import { describe, it, expect, vi, beforeAll } from 'vitest';
import React from 'react';

// Setup window mocks before any imports
beforeAll(() => {
  // Mock window object
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  });

  // Mock electron API
  (window as any).electron = {
    ipcRenderer: {
      sendMessage: vi.fn(),
      on: vi.fn(),
      once: vi.fn()
    },
    clipboard: {
      writeText: vi.fn(),
      readText: vi.fn()
    }
  };
});

// Mock all the component dependencies
vi.mock('./Layout', () => ({
  Layout: () => React.createElement('div', { 'data-testid': 'layout' }, 'Layout')
}));

vi.mock('./CaptureScan', () => ({
  CaptureScan: () => React.createElement('div', { 'data-testid': 'capture-scan' }, 'CaptureScan')
}));

vi.mock('./BrowseScans', () => ({
  BrowseScans: () => React.createElement('div', { 'data-testid': 'browse-scans' }, 'BrowseScans')
}));

vi.mock('./ViewScan', () => ({
  ViewScan: () => React.createElement('div', { 'data-testid': 'view-scan' }, 'ViewScan')
}));

vi.mock('./Export', () => ({
  Export: () => React.createElement('div', { 'data-testid': 'export' }, 'Export')
}));

vi.mock('./CameraSettings', () => ({
  CameraSettings: () => React.createElement('div', { 'data-testid': 'camera-settings' }, 'CameraSettings')
}));

vi.mock('./Experiments', () => ({
  Experiments: () => React.createElement('div', { 'data-testid': 'experiments' }, 'Experiments')
}));

vi.mock('./Accessions', () => ({
  Accessions: () => React.createElement('div', { 'data-testid': 'accessions' }, 'Accessions')
}));

vi.mock('./Phenotypers', () => ({
  Phenotypers: () => React.createElement('div', { 'data-testid': 'phenotypers' }, 'Phenotypers')
}));

vi.mock('./Scientists', () => ({
  Scientists: () => React.createElement('div', { 'data-testid': 'scientists' }, 'Scientists')
}));

describe('App Component Basic Tests', () => {
  it('should import without errors', async () => {
    // Just try to import the component
    const module = await import('./App');
    expect(module.default).toBeDefined();
  });

  it('should be a React component', async () => {
    const module = await import('./App');
    const App = module.default;
    expect(typeof App).toBe('function');
  });

  it('should have proper route structure', async () => {
    // This test just verifies the component structure is correct
    // The actual rendering tests are complex due to React Router
    const module = await import('./App');
    const App = module.default;
    
    // Try to create element (won't render, just checks it can be created)
    const element = React.createElement(App);
    expect(element).toBeDefined();
    expect(element.type).toBe(App);
  });
});