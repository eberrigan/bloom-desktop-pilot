CREATE TABLE IF NOT EXISTS electric_cyl_experiments (
  id       UUID PRIMARY KEY NOT NULL,
  name     TEXT NOT NULL,
  species  TEXT
);

-- enable row level security
ALTER TABLE electric_cyl_experiments ENABLE ROW LEVEL SECURITY;

-- ALTER TABLE electric_cyl_experiments ENABLE ELECTRIC;