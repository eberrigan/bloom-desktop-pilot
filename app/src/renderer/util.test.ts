import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock window.electron before importing the module that uses it
const mockGetCredentials = vi.fn();

vi.stubGlobal('window', {
  electron: {
    bloom: {
      getCredentials: mockGetCredentials,
    },
  },
});

// Now import the module after mocking
const { getSupabaseClient } = await import('./util');

const mockCreateClient = vi.fn();
const mockSignInWithPassword = vi.fn();

vi.mock('@supabase/supabase-js', () => ({
  createClient: (...args: any[]) => {
    const client = mockCreateClient(...args);
    return {
      ...client,
      auth: {
        signInWithPassword: mockSignInWithPassword,
      },
    };
  },
}));

describe('getSupabaseClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates and authenticates a Supabase client', async () => {
    const mockCredentials = {
      bloom_api_url: 'https://test.supabase.co',
      bloom_anon_key: 'test-anon-key',
      email: 'test@example.com',
      password: 'test-password',
    };

    mockGetCredentials.mockResolvedValue(mockCredentials);
    mockCreateClient.mockReturnValue({});
    mockSignInWithPassword.mockResolvedValue({ data: null, error: null });

    await getSupabaseClient();

    expect(mockGetCredentials).toHaveBeenCalledTimes(1);
    expect(mockCreateClient).toHaveBeenCalledWith(
      'https://test.supabase.co',
      'test-anon-key'
    );
    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'test-password',
    });
  });

  it('throws error when credentials are not available', async () => {
    mockGetCredentials.mockRejectedValue(new Error('No credentials available'));

    await expect(getSupabaseClient()).rejects.toThrow('No credentials available');
  });

  it('handles authentication failure', async () => {
    const mockCredentials = {
      bloom_api_url: 'https://test.supabase.co',
      bloom_anon_key: 'test-anon-key',
      email: 'test@example.com',
      password: 'wrong-password',
    };

    mockGetCredentials.mockResolvedValue(mockCredentials);
    mockCreateClient.mockReturnValue({});
    mockSignInWithPassword.mockRejectedValue(new Error('Invalid credentials'));

    await expect(getSupabaseClient()).rejects.toThrow('Invalid credentials');
  });
});