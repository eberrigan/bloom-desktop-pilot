CREATE TABLE IF NOT EXISTS electric_cyl_images (
  id                  UUID PRIMARY KEY NOT NULL,
  scan_id             UUID REFERENCES electric_cyl_scans(id),
  frame_number        INT,
  path                TEXT,
  url                 TEXT,
  status              TEXT
);

-- enable row level security
ALTER TABLE electric_cyl_images ENABLE ROW LEVEL SECURITY;

-- ALTER TABLE electric_cyl_images ENABLE ELECTRIC;
