import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { getPrismaClient } from './prisma';

// Mock PrismaClient
vi.mock('@prisma/client', () => {
  const PrismaClientMock = vi.fn().mockImplementation((config) => ({
    $connect: vi.fn(),
    $disconnect: vi.fn(),
    _config: config,
  }));
  return { PrismaClient: PrismaClientMock };
});

describe('getPrismaClient', () => {
  const originalEnv = process.env.NODE_ENV;
  const testDbUrl = 'file:./test.db';
  const altDbUrl = 'file:./alternative.db';

  beforeEach(() => {
    // Clear global prisma instance
    const globalAny = global as any;
    delete globalAny.prisma;
    delete globalAny.dbUrl;
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  it('creates a new PrismaClient instance', () => {
    const client = getPrismaClient(testDbUrl);
    expect(client).toBeDefined();
    expect(client._config.datasourceUrl).toBe(testDbUrl);
  });

  it('configures logging', () => {
    const client = getPrismaClient(testDbUrl);
    expect(client._config.log).toEqual([
      { level: 'query', emit: 'event' }
    ]);
  });

  it('reuses existing global instance in development', () => {
    process.env.NODE_ENV = 'development';
    
    const client1 = getPrismaClient(testDbUrl);
    const client2 = getPrismaClient(testDbUrl);
    
    expect(client1).toBe(client2);
  });

  it('throws error when trying to initialize with different dbUrl in development', () => {
    process.env.NODE_ENV = 'development';
    
    getPrismaClient(testDbUrl);
    
    expect(() => getPrismaClient(altDbUrl)).toThrow(
      'PrismaClient has already been initialized. Please access `prisma` from the global context.'
    );
  });

  it('does not cache in production', () => {
    process.env.NODE_ENV = 'production';
    
    const client1 = getPrismaClient(testDbUrl);
    const client2 = getPrismaClient(testDbUrl);
    
    // In production, it doesn't store in global, so new instances are created
    expect(client1).not.toBe(client2);
  });

  it('stores dbUrl in global context in development', () => {
    process.env.NODE_ENV = 'development';
    
    getPrismaClient(testDbUrl);
    
    const globalAny = global as any;
    expect(globalAny.dbUrl).toBe(testDbUrl);
  });

  it('stores prisma instance in global context in development', () => {
    process.env.NODE_ENV = 'development';
    
    const client = getPrismaClient(testDbUrl);
    
    const globalAny = global as any;
    expect(globalAny.prisma).toBe(client);
  });

  it('does not store in global context in production', () => {
    process.env.NODE_ENV = 'production';
    
    getPrismaClient(testDbUrl);
    
    const globalAny = global as any;
    expect(globalAny.dbUrl).toBeUndefined();
    expect(globalAny.prisma).toBeUndefined();
  });
});