import {
  Electric_cyl_scans,
  Electric_cyl_images,
  Electric_phenotypers,
} from "../generated/client";

export type ScansWithPhenotypers = Electric_cyl_scans & {
  electric_phenotypers: Electric_phenotypers;
  electric_cyl_images: Electric_cyl_images[];
};
