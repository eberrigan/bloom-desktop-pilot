-- add column cyl_experiment_id to cyl_scans

ALTER TABLE electric_cyl_scans ADD COLUMN cyl_experiment_id UUID REFERENCES electric_cyl_experiments(id);