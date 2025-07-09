import fs from 'fs';
import path from 'path';
import os from 'os';
import yaml from 'js-yaml';
import { PrismaClient,Prisma } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

const includeScanWithPhenotyper = {
  phenotyper: true,
} as const;

async function loadConfig() {
  const configPath = path.join(os.homedir(), ".bloom", "desktop-config.yaml");
  const config = yaml.load(fs.readFileSync(configPath, 'utf8')) as {
    local_db_path: string;
    bloom_api_url: string;
    bloom_anon_key: string;
    bloom_scanner_username: string;
    bloom_scanner_password: string;
  };
  return config;
}

async function getSupabaseClient(config: Awaited<ReturnType<typeof loadConfig>>) {
  const supabase = createClient(config.bloom_api_url, config.bloom_anon_key);
  await supabase.auth.signInWithPassword({
    email: config.bloom_scanner_username,
    password: config.bloom_scanner_password,
  });
  return supabase;
}

async function main() {
  const config = await loadConfig();
  process.env.BLOOM_DATABASE_URL = `file:${config.local_db_path}`;
;
  const prisma = new PrismaClient();
  const supabase = await getSupabaseClient(config);

const scans = await prisma.scan.findMany({
  where: { deleted: false },
});

  for (const scan of scans) {

    const phenotyper = await prisma.phenotyper.findUnique({
      where: { id: scan.phenotyper_id },
    });

    const experiment = await prisma.experiment.findUnique({
      where: { id: scan.experiment_id },
    });

    const scientist = experiment ? await prisma.scientist.findUnique({
      where: { id: experiment.scientist_id ?? undefined },
    }) : null;  

    console.log(`Processing scan for plant ID: ${scan.plant_id}`);
    console.log(`Processing scan for phenotyper: ${phenotyper?.email || 'null'}`);
    console.log(`Processing scan for phenotyper: ${phenotyper?.name || 'null'}`);
    console.log(`Processing scan for scientist: ${scientist?.email || 'null'}`);
    console.log(`Processing scan for scientist: ${scientist?.name || 'null'}`);

    let phenotyper_name = phenotyper?.name || 'Unknown';
    let phenotyper_email = phenotyper?.email || 'Unknown';
    let scientist_name = scientist?.name || 'Unknown';
    let scientist_email = scientist?.email || 'Unknown';


    // // Fetch plant id 
    const { data: plantData, error: plantError } = await supabase
      .from('cyl_plants')
      .select('id')
      .eq('qr_code', scan.plant_id)
      .single();

    if (plantError || !plantData) {
      console.error(`No plant found for qr_code=${plantData}:`, plantError?.message);
      continue;
    }
    else{
      console.log(`Found plant with ID: ${plantData.id} for qr_code=${scan.plant_id}`);
    }

    const { data: scanData, error: scanError } = await supabase
      .from('cyl_scans')
      .select(`
        *
      `)
      .eq('plant_id', plantData.id)
      .single();
    
    let phenotyperId: string;
    const { data: existingPhenotyper, error: phenoError } = await supabase
      .from('phenotypers')
      .select('id')
      .eq('email', phenotyper_email)
      .single();

    if (existingPhenotyper) {
      phenotyperId = existingPhenotyper.id;
    } else if (phenoError?.code === 'PGRST116') {
      
      const { data: newPheno, error: insertError } = await supabase
      .from('phenotypers')
      .insert({ name: phenotyper_name, email: phenotyper_email })
      .select('id')
      .single();

      if (insertError) throw new Error("Insert failed: " + insertError.message);
      phenotyperId = newPheno.id;
    } else {
      throw new Error("Query failed: " + phenoError?.message);
    }

    //Scientist Info:
    let scientistId: string;
    const { data: existingScientist, error: scientistError } = await supabase
    .from('cyl_scientists')
    .select('id')
    .eq('email', scientist_email || null)
    .single();

    if (existingScientist) {
      scientistId = existingScientist.id;
    } else if (scientistError?.code === 'PGRST116') {
      
      const { data: newScientist, error: insertError } = await supabase
      .from('phenotypers')
      .insert({ name: phenotyper_name || null, email: phenotyper_email || null })
      .select('id')
      .single();

      if (insertError) throw new Error("Insert failed: " + insertError.message);
      scientistId = newScientist.id;
    } else {
      throw new Error("Query failed: " + phenoError?.message);
    }

    // Camera Info:
    let cameraSettingsId: string;
    const { data: newSettings, error: insertError } = await supabase
      .from('cyl_camera_settings')
      .insert({
        exposure_time: scan.exposure_time,
        gain: scan.gain,
        brightness: scan.brightness,
        contrast: scan.contrast,
        gamma: scan.gamma,
        seconds_per_rot: scan.seconds_per_rot,
      })
      .select('id')
      .single();

    if (insertError) {
      throw new Error("Insert failed: " + insertError.message);
    }
    cameraSettingsId = newSettings.id;

    console.log(`Camera settings ID: ${cameraSettingsId}`);

    const { error: updateError } = await supabase
    .from('cyl_scans')
    .update({
      phenotyper_id: phenotyperId,
      scientist_id: scientistId,
      cyl_camera_settings_id: cameraSettingsId,
    })
    .eq('id', scanData.id);

    if (updateError) {
      console.error(`Failed to update scan metadata for scan ID: ${scanData.id}`, updateError.message);
    } else {
      console.log(`Updated metadata for scan ID: ${scanData.id}`);
    }

    console.log("Supabase query result:", scanData);
    console.log(`Processing scan for plant ID: ${plantData?.id || 'not found'}`);
  }

  await prisma.$disconnect();
  console.log(" Sync complete.");


}

main().catch((err) => {
  console.error("Error during sync:", err);
});

