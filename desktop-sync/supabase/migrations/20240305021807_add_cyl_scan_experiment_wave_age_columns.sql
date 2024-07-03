-- add experiment_name, wave_number, and plant_age_days columns to the electric_cyl_scans

ALTER TABLE electric_cyl_scans ADD COLUMN experiment_name text;
ALTER TABLE electric_cyl_scans ADD COLUMN wave_number integer;
ALTER TABLE electric_cyl_scans ADD COLUMN plant_age_days integer;
