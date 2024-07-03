/*
  Warnings:

  - You are about to drop the column `name` on the `Scan` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Scan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "experiment_id" TEXT NOT NULL,
    "phenotyper_id" TEXT NOT NULL,
    "scanner_name" TEXT NOT NULL,
    "plant_id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "capture_date" DATETIME NOT NULL,
    "num_frames" INTEGER NOT NULL,
    "exposure_time" INTEGER NOT NULL,
    "gain" REAL NOT NULL,
    "brightness" REAL NOT NULL,
    "contrast" REAL NOT NULL,
    "gamma" REAL NOT NULL,
    "seconds_per_rot" REAL NOT NULL,
    "wave_number" INTEGER NOT NULL,
    "plant_age_days" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    CONSTRAINT "Scan_experiment_id_fkey" FOREIGN KEY ("experiment_id") REFERENCES "Experiment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Scan_phenotyper_id_fkey" FOREIGN KEY ("phenotyper_id") REFERENCES "Phenotyper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Scan" ("brightness", "capture_date", "contrast", "deleted", "experiment_id", "exposure_time", "gain", "gamma", "id", "num_frames", "path", "phenotyper_id", "plant_age_days", "plant_id", "scanner_name", "seconds_per_rot", "wave_number") SELECT "brightness", "capture_date", "contrast", "deleted", "experiment_id", "exposure_time", "gain", "gamma", "id", "num_frames", "path", "phenotyper_id", "plant_age_days", "plant_id", "scanner_name", "seconds_per_rot", "wave_number" FROM "Scan";
DROP TABLE "Scan";
ALTER TABLE "new_Scan" RENAME TO "Scan";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
