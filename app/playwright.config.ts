import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.e2e' });

export default defineConfig({
  testDir: 'tests/e2e',
  testMatch: /.*\.e2e\.ts$/,                 // only E2E files
  testIgnore: ['**/*.{test,spec}.{ts,tsx}'], // ignore all Vitest specs anywhere
  timeout: 60_000,
  retries: process.env.CI ? 1 : 0,
  use: { headless: false, trace: 'retain-on-failure', screenshot: 'only-on-failure', video: 'retain-on-failure' },
});
