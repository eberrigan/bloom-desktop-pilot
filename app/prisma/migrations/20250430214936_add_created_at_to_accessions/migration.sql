-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Accessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Accessions" ("id", "name") SELECT "id", "name" FROM "Accessions";
DROP TABLE "Accessions";
ALTER TABLE "new_Accessions" RENAME TO "Accessions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
