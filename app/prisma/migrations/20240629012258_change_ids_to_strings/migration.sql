/*
  Warnings:

  - The primary key for the `Experiment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Phenotyper` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Scan` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Experiment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL
);
INSERT INTO "new_Experiment" ("id", "name", "species") SELECT "id", "name", "species" FROM "Experiment";
DROP TABLE "Experiment";
ALTER TABLE "new_Experiment" RENAME TO "Experiment";
CREATE TABLE "new_Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "scan_id" TEXT NOT NULL,
    "frame_number" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Image_scan_id_fkey" FOREIGN KEY ("scan_id") REFERENCES "Scan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Image" ("frame_number", "id", "path", "scan_id", "status", "url") SELECT "frame_number", "id", "path", "scan_id", "status", "url" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
CREATE TABLE "new_Phenotyper" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);
INSERT INTO "new_Phenotyper" ("email", "id", "name") SELECT "email", "id", "name" FROM "Phenotyper";
DROP TABLE "Phenotyper";
ALTER TABLE "new_Phenotyper" RENAME TO "Phenotyper";
CREATE UNIQUE INDEX "Phenotyper_email_key" ON "Phenotyper"("email");
CREATE TABLE "new_Scan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
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
INSERT INTO "new_Scan" ("brightness", "capture_date", "contrast", "deleted", "experiment_id", "exposure_time", "gain", "gamma", "id", "name", "num_frames", "path", "phenotyper_id", "plant_age_days", "plant_id", "scanner_name", "seconds_per_rot", "wave_number") SELECT "brightness", "capture_date", "contrast", "deleted", "experiment_id", "exposure_time", "gain", "gamma", "id", "name", "num_frames", "path", "phenotyper_id", "plant_age_days", "plant_id", "scanner_name", "seconds_per_rot", "wave_number" FROM "Scan";
DROP TABLE "Scan";
ALTER TABLE "new_Scan" RENAME TO "Scan";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
