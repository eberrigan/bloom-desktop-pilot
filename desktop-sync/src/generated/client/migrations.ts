export default [
  {
    "statements": [
      "CREATE TABLE \"electric_phenotypers\" (\n  \"id\" TEXT NOT NULL,\n  \"name\" TEXT,\n  \"email\" TEXT,\n  CONSTRAINT \"electric_phenotypers_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "-- Toggles for turning the triggers on and off\nINSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.electric_phenotypers', 1);",
      "  /* Triggers for table electric_phenotypers */\n\n  -- ensures primary key is immutable\n  DROP TRIGGER IF EXISTS update_ensure_main_electric_phenotypers_primarykey;",
      "CREATE TRIGGER update_ensure_main_electric_phenotypers_primarykey\n  BEFORE UPDATE ON \"main\".\"electric_phenotypers\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "-- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table\nDROP TRIGGER IF EXISTS insert_main_electric_phenotypers_into_oplog;",
      "CREATE TRIGGER insert_main_electric_phenotypers_into_oplog\n   AFTER INSERT ON \"main\".\"electric_phenotypers\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.electric_phenotypers')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'electric_phenotypers', 'INSERT', json_object('id', new.\"id\"), json_object('email', new.\"email\", 'id', new.\"id\", 'name', new.\"name\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_electric_phenotypers_into_oplog;",
      "CREATE TRIGGER update_main_electric_phenotypers_into_oplog\n   AFTER UPDATE ON \"main\".\"electric_phenotypers\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.electric_phenotypers')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'electric_phenotypers', 'UPDATE', json_object('id', new.\"id\"), json_object('email', new.\"email\", 'id', new.\"id\", 'name', new.\"name\"), json_object('email', old.\"email\", 'id', old.\"id\", 'name', old.\"name\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_electric_phenotypers_into_oplog;",
      "CREATE TRIGGER delete_main_electric_phenotypers_into_oplog\n   AFTER DELETE ON \"main\".\"electric_phenotypers\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.electric_phenotypers')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'electric_phenotypers', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('email', old.\"email\", 'id', old.\"id\", 'name', old.\"name\"), NULL);\nEND;"
    ],
    "version": "20240227023531_445"
  },
  {
    "statements": [
      "CREATE TABLE \"electric_cyl_images\" (\n  \"id\" TEXT NOT NULL,\n  \"scan_id\" TEXT,\n  \"frame_number\" INTEGER,\n  \"path\" TEXT,\n  \"url\" TEXT,\n  \"status\" TEXT,\n  \"supabase_object_path\" TEXT,\n  CONSTRAINT \"electric_cyl_images_scan_id_fkey\" FOREIGN KEY (\"scan_id\") REFERENCES \"electric_cyl_scans\" (\"id\"),\n  CONSTRAINT \"electric_cyl_images_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "-- Toggles for turning the triggers on and off\nINSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.electric_cyl_images', 1);",
      "  /* Triggers for table electric_cyl_images */\n\n  -- ensures primary key is immutable\n  DROP TRIGGER IF EXISTS update_ensure_main_electric_cyl_images_primarykey;",
      "CREATE TRIGGER update_ensure_main_electric_cyl_images_primarykey\n  BEFORE UPDATE ON \"main\".\"electric_cyl_images\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "-- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table\nDROP TRIGGER IF EXISTS insert_main_electric_cyl_images_into_oplog;",
      "CREATE TRIGGER insert_main_electric_cyl_images_into_oplog\n   AFTER INSERT ON \"main\".\"electric_cyl_images\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.electric_cyl_images')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'electric_cyl_images', 'INSERT', json_object('id', new.\"id\"), json_object('frame_number', new.\"frame_number\", 'id', new.\"id\", 'path', new.\"path\", 'scan_id', new.\"scan_id\", 'status', new.\"status\", 'supabase_object_path', new.\"supabase_object_path\", 'url', new.\"url\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_electric_cyl_images_into_oplog;",
      "CREATE TRIGGER update_main_electric_cyl_images_into_oplog\n   AFTER UPDATE ON \"main\".\"electric_cyl_images\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.electric_cyl_images')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'electric_cyl_images', 'UPDATE', json_object('id', new.\"id\"), json_object('frame_number', new.\"frame_number\", 'id', new.\"id\", 'path', new.\"path\", 'scan_id', new.\"scan_id\", 'status', new.\"status\", 'supabase_object_path', new.\"supabase_object_path\", 'url', new.\"url\"), json_object('frame_number', old.\"frame_number\", 'id', old.\"id\", 'path', old.\"path\", 'scan_id', old.\"scan_id\", 'status', old.\"status\", 'supabase_object_path', old.\"supabase_object_path\", 'url', old.\"url\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_electric_cyl_images_into_oplog;",
      "CREATE TRIGGER delete_main_electric_cyl_images_into_oplog\n   AFTER DELETE ON \"main\".\"electric_cyl_images\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.electric_cyl_images')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'electric_cyl_images', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('frame_number', old.\"frame_number\", 'id', old.\"id\", 'path', old.\"path\", 'scan_id', old.\"scan_id\", 'status', old.\"status\", 'supabase_object_path', old.\"supabase_object_path\", 'url', old.\"url\"), NULL);\nEND;",
      "-- Triggers for foreign key compensations\nDROP TRIGGER IF EXISTS compensation_insert_main_electric_cyl_images_scan_id_into_oplog;",
      "CREATE TRIGGER compensation_insert_main_electric_cyl_images_scan_id_into_oplog\n  AFTER INSERT ON \"main\".\"electric_cyl_images\"\n  WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.electric_cyl_scans') AND\n       1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'electric_cyl_scans', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"electric_cyl_scans\" WHERE \"id\" = new.\"scan_id\";\nEND;",
      "DROP TRIGGER IF EXISTS compensation_update_main_electric_cyl_images_scan_id_into_oplog;",
      "CREATE TRIGGER compensation_update_main_electric_cyl_images_scan_id_into_oplog\n   AFTER UPDATE ON \"main\".\"electric_cyl_images\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.electric_cyl_scans') AND\n        1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'electric_cyl_scans', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"electric_cyl_scans\" WHERE \"id\" = new.\"scan_id\";\nEND;"
    ],
    "version": "20240227023533_528"
  },
  {
    "statements": [
      "CREATE TABLE \"electric_cyl_scans\" (\n  \"id\" TEXT NOT NULL,\n  \"phenotyper_id\" TEXT,\n  \"scanner_id\" TEXT,\n  \"plant_qr_code\" TEXT,\n  \"path\" TEXT,\n  \"capture_date\" TEXT,\n  \"num_frames\" INTEGER,\n  \"exposure_time\" INTEGER,\n  \"gain\" REAL,\n  \"brightness\" REAL,\n  \"contrast\" REAL,\n  \"gamma\" REAL,\n  \"seconds_per_rot\" REAL,\n  CONSTRAINT \"electric_cyl_scans_phenotyper_id_fkey\" FOREIGN KEY (\"phenotyper_id\") REFERENCES \"electric_phenotypers\" (\"id\"),\n  CONSTRAINT \"electric_cyl_scans_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "-- Toggles for turning the triggers on and off\nINSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.electric_cyl_scans', 1);",
      "  /* Triggers for table electric_cyl_scans */\n\n  -- ensures primary key is immutable\n  DROP TRIGGER IF EXISTS update_ensure_main_electric_cyl_scans_primarykey;",
      "CREATE TRIGGER update_ensure_main_electric_cyl_scans_primarykey\n  BEFORE UPDATE ON \"main\".\"electric_cyl_scans\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "-- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table\nDROP TRIGGER IF EXISTS insert_main_electric_cyl_scans_into_oplog;",
      "CREATE TRIGGER insert_main_electric_cyl_scans_into_oplog\n   AFTER INSERT ON \"main\".\"electric_cyl_scans\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.electric_cyl_scans')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'electric_cyl_scans', 'INSERT', json_object('id', new.\"id\"), json_object('brightness', cast(new.\"brightness\" as TEXT), 'capture_date', new.\"capture_date\", 'contrast', cast(new.\"contrast\" as TEXT), 'exposure_time', new.\"exposure_time\", 'gain', cast(new.\"gain\" as TEXT), 'gamma', cast(new.\"gamma\" as TEXT), 'id', new.\"id\", 'num_frames', new.\"num_frames\", 'path', new.\"path\", 'phenotyper_id', new.\"phenotyper_id\", 'plant_qr_code', new.\"plant_qr_code\", 'scanner_id', new.\"scanner_id\", 'seconds_per_rot', cast(new.\"seconds_per_rot\" as TEXT)), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_electric_cyl_scans_into_oplog;",
      "CREATE TRIGGER update_main_electric_cyl_scans_into_oplog\n   AFTER UPDATE ON \"main\".\"electric_cyl_scans\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.electric_cyl_scans')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'electric_cyl_scans', 'UPDATE', json_object('id', new.\"id\"), json_object('brightness', cast(new.\"brightness\" as TEXT), 'capture_date', new.\"capture_date\", 'contrast', cast(new.\"contrast\" as TEXT), 'exposure_time', new.\"exposure_time\", 'gain', cast(new.\"gain\" as TEXT), 'gamma', cast(new.\"gamma\" as TEXT), 'id', new.\"id\", 'num_frames', new.\"num_frames\", 'path', new.\"path\", 'phenotyper_id', new.\"phenotyper_id\", 'plant_qr_code', new.\"plant_qr_code\", 'scanner_id', new.\"scanner_id\", 'seconds_per_rot', cast(new.\"seconds_per_rot\" as TEXT)), json_object('brightness', cast(old.\"brightness\" as TEXT), 'capture_date', old.\"capture_date\", 'contrast', cast(old.\"contrast\" as TEXT), 'exposure_time', old.\"exposure_time\", 'gain', cast(old.\"gain\" as TEXT), 'gamma', cast(old.\"gamma\" as TEXT), 'id', old.\"id\", 'num_frames', old.\"num_frames\", 'path', old.\"path\", 'phenotyper_id', old.\"phenotyper_id\", 'plant_qr_code', old.\"plant_qr_code\", 'scanner_id', old.\"scanner_id\", 'seconds_per_rot', cast(old.\"seconds_per_rot\" as TEXT)), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_electric_cyl_scans_into_oplog;",
      "CREATE TRIGGER delete_main_electric_cyl_scans_into_oplog\n   AFTER DELETE ON \"main\".\"electric_cyl_scans\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.electric_cyl_scans')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'electric_cyl_scans', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('brightness', cast(old.\"brightness\" as TEXT), 'capture_date', old.\"capture_date\", 'contrast', cast(old.\"contrast\" as TEXT), 'exposure_time', old.\"exposure_time\", 'gain', cast(old.\"gain\" as TEXT), 'gamma', cast(old.\"gamma\" as TEXT), 'id', old.\"id\", 'num_frames', old.\"num_frames\", 'path', old.\"path\", 'phenotyper_id', old.\"phenotyper_id\", 'plant_qr_code', old.\"plant_qr_code\", 'scanner_id', old.\"scanner_id\", 'seconds_per_rot', cast(old.\"seconds_per_rot\" as TEXT)), NULL);\nEND;",
      "-- Triggers for foreign key compensations\nDROP TRIGGER IF EXISTS compensation_insert_main_electric_cyl_scans_phenotyper_id_into_oplog;",
      "CREATE TRIGGER compensation_insert_main_electric_cyl_scans_phenotyper_id_into_oplog\n  AFTER INSERT ON \"main\".\"electric_cyl_scans\"\n  WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.electric_phenotypers') AND\n       1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'electric_phenotypers', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"electric_phenotypers\" WHERE \"id\" = new.\"phenotyper_id\";\nEND;",
      "DROP TRIGGER IF EXISTS compensation_update_main_electric_cyl_scans_phenotyper_id_into_oplog;",
      "CREATE TRIGGER compensation_update_main_electric_cyl_scans_phenotyper_id_into_oplog\n   AFTER UPDATE ON \"main\".\"electric_cyl_scans\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.electric_phenotypers') AND\n        1 == (SELECT value from _electric_meta WHERE key == 'compensations')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  SELECT 'main', 'electric_phenotypers', 'COMPENSATION', json_object('id', \"id\"), json_object('id', \"id\"), NULL, NULL\n  FROM \"main\".\"electric_phenotypers\" WHERE \"id\" = new.\"phenotyper_id\";\nEND;"
    ],
    "version": "20240227023537_687"
  }
]