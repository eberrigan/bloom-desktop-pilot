"""
DESC:
  Expects an Excel file with:
    Column A → ACCESSION
    Column B → BARCODE

  Script checks if a barcode in cyl_plants is linked to the accession
  labelled as "Unknown" (7737034) OR NULL, and updates it.

TO RUN:
  1. Set DATABASE_URL environment variable pointing to your database, e.g.:
       export DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"

  2. Run the script:
       python upload_accession_backup.py "excel_filepath"
"""

import os
import sys
import pandas as pd
from sqlalchemy import create_engine, text, bindparam

UNKNOWN_ACCESSION_ID = 7737034 


def main():
    if len(sys.argv) < 2:
        print("Usage: python upload_accession_backup.py <excel_filepath>")
        sys.exit(1)

    file_path = sys.argv[1]
    db_url = os.environ.get("DATABASE_URL")
    if not db_url:
        print("ERROR: DATABASE_URL is not set.")
        sys.exit(1)

    df = pd.read_excel(file_path, sheet_name="Sheet1", header=0)
    df.columns = ["ACCESSION", "BARCODE"]
    df["ACCESSION"] = df["ACCESSION"].astype(str).str.strip()
    df["BARCODE"] = df["BARCODE"].astype(str).str.strip()

    barcodes = sorted(df["BARCODE"].dropna().unique().tolist())
    accessions = sorted(df["ACCESSION"].dropna().unique().tolist())

    engine = create_engine(db_url, future=True)

    with engine.begin() as conn:
        plant_map = {}
        if barcodes:
            plant_rows = conn.execute(
                text("SELECT qr_code, accession_id FROM cyl_plants WHERE qr_code IN :barcodes")
                .bindparams(bindparam("barcodes", expanding=True)),
                {"barcodes": barcodes},
            ).fetchall()
            plant_map = {qr: acc_id for qr, acc_id in plant_rows}

        accession_map = {}
        if accessions:
            acc_rows = conn.execute(
                text("SELECT id, name FROM accessions WHERE name IN :names")
                .bindparams(bindparam("names", expanding=True)),
                {"names": accessions},
            ).fetchall()
            accession_map = {name: acc_id for acc_id, name in acc_rows}

        updated, skipped, not_found = 0, 0, 0

        for _, row in df.iterrows():
            accession = row["ACCESSION"]
            barcode = row["BARCODE"]

            current_acc_id = plant_map.get(barcode)

            if current_acc_id is None and barcode not in plant_map:
                print(f" Barcode {barcode} is not found")
                not_found += 1
                continue

            if current_acc_id == UNKNOWN_ACCESSION_ID or current_acc_id is None:
                acc_id = accession_map.get(accession)
                if acc_id is None:
                    acc_id = conn.execute(
                        text("INSERT INTO accessions (name) VALUES (:name) RETURNING id"),
                        {"name": accession},
                    ).scalar_one()
                    accession_map[accession] = acc_id

                conn.execute(
                    text("UPDATE cyl_plants SET accession_id = :acc_id WHERE qr_code = :qr"),
                    {"acc_id": acc_id, "qr": barcode},
                )
                plant_map[barcode] = acc_id
                updated += 1
                print(f"Updated {barcode} → accession {acc_id}")
            else:
                skipped += 1
                print(f" Barcode {barcode} already mapped to {current_acc_id}, skipping")

        print("\nSummary:")
        print(f" Updated: {updated}")
        print(f" Skipped: {skipped}")
        print(f" Not found: {not_found}")


if __name__ == "__main__":
    main()
