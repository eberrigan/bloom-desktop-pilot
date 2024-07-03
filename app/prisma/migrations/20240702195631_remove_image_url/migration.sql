/*
  Warnings:

  - You are about to drop the column `url` on the `Image` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "scan_id" TEXT NOT NULL,
    "frame_number" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Image_scan_id_fkey" FOREIGN KEY ("scan_id") REFERENCES "Scan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Image" ("frame_number", "id", "path", "scan_id", "status") SELECT "frame_number", "id", "path", "scan_id", "status" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
