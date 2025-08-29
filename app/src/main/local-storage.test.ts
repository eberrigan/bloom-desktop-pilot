import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LocalStorage } from './local-storage';

describe('LocalStorage', () => {
  let localStorage: LocalStorage;

  beforeEach(() => {
    localStorage = new LocalStorage();
    vi.clearAllMocks();
  });

  describe('setItem', () => {
    it('stores a string value', () => {
      localStorage.setItem('key1', 'value1');
      expect(localStorage.getItem('key1')).toBe('value1');
    });

    it('converts non-string values to strings', () => {
      localStorage.setItem('number', 123 as any);
      expect(localStorage.getItem('number')).toBe('123');
    });

    it('warns when key is not a string', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      localStorage.setItem(123 as any, 'value');
      expect(consoleWarnSpy).toHaveBeenCalledWith('LocalStorage: Key should be of type String');
      consoleWarnSpy.mockRestore();
    });
  });

  describe('getItem', () => {
    it('returns stored value', () => {
      localStorage.setItem('key1', 'value1');
      expect(localStorage.getItem('key1')).toBe('value1');
    });

    it('returns null for non-existent key', () => {
      expect(localStorage.getItem('nonexistent')).toBeNull();
    });

    it('warns and returns null when key is not a string', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const result = localStorage.getItem(123 as any);
      expect(result).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith('LocalStorage: Key should be of type String');
      consoleWarnSpy.mockRestore();
    });
  });

  describe('removeItem', () => {
    it('removes an existing item', () => {
      localStorage.setItem('key1', 'value1');
      localStorage.removeItem('key1');
      expect(localStorage.getItem('key1')).toBeNull();
    });

    it('does nothing when removing non-existent key', () => {
      expect(() => localStorage.removeItem('nonexistent')).not.toThrow();
    });

    it('warns when key is not a string', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      localStorage.removeItem(123 as any);
      expect(consoleWarnSpy).toHaveBeenCalledWith('LocalStorage: Key should be of type String');
      consoleWarnSpy.mockRestore();
    });
  });

  describe('clear', () => {
    it('removes all items', () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');
      localStorage.setItem('key3', 'value3');
      
      localStorage.clear();
      
      expect(localStorage.getItem('key1')).toBeNull();
      expect(localStorage.getItem('key2')).toBeNull();
      expect(localStorage.getItem('key3')).toBeNull();
      expect(localStorage.length).toBe(0);
    });
  });

  describe('key', () => {
    it('returns key at given index', () => {
      localStorage.setItem('first', 'value1');
      localStorage.setItem('second', 'value2');
      
      const keys = [localStorage.key(0), localStorage.key(1)];
      expect(keys).toContain('first');
      expect(keys).toContain('second');
    });

    it('returns null for out of bounds index', () => {
      localStorage.setItem('key1', 'value1');
      expect(localStorage.key(10)).toBeNull();
    });

    it('returns null for negative index', () => {
      localStorage.setItem('key1', 'value1');
      expect(localStorage.key(-1)).toBeNull();
    });
  });

  describe('length', () => {
    it('returns 0 for empty storage', () => {
      expect(localStorage.length).toBe(0);
    });

    it('returns correct count of items', () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');
      localStorage.setItem('key3', 'value3');
      expect(localStorage.length).toBe(3);
    });

    it('updates after removing items', () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');
      expect(localStorage.length).toBe(2);
      
      localStorage.removeItem('key1');
      expect(localStorage.length).toBe(1);
    });
  });
});