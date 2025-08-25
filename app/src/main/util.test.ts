import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { resolveHtmlPath } from './util';
import path from 'path';

describe('resolveHtmlPath', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns localhost URL in development mode', () => {
    process.env.NODE_ENV = 'development';
    process.env.PORT = '3000';

    const result = resolveHtmlPath('index.html');
    
    expect(result).toBe('http://localhost:3000/index.html');
  });

  it('uses default port 1212 when PORT is not set', () => {
    process.env.NODE_ENV = 'development';
    delete process.env.PORT;

    const result = resolveHtmlPath('index.html');
    
    expect(result).toBe('http://localhost:1212/index.html');
  });

  it('returns file URL in production mode', () => {
    process.env.NODE_ENV = 'production';

    const result = resolveHtmlPath('index.html');
    const expectedPath = `file://${path.resolve(__dirname, '../renderer/index.html')}`;
    
    expect(result).toBe(expectedPath);
  });

  it('handles different HTML file names', () => {
    process.env.NODE_ENV = 'development';
    process.env.PORT = '3000';

    const result = resolveHtmlPath('about.html');
    
    expect(result).toBe('http://localhost:3000/about.html');
  });

  it('returns file URL when NODE_ENV is not set', () => {
    delete process.env.NODE_ENV;

    const result = resolveHtmlPath('index.html');
    const expectedPath = `file://${path.resolve(__dirname, '../renderer/index.html')}`;
    
    expect(result).toBe(expectedPath);
  });
});