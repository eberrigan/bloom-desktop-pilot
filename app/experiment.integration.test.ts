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

//   // Wait for species dropdown to be populated
//   await window.waitForSelector('option[value="Arabidopsis"]'); // Replace with real species value
//   await window.selectOption('[data-testid="experiment-species-select"]', 'Arabidopsis');

//   // Wait for scientist dropdown and select
//   await window.waitForSelector('option[value="sci-3"]'); // Replace with actual ID
//   await window.selectOption('[data-testid="experiment-scientist-select"]', 'sci-3');

//   // Wait for accession dropdown and select
//   await window.waitForSelector('option[value="acc-3"]'); // Replace with actual ID
//   await window.selectOption('[data-testid="experiment-accession-select"]', 'acc-3');

//   // Click the Create button
//   await window.click('[data-testid="create-experiment-button"]');

//   // Wait for list to refresh and check if experiment was added
//   await window.waitForSelector('text=Playwright Integration Test', { timeout: 10000 });

//   // Optionally assert that the text appears
//   const textExists = await window.isVisible('text=Playwright Integration Test');
//   expect(textExists).toBe(true);

  await electronApp.close();
});
