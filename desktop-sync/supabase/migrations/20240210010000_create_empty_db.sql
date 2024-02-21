CREATE TABLE IF NOT EXISTS phenotypers (
  id      UUID PRIMARY KEY NOT NULL,
  name    TEXT,
  email   TEXT
);

-- enable row level security
ALTER TABLE phenotypers ENABLE ROW LEVEL SECURITY;

-- ALTER TABLE phenotypers ENABLE ELECTRIC;
