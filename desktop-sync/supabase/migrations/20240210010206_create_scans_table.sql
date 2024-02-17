-- create the scans table
CREATE TABLE IF NOT EXISTS scans (
  id                  UUID PRIMARY KEY NOT NULL,
  phenotyper_id       UUID REFERENCES phenotypers(id),
  scanner_id          TEXT,
  plant_qr_code       TEXT,
  path                TEXT,
  capture_date        TIMESTAMPTZ,
  num_frames          INT,
  exposure_time       INT,
  gain                REAL,
  brightness          REAL,
  contrast            REAL,
  gamma               REAL,
  seconds_per_rot     REAL
);

-- enable row level security
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;

-- ALTER TABLE scans ENABLE ELECTRIC;
