/*
  Warnings:

  - Added the required column `accession_file_id` to the `PlantAccessionMappings` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlantAccessionMappings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accession_id" TEXT NOT NULL,
    "plant_barcode" TEXT NOT NULL,
    "accession_file_id" TEXT NOT NULL,
    CONSTRAINT "PlantAccessionMappings_accession_file_id_fkey" FOREIGN KEY ("accession_file_id") REFERENCES "Accessions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PlantAccessionMappings" ("accession_id", "id", "plant_barcode") SELECT "accession_id", "id", "plant_barcode" FROM "PlantAccessionMappings";
DROP TABLE "PlantAccessionMappings";
ALTER TABLE "new_PlantAccessionMappings" RENAME TO "PlantAccessionMappings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
