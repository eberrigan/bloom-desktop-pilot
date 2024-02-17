CREATE TABLE IF NOT EXISTS images (
  id                  UUID PRIMARY KEY NOT NULL,
  scan_id             UUID REFERENCES scans(id),
  frame_number        INT,
  path                TEXT,
  url                 TEXT,
  status              TEXT
);

-- enable row level security
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- ALTER TABLE images ENABLE ELECTRIC;
