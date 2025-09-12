// app/tests/e2e/create-experiment.e2e.ts
import path from 'node:path';
import { test, expect, _electron as electron } from '@playwright/test';
import { PrismaClient,Prisma } from '@prisma/client';
import * as fs from 'fs';
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();
let window: any;
let app : any;
// Use Electron binary and point cwd at app/

//const electronPath: string = (await import('electron')).default as unknown as string;

//Setiing global test params used in test
const test_values = {
    phenotyper_name : 'Playwright_Phenotyper',
    phenotyper_email : 'pehnotyper@salk.edu',
    scientists_name : 'Playwright_Scientists',
    scientists_email : 'playwrightscientists@salk.edu',
    fileName : `accession-${Date.now()}.xlsx`,
    exp_name : 'Playwright Integration Test 2',
    accession_file_rows : [
        ['PLANT-001', 'GENO-AAA'],
        ['PLANT-002', 'GENO-BBB'],
    ]
}

// the db records created
const created = {
    phenotyperId: null as string | null,
    scientistId:  null as string | null,
    accessionId:  null as string | null,
    experimentId: null as string | null,
    tmpFilePath:  '' as string,
  };

test.beforeAll(async () => {
  const electronPath = require('electron') as unknown as string;
  const appCwd = path.resolve(__dirname, '..', '..');
  console.log(appCwd)

  app = await electron.launch({
    executablePath: electronPath,
    args: ['.'],
    cwd: appCwd,
    env: { ...process.env, NODE_ENV: 'test', E2E: '1' },
   });

    window = await app.firstWindow();
    await prisma.$connect();
    await window.waitForLoadState('domcontentloaded', { timeout: 10_000 });
})

test.afterAll(async () => {
  // Clearing all the testing variables crated on prisma
  console.log("CLEAR : Removing all the testing data written to primsa")
  if (created.experimentId) {
    await prisma.experiment.delete({ where: { id: created.experimentId } }).catch(() => {});
  }
  if (created.accessionId) {
    await prisma.plantAccessionMappings.deleteMany({ where: { accession_file_id: created.accessionId } }).catch(() => {});
    await prisma.accessions.delete({ where: { id: created.accessionId } }).catch(() => {});
  }
  if (created.scientistId) {
    await prisma.scientist.delete({ where: { id: created.scientistId } }).catch(() => {});
  }
  if (created.phenotyperId) {
    await prisma.phenotyper.delete({ where: { id: created.phenotyperId } }).catch(() => {});
  }
  if (created.tmpFilePath && fs.existsSync(created.tmpFilePath)) {
    fs.unlinkSync(created.tmpFilePath);
  }
  await prisma.$disconnect();
  await app.close();
});


test('create new phenotyper check if persists in DB', async () => {
  test.setTimeout(60_000);

  await window.click('text=Phenotyping Scientists');
  const phenotyper_name = 'Playwright_Phenotyper';
  const phenotyper_email = 'pehnotyper@salk.edu';
  await window.fill('[data-testid="create-phenotyper-name"]', phenotyper_name);
  await window.fill('[data-testid="create-phenotyper-email"]', phenotyper_email);
  await window.click('[data-testid="create-phenotyper-button"]');

  //connect to db and verify
  await expect
    .poll(async () => {
        const row = await prisma.phenotyper.findFirst({
            where: { name: phenotyper_name },
            select: { id: true },
        });
        created.phenotyperId = row?.id ?? null
        return Boolean(row?.id ?? null);
  }, { timeout: 10000, intervals: [150, 250, 400] }) .toBe(true);

    const phenotyper_row = await prisma.phenotyper.findFirst({
    where: { name: phenotyper_name },
    select: { id: true },
    });
    const phenotyper_id = phenotyper_row!.id;
    expect(phenotyper_id).toBeTruthy();
    console.log("TEST: Created Phenotyper Successfully. (Prisma)")
})

