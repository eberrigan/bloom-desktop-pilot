CREATE TABLE IF NOT EXISTS electric_phenotypers (
  id      UUID PRIMARY KEY NOT NULL,
  name    TEXT,
  email   TEXT
);

-- enable row level security
ALTER TABLE electric_phenotypers ENABLE ROW LEVEL SECURITY;

-- ALTER TABLE electric_phenotypers ENABLE ELECTRIC;
