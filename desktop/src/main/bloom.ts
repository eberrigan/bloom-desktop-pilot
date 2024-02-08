import * as fs from 'fs';
import path from 'path';
import * as os from 'os';
import * as yaml from 'js-yaml';
import { createClient } from '@supabase/supabase-js';
// import { LocalStorage } from './local-storage';
import type { SupabaseClient } from '@supabase/supabase-js';

import { Database } from '../types/database.types';

export class BloomRetriever {
  private supabase: SupabaseClient<Database> | null = null;
  // private localStorage: LocalStorage = new LocalStorage();

  async init() {
    this.supabase = await getSupabaseClient(); // this.localStorage);
  }

  getPeople = async () => {
    return (await this.supabase?.from('people').select('*'))?.data;
  };
}

async function createBloomRetriever() {
  const bloom_retriever = new BloomRetriever();
  await bloom_retriever.init();
  return bloom_retriever;
}

async function getSupabaseClient() {
  // (localStorage: LocalStorage) {
  // Compute path to desktop-config.yaml
  const homedir = os.homedir();
  const config_yaml = path.join(homedir, '.bloom', 'desktop-config.yaml');
  console.log(config_yaml);

  // Load desktop-config.yaml
  const config = yaml.load(fs.readFileSync(config_yaml, 'utf8')) as {
    python: string;
    capture_scan_py: string;
    scans_dir: string;
    bloom_scanner_username: string;
    bloom_scanner_password: string;
    bloom_scanner_id: string;
    bloom_api_url: string;
    bloom_anon_key: string;
  };
  console.log(config);

  const clientOptions = {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      // storage: localStorage,
    },
  };

  const clientCredentials = {
    email: config.bloom_scanner_username,
    password: config.bloom_scanner_password,
    // clientOptions,
  };

  const supabase = createClient<Database>(
    config.bloom_api_url,
    config.bloom_anon_key,
  );
  await supabase.auth.signInWithPassword(clientCredentials);

  return supabase;
}

export { createBloomRetriever };
