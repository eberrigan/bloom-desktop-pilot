'''
DESC : 

Expects excel file with: 
    A col -->  ACCESSION
    B col --> BARCODE

Script checks if barcode is linked the accession laballed as "Unkown" and updates it.

TO DO : set env variable pointing to database

TO RUN: python upload_accession_backup.py "excel_filepath"

'''

import os
import sys
import json
import pandas as pd
from sqlalchemy import create_engine, text

file_path = sys.argv[1]

# supabase_url_prod = os.environ['SUPABASE_URL']
# supabase_key_prod = os.environ['SUPABASE_KEY']
# database_string_prod = os.environ['DATABASE_URL']

supabase_url_prod = "https://api.bloom.salk.edu/proxy"
supabase_key_prod = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjg3NTkwMDAwLAogICAgImV4cCI6IDE4NDU0NDI4MDAKfQ.ev7gXAhB8Uv6pgRF9B5oEpmlYI6l15DUIlAQBWSGxPU"
database_string_prod = "postgresql://postgres:mC3aiTpb0KPOWJGJ-xjooOAVbKWgQy1WXXlI7AfH@52.25.90.47:5432/postgres"

df = pd.read_excel(file_path, sheet_name='Sheet1', header=0)
df.columns = ['ACCESSION', 'BARCODE']
engine = create_engine(database_string_prod)

for index, row in df.iterrows():
    with engine.begin() as conn:
        qr_code, accession_id = conn.execute(
            text("SELECT qr_code, accession_id FROM cyl_plants WHERE qr_code = :barcode"),
            {"barcode": row["BARCODE"]}
        ).fetchone()

        if accession_id == 7737034:
            print(f"Update Aceesion :  {qr_code}")
            '''
            Check if the accession record alreay exists in the accessions table, 
            if not make new entry and link with the barcode 
            else link bacrdoe to exitsing accessions
            '''
            existing_accession = conn.execute(
                text("SELECT * FROM accessions WHERE name = :accession"), {"accession":row["ACCESSION"]}
            ).fetchone()

            if existing_accession is None:
                accession_id = conn.execute(
                    text("INSERT INTO accessions (name) VALUES (:accession) RETURNING id"),{"accession":row["ACCESSION"]}
                ).scalar()

            else:
                accession_id, accession_name, created_at = existing_accession

            conn.execute(
                    text("UPDATE cyl_plants SET accession_id = :accession_id WHERE qr_code = :barcode"),{"accession_id": accession_id, "barcode": row["BARCODE"]}
            )
            print(f"Updated accession_id {accession_id} for barcode {row['BARCODE']}")
        else:
            print(f"Accession already present : {qr_code}")

