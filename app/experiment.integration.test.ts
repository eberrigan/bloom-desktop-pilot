import { test, expect, _electron as electron } from '@playwright/test';

test('creates a new experiment via real Electron window', async () => {
  test.setTimeout(60000);
  const electronApp = await electron.launch({ args: ['.'] });
  const window = await electronApp.firstWindow();

  // Wait for the app to be ready and UI to show up
  await window.click('text=Experiments');
  await window.waitForSelector('[data-testid="experiment-name-input"]', { timeout: 10000 });

  // Fill in experiment name
  await window.fill('[data-testid="experiment-name-input"]', 'Playwright Integration Test');


  await electronApp.close();
});