test('create new scientists check if persists in DB', async () => {
    //TEST : Create Scientist
    const scientistsLink = window.getByRole('link', { name: /^Scientists$/ });
    await expect(scientistsLink).toBeVisible();
    await scientistsLink.click();
    const scientists_name = test_values.scientists_name
    const scientists_email = test_values.scientists_email

    await expect(window.getByTestId('create-scientists-name')).toBeVisible({ timeout: 15_000 });
    await window.getByTestId('create-scientists-name').fill(scientists_name);
    await window.getByTestId('create-scientists-email').fill(scientists_email);
    
    await window.getByTestId('create-scientists-button').click();
    await window.click('[data-testid="create-scientists-button"]');

    await expect
    .poll(async () => {
        const row = await prisma.scientist.findFirst({
            where: { name: scientists_name },
            select: { id: true },
        });
        created.scientistId = row?.id ?? null;
        return Boolean(row?.id ?? null);
    }, { timeout: 10000, intervals: [150, 250, 400] }) .toBe(true);

    const scientist_row = await prisma.scientist.findFirst({
    where: { name: scientists_name },
    select: { id: true },
    });
    const scientists_id = scientist_row!.id;
    expect(scientists_id).toBeTruthy();
    console.log("TEST: Created Scientist Successfully (Prisma).")
})

test('upload new accession file, check slection of excel fiels, check upload preview, check if persists in DB', async () => {
    //TEST : Create Sample Excel File
    const headers = ['PlantBarcode', 'GenotypeID'];
    const rows = test_values.accession_file_rows;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
    const fileName = test_values.fileName
    const filePath = test.info().outputPath(fileName);
    fs.writeFileSync(filePath, buf);

    const accessionLink = window.getByRole('link', { name: /^Accessions$/ });
    await expect(accessionLink).toBeVisible();
    await accessionLink.click();
    await window.setInputFiles('input[name="file"]', filePath);

    const selects = window.locator('select');
    await expect(selects.nth(0)).toBeVisible();
    await selects.nth(0).selectOption('Sheet1');

    await expect(selects.nth(1)).toBeVisible();
    await selects.nth(1).selectOption('PlantBarcode');

    await expect(selects.nth(2)).toBeVisible();
    await selects.nth(2).selectOption('GenotypeID');

    // Check: preview table should render the data
    await expect(window.getByText('🌱 Plant ID')).toBeVisible();
    await expect(window.getByText('🏷️ Genotype ID')).toBeVisible();
    await expect(window.getByText('PLANT-001')).toBeVisible();
    await expect(window.getByText('GENO-AAA')).toBeVisible();

    console.log("TEST: Upload Accession preview Successfully.")

    await window.getByRole('button', { name: 'Upload Accession Files' }).click();
    
    console.log("TEST: Upload Accession button click Successfully.")

    //Check accession file on prisma
    let accessionFileId: string | null = null;
    await expect
    .poll(async () => {
        const row = await prisma.accessions.findFirst({
        where: { name: fileName },        
        select: { id: true },
        });
        created.accessionId = row?.id ?? null;
        accessionFileId = row?.id ?? null;
        return !!accessionFileId;
    }, { timeout: 30_000, intervals: [250, 500, 1000] })
    .toBe(true);

    expect(accessionFileId).toBeTruthy();
    console.log("TEST: Retrieved Accession file id Successfully (Prisma):",accessionFileId)

    await expect
    .poll(async () => {
        if (!accessionFileId) return false;
        if (!created.accessionId) return false;
        const dbRows = await prisma.plantAccessionMappings.findMany({
        where: { accession_file_id: accessionFileId },
        select: { plant_barcode: true, accession_id: true },
        });

        if (dbRows.length < rows.length) return false;

        const dbSet = new Set(
        dbRows.map(r => `${String(r.plant_barcode)}::${String(r.accession_id)}`)
        );

        for (const [plantBarcode, genotypeId] of rows) {
        const key = `${String(plantBarcode)}::${String(genotypeId)}`;
        if (!dbSet.has(key)) return false;
        }
        return true;
    }, { timeout: 30_000, intervals: [250, 500, 1000] })
    .toBe(true);

    console.log("TEST: Checked excel file content Successfully (Prisma):",accessionFileId)
})

