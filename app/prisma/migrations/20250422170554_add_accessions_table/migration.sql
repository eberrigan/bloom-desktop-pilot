-- CreateTable
CREATE TABLE "Accessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Experiment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "scientist_id" TEXT,
    "accession_id" TEXT,
    CONSTRAINT "Experiment_scientist_id_fkey" FOREIGN KEY ("scientist_id") REFERENCES "Scientist" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Experiment_accession_id_fkey" FOREIGN KEY ("accession_id") REFERENCES "Accessions" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Experiment" ("id", "name", "scientist_id", "species") SELECT "id", "name", "scientist_id", "species" FROM "Experiment";
DROP TABLE "Experiment";
ALTER TABLE "new_Experiment" RENAME TO "Experiment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
