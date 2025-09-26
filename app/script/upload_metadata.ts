/**
 * Bloom Desktop Scan Sync Script
 *
 * This script syncs scan metadata from the local SQLite/Prisma database
 * into the Supabase `cyl_*` tables. For each scan:
 *   - Finds or upserts phenotyper and scientist records
 *   - Finds or upserts camera settings
 *   - Links the scan record in `cyl_scans` with the right metadata
 *
 * Usage:
 *   ts-node sync_scans.ts
 *
 * Requirements:
 *   - Config file: ~/.bloom/desktop-config.yaml
 *   - Environment vars: SUPABASE_URL, SUPABASE_KEY, BLOOM_DATABASE_URL
 */

import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import * as yaml from "js-yaml";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

async function loadConfig() {
  const configPath = path.join(os.homedir(), ".bloom", "desktop-config.yaml");
  const config = yaml.load(fs.readFileSync(configPath, "utf8")) as {
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
  const prisma = new PrismaClient();
  const supabase = await getSupabaseClient(config);

  const scans = await prisma.scan.findMany({
    where: { deleted: false },
    include: {
      phenotyper: true,
      experiment: { include: { scientist: true } },
    },
  });

  const phenotyperCache = new Map<string, string>();
  const scientistCache = new Map<string, string>();

  for (const scan of scans) {
    try {
      const phenotyper = scan.phenotyper;
      const experiment = scan.experiment;
      const scientist = experiment?.scientist;

      const phenotyper_name = phenotyper?.name || "Unknown";
      const phenotyper_email = phenotyper?.email || "Unknown";
      const scientist_name = scientist?.name || "Unknown";
      const scientist_email = scientist?.email || "Unknown";

      console.log(`Processing scan for plant ID: ${scan.plant_id}`);
      console.log(`  Phenotyper: ${phenotyper_name} (${phenotyper_email})`);
      console.log(`  Scientist: ${scientist_name} (${scientist_email})`);

      const { data: plantData, error: plantError } = await supabase
        .from("cyl_plants")
        .select("id")
        .eq("qr_code", scan.plant_id)
        .single();

      if (plantError || !plantData) {
        console.error(`No plant found for qr_code=${scan.plant_id}:`, plantError?.message);
        continue;
      }

      const { data: scanData } = await supabase
        .from("cyl_scans")
        .select("id")
        .eq("plant_id", plantData.id)
        .single();

      let phenotyperId = phenotyperCache.get(phenotyper_email);
      if (!phenotyperId) {
        const { data: pheno, error } = await supabase
          .from("phenotypers")
          .upsert({ first_name: phenotyper_name, email: phenotyper_email }, { onConflict: "email" })
          .select("id")
          .single();
        if (error) throw new Error("Phenotyper upsert failed: " + error.message);
        phenotyperId = pheno.id;
        if (phenotyperId) {
          phenotyperCache.set(phenotyper_email, phenotyperId);
        }
      }

      let scientistId = scientistCache.get(scientist_email);
      if (!scientistId) {
        const { data: sci, error } = await supabase
          .from("cyl_scientists")
          .upsert({ scientist_name: scientist_name, email: scientist_email }, { onConflict: "email" })
          .select("id")
          .single();
        if (error) throw new Error("Scientist upsert failed: " + error.message);
        scientistId = sci.id;
        if (scientistId) {
          scientistCache.set(scientist_email, scientistId);
        }
      }

      const { data: settings, error: settingsError } = await supabase
        .from("cyl_camera_settings")
        .upsert(
          {
            scanner_exposure_time: scan.exposure_time,
            scanner_gain: scan.gain,
            scanner_brightness: scan.brightness,
            scanner_contrast: scan.contrast,
            scanner_gamma: scan.gamma,
            scanner_seconds_per_rot: scan.seconds_per_rot,
          },
          {
            onConflict:
              "scanner_exposure_time,scanner_gain,scanner_brightness,scanner_contrast,scanner_gamma,scanner_seconds_per_rot",
          }
        )
        .select("id")
        .single();

      if (settingsError) throw new Error("Camera settings upsert failed: " + settingsError.message);

      if (scanData?.id) {
        const { error: updateError } = await supabase
          .from("cyl_scans")
          .update({
            phenotyper_id: phenotyperId,
            scientist_id: scientistId,
            cyl_camera_settings_id: settings.id,
          })
          .eq("id", scanData.id);

        if (updateError) {
          console.error(`Failed to update scan metadata for scan ID: ${scanData.id}`, updateError.message);
        } else {
          console.log(`Updated metadata for scan ID: ${scanData.id}`);
        }
      }
    } catch (err) {
      console.error(`Error processing scan ${scan.id}:`, err);
    }
  }

  await prisma.$disconnect();
  console.log("Sync complete.");
}

main().catch((err) => {
  console.error("Fatal error during sync:", err);
});