test('create new experiment, check species selection, check scientist selection, check accessionfile selection, check if persists in DB', async () => {
    const createExperimentLink = window.getByRole('link', { name: /^Experiments$/ });
    await expect(createExperimentLink).toBeVisible();
    await createExperimentLink.click();

    const exp_name = test_values.exp_name;

    await window.fill('[data-testid="experiment-name-input"]', exp_name);

    //Select Species
    const speciesSelector = window.getByTestId('experiment-species-select');
    if (await speciesSelector.count()) {
    await speciesSelector.selectOption({ value: 'Amaranth' });
    await expect(speciesSelector).toHaveValue('Amaranth');
    }
    
    //Select Scientist
    const scientistSelector = window.getByTestId('experiment-scientist-select');
    await scientistSelector.click();
    await window.mouse.wheel(0, 500);
    //await expect.poll(async () => await scientistSelector.locator('option').count(), { timeout: 20_000 }).toBeGreaterThan(0);
    await expect.poll(async () => {const options = await scientistSelector.locator('option').allTextContents();return options.includes(test_values.scientists_name);}, { timeout: 10_000 }).toBe(true);
    await scientistSelector.selectOption({ label: test_values.scientists_name });
    const selectedId = await scientistSelector.inputValue();
    expect(selectedId).toBeTruthy();

    //Select Accession File
    const accessionSelector = window.getByTestId('experiment-accession-select');
    await expect(accessionSelector).toBeVisible();
    await expect
    .poll(async () => await accessionSelector.locator('option').count(), { timeout: 10_000 })
    .toBeGreaterThan(0);

    const label = `${test_values.fileName} - ${created.accessionId}`;
    await expect(accessionSelector.locator('option', { hasText: label })).toHaveCount(1, { timeout: 10_000 });
    await accessionSelector.selectOption({ label });

    await window.click('[data-testid="create-experiment-button"]');

    let experimentId: string | null = null;
    await expect
    .poll(async () => {
        const row = await prisma.experiment.findFirst({
        where: { name: test_values.exp_name },        
        select: { id: true },
        });
        created.experimentId
        experimentId = row?.id ?? null;
        return !!experimentId;
    }, { timeout: 30_000, intervals: [250, 500, 1000] })
    .toBe(true);

    expect(experimentId).toBeTruthy();

    const list = window.getByTestId('experiments-list');
    const rowById = list.locator(`li[data-exp-id="${experimentId}"]`);
    await rowById.scrollIntoViewIfNeeded();
    await expect(rowById).toBeVisible();

    console.log("TEST: Created experiment and verified on prisma Successfully (Prisma)");
})

test('displays correct plant QR code suggestions and maps to expected accession ID', async() => {
    test.setTimeout(60_000);
    const captureScan = window.getByRole('link', { name: /^Capture$/ });
    await expect(captureScan).toBeVisible();
    await captureScan.click();

    const inputValue = test_values.accession_file_rows[0][0];

    //Choose eperiment
    const experimentSelector = window.getByTestId('experiment-select-list')
    await expect.poll(async () => {const options = await experimentSelector.locator('option').allTextContents();return options.includes(test_values.exp_name);}, { timeout: 10_000 }).toBe(true);
    await experimentSelector.selectOption({ label: test_values.exp_name });
    const selectedIdExp = await experimentSelector.inputValue();
    expect(selectedIdExp).toBeTruthy();

    //Check the qrcode selector
    const qrInput = window.getByTestId('plant-qrcode-input');
    await qrInput.fill(inputValue);
    const suggestionList = window.getByTestId('suggestion-plant-qr-code');
    await expect(suggestionList).toBeVisible({ timeout: 10_000 });
    const suggestionItems = await suggestionList.locator('li')
    await expect(suggestionItems.first()).toContainText(inputValue);
    await suggestionItems.first().click();

    //Check the accession mapping
    const genotype = test_values.accession_file_rows[0][1];
    const accessionMapping = await window
      .getByTestId('genotype-value')
      .locator('span')
      .allTextContents();

    expect(accessionMapping).toContain(genotype); 
})