-- CreateTable
CREATE TABLE "PlantAccessionMappings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accession_id" TEXT NOT NULL,
    "plant_barcode" TEXT NOT NULL,
    CONSTRAINT "PlantAccessionMappings_accession_id_fkey" FOREIGN KEY ("accession_id") REFERENCES "Accessions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
