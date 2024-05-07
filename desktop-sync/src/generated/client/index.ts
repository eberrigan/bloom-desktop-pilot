// @ts-nocheck
import { z } from "zod";
import type { Prisma } from "./prismaClient";
import {
  type TableSchema,
  DbSchema,
  Relation,
  ElectricClient,
  type HKT,
} from "electric-sql/client/model";
import migrations from "./migrations";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const Electric_cyl_experimentsScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "species",
]);

export const Electric_cyl_imagesScalarFieldEnumSchema = z.enum([
  "id",
  "scan_id",
  "frame_number",
  "path",
  "url",
  "status",
  "supabase_object_path",
]);

export const Electric_cyl_scansScalarFieldEnumSchema = z.enum([
  "id",
  "phenotyper_id",
  "scanner_id",
  "plant_qr_code",
  "path",
  "capture_date",
  "num_frames",
  "exposure_time",
  "gain",
  "brightness",
  "contrast",
  "gamma",
  "seconds_per_rot",
  "experiment_name",
  "wave_number",
  "plant_age_days",
  "cyl_experiment_id",
  "deleted",
]);

export const Electric_phenotypersScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "email",
]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const TransactionIsolationLevelSchema = z.enum([
  "ReadUncommitted",
  "ReadCommitted",
  "RepeatableRead",
  "Serializable",
]);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ELECTRIC CYL EXPERIMENTS SCHEMA
/////////////////////////////////////////

export const Electric_cyl_experimentsSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  species: z.string().nullable(),
});

export type Electric_cyl_experiments = z.infer<
  typeof Electric_cyl_experimentsSchema
>;

/////////////////////////////////////////
// ELECTRIC CYL IMAGES SCHEMA
/////////////////////////////////////////

export const Electric_cyl_imagesSchema = z.object({
  id: z.string().uuid(),
  scan_id: z.string().uuid().nullable(),
  frame_number: z.number().int().gte(-2147483648).lte(2147483647).nullable(),
  path: z.string().nullable(),
  url: z.string().nullable(),
  status: z.string().nullable(),
  supabase_object_path: z.string().nullable(),
});

export type Electric_cyl_images = z.infer<typeof Electric_cyl_imagesSchema>;

/////////////////////////////////////////
// ELECTRIC CYL SCANS SCHEMA
/////////////////////////////////////////

export const Electric_cyl_scansSchema = z.object({
  id: z.string().uuid(),
  phenotyper_id: z.string().uuid().nullable(),
  scanner_id: z.string().nullable(),
  plant_qr_code: z.string().nullable(),
  path: z.string().nullable(),
  capture_date: z.coerce.date().nullable(),
  num_frames: z.number().int().gte(-2147483648).lte(2147483647).nullable(),
  exposure_time: z.number().int().gte(-2147483648).lte(2147483647).nullable(),
  gain: z.number().or(z.nan()).nullable(),
  brightness: z.number().or(z.nan()).nullable(),
  contrast: z.number().or(z.nan()).nullable(),
  gamma: z.number().or(z.nan()).nullable(),
  seconds_per_rot: z.number().or(z.nan()).nullable(),
  experiment_name: z.string().nullable(),
  wave_number: z.number().int().gte(-2147483648).lte(2147483647).nullable(),
  plant_age_days: z.number().int().gte(-2147483648).lte(2147483647).nullable(),
  cyl_experiment_id: z.string().uuid().nullable(),
  deleted: z.number().int().gte(-2147483648).lte(2147483647).nullable(),
});

export type Electric_cyl_scans = z.infer<typeof Electric_cyl_scansSchema>;

/////////////////////////////////////////
// ELECTRIC PHENOTYPERS SCHEMA
/////////////////////////////////////////

export const Electric_phenotypersSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nullable(),
  email: z.string().nullable(),
});

export type Electric_phenotypers = z.infer<typeof Electric_phenotypersSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ELECTRIC CYL EXPERIMENTS
//------------------------------------------------------

export const Electric_cyl_experimentsIncludeSchema: z.ZodType<Prisma.Electric_cyl_experimentsInclude> =
  z
    .object({
      electric_cyl_scans: z
        .union([
          z.boolean(),
          z.lazy(() => Electric_cyl_scansFindManyArgsSchema),
        ])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => Electric_cyl_experimentsCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

export const Electric_cyl_experimentsArgsSchema: z.ZodType<Prisma.Electric_cyl_experimentsArgs> =
  z
    .object({
      select: z.lazy(() => Electric_cyl_experimentsSelectSchema).optional(),
      include: z.lazy(() => Electric_cyl_experimentsIncludeSchema).optional(),
    })
    .strict();

export const Electric_cyl_experimentsCountOutputTypeArgsSchema: z.ZodType<Prisma.Electric_cyl_experimentsCountOutputTypeArgs> =
  z
    .object({
      select: z
        .lazy(() => Electric_cyl_experimentsCountOutputTypeSelectSchema)
        .nullish(),
    })
    .strict();

export const Electric_cyl_experimentsCountOutputTypeSelectSchema: z.ZodType<Prisma.Electric_cyl_experimentsCountOutputTypeSelect> =
  z
    .object({
      electric_cyl_scans: z.boolean().optional(),
    })
    .strict();

export const Electric_cyl_experimentsSelectSchema: z.ZodType<Prisma.Electric_cyl_experimentsSelect> =
  z
    .object({
      id: z.boolean().optional(),
      name: z.boolean().optional(),
      species: z.boolean().optional(),
      electric_cyl_scans: z
        .union([
          z.boolean(),
          z.lazy(() => Electric_cyl_scansFindManyArgsSchema),
        ])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => Electric_cyl_experimentsCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

// ELECTRIC CYL IMAGES
//------------------------------------------------------

export const Electric_cyl_imagesIncludeSchema: z.ZodType<Prisma.Electric_cyl_imagesInclude> =
  z
    .object({
      electric_cyl_scans: z
        .union([z.boolean(), z.lazy(() => Electric_cyl_scansArgsSchema)])
        .optional(),
    })
    .strict();

export const Electric_cyl_imagesArgsSchema: z.ZodType<Prisma.Electric_cyl_imagesArgs> =
  z
    .object({
      select: z.lazy(() => Electric_cyl_imagesSelectSchema).optional(),
      include: z.lazy(() => Electric_cyl_imagesIncludeSchema).optional(),
    })
    .strict();

export const Electric_cyl_imagesSelectSchema: z.ZodType<Prisma.Electric_cyl_imagesSelect> =
  z
    .object({
      id: z.boolean().optional(),
      scan_id: z.boolean().optional(),
      frame_number: z.boolean().optional(),
      path: z.boolean().optional(),
      url: z.boolean().optional(),
      status: z.boolean().optional(),
      supabase_object_path: z.boolean().optional(),
      electric_cyl_scans: z
        .union([z.boolean(), z.lazy(() => Electric_cyl_scansArgsSchema)])
        .optional(),
    })
    .strict();

// ELECTRIC CYL SCANS
//------------------------------------------------------

export const Electric_cyl_scansIncludeSchema: z.ZodType<Prisma.Electric_cyl_scansInclude> =
  z
    .object({
      electric_cyl_images: z
        .union([
          z.boolean(),
          z.lazy(() => Electric_cyl_imagesFindManyArgsSchema),
        ])
        .optional(),
      electric_cyl_experiments: z
        .union([z.boolean(), z.lazy(() => Electric_cyl_experimentsArgsSchema)])
        .optional(),
      electric_phenotypers: z
        .union([z.boolean(), z.lazy(() => Electric_phenotypersArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => Electric_cyl_scansCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

export const Electric_cyl_scansArgsSchema: z.ZodType<Prisma.Electric_cyl_scansArgs> =
  z
    .object({
      select: z.lazy(() => Electric_cyl_scansSelectSchema).optional(),
      include: z.lazy(() => Electric_cyl_scansIncludeSchema).optional(),
    })
    .strict();

export const Electric_cyl_scansCountOutputTypeArgsSchema: z.ZodType<Prisma.Electric_cyl_scansCountOutputTypeArgs> =
  z
    .object({
      select: z
        .lazy(() => Electric_cyl_scansCountOutputTypeSelectSchema)
        .nullish(),
    })
    .strict();

export const Electric_cyl_scansCountOutputTypeSelectSchema: z.ZodType<Prisma.Electric_cyl_scansCountOutputTypeSelect> =
  z
    .object({
      electric_cyl_images: z.boolean().optional(),
    })
    .strict();

export const Electric_cyl_scansSelectSchema: z.ZodType<Prisma.Electric_cyl_scansSelect> =
  z
    .object({
      id: z.boolean().optional(),
      phenotyper_id: z.boolean().optional(),
      scanner_id: z.boolean().optional(),
      plant_qr_code: z.boolean().optional(),
      path: z.boolean().optional(),
      capture_date: z.boolean().optional(),
      num_frames: z.boolean().optional(),
      exposure_time: z.boolean().optional(),
      gain: z.boolean().optional(),
      brightness: z.boolean().optional(),
      contrast: z.boolean().optional(),
      gamma: z.boolean().optional(),
      seconds_per_rot: z.boolean().optional(),
      experiment_name: z.boolean().optional(),
      wave_number: z.boolean().optional(),
      plant_age_days: z.boolean().optional(),
      cyl_experiment_id: z.boolean().optional(),
      deleted: z.boolean().optional(),
      electric_cyl_images: z
        .union([
          z.boolean(),
          z.lazy(() => Electric_cyl_imagesFindManyArgsSchema),
        ])
        .optional(),
      electric_cyl_experiments: z
        .union([z.boolean(), z.lazy(() => Electric_cyl_experimentsArgsSchema)])
        .optional(),
      electric_phenotypers: z
        .union([z.boolean(), z.lazy(() => Electric_phenotypersArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => Electric_cyl_scansCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

// ELECTRIC PHENOTYPERS
//------------------------------------------------------

export const Electric_phenotypersIncludeSchema: z.ZodType<Prisma.Electric_phenotypersInclude> =
  z
    .object({
      electric_cyl_scans: z
        .union([
          z.boolean(),
          z.lazy(() => Electric_cyl_scansFindManyArgsSchema),
        ])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => Electric_phenotypersCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

export const Electric_phenotypersArgsSchema: z.ZodType<Prisma.Electric_phenotypersArgs> =
  z
    .object({
      select: z.lazy(() => Electric_phenotypersSelectSchema).optional(),
      include: z.lazy(() => Electric_phenotypersIncludeSchema).optional(),
    })
    .strict();

export const Electric_phenotypersCountOutputTypeArgsSchema: z.ZodType<Prisma.Electric_phenotypersCountOutputTypeArgs> =
  z
    .object({
      select: z
        .lazy(() => Electric_phenotypersCountOutputTypeSelectSchema)
        .nullish(),
    })
    .strict();

export const Electric_phenotypersCountOutputTypeSelectSchema: z.ZodType<Prisma.Electric_phenotypersCountOutputTypeSelect> =
  z
    .object({
      electric_cyl_scans: z.boolean().optional(),
    })
    .strict();

export const Electric_phenotypersSelectSchema: z.ZodType<Prisma.Electric_phenotypersSelect> =
  z
    .object({
      id: z.boolean().optional(),
      name: z.boolean().optional(),
      email: z.boolean().optional(),
      electric_cyl_scans: z
        .union([
          z.boolean(),
          z.lazy(() => Electric_cyl_scansFindManyArgsSchema),
        ])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => Electric_phenotypersCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const Electric_cyl_experimentsWhereInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => Electric_cyl_experimentsWhereInputSchema),
          z.lazy(() => Electric_cyl_experimentsWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => Electric_cyl_experimentsWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => Electric_cyl_experimentsWhereInputSchema),
          z.lazy(() => Electric_cyl_experimentsWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      species: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      electric_cyl_scans: z
        .lazy(() => Electric_cyl_scansListRelationFilterSchema)
        .optional(),
    })
    .strict();

export const Electric_cyl_experimentsOrderByWithRelationInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      species: z.lazy(() => SortOrderSchema).optional(),
      electric_cyl_scans: z
        .lazy(() => Electric_cyl_scansOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const Electric_cyl_experimentsWhereUniqueInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsWhereUniqueInput> =
  z
    .object({
      id: z.string().uuid().optional(),
    })
    .strict();

export const Electric_cyl_experimentsOrderByWithAggregationInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      species: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => Electric_cyl_experimentsCountOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => Electric_cyl_experimentsMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => Electric_cyl_experimentsMinOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const Electric_cyl_experimentsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(
            () => Electric_cyl_experimentsScalarWhereWithAggregatesInputSchema
          ),
          z
            .lazy(
              () => Electric_cyl_experimentsScalarWhereWithAggregatesInputSchema
            )
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(
          () => Electric_cyl_experimentsScalarWhereWithAggregatesInputSchema
        )
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(
            () => Electric_cyl_experimentsScalarWhereWithAggregatesInputSchema
          ),
          z
            .lazy(
              () => Electric_cyl_experimentsScalarWhereWithAggregatesInputSchema
            )
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      species: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_imagesWhereInputSchema: z.ZodType<Prisma.Electric_cyl_imagesWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => Electric_cyl_imagesWhereInputSchema),
          z.lazy(() => Electric_cyl_imagesWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => Electric_cyl_imagesWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => Electric_cyl_imagesWhereInputSchema),
          z.lazy(() => Electric_cyl_imagesWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      scan_id: z
        .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      frame_number: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      path: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      url: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      status: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      supabase_object_path: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      electric_cyl_scans: z
        .union([
          z.lazy(() => Electric_cyl_scansRelationFilterSchema),
          z.lazy(() => Electric_cyl_scansWhereInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_imagesOrderByWithRelationInputSchema: z.ZodType<Prisma.Electric_cyl_imagesOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      scan_id: z.lazy(() => SortOrderSchema).optional(),
      frame_number: z.lazy(() => SortOrderSchema).optional(),
      path: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      supabase_object_path: z.lazy(() => SortOrderSchema).optional(),
      electric_cyl_scans: z
        .lazy(() => Electric_cyl_scansOrderByWithRelationInputSchema)
        .optional(),
    })
    .strict();

export const Electric_cyl_imagesWhereUniqueInputSchema: z.ZodType<Prisma.Electric_cyl_imagesWhereUniqueInput> =
  z
    .object({
      id: z.string().uuid().optional(),
    })
    .strict();

export const Electric_cyl_imagesOrderByWithAggregationInputSchema: z.ZodType<Prisma.Electric_cyl_imagesOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      scan_id: z.lazy(() => SortOrderSchema).optional(),
      frame_number: z.lazy(() => SortOrderSchema).optional(),
      path: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      supabase_object_path: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => Electric_cyl_imagesCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => Electric_cyl_imagesAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => Electric_cyl_imagesMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => Electric_cyl_imagesMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => Electric_cyl_imagesSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const Electric_cyl_imagesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Electric_cyl_imagesScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => Electric_cyl_imagesScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => Electric_cyl_imagesScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => Electric_cyl_imagesScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => Electric_cyl_imagesScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => Electric_cyl_imagesScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      scan_id: z
        .union([
          z.lazy(() => UuidNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      frame_number: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      path: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      url: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      supabase_object_path: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_scansWhereInputSchema: z.ZodType<Prisma.Electric_cyl_scansWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereInputSchema),
          z.lazy(() => Electric_cyl_scansWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => Electric_cyl_scansWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereInputSchema),
          z.lazy(() => Electric_cyl_scansWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      phenotyper_id: z
        .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      scanner_id: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      plant_qr_code: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      path: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      capture_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      num_frames: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      exposure_time: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      gain: z
        .union([z.lazy(() => FloatNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      brightness: z
        .union([z.lazy(() => FloatNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      contrast: z
        .union([z.lazy(() => FloatNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      gamma: z
        .union([z.lazy(() => FloatNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      seconds_per_rot: z
        .union([z.lazy(() => FloatNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      experiment_name: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      wave_number: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      plant_age_days: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      cyl_experiment_id: z
        .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      deleted: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      electric_cyl_images: z
        .lazy(() => Electric_cyl_imagesListRelationFilterSchema)
        .optional(),
      electric_cyl_experiments: z
        .union([
          z.lazy(() => Electric_cyl_experimentsRelationFilterSchema),
          z.lazy(() => Electric_cyl_experimentsWhereInputSchema),
        ])
        .optional()
        .nullable(),
      electric_phenotypers: z
        .union([
          z.lazy(() => Electric_phenotypersRelationFilterSchema),
          z.lazy(() => Electric_phenotypersWhereInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_scansOrderByWithRelationInputSchema: z.ZodType<Prisma.Electric_cyl_scansOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      phenotyper_id: z.lazy(() => SortOrderSchema).optional(),
      scanner_id: z.lazy(() => SortOrderSchema).optional(),
      plant_qr_code: z.lazy(() => SortOrderSchema).optional(),
      path: z.lazy(() => SortOrderSchema).optional(),
      capture_date: z.lazy(() => SortOrderSchema).optional(),
      num_frames: z.lazy(() => SortOrderSchema).optional(),
      exposure_time: z.lazy(() => SortOrderSchema).optional(),
      gain: z.lazy(() => SortOrderSchema).optional(),
      brightness: z.lazy(() => SortOrderSchema).optional(),
      contrast: z.lazy(() => SortOrderSchema).optional(),
      gamma: z.lazy(() => SortOrderSchema).optional(),
      seconds_per_rot: z.lazy(() => SortOrderSchema).optional(),
      experiment_name: z.lazy(() => SortOrderSchema).optional(),
      wave_number: z.lazy(() => SortOrderSchema).optional(),
      plant_age_days: z.lazy(() => SortOrderSchema).optional(),
      cyl_experiment_id: z.lazy(() => SortOrderSchema).optional(),
      deleted: z.lazy(() => SortOrderSchema).optional(),
      electric_cyl_images: z
        .lazy(() => Electric_cyl_imagesOrderByRelationAggregateInputSchema)
        .optional(),
      electric_cyl_experiments: z
        .lazy(() => Electric_cyl_experimentsOrderByWithRelationInputSchema)
        .optional(),
      electric_phenotypers: z
        .lazy(() => Electric_phenotypersOrderByWithRelationInputSchema)
        .optional(),
    })
    .strict();

export const Electric_cyl_scansWhereUniqueInputSchema: z.ZodType<Prisma.Electric_cyl_scansWhereUniqueInput> =
  z
    .object({
      id: z.string().uuid().optional(),
    })
    .strict();

export const Electric_cyl_scansOrderByWithAggregationInputSchema: z.ZodType<Prisma.Electric_cyl_scansOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      phenotyper_id: z.lazy(() => SortOrderSchema).optional(),
      scanner_id: z.lazy(() => SortOrderSchema).optional(),
      plant_qr_code: z.lazy(() => SortOrderSchema).optional(),
      path: z.lazy(() => SortOrderSchema).optional(),
      capture_date: z.lazy(() => SortOrderSchema).optional(),
      num_frames: z.lazy(() => SortOrderSchema).optional(),
      exposure_time: z.lazy(() => SortOrderSchema).optional(),
      gain: z.lazy(() => SortOrderSchema).optional(),
      brightness: z.lazy(() => SortOrderSchema).optional(),
      contrast: z.lazy(() => SortOrderSchema).optional(),
      gamma: z.lazy(() => SortOrderSchema).optional(),
      seconds_per_rot: z.lazy(() => SortOrderSchema).optional(),
      experiment_name: z.lazy(() => SortOrderSchema).optional(),
      wave_number: z.lazy(() => SortOrderSchema).optional(),
      plant_age_days: z.lazy(() => SortOrderSchema).optional(),
      cyl_experiment_id: z.lazy(() => SortOrderSchema).optional(),
      deleted: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => Electric_cyl_scansCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => Electric_cyl_scansAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => Electric_cyl_scansMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => Electric_cyl_scansMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => Electric_cyl_scansSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const Electric_cyl_scansScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Electric_cyl_scansScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => Electric_cyl_scansScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => Electric_cyl_scansScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => Electric_cyl_scansScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => Electric_cyl_scansScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => Electric_cyl_scansScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      phenotyper_id: z
        .union([
          z.lazy(() => UuidNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      scanner_id: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      plant_qr_code: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      path: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      capture_date: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      num_frames: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      exposure_time: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      gain: z
        .union([
          z.lazy(() => FloatNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      brightness: z
        .union([
          z.lazy(() => FloatNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      contrast: z
        .union([
          z.lazy(() => FloatNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      gamma: z
        .union([
          z.lazy(() => FloatNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      seconds_per_rot: z
        .union([
          z.lazy(() => FloatNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      experiment_name: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      wave_number: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      plant_age_days: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      cyl_experiment_id: z
        .union([
          z.lazy(() => UuidNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      deleted: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_phenotypersWhereInputSchema: z.ZodType<Prisma.Electric_phenotypersWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => Electric_phenotypersWhereInputSchema),
          z.lazy(() => Electric_phenotypersWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => Electric_phenotypersWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => Electric_phenotypersWhereInputSchema),
          z.lazy(() => Electric_phenotypersWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      name: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      email: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      electric_cyl_scans: z
        .lazy(() => Electric_cyl_scansListRelationFilterSchema)
        .optional(),
    })
    .strict();

export const Electric_phenotypersOrderByWithRelationInputSchema: z.ZodType<Prisma.Electric_phenotypersOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      electric_cyl_scans: z
        .lazy(() => Electric_cyl_scansOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const Electric_phenotypersWhereUniqueInputSchema: z.ZodType<Prisma.Electric_phenotypersWhereUniqueInput> =
  z
    .object({
      id: z.string().uuid().optional(),
    })
    .strict();

export const Electric_phenotypersOrderByWithAggregationInputSchema: z.ZodType<Prisma.Electric_phenotypersOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => Electric_phenotypersCountOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => Electric_phenotypersMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => Electric_phenotypersMinOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const Electric_phenotypersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Electric_phenotypersScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(
            () => Electric_phenotypersScalarWhereWithAggregatesInputSchema
          ),
          z
            .lazy(
              () => Electric_phenotypersScalarWhereWithAggregatesInputSchema
            )
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => Electric_phenotypersScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(
            () => Electric_phenotypersScalarWhereWithAggregatesInputSchema
          ),
          z
            .lazy(
              () => Electric_phenotypersScalarWhereWithAggregatesInputSchema
            )
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_experimentsCreateInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsCreateInput> =
  z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      species: z.string().optional().nullable(),
      electric_cyl_scans: z
        .lazy(
          () =>
            Electric_cyl_scansCreateNestedManyWithoutElectric_cyl_experimentsInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_cyl_experimentsUncheckedCreateInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsUncheckedCreateInput> =
  z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      species: z.string().optional().nullable(),
      electric_cyl_scans: z
        .lazy(
          () =>
            Electric_cyl_scansUncheckedCreateNestedManyWithoutElectric_cyl_experimentsInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_cyl_experimentsUpdateInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      species: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      electric_cyl_scans: z
        .lazy(
          () =>
            Electric_cyl_scansUpdateManyWithoutElectric_cyl_experimentsNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_cyl_experimentsUncheckedUpdateInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      species: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      electric_cyl_scans: z
        .lazy(
          () =>
            Electric_cyl_scansUncheckedUpdateManyWithoutElectric_cyl_experimentsNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_cyl_experimentsCreateManyInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsCreateManyInput> =
  z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      species: z.string().optional().nullable(),
    })
    .strict();

export const Electric_cyl_experimentsUpdateManyMutationInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      species: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_experimentsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      species: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_imagesCreateInputSchema: z.ZodType<Prisma.Electric_cyl_imagesCreateInput> =
  z
    .object({
      id: z.string().uuid(),
      frame_number: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      path: z.string().optional().nullable(),
      url: z.string().optional().nullable(),
      status: z.string().optional().nullable(),
      supabase_object_path: z.string().optional().nullable(),
      electric_cyl_scans: z
        .lazy(
          () =>
            Electric_cyl_scansCreateNestedOneWithoutElectric_cyl_imagesInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_cyl_imagesUncheckedCreateInputSchema: z.ZodType<Prisma.Electric_cyl_imagesUncheckedCreateInput> =
  z
    .object({
      id: z.string().uuid(),
      scan_id: z.string().uuid().optional().nullable(),
      frame_number: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      path: z.string().optional().nullable(),
      url: z.string().optional().nullable(),
      status: z.string().optional().nullable(),
      supabase_object_path: z.string().optional().nullable(),
    })
    .strict();

export const Electric_cyl_imagesUpdateInputSchema: z.ZodType<Prisma.Electric_cyl_imagesUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      frame_number: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      url: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      supabase_object_path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      electric_cyl_scans: z
        .lazy(
          () =>
            Electric_cyl_scansUpdateOneWithoutElectric_cyl_imagesNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_cyl_imagesUncheckedUpdateInputSchema: z.ZodType<Prisma.Electric_cyl_imagesUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      scan_id: z
        .union([
          z.string().uuid(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      frame_number: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      url: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      supabase_object_path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_imagesCreateManyInputSchema: z.ZodType<Prisma.Electric_cyl_imagesCreateManyInput> =
  z
    .object({
      id: z.string().uuid(),
      scan_id: z.string().uuid().optional().nullable(),
      frame_number: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      path: z.string().optional().nullable(),
      url: z.string().optional().nullable(),
      status: z.string().optional().nullable(),
      supabase_object_path: z.string().optional().nullable(),
    })
    .strict();

export const Electric_cyl_imagesUpdateManyMutationInputSchema: z.ZodType<Prisma.Electric_cyl_imagesUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      frame_number: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      url: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      supabase_object_path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_imagesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Electric_cyl_imagesUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      scan_id: z
        .union([
          z.string().uuid(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      frame_number: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      url: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      supabase_object_path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_scansCreateInputSchema: z.ZodType<Prisma.Electric_cyl_scansCreateInput> =
  z
    .object({
      id: z.string().uuid(),
      scanner_id: z.string().optional().nullable(),
      plant_qr_code: z.string().optional().nullable(),
      path: z.string().optional().nullable(),
      capture_date: z.coerce.date().optional().nullable(),
      num_frames: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      exposure_time: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      gain: z.number().or(z.nan()).optional().nullable(),
      brightness: z.number().or(z.nan()).optional().nullable(),
      contrast: z.number().or(z.nan()).optional().nullable(),
      gamma: z.number().or(z.nan()).optional().nullable(),
      seconds_per_rot: z.number().or(z.nan()).optional().nullable(),
      experiment_name: z.string().optional().nullable(),
      wave_number: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      plant_age_days: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      deleted: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      electric_cyl_images: z
        .lazy(
          () =>
            Electric_cyl_imagesCreateNestedManyWithoutElectric_cyl_scansInputSchema
        )
        .optional(),
      electric_cyl_experiments: z
        .lazy(
          () =>
            Electric_cyl_experimentsCreateNestedOneWithoutElectric_cyl_scansInputSchema
        )
        .optional(),
      electric_phenotypers: z
        .lazy(
          () =>
            Electric_phenotypersCreateNestedOneWithoutElectric_cyl_scansInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_cyl_scansUncheckedCreateInputSchema: z.ZodType<Prisma.Electric_cyl_scansUncheckedCreateInput> =
  z
    .object({
      id: z.string().uuid(),
      phenotyper_id: z.string().uuid().optional().nullable(),
      scanner_id: z.string().optional().nullable(),
      plant_qr_code: z.string().optional().nullable(),
      path: z.string().optional().nullable(),
      capture_date: z.coerce.date().optional().nullable(),
      num_frames: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      exposure_time: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      gain: z.number().or(z.nan()).optional().nullable(),
      brightness: z.number().or(z.nan()).optional().nullable(),
      contrast: z.number().or(z.nan()).optional().nullable(),
      gamma: z.number().or(z.nan()).optional().nullable(),
      seconds_per_rot: z.number().or(z.nan()).optional().nullable(),
      experiment_name: z.string().optional().nullable(),
      wave_number: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      plant_age_days: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      cyl_experiment_id: z.string().uuid().optional().nullable(),
      deleted: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      electric_cyl_images: z
        .lazy(
          () =>
            Electric_cyl_imagesUncheckedCreateNestedManyWithoutElectric_cyl_scansInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_cyl_scansUpdateInputSchema: z.ZodType<Prisma.Electric_cyl_scansUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      scanner_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_qr_code: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      capture_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      num_frames: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      exposure_time: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gain: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      brightness: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      contrast: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gamma: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      seconds_per_rot: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      experiment_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      wave_number: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_age_days: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleted: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      electric_cyl_images: z
        .lazy(
          () =>
            Electric_cyl_imagesUpdateManyWithoutElectric_cyl_scansNestedInputSchema
        )
        .optional(),
      electric_cyl_experiments: z
        .lazy(
          () =>
            Electric_cyl_experimentsUpdateOneWithoutElectric_cyl_scansNestedInputSchema
        )
        .optional(),
      electric_phenotypers: z
        .lazy(
          () =>
            Electric_phenotypersUpdateOneWithoutElectric_cyl_scansNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_cyl_scansUncheckedUpdateInputSchema: z.ZodType<Prisma.Electric_cyl_scansUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      phenotyper_id: z
        .union([
          z.string().uuid(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scanner_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_qr_code: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      capture_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      num_frames: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      exposure_time: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gain: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      brightness: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      contrast: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gamma: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      seconds_per_rot: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      experiment_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      wave_number: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_age_days: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      cyl_experiment_id: z
        .union([
          z.string().uuid(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleted: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      electric_cyl_images: z
        .lazy(
          () =>
            Electric_cyl_imagesUncheckedUpdateManyWithoutElectric_cyl_scansNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_cyl_scansCreateManyInputSchema: z.ZodType<Prisma.Electric_cyl_scansCreateManyInput> =
  z
    .object({
      id: z.string().uuid(),
      phenotyper_id: z.string().uuid().optional().nullable(),
      scanner_id: z.string().optional().nullable(),
      plant_qr_code: z.string().optional().nullable(),
      path: z.string().optional().nullable(),
      capture_date: z.coerce.date().optional().nullable(),
      num_frames: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      exposure_time: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      gain: z.number().or(z.nan()).optional().nullable(),
      brightness: z.number().or(z.nan()).optional().nullable(),
      contrast: z.number().or(z.nan()).optional().nullable(),
      gamma: z.number().or(z.nan()).optional().nullable(),
      seconds_per_rot: z.number().or(z.nan()).optional().nullable(),
      experiment_name: z.string().optional().nullable(),
      wave_number: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      plant_age_days: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      cyl_experiment_id: z.string().uuid().optional().nullable(),
      deleted: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_scansUpdateManyMutationInputSchema: z.ZodType<Prisma.Electric_cyl_scansUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      scanner_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_qr_code: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      capture_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      num_frames: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      exposure_time: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gain: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      brightness: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      contrast: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gamma: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      seconds_per_rot: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      experiment_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      wave_number: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_age_days: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleted: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_scansUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Electric_cyl_scansUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      phenotyper_id: z
        .union([
          z.string().uuid(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scanner_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_qr_code: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      capture_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      num_frames: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      exposure_time: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gain: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      brightness: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      contrast: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gamma: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      seconds_per_rot: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      experiment_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      wave_number: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_age_days: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      cyl_experiment_id: z
        .union([
          z.string().uuid(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleted: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_phenotypersCreateInputSchema: z.ZodType<Prisma.Electric_phenotypersCreateInput> =
  z
    .object({
      id: z.string().uuid(),
      name: z.string().optional().nullable(),
      email: z.string().optional().nullable(),
      electric_cyl_scans: z
        .lazy(
          () =>
            Electric_cyl_scansCreateNestedManyWithoutElectric_phenotypersInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_phenotypersUncheckedCreateInputSchema: z.ZodType<Prisma.Electric_phenotypersUncheckedCreateInput> =
  z
    .object({
      id: z.string().uuid(),
      name: z.string().optional().nullable(),
      email: z.string().optional().nullable(),
      electric_cyl_scans: z
        .lazy(
          () =>
            Electric_cyl_scansUncheckedCreateNestedManyWithoutElectric_phenotypersInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_phenotypersUpdateInputSchema: z.ZodType<Prisma.Electric_phenotypersUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      electric_cyl_scans: z
        .lazy(
          () =>
            Electric_cyl_scansUpdateManyWithoutElectric_phenotypersNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_phenotypersUncheckedUpdateInputSchema: z.ZodType<Prisma.Electric_phenotypersUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      electric_cyl_scans: z
        .lazy(
          () =>
            Electric_cyl_scansUncheckedUpdateManyWithoutElectric_phenotypersNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_phenotypersCreateManyInputSchema: z.ZodType<Prisma.Electric_phenotypersCreateManyInput> =
  z
    .object({
      id: z.string().uuid(),
      name: z.string().optional().nullable(),
      email: z.string().optional().nullable(),
    })
    .strict();

export const Electric_phenotypersUpdateManyMutationInputSchema: z.ZodType<Prisma.Electric_phenotypersUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_phenotypersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Electric_phenotypersUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z.union([z.string(), z.lazy(() => NestedUuidFilterSchema)]).optional(),
  })
  .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_scansListRelationFilterSchema: z.ZodType<Prisma.Electric_cyl_scansListRelationFilter> =
  z
    .object({
      every: z.lazy(() => Electric_cyl_scansWhereInputSchema).optional(),
      some: z.lazy(() => Electric_cyl_scansWhereInputSchema).optional(),
      none: z.lazy(() => Electric_cyl_scansWhereInputSchema).optional(),
    })
    .strict();

export const Electric_cyl_scansOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Electric_cyl_scansOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const Electric_cyl_experimentsCountOrderByAggregateInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      species: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const Electric_cyl_experimentsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      species: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const Electric_cyl_experimentsMinOrderByAggregateInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      species: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedUuidWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const UuidNullableFilterSchema: z.ZodType<Prisma.UuidNullableFilter> = z
  .object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedUuidNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const Electric_cyl_scansRelationFilterSchema: z.ZodType<Prisma.Electric_cyl_scansRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => Electric_cyl_scansWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => Electric_cyl_scansWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_imagesCountOrderByAggregateInputSchema: z.ZodType<Prisma.Electric_cyl_imagesCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      scan_id: z.lazy(() => SortOrderSchema).optional(),
      frame_number: z.lazy(() => SortOrderSchema).optional(),
      path: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      supabase_object_path: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const Electric_cyl_imagesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.Electric_cyl_imagesAvgOrderByAggregateInput> =
  z
    .object({
      frame_number: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const Electric_cyl_imagesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Electric_cyl_imagesMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      scan_id: z.lazy(() => SortOrderSchema).optional(),
      frame_number: z.lazy(() => SortOrderSchema).optional(),
      path: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      supabase_object_path: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const Electric_cyl_imagesMinOrderByAggregateInputSchema: z.ZodType<Prisma.Electric_cyl_imagesMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      scan_id: z.lazy(() => SortOrderSchema).optional(),
      frame_number: z.lazy(() => SortOrderSchema).optional(),
      path: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      supabase_object_path: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const Electric_cyl_imagesSumOrderByAggregateInputSchema: z.ZodType<Prisma.Electric_cyl_imagesSumOrderByAggregateInput> =
  z
    .object({
      frame_number: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.UuidNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_imagesListRelationFilterSchema: z.ZodType<Prisma.Electric_cyl_imagesListRelationFilter> =
  z
    .object({
      every: z.lazy(() => Electric_cyl_imagesWhereInputSchema).optional(),
      some: z.lazy(() => Electric_cyl_imagesWhereInputSchema).optional(),
      none: z.lazy(() => Electric_cyl_imagesWhereInputSchema).optional(),
    })
    .strict();

export const Electric_cyl_experimentsRelationFilterSchema: z.ZodType<Prisma.Electric_cyl_experimentsRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => Electric_cyl_experimentsWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => Electric_cyl_experimentsWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_phenotypersRelationFilterSchema: z.ZodType<Prisma.Electric_phenotypersRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => Electric_phenotypersWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => Electric_phenotypersWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_imagesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Electric_cyl_imagesOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const Electric_cyl_scansCountOrderByAggregateInputSchema: z.ZodType<Prisma.Electric_cyl_scansCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      phenotyper_id: z.lazy(() => SortOrderSchema).optional(),
      scanner_id: z.lazy(() => SortOrderSchema).optional(),
      plant_qr_code: z.lazy(() => SortOrderSchema).optional(),
      path: z.lazy(() => SortOrderSchema).optional(),
      capture_date: z.lazy(() => SortOrderSchema).optional(),
      num_frames: z.lazy(() => SortOrderSchema).optional(),
      exposure_time: z.lazy(() => SortOrderSchema).optional(),
      gain: z.lazy(() => SortOrderSchema).optional(),
      brightness: z.lazy(() => SortOrderSchema).optional(),
      contrast: z.lazy(() => SortOrderSchema).optional(),
      gamma: z.lazy(() => SortOrderSchema).optional(),
      seconds_per_rot: z.lazy(() => SortOrderSchema).optional(),
      experiment_name: z.lazy(() => SortOrderSchema).optional(),
      wave_number: z.lazy(() => SortOrderSchema).optional(),
      plant_age_days: z.lazy(() => SortOrderSchema).optional(),
      cyl_experiment_id: z.lazy(() => SortOrderSchema).optional(),
      deleted: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const Electric_cyl_scansAvgOrderByAggregateInputSchema: z.ZodType<Prisma.Electric_cyl_scansAvgOrderByAggregateInput> =
  z
    .object({
      num_frames: z.lazy(() => SortOrderSchema).optional(),
      exposure_time: z.lazy(() => SortOrderSchema).optional(),
      gain: z.lazy(() => SortOrderSchema).optional(),
      brightness: z.lazy(() => SortOrderSchema).optional(),
      contrast: z.lazy(() => SortOrderSchema).optional(),
      gamma: z.lazy(() => SortOrderSchema).optional(),
      seconds_per_rot: z.lazy(() => SortOrderSchema).optional(),
      wave_number: z.lazy(() => SortOrderSchema).optional(),
      plant_age_days: z.lazy(() => SortOrderSchema).optional(),
      deleted: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const Electric_cyl_scansMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Electric_cyl_scansMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      phenotyper_id: z.lazy(() => SortOrderSchema).optional(),
      scanner_id: z.lazy(() => SortOrderSchema).optional(),
      plant_qr_code: z.lazy(() => SortOrderSchema).optional(),
      path: z.lazy(() => SortOrderSchema).optional(),
      capture_date: z.lazy(() => SortOrderSchema).optional(),
      num_frames: z.lazy(() => SortOrderSchema).optional(),
      exposure_time: z.lazy(() => SortOrderSchema).optional(),
      gain: z.lazy(() => SortOrderSchema).optional(),
      brightness: z.lazy(() => SortOrderSchema).optional(),
      contrast: z.lazy(() => SortOrderSchema).optional(),
      gamma: z.lazy(() => SortOrderSchema).optional(),
      seconds_per_rot: z.lazy(() => SortOrderSchema).optional(),
      experiment_name: z.lazy(() => SortOrderSchema).optional(),
      wave_number: z.lazy(() => SortOrderSchema).optional(),
      plant_age_days: z.lazy(() => SortOrderSchema).optional(),
      cyl_experiment_id: z.lazy(() => SortOrderSchema).optional(),
      deleted: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const Electric_cyl_scansMinOrderByAggregateInputSchema: z.ZodType<Prisma.Electric_cyl_scansMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      phenotyper_id: z.lazy(() => SortOrderSchema).optional(),
      scanner_id: z.lazy(() => SortOrderSchema).optional(),
      plant_qr_code: z.lazy(() => SortOrderSchema).optional(),
      path: z.lazy(() => SortOrderSchema).optional(),
      capture_date: z.lazy(() => SortOrderSchema).optional(),
      num_frames: z.lazy(() => SortOrderSchema).optional(),
      exposure_time: z.lazy(() => SortOrderSchema).optional(),
      gain: z.lazy(() => SortOrderSchema).optional(),
      brightness: z.lazy(() => SortOrderSchema).optional(),
      contrast: z.lazy(() => SortOrderSchema).optional(),
      gamma: z.lazy(() => SortOrderSchema).optional(),
      seconds_per_rot: z.lazy(() => SortOrderSchema).optional(),
      experiment_name: z.lazy(() => SortOrderSchema).optional(),
      wave_number: z.lazy(() => SortOrderSchema).optional(),
      plant_age_days: z.lazy(() => SortOrderSchema).optional(),
      cyl_experiment_id: z.lazy(() => SortOrderSchema).optional(),
      deleted: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const Electric_cyl_scansSumOrderByAggregateInputSchema: z.ZodType<Prisma.Electric_cyl_scansSumOrderByAggregateInput> =
  z
    .object({
      num_frames: z.lazy(() => SortOrderSchema).optional(),
      exposure_time: z.lazy(() => SortOrderSchema).optional(),
      gain: z.lazy(() => SortOrderSchema).optional(),
      brightness: z.lazy(() => SortOrderSchema).optional(),
      contrast: z.lazy(() => SortOrderSchema).optional(),
      gamma: z.lazy(() => SortOrderSchema).optional(),
      seconds_per_rot: z.lazy(() => SortOrderSchema).optional(),
      wave_number: z.lazy(() => SortOrderSchema).optional(),
      plant_age_days: z.lazy(() => SortOrderSchema).optional(),
      deleted: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
    })
    .strict();

export const Electric_phenotypersCountOrderByAggregateInputSchema: z.ZodType<Prisma.Electric_phenotypersCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const Electric_phenotypersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Electric_phenotypersMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const Electric_phenotypersMinOrderByAggregateInputSchema: z.ZodType<Prisma.Electric_phenotypersMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const Electric_cyl_scansCreateNestedManyWithoutElectric_cyl_experimentsInputSchema: z.ZodType<Prisma.Electric_cyl_scansCreateNestedManyWithoutElectric_cyl_experimentsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansCreateWithoutElectric_cyl_experimentsInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansCreateWithoutElectric_cyl_experimentsInputSchema
            )
            .array(),
          z.lazy(
            () =>
              Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_experimentsInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_experimentsInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansCreateOrConnectWithoutElectric_cyl_experimentsInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansCreateOrConnectWithoutElectric_cyl_experimentsInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            Electric_cyl_scansCreateManyElectric_cyl_experimentsInputEnvelopeSchema
        )
        .optional(),
      connect: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const Electric_cyl_scansUncheckedCreateNestedManyWithoutElectric_cyl_experimentsInputSchema: z.ZodType<Prisma.Electric_cyl_scansUncheckedCreateNestedManyWithoutElectric_cyl_experimentsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansCreateWithoutElectric_cyl_experimentsInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansCreateWithoutElectric_cyl_experimentsInputSchema
            )
            .array(),
          z.lazy(
            () =>
              Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_experimentsInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_experimentsInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansCreateOrConnectWithoutElectric_cyl_experimentsInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansCreateOrConnectWithoutElectric_cyl_experimentsInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            Electric_cyl_scansCreateManyElectric_cyl_experimentsInputEnvelopeSchema
        )
        .optional(),
      connect: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional().nullable(),
    })
    .strict();

export const Electric_cyl_scansUpdateManyWithoutElectric_cyl_experimentsNestedInputSchema: z.ZodType<Prisma.Electric_cyl_scansUpdateManyWithoutElectric_cyl_experimentsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansCreateWithoutElectric_cyl_experimentsInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansCreateWithoutElectric_cyl_experimentsInputSchema
            )
            .array(),
          z.lazy(
            () =>
              Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_experimentsInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_experimentsInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansCreateOrConnectWithoutElectric_cyl_experimentsInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansCreateOrConnectWithoutElectric_cyl_experimentsInputSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansUpsertWithWhereUniqueWithoutElectric_cyl_experimentsInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansUpsertWithWhereUniqueWithoutElectric_cyl_experimentsInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            Electric_cyl_scansCreateManyElectric_cyl_experimentsInputEnvelopeSchema
        )
        .optional(),
      set: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansUpdateWithWhereUniqueWithoutElectric_cyl_experimentsInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansUpdateWithWhereUniqueWithoutElectric_cyl_experimentsInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansUpdateManyWithWhereWithoutElectric_cyl_experimentsInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansUpdateManyWithWhereWithoutElectric_cyl_experimentsInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => Electric_cyl_scansScalarWhereInputSchema),
          z.lazy(() => Electric_cyl_scansScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const Electric_cyl_scansUncheckedUpdateManyWithoutElectric_cyl_experimentsNestedInputSchema: z.ZodType<Prisma.Electric_cyl_scansUncheckedUpdateManyWithoutElectric_cyl_experimentsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansCreateWithoutElectric_cyl_experimentsInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansCreateWithoutElectric_cyl_experimentsInputSchema
            )
            .array(),
          z.lazy(
            () =>
              Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_experimentsInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_experimentsInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansCreateOrConnectWithoutElectric_cyl_experimentsInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansCreateOrConnectWithoutElectric_cyl_experimentsInputSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansUpsertWithWhereUniqueWithoutElectric_cyl_experimentsInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansUpsertWithWhereUniqueWithoutElectric_cyl_experimentsInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            Electric_cyl_scansCreateManyElectric_cyl_experimentsInputEnvelopeSchema
        )
        .optional(),
      set: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansUpdateWithWhereUniqueWithoutElectric_cyl_experimentsInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansUpdateWithWhereUniqueWithoutElectric_cyl_experimentsInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansUpdateManyWithWhereWithoutElectric_cyl_experimentsInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansUpdateManyWithWhereWithoutElectric_cyl_experimentsInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => Electric_cyl_scansScalarWhereInputSchema),
          z.lazy(() => Electric_cyl_scansScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const Electric_cyl_scansCreateNestedOneWithoutElectric_cyl_imagesInputSchema: z.ZodType<Prisma.Electric_cyl_scansCreateNestedOneWithoutElectric_cyl_imagesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => Electric_cyl_scansCreateWithoutElectric_cyl_imagesInputSchema
          ),
          z.lazy(
            () =>
              Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_imagesInputSchema
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            Electric_cyl_scansCreateOrConnectWithoutElectric_cyl_imagesInputSchema
        )
        .optional(),
      connect: z
        .lazy(() => Electric_cyl_scansWhereUniqueInputSchema)
        .optional(),
    })
    .strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional().nullable(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const Electric_cyl_scansUpdateOneWithoutElectric_cyl_imagesNestedInputSchema: z.ZodType<Prisma.Electric_cyl_scansUpdateOneWithoutElectric_cyl_imagesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => Electric_cyl_scansCreateWithoutElectric_cyl_imagesInputSchema
          ),
          z.lazy(
            () =>
              Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_imagesInputSchema
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            Electric_cyl_scansCreateOrConnectWithoutElectric_cyl_imagesInputSchema
        )
        .optional(),
      upsert: z
        .lazy(
          () => Electric_cyl_scansUpsertWithoutElectric_cyl_imagesInputSchema
        )
        .optional(),
      disconnect: z.boolean().optional(),
      delete: z.boolean().optional(),
      connect: z
        .lazy(() => Electric_cyl_scansWhereUniqueInputSchema)
        .optional(),
      update: z
        .union([
          z.lazy(
            () => Electric_cyl_scansUpdateWithoutElectric_cyl_imagesInputSchema
          ),
          z.lazy(
            () =>
              Electric_cyl_scansUncheckedUpdateWithoutElectric_cyl_imagesInputSchema
          ),
        ])
        .optional(),
    })
    .strict();

export const Electric_cyl_imagesCreateNestedManyWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_cyl_imagesCreateNestedManyWithoutElectric_cyl_scansInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => Electric_cyl_imagesCreateWithoutElectric_cyl_scansInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_imagesCreateWithoutElectric_cyl_scansInputSchema
            )
            .array(),
          z.lazy(
            () =>
              Electric_cyl_imagesUncheckedCreateWithoutElectric_cyl_scansInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_imagesUncheckedCreateWithoutElectric_cyl_scansInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_imagesCreateOrConnectWithoutElectric_cyl_scansInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_imagesCreateOrConnectWithoutElectric_cyl_scansInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            Electric_cyl_imagesCreateManyElectric_cyl_scansInputEnvelopeSchema
        )
        .optional(),
      connect: z
        .union([
          z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const Electric_cyl_experimentsCreateNestedOneWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsCreateNestedOneWithoutElectric_cyl_scansInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_experimentsCreateWithoutElectric_cyl_scansInputSchema
          ),
          z.lazy(
            () =>
              Electric_cyl_experimentsUncheckedCreateWithoutElectric_cyl_scansInputSchema
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            Electric_cyl_experimentsCreateOrConnectWithoutElectric_cyl_scansInputSchema
        )
        .optional(),
      connect: z
        .lazy(() => Electric_cyl_experimentsWhereUniqueInputSchema)
        .optional(),
    })
    .strict();

export const Electric_phenotypersCreateNestedOneWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_phenotypersCreateNestedOneWithoutElectric_cyl_scansInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => Electric_phenotypersCreateWithoutElectric_cyl_scansInputSchema
          ),
          z.lazy(
            () =>
              Electric_phenotypersUncheckedCreateWithoutElectric_cyl_scansInputSchema
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            Electric_phenotypersCreateOrConnectWithoutElectric_cyl_scansInputSchema
        )
        .optional(),
      connect: z
        .lazy(() => Electric_phenotypersWhereUniqueInputSchema)
        .optional(),
    })
    .strict();

export const Electric_cyl_imagesUncheckedCreateNestedManyWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_cyl_imagesUncheckedCreateNestedManyWithoutElectric_cyl_scansInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => Electric_cyl_imagesCreateWithoutElectric_cyl_scansInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_imagesCreateWithoutElectric_cyl_scansInputSchema
            )
            .array(),
          z.lazy(
            () =>
              Electric_cyl_imagesUncheckedCreateWithoutElectric_cyl_scansInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_imagesUncheckedCreateWithoutElectric_cyl_scansInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_imagesCreateOrConnectWithoutElectric_cyl_scansInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_imagesCreateOrConnectWithoutElectric_cyl_scansInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            Electric_cyl_imagesCreateManyElectric_cyl_scansInputEnvelopeSchema
        )
        .optional(),
      connect: z
        .union([
          z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional().nullable(),
    })
    .strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional().nullable(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const Electric_cyl_imagesUpdateManyWithoutElectric_cyl_scansNestedInputSchema: z.ZodType<Prisma.Electric_cyl_imagesUpdateManyWithoutElectric_cyl_scansNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => Electric_cyl_imagesCreateWithoutElectric_cyl_scansInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_imagesCreateWithoutElectric_cyl_scansInputSchema
            )
            .array(),
          z.lazy(
            () =>
              Electric_cyl_imagesUncheckedCreateWithoutElectric_cyl_scansInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_imagesUncheckedCreateWithoutElectric_cyl_scansInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_imagesCreateOrConnectWithoutElectric_cyl_scansInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_imagesCreateOrConnectWithoutElectric_cyl_scansInputSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_imagesUpsertWithWhereUniqueWithoutElectric_cyl_scansInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_imagesUpsertWithWhereUniqueWithoutElectric_cyl_scansInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            Electric_cyl_imagesCreateManyElectric_cyl_scansInputEnvelopeSchema
        )
        .optional(),
      set: z
        .union([
          z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_imagesUpdateWithWhereUniqueWithoutElectric_cyl_scansInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_imagesUpdateWithWhereUniqueWithoutElectric_cyl_scansInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_imagesUpdateManyWithWhereWithoutElectric_cyl_scansInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_imagesUpdateManyWithWhereWithoutElectric_cyl_scansInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => Electric_cyl_imagesScalarWhereInputSchema),
          z.lazy(() => Electric_cyl_imagesScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const Electric_cyl_experimentsUpdateOneWithoutElectric_cyl_scansNestedInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsUpdateOneWithoutElectric_cyl_scansNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_experimentsCreateWithoutElectric_cyl_scansInputSchema
          ),
          z.lazy(
            () =>
              Electric_cyl_experimentsUncheckedCreateWithoutElectric_cyl_scansInputSchema
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            Electric_cyl_experimentsCreateOrConnectWithoutElectric_cyl_scansInputSchema
        )
        .optional(),
      upsert: z
        .lazy(
          () =>
            Electric_cyl_experimentsUpsertWithoutElectric_cyl_scansInputSchema
        )
        .optional(),
      disconnect: z.boolean().optional(),
      delete: z.boolean().optional(),
      connect: z
        .lazy(() => Electric_cyl_experimentsWhereUniqueInputSchema)
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_experimentsUpdateWithoutElectric_cyl_scansInputSchema
          ),
          z.lazy(
            () =>
              Electric_cyl_experimentsUncheckedUpdateWithoutElectric_cyl_scansInputSchema
          ),
        ])
        .optional(),
    })
    .strict();

export const Electric_phenotypersUpdateOneWithoutElectric_cyl_scansNestedInputSchema: z.ZodType<Prisma.Electric_phenotypersUpdateOneWithoutElectric_cyl_scansNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => Electric_phenotypersCreateWithoutElectric_cyl_scansInputSchema
          ),
          z.lazy(
            () =>
              Electric_phenotypersUncheckedCreateWithoutElectric_cyl_scansInputSchema
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            Electric_phenotypersCreateOrConnectWithoutElectric_cyl_scansInputSchema
        )
        .optional(),
      upsert: z
        .lazy(
          () => Electric_phenotypersUpsertWithoutElectric_cyl_scansInputSchema
        )
        .optional(),
      disconnect: z.boolean().optional(),
      delete: z.boolean().optional(),
      connect: z
        .lazy(() => Electric_phenotypersWhereUniqueInputSchema)
        .optional(),
      update: z
        .union([
          z.lazy(
            () => Electric_phenotypersUpdateWithoutElectric_cyl_scansInputSchema
          ),
          z.lazy(
            () =>
              Electric_phenotypersUncheckedUpdateWithoutElectric_cyl_scansInputSchema
          ),
        ])
        .optional(),
    })
    .strict();

export const Electric_cyl_imagesUncheckedUpdateManyWithoutElectric_cyl_scansNestedInputSchema: z.ZodType<Prisma.Electric_cyl_imagesUncheckedUpdateManyWithoutElectric_cyl_scansNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => Electric_cyl_imagesCreateWithoutElectric_cyl_scansInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_imagesCreateWithoutElectric_cyl_scansInputSchema
            )
            .array(),
          z.lazy(
            () =>
              Electric_cyl_imagesUncheckedCreateWithoutElectric_cyl_scansInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_imagesUncheckedCreateWithoutElectric_cyl_scansInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_imagesCreateOrConnectWithoutElectric_cyl_scansInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_imagesCreateOrConnectWithoutElectric_cyl_scansInputSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_imagesUpsertWithWhereUniqueWithoutElectric_cyl_scansInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_imagesUpsertWithWhereUniqueWithoutElectric_cyl_scansInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            Electric_cyl_imagesCreateManyElectric_cyl_scansInputEnvelopeSchema
        )
        .optional(),
      set: z
        .union([
          z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_imagesUpdateWithWhereUniqueWithoutElectric_cyl_scansInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_imagesUpdateWithWhereUniqueWithoutElectric_cyl_scansInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_imagesUpdateManyWithWhereWithoutElectric_cyl_scansInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_imagesUpdateManyWithWhereWithoutElectric_cyl_scansInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => Electric_cyl_imagesScalarWhereInputSchema),
          z.lazy(() => Electric_cyl_imagesScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const Electric_cyl_scansCreateNestedManyWithoutElectric_phenotypersInputSchema: z.ZodType<Prisma.Electric_cyl_scansCreateNestedManyWithoutElectric_phenotypersInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => Electric_cyl_scansCreateWithoutElectric_phenotypersInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansCreateWithoutElectric_phenotypersInputSchema
            )
            .array(),
          z.lazy(
            () =>
              Electric_cyl_scansUncheckedCreateWithoutElectric_phenotypersInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansUncheckedCreateWithoutElectric_phenotypersInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansCreateOrConnectWithoutElectric_phenotypersInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansCreateOrConnectWithoutElectric_phenotypersInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            Electric_cyl_scansCreateManyElectric_phenotypersInputEnvelopeSchema
        )
        .optional(),
      connect: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const Electric_cyl_scansUncheckedCreateNestedManyWithoutElectric_phenotypersInputSchema: z.ZodType<Prisma.Electric_cyl_scansUncheckedCreateNestedManyWithoutElectric_phenotypersInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => Electric_cyl_scansCreateWithoutElectric_phenotypersInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansCreateWithoutElectric_phenotypersInputSchema
            )
            .array(),
          z.lazy(
            () =>
              Electric_cyl_scansUncheckedCreateWithoutElectric_phenotypersInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansUncheckedCreateWithoutElectric_phenotypersInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansCreateOrConnectWithoutElectric_phenotypersInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansCreateOrConnectWithoutElectric_phenotypersInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            Electric_cyl_scansCreateManyElectric_phenotypersInputEnvelopeSchema
        )
        .optional(),
      connect: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const Electric_cyl_scansUpdateManyWithoutElectric_phenotypersNestedInputSchema: z.ZodType<Prisma.Electric_cyl_scansUpdateManyWithoutElectric_phenotypersNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => Electric_cyl_scansCreateWithoutElectric_phenotypersInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansCreateWithoutElectric_phenotypersInputSchema
            )
            .array(),
          z.lazy(
            () =>
              Electric_cyl_scansUncheckedCreateWithoutElectric_phenotypersInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansUncheckedCreateWithoutElectric_phenotypersInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansCreateOrConnectWithoutElectric_phenotypersInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansCreateOrConnectWithoutElectric_phenotypersInputSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansUpsertWithWhereUniqueWithoutElectric_phenotypersInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansUpsertWithWhereUniqueWithoutElectric_phenotypersInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            Electric_cyl_scansCreateManyElectric_phenotypersInputEnvelopeSchema
        )
        .optional(),
      set: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansUpdateWithWhereUniqueWithoutElectric_phenotypersInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansUpdateWithWhereUniqueWithoutElectric_phenotypersInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansUpdateManyWithWhereWithoutElectric_phenotypersInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansUpdateManyWithWhereWithoutElectric_phenotypersInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => Electric_cyl_scansScalarWhereInputSchema),
          z.lazy(() => Electric_cyl_scansScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const Electric_cyl_scansUncheckedUpdateManyWithoutElectric_phenotypersNestedInputSchema: z.ZodType<Prisma.Electric_cyl_scansUncheckedUpdateManyWithoutElectric_phenotypersNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => Electric_cyl_scansCreateWithoutElectric_phenotypersInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansCreateWithoutElectric_phenotypersInputSchema
            )
            .array(),
          z.lazy(
            () =>
              Electric_cyl_scansUncheckedCreateWithoutElectric_phenotypersInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansUncheckedCreateWithoutElectric_phenotypersInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansCreateOrConnectWithoutElectric_phenotypersInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansCreateOrConnectWithoutElectric_phenotypersInputSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansUpsertWithWhereUniqueWithoutElectric_phenotypersInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansUpsertWithWhereUniqueWithoutElectric_phenotypersInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            Electric_cyl_scansCreateManyElectric_phenotypersInputEnvelopeSchema
        )
        .optional(),
      set: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
          z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansUpdateWithWhereUniqueWithoutElectric_phenotypersInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansUpdateWithWhereUniqueWithoutElectric_phenotypersInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              Electric_cyl_scansUpdateManyWithWhereWithoutElectric_phenotypersInputSchema
          ),
          z
            .lazy(
              () =>
                Electric_cyl_scansUpdateManyWithWhereWithoutElectric_phenotypersInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => Electric_cyl_scansScalarWhereInputSchema),
          z.lazy(() => Electric_cyl_scansScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedUuidFilterSchema)]).optional(),
  })
  .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedUuidWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedUuidNullableFilterSchema: z.ZodType<Prisma.NestedUuidNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedUuidNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedUuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
    })
    .strict();

export const Electric_cyl_scansCreateWithoutElectric_cyl_experimentsInputSchema: z.ZodType<Prisma.Electric_cyl_scansCreateWithoutElectric_cyl_experimentsInput> =
  z
    .object({
      id: z.string(),
      scanner_id: z.string().optional().nullable(),
      plant_qr_code: z.string().optional().nullable(),
      path: z.string().optional().nullable(),
      capture_date: z.coerce.date().optional().nullable(),
      num_frames: z.number().optional().nullable(),
      exposure_time: z.number().optional().nullable(),
      gain: z.number().optional().nullable(),
      brightness: z.number().optional().nullable(),
      contrast: z.number().optional().nullable(),
      gamma: z.number().optional().nullable(),
      seconds_per_rot: z.number().optional().nullable(),
      experiment_name: z.string().optional().nullable(),
      wave_number: z.number().optional().nullable(),
      plant_age_days: z.number().optional().nullable(),
      deleted: z.number().optional().nullable(),
      electric_cyl_images: z
        .lazy(
          () =>
            Electric_cyl_imagesCreateNestedManyWithoutElectric_cyl_scansInputSchema
        )
        .optional(),
      electric_phenotypers: z
        .lazy(
          () =>
            Electric_phenotypersCreateNestedOneWithoutElectric_cyl_scansInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_experimentsInputSchema: z.ZodType<Prisma.Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_experimentsInput> =
  z
    .object({
      id: z.string(),
      phenotyper_id: z.string().optional().nullable(),
      scanner_id: z.string().optional().nullable(),
      plant_qr_code: z.string().optional().nullable(),
      path: z.string().optional().nullable(),
      capture_date: z.coerce.date().optional().nullable(),
      num_frames: z.number().optional().nullable(),
      exposure_time: z.number().optional().nullable(),
      gain: z.number().optional().nullable(),
      brightness: z.number().optional().nullable(),
      contrast: z.number().optional().nullable(),
      gamma: z.number().optional().nullable(),
      seconds_per_rot: z.number().optional().nullable(),
      experiment_name: z.string().optional().nullable(),
      wave_number: z.number().optional().nullable(),
      plant_age_days: z.number().optional().nullable(),
      deleted: z.number().optional().nullable(),
      electric_cyl_images: z
        .lazy(
          () =>
            Electric_cyl_imagesUncheckedCreateNestedManyWithoutElectric_cyl_scansInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_cyl_scansCreateOrConnectWithoutElectric_cyl_experimentsInputSchema: z.ZodType<Prisma.Electric_cyl_scansCreateOrConnectWithoutElectric_cyl_experimentsInput> =
  z
    .object({
      where: z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
      create: z.union([
        z.lazy(
          () =>
            Electric_cyl_scansCreateWithoutElectric_cyl_experimentsInputSchema
        ),
        z.lazy(
          () =>
            Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_experimentsInputSchema
        ),
      ]),
    })
    .strict();

export const Electric_cyl_scansCreateManyElectric_cyl_experimentsInputEnvelopeSchema: z.ZodType<Prisma.Electric_cyl_scansCreateManyElectric_cyl_experimentsInputEnvelope> =
  z
    .object({
      data: z
        .lazy(
          () => Electric_cyl_scansCreateManyElectric_cyl_experimentsInputSchema
        )
        .array(),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const Electric_cyl_scansUpsertWithWhereUniqueWithoutElectric_cyl_experimentsInputSchema: z.ZodType<Prisma.Electric_cyl_scansUpsertWithWhereUniqueWithoutElectric_cyl_experimentsInput> =
  z
    .object({
      where: z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
      update: z.union([
        z.lazy(
          () =>
            Electric_cyl_scansUpdateWithoutElectric_cyl_experimentsInputSchema
        ),
        z.lazy(
          () =>
            Electric_cyl_scansUncheckedUpdateWithoutElectric_cyl_experimentsInputSchema
        ),
      ]),
      create: z.union([
        z.lazy(
          () =>
            Electric_cyl_scansCreateWithoutElectric_cyl_experimentsInputSchema
        ),
        z.lazy(
          () =>
            Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_experimentsInputSchema
        ),
      ]),
    })
    .strict();

export const Electric_cyl_scansUpdateWithWhereUniqueWithoutElectric_cyl_experimentsInputSchema: z.ZodType<Prisma.Electric_cyl_scansUpdateWithWhereUniqueWithoutElectric_cyl_experimentsInput> =
  z
    .object({
      where: z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
      data: z.union([
        z.lazy(
          () =>
            Electric_cyl_scansUpdateWithoutElectric_cyl_experimentsInputSchema
        ),
        z.lazy(
          () =>
            Electric_cyl_scansUncheckedUpdateWithoutElectric_cyl_experimentsInputSchema
        ),
      ]),
    })
    .strict();

export const Electric_cyl_scansUpdateManyWithWhereWithoutElectric_cyl_experimentsInputSchema: z.ZodType<Prisma.Electric_cyl_scansUpdateManyWithWhereWithoutElectric_cyl_experimentsInput> =
  z
    .object({
      where: z.lazy(() => Electric_cyl_scansScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => Electric_cyl_scansUpdateManyMutationInputSchema),
        z.lazy(
          () =>
            Electric_cyl_scansUncheckedUpdateManyWithoutElectric_cyl_scansInputSchema
        ),
      ]),
    })
    .strict();

export const Electric_cyl_scansScalarWhereInputSchema: z.ZodType<Prisma.Electric_cyl_scansScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => Electric_cyl_scansScalarWhereInputSchema),
          z.lazy(() => Electric_cyl_scansScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => Electric_cyl_scansScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => Electric_cyl_scansScalarWhereInputSchema),
          z.lazy(() => Electric_cyl_scansScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      phenotyper_id: z
        .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      scanner_id: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      plant_qr_code: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      path: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      capture_date: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      num_frames: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      exposure_time: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      gain: z
        .union([z.lazy(() => FloatNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      brightness: z
        .union([z.lazy(() => FloatNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      contrast: z
        .union([z.lazy(() => FloatNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      gamma: z
        .union([z.lazy(() => FloatNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      seconds_per_rot: z
        .union([z.lazy(() => FloatNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      experiment_name: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      wave_number: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      plant_age_days: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      cyl_experiment_id: z
        .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      deleted: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_scansCreateWithoutElectric_cyl_imagesInputSchema: z.ZodType<Prisma.Electric_cyl_scansCreateWithoutElectric_cyl_imagesInput> =
  z
    .object({
      id: z.string(),
      scanner_id: z.string().optional().nullable(),
      plant_qr_code: z.string().optional().nullable(),
      path: z.string().optional().nullable(),
      capture_date: z.coerce.date().optional().nullable(),
      num_frames: z.number().optional().nullable(),
      exposure_time: z.number().optional().nullable(),
      gain: z.number().optional().nullable(),
      brightness: z.number().optional().nullable(),
      contrast: z.number().optional().nullable(),
      gamma: z.number().optional().nullable(),
      seconds_per_rot: z.number().optional().nullable(),
      experiment_name: z.string().optional().nullable(),
      wave_number: z.number().optional().nullable(),
      plant_age_days: z.number().optional().nullable(),
      deleted: z.number().optional().nullable(),
      electric_cyl_experiments: z
        .lazy(
          () =>
            Electric_cyl_experimentsCreateNestedOneWithoutElectric_cyl_scansInputSchema
        )
        .optional(),
      electric_phenotypers: z
        .lazy(
          () =>
            Electric_phenotypersCreateNestedOneWithoutElectric_cyl_scansInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_imagesInputSchema: z.ZodType<Prisma.Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_imagesInput> =
  z
    .object({
      id: z.string(),
      phenotyper_id: z.string().optional().nullable(),
      scanner_id: z.string().optional().nullable(),
      plant_qr_code: z.string().optional().nullable(),
      path: z.string().optional().nullable(),
      capture_date: z.coerce.date().optional().nullable(),
      num_frames: z.number().optional().nullable(),
      exposure_time: z.number().optional().nullable(),
      gain: z.number().optional().nullable(),
      brightness: z.number().optional().nullable(),
      contrast: z.number().optional().nullable(),
      gamma: z.number().optional().nullable(),
      seconds_per_rot: z.number().optional().nullable(),
      experiment_name: z.string().optional().nullable(),
      wave_number: z.number().optional().nullable(),
      plant_age_days: z.number().optional().nullable(),
      cyl_experiment_id: z.string().optional().nullable(),
      deleted: z.number().optional().nullable(),
    })
    .strict();

export const Electric_cyl_scansCreateOrConnectWithoutElectric_cyl_imagesInputSchema: z.ZodType<Prisma.Electric_cyl_scansCreateOrConnectWithoutElectric_cyl_imagesInput> =
  z
    .object({
      where: z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
      create: z.union([
        z.lazy(
          () => Electric_cyl_scansCreateWithoutElectric_cyl_imagesInputSchema
        ),
        z.lazy(
          () =>
            Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_imagesInputSchema
        ),
      ]),
    })
    .strict();

export const Electric_cyl_scansUpsertWithoutElectric_cyl_imagesInputSchema: z.ZodType<Prisma.Electric_cyl_scansUpsertWithoutElectric_cyl_imagesInput> =
  z
    .object({
      update: z.union([
        z.lazy(
          () => Electric_cyl_scansUpdateWithoutElectric_cyl_imagesInputSchema
        ),
        z.lazy(
          () =>
            Electric_cyl_scansUncheckedUpdateWithoutElectric_cyl_imagesInputSchema
        ),
      ]),
      create: z.union([
        z.lazy(
          () => Electric_cyl_scansCreateWithoutElectric_cyl_imagesInputSchema
        ),
        z.lazy(
          () =>
            Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_imagesInputSchema
        ),
      ]),
    })
    .strict();

export const Electric_cyl_scansUpdateWithoutElectric_cyl_imagesInputSchema: z.ZodType<Prisma.Electric_cyl_scansUpdateWithoutElectric_cyl_imagesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      scanner_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_qr_code: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      capture_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      num_frames: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      exposure_time: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gain: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      brightness: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      contrast: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gamma: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      seconds_per_rot: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      experiment_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      wave_number: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_age_days: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleted: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      electric_cyl_experiments: z
        .lazy(
          () =>
            Electric_cyl_experimentsUpdateOneWithoutElectric_cyl_scansNestedInputSchema
        )
        .optional(),
      electric_phenotypers: z
        .lazy(
          () =>
            Electric_phenotypersUpdateOneWithoutElectric_cyl_scansNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_cyl_scansUncheckedUpdateWithoutElectric_cyl_imagesInputSchema: z.ZodType<Prisma.Electric_cyl_scansUncheckedUpdateWithoutElectric_cyl_imagesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      phenotyper_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scanner_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_qr_code: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      capture_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      num_frames: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      exposure_time: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gain: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      brightness: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      contrast: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gamma: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      seconds_per_rot: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      experiment_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      wave_number: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_age_days: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      cyl_experiment_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleted: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_imagesCreateWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_cyl_imagesCreateWithoutElectric_cyl_scansInput> =
  z
    .object({
      id: z.string(),
      frame_number: z.number().optional().nullable(),
      path: z.string().optional().nullable(),
      url: z.string().optional().nullable(),
      status: z.string().optional().nullable(),
      supabase_object_path: z.string().optional().nullable(),
    })
    .strict();

export const Electric_cyl_imagesUncheckedCreateWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_cyl_imagesUncheckedCreateWithoutElectric_cyl_scansInput> =
  z
    .object({
      id: z.string(),
      frame_number: z.number().optional().nullable(),
      path: z.string().optional().nullable(),
      url: z.string().optional().nullable(),
      status: z.string().optional().nullable(),
      supabase_object_path: z.string().optional().nullable(),
    })
    .strict();

export const Electric_cyl_imagesCreateOrConnectWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_cyl_imagesCreateOrConnectWithoutElectric_cyl_scansInput> =
  z
    .object({
      where: z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema),
      create: z.union([
        z.lazy(
          () => Electric_cyl_imagesCreateWithoutElectric_cyl_scansInputSchema
        ),
        z.lazy(
          () =>
            Electric_cyl_imagesUncheckedCreateWithoutElectric_cyl_scansInputSchema
        ),
      ]),
    })
    .strict();

export const Electric_cyl_imagesCreateManyElectric_cyl_scansInputEnvelopeSchema: z.ZodType<Prisma.Electric_cyl_imagesCreateManyElectric_cyl_scansInputEnvelope> =
  z
    .object({
      data: z
        .lazy(() => Electric_cyl_imagesCreateManyElectric_cyl_scansInputSchema)
        .array(),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const Electric_cyl_experimentsCreateWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsCreateWithoutElectric_cyl_scansInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
      species: z.string().optional().nullable(),
    })
    .strict();

export const Electric_cyl_experimentsUncheckedCreateWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsUncheckedCreateWithoutElectric_cyl_scansInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
      species: z.string().optional().nullable(),
    })
    .strict();

export const Electric_cyl_experimentsCreateOrConnectWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsCreateOrConnectWithoutElectric_cyl_scansInput> =
  z
    .object({
      where: z.lazy(() => Electric_cyl_experimentsWhereUniqueInputSchema),
      create: z.union([
        z.lazy(
          () =>
            Electric_cyl_experimentsCreateWithoutElectric_cyl_scansInputSchema
        ),
        z.lazy(
          () =>
            Electric_cyl_experimentsUncheckedCreateWithoutElectric_cyl_scansInputSchema
        ),
      ]),
    })
    .strict();

export const Electric_phenotypersCreateWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_phenotypersCreateWithoutElectric_cyl_scansInput> =
  z
    .object({
      id: z.string(),
      name: z.string().optional().nullable(),
      email: z.string().optional().nullable(),
    })
    .strict();

export const Electric_phenotypersUncheckedCreateWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_phenotypersUncheckedCreateWithoutElectric_cyl_scansInput> =
  z
    .object({
      id: z.string(),
      name: z.string().optional().nullable(),
      email: z.string().optional().nullable(),
    })
    .strict();

export const Electric_phenotypersCreateOrConnectWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_phenotypersCreateOrConnectWithoutElectric_cyl_scansInput> =
  z
    .object({
      where: z.lazy(() => Electric_phenotypersWhereUniqueInputSchema),
      create: z.union([
        z.lazy(
          () => Electric_phenotypersCreateWithoutElectric_cyl_scansInputSchema
        ),
        z.lazy(
          () =>
            Electric_phenotypersUncheckedCreateWithoutElectric_cyl_scansInputSchema
        ),
      ]),
    })
    .strict();

export const Electric_cyl_imagesUpsertWithWhereUniqueWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_cyl_imagesUpsertWithWhereUniqueWithoutElectric_cyl_scansInput> =
  z
    .object({
      where: z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema),
      update: z.union([
        z.lazy(
          () => Electric_cyl_imagesUpdateWithoutElectric_cyl_scansInputSchema
        ),
        z.lazy(
          () =>
            Electric_cyl_imagesUncheckedUpdateWithoutElectric_cyl_scansInputSchema
        ),
      ]),
      create: z.union([
        z.lazy(
          () => Electric_cyl_imagesCreateWithoutElectric_cyl_scansInputSchema
        ),
        z.lazy(
          () =>
            Electric_cyl_imagesUncheckedCreateWithoutElectric_cyl_scansInputSchema
        ),
      ]),
    })
    .strict();

export const Electric_cyl_imagesUpdateWithWhereUniqueWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_cyl_imagesUpdateWithWhereUniqueWithoutElectric_cyl_scansInput> =
  z
    .object({
      where: z.lazy(() => Electric_cyl_imagesWhereUniqueInputSchema),
      data: z.union([
        z.lazy(
          () => Electric_cyl_imagesUpdateWithoutElectric_cyl_scansInputSchema
        ),
        z.lazy(
          () =>
            Electric_cyl_imagesUncheckedUpdateWithoutElectric_cyl_scansInputSchema
        ),
      ]),
    })
    .strict();

export const Electric_cyl_imagesUpdateManyWithWhereWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_cyl_imagesUpdateManyWithWhereWithoutElectric_cyl_scansInput> =
  z
    .object({
      where: z.lazy(() => Electric_cyl_imagesScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => Electric_cyl_imagesUpdateManyMutationInputSchema),
        z.lazy(
          () =>
            Electric_cyl_imagesUncheckedUpdateManyWithoutElectric_cyl_imagesInputSchema
        ),
      ]),
    })
    .strict();

export const Electric_cyl_imagesScalarWhereInputSchema: z.ZodType<Prisma.Electric_cyl_imagesScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => Electric_cyl_imagesScalarWhereInputSchema),
          z.lazy(() => Electric_cyl_imagesScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => Electric_cyl_imagesScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => Electric_cyl_imagesScalarWhereInputSchema),
          z.lazy(() => Electric_cyl_imagesScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      scan_id: z
        .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      frame_number: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      path: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      url: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      status: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      supabase_object_path: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_experimentsUpsertWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsUpsertWithoutElectric_cyl_scansInput> =
  z
    .object({
      update: z.union([
        z.lazy(
          () =>
            Electric_cyl_experimentsUpdateWithoutElectric_cyl_scansInputSchema
        ),
        z.lazy(
          () =>
            Electric_cyl_experimentsUncheckedUpdateWithoutElectric_cyl_scansInputSchema
        ),
      ]),
      create: z.union([
        z.lazy(
          () =>
            Electric_cyl_experimentsCreateWithoutElectric_cyl_scansInputSchema
        ),
        z.lazy(
          () =>
            Electric_cyl_experimentsUncheckedCreateWithoutElectric_cyl_scansInputSchema
        ),
      ]),
    })
    .strict();

export const Electric_cyl_experimentsUpdateWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsUpdateWithoutElectric_cyl_scansInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      species: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_experimentsUncheckedUpdateWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_cyl_experimentsUncheckedUpdateWithoutElectric_cyl_scansInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      species: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_phenotypersUpsertWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_phenotypersUpsertWithoutElectric_cyl_scansInput> =
  z
    .object({
      update: z.union([
        z.lazy(
          () => Electric_phenotypersUpdateWithoutElectric_cyl_scansInputSchema
        ),
        z.lazy(
          () =>
            Electric_phenotypersUncheckedUpdateWithoutElectric_cyl_scansInputSchema
        ),
      ]),
      create: z.union([
        z.lazy(
          () => Electric_phenotypersCreateWithoutElectric_cyl_scansInputSchema
        ),
        z.lazy(
          () =>
            Electric_phenotypersUncheckedCreateWithoutElectric_cyl_scansInputSchema
        ),
      ]),
    })
    .strict();

export const Electric_phenotypersUpdateWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_phenotypersUpdateWithoutElectric_cyl_scansInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_phenotypersUncheckedUpdateWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_phenotypersUncheckedUpdateWithoutElectric_cyl_scansInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_scansCreateWithoutElectric_phenotypersInputSchema: z.ZodType<Prisma.Electric_cyl_scansCreateWithoutElectric_phenotypersInput> =
  z
    .object({
      id: z.string(),
      scanner_id: z.string().optional().nullable(),
      plant_qr_code: z.string().optional().nullable(),
      path: z.string().optional().nullable(),
      capture_date: z.coerce.date().optional().nullable(),
      num_frames: z.number().optional().nullable(),
      exposure_time: z.number().optional().nullable(),
      gain: z.number().optional().nullable(),
      brightness: z.number().optional().nullable(),
      contrast: z.number().optional().nullable(),
      gamma: z.number().optional().nullable(),
      seconds_per_rot: z.number().optional().nullable(),
      experiment_name: z.string().optional().nullable(),
      wave_number: z.number().optional().nullable(),
      plant_age_days: z.number().optional().nullable(),
      deleted: z.number().optional().nullable(),
      electric_cyl_images: z
        .lazy(
          () =>
            Electric_cyl_imagesCreateNestedManyWithoutElectric_cyl_scansInputSchema
        )
        .optional(),
      electric_cyl_experiments: z
        .lazy(
          () =>
            Electric_cyl_experimentsCreateNestedOneWithoutElectric_cyl_scansInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_cyl_scansUncheckedCreateWithoutElectric_phenotypersInputSchema: z.ZodType<Prisma.Electric_cyl_scansUncheckedCreateWithoutElectric_phenotypersInput> =
  z
    .object({
      id: z.string(),
      scanner_id: z.string().optional().nullable(),
      plant_qr_code: z.string().optional().nullable(),
      path: z.string().optional().nullable(),
      capture_date: z.coerce.date().optional().nullable(),
      num_frames: z.number().optional().nullable(),
      exposure_time: z.number().optional().nullable(),
      gain: z.number().optional().nullable(),
      brightness: z.number().optional().nullable(),
      contrast: z.number().optional().nullable(),
      gamma: z.number().optional().nullable(),
      seconds_per_rot: z.number().optional().nullable(),
      experiment_name: z.string().optional().nullable(),
      wave_number: z.number().optional().nullable(),
      plant_age_days: z.number().optional().nullable(),
      cyl_experiment_id: z.string().optional().nullable(),
      deleted: z.number().optional().nullable(),
      electric_cyl_images: z
        .lazy(
          () =>
            Electric_cyl_imagesUncheckedCreateNestedManyWithoutElectric_cyl_scansInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_cyl_scansCreateOrConnectWithoutElectric_phenotypersInputSchema: z.ZodType<Prisma.Electric_cyl_scansCreateOrConnectWithoutElectric_phenotypersInput> =
  z
    .object({
      where: z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
      create: z.union([
        z.lazy(
          () => Electric_cyl_scansCreateWithoutElectric_phenotypersInputSchema
        ),
        z.lazy(
          () =>
            Electric_cyl_scansUncheckedCreateWithoutElectric_phenotypersInputSchema
        ),
      ]),
    })
    .strict();

export const Electric_cyl_scansCreateManyElectric_phenotypersInputEnvelopeSchema: z.ZodType<Prisma.Electric_cyl_scansCreateManyElectric_phenotypersInputEnvelope> =
  z
    .object({
      data: z
        .lazy(() => Electric_cyl_scansCreateManyElectric_phenotypersInputSchema)
        .array(),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const Electric_cyl_scansUpsertWithWhereUniqueWithoutElectric_phenotypersInputSchema: z.ZodType<Prisma.Electric_cyl_scansUpsertWithWhereUniqueWithoutElectric_phenotypersInput> =
  z
    .object({
      where: z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
      update: z.union([
        z.lazy(
          () => Electric_cyl_scansUpdateWithoutElectric_phenotypersInputSchema
        ),
        z.lazy(
          () =>
            Electric_cyl_scansUncheckedUpdateWithoutElectric_phenotypersInputSchema
        ),
      ]),
      create: z.union([
        z.lazy(
          () => Electric_cyl_scansCreateWithoutElectric_phenotypersInputSchema
        ),
        z.lazy(
          () =>
            Electric_cyl_scansUncheckedCreateWithoutElectric_phenotypersInputSchema
        ),
      ]),
    })
    .strict();

export const Electric_cyl_scansUpdateWithWhereUniqueWithoutElectric_phenotypersInputSchema: z.ZodType<Prisma.Electric_cyl_scansUpdateWithWhereUniqueWithoutElectric_phenotypersInput> =
  z
    .object({
      where: z.lazy(() => Electric_cyl_scansWhereUniqueInputSchema),
      data: z.union([
        z.lazy(
          () => Electric_cyl_scansUpdateWithoutElectric_phenotypersInputSchema
        ),
        z.lazy(
          () =>
            Electric_cyl_scansUncheckedUpdateWithoutElectric_phenotypersInputSchema
        ),
      ]),
    })
    .strict();

export const Electric_cyl_scansUpdateManyWithWhereWithoutElectric_phenotypersInputSchema: z.ZodType<Prisma.Electric_cyl_scansUpdateManyWithWhereWithoutElectric_phenotypersInput> =
  z
    .object({
      where: z.lazy(() => Electric_cyl_scansScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => Electric_cyl_scansUpdateManyMutationInputSchema),
        z.lazy(
          () =>
            Electric_cyl_scansUncheckedUpdateManyWithoutElectric_cyl_scansInputSchema
        ),
      ]),
    })
    .strict();

export const Electric_cyl_scansCreateManyElectric_cyl_experimentsInputSchema: z.ZodType<Prisma.Electric_cyl_scansCreateManyElectric_cyl_experimentsInput> =
  z
    .object({
      id: z.string().uuid(),
      phenotyper_id: z.string().uuid().optional().nullable(),
      scanner_id: z.string().optional().nullable(),
      plant_qr_code: z.string().optional().nullable(),
      path: z.string().optional().nullable(),
      capture_date: z.coerce.date().optional().nullable(),
      num_frames: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      exposure_time: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      gain: z.number().or(z.nan()).optional().nullable(),
      brightness: z.number().or(z.nan()).optional().nullable(),
      contrast: z.number().or(z.nan()).optional().nullable(),
      gamma: z.number().or(z.nan()).optional().nullable(),
      seconds_per_rot: z.number().or(z.nan()).optional().nullable(),
      experiment_name: z.string().optional().nullable(),
      wave_number: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      plant_age_days: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      deleted: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_scansUpdateWithoutElectric_cyl_experimentsInputSchema: z.ZodType<Prisma.Electric_cyl_scansUpdateWithoutElectric_cyl_experimentsInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      scanner_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_qr_code: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      capture_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      num_frames: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      exposure_time: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gain: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      brightness: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      contrast: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gamma: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      seconds_per_rot: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      experiment_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      wave_number: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_age_days: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleted: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      electric_cyl_images: z
        .lazy(
          () =>
            Electric_cyl_imagesUpdateManyWithoutElectric_cyl_scansNestedInputSchema
        )
        .optional(),
      electric_phenotypers: z
        .lazy(
          () =>
            Electric_phenotypersUpdateOneWithoutElectric_cyl_scansNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_cyl_scansUncheckedUpdateWithoutElectric_cyl_experimentsInputSchema: z.ZodType<Prisma.Electric_cyl_scansUncheckedUpdateWithoutElectric_cyl_experimentsInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      phenotyper_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scanner_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_qr_code: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      capture_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      num_frames: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      exposure_time: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gain: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      brightness: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      contrast: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gamma: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      seconds_per_rot: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      experiment_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      wave_number: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_age_days: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleted: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      electric_cyl_images: z
        .lazy(
          () =>
            Electric_cyl_imagesUncheckedUpdateManyWithoutElectric_cyl_scansNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_cyl_scansUncheckedUpdateManyWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_cyl_scansUncheckedUpdateManyWithoutElectric_cyl_scansInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      phenotyper_id: z
        .union([
          z.string().uuid(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scanner_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_qr_code: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      capture_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      num_frames: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      exposure_time: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gain: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      brightness: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      contrast: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gamma: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      seconds_per_rot: z
        .union([
          z.number().or(z.nan()),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      experiment_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      wave_number: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_age_days: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleted: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_imagesCreateManyElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_cyl_imagesCreateManyElectric_cyl_scansInput> =
  z
    .object({
      id: z.string().uuid(),
      frame_number: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      path: z.string().optional().nullable(),
      url: z.string().optional().nullable(),
      status: z.string().optional().nullable(),
      supabase_object_path: z.string().optional().nullable(),
    })
    .strict();

export const Electric_cyl_imagesUpdateWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_cyl_imagesUpdateWithoutElectric_cyl_scansInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      frame_number: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      url: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      supabase_object_path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_imagesUncheckedUpdateWithoutElectric_cyl_scansInputSchema: z.ZodType<Prisma.Electric_cyl_imagesUncheckedUpdateWithoutElectric_cyl_scansInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      frame_number: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      url: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      supabase_object_path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_imagesUncheckedUpdateManyWithoutElectric_cyl_imagesInputSchema: z.ZodType<Prisma.Electric_cyl_imagesUncheckedUpdateManyWithoutElectric_cyl_imagesInput> =
  z
    .object({
      id: z
        .union([
          z.string().uuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      frame_number: z
        .union([
          z.number().int().gte(-2147483648).lte(2147483647),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      url: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      supabase_object_path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_scansCreateManyElectric_phenotypersInputSchema: z.ZodType<Prisma.Electric_cyl_scansCreateManyElectric_phenotypersInput> =
  z
    .object({
      id: z.string().uuid(),
      scanner_id: z.string().optional().nullable(),
      plant_qr_code: z.string().optional().nullable(),
      path: z.string().optional().nullable(),
      capture_date: z.coerce.date().optional().nullable(),
      num_frames: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      exposure_time: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      gain: z.number().or(z.nan()).optional().nullable(),
      brightness: z.number().or(z.nan()).optional().nullable(),
      contrast: z.number().or(z.nan()).optional().nullable(),
      gamma: z.number().or(z.nan()).optional().nullable(),
      seconds_per_rot: z.number().or(z.nan()).optional().nullable(),
      experiment_name: z.string().optional().nullable(),
      wave_number: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      plant_age_days: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
      cyl_experiment_id: z.string().uuid().optional().nullable(),
      deleted: z
        .number()
        .int()
        .gte(-2147483648)
        .lte(2147483647)
        .optional()
        .nullable(),
    })
    .strict();

export const Electric_cyl_scansUpdateWithoutElectric_phenotypersInputSchema: z.ZodType<Prisma.Electric_cyl_scansUpdateWithoutElectric_phenotypersInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      scanner_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_qr_code: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      capture_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      num_frames: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      exposure_time: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gain: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      brightness: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      contrast: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gamma: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      seconds_per_rot: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      experiment_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      wave_number: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_age_days: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleted: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      electric_cyl_images: z
        .lazy(
          () =>
            Electric_cyl_imagesUpdateManyWithoutElectric_cyl_scansNestedInputSchema
        )
        .optional(),
      electric_cyl_experiments: z
        .lazy(
          () =>
            Electric_cyl_experimentsUpdateOneWithoutElectric_cyl_scansNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const Electric_cyl_scansUncheckedUpdateWithoutElectric_phenotypersInputSchema: z.ZodType<Prisma.Electric_cyl_scansUncheckedUpdateWithoutElectric_phenotypersInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      scanner_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_qr_code: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      path: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      capture_date: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      num_frames: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      exposure_time: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gain: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      brightness: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      contrast: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      gamma: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      seconds_per_rot: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      experiment_name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      wave_number: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      plant_age_days: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      cyl_experiment_id: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleted: z
        .union([
          z.number(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      electric_cyl_images: z
        .lazy(
          () =>
            Electric_cyl_imagesUncheckedUpdateManyWithoutElectric_cyl_scansNestedInputSchema
        )
        .optional(),
    })
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const Electric_cyl_experimentsFindFirstArgsSchema: z.ZodType<Prisma.Electric_cyl_experimentsFindFirstArgs> =
  z
    .object({
      select: Electric_cyl_experimentsSelectSchema.optional(),
      include: Electric_cyl_experimentsIncludeSchema.optional(),
      where: Electric_cyl_experimentsWhereInputSchema.optional(),
      orderBy: z
        .union([
          Electric_cyl_experimentsOrderByWithRelationInputSchema.array(),
          Electric_cyl_experimentsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: Electric_cyl_experimentsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct:
        Electric_cyl_experimentsScalarFieldEnumSchema.array().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_experimentsFindFirstArgs>;

export const Electric_cyl_experimentsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Electric_cyl_experimentsFindFirstOrThrowArgs> =
  z
    .object({
      select: Electric_cyl_experimentsSelectSchema.optional(),
      include: Electric_cyl_experimentsIncludeSchema.optional(),
      where: Electric_cyl_experimentsWhereInputSchema.optional(),
      orderBy: z
        .union([
          Electric_cyl_experimentsOrderByWithRelationInputSchema.array(),
          Electric_cyl_experimentsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: Electric_cyl_experimentsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct:
        Electric_cyl_experimentsScalarFieldEnumSchema.array().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_experimentsFindFirstOrThrowArgs>;

export const Electric_cyl_experimentsFindManyArgsSchema: z.ZodType<Prisma.Electric_cyl_experimentsFindManyArgs> =
  z
    .object({
      select: Electric_cyl_experimentsSelectSchema.optional(),
      include: Electric_cyl_experimentsIncludeSchema.optional(),
      where: Electric_cyl_experimentsWhereInputSchema.optional(),
      orderBy: z
        .union([
          Electric_cyl_experimentsOrderByWithRelationInputSchema.array(),
          Electric_cyl_experimentsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: Electric_cyl_experimentsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct:
        Electric_cyl_experimentsScalarFieldEnumSchema.array().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_experimentsFindManyArgs>;

export const Electric_cyl_experimentsAggregateArgsSchema: z.ZodType<Prisma.Electric_cyl_experimentsAggregateArgs> =
  z
    .object({
      where: Electric_cyl_experimentsWhereInputSchema.optional(),
      orderBy: z
        .union([
          Electric_cyl_experimentsOrderByWithRelationInputSchema.array(),
          Electric_cyl_experimentsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: Electric_cyl_experimentsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_experimentsAggregateArgs>;

export const Electric_cyl_experimentsGroupByArgsSchema: z.ZodType<Prisma.Electric_cyl_experimentsGroupByArgs> =
  z
    .object({
      where: Electric_cyl_experimentsWhereInputSchema.optional(),
      orderBy: z
        .union([
          Electric_cyl_experimentsOrderByWithAggregationInputSchema.array(),
          Electric_cyl_experimentsOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: Electric_cyl_experimentsScalarFieldEnumSchema.array(),
      having:
        Electric_cyl_experimentsScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_experimentsGroupByArgs>;

export const Electric_cyl_experimentsFindUniqueArgsSchema: z.ZodType<Prisma.Electric_cyl_experimentsFindUniqueArgs> =
  z
    .object({
      select: Electric_cyl_experimentsSelectSchema.optional(),
      include: Electric_cyl_experimentsIncludeSchema.optional(),
      where: Electric_cyl_experimentsWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_experimentsFindUniqueArgs>;

export const Electric_cyl_experimentsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Electric_cyl_experimentsFindUniqueOrThrowArgs> =
  z
    .object({
      select: Electric_cyl_experimentsSelectSchema.optional(),
      include: Electric_cyl_experimentsIncludeSchema.optional(),
      where: Electric_cyl_experimentsWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_experimentsFindUniqueOrThrowArgs>;

export const Electric_cyl_imagesFindFirstArgsSchema: z.ZodType<Prisma.Electric_cyl_imagesFindFirstArgs> =
  z
    .object({
      select: Electric_cyl_imagesSelectSchema.optional(),
      include: Electric_cyl_imagesIncludeSchema.optional(),
      where: Electric_cyl_imagesWhereInputSchema.optional(),
      orderBy: z
        .union([
          Electric_cyl_imagesOrderByWithRelationInputSchema.array(),
          Electric_cyl_imagesOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: Electric_cyl_imagesWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: Electric_cyl_imagesScalarFieldEnumSchema.array().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_imagesFindFirstArgs>;

export const Electric_cyl_imagesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Electric_cyl_imagesFindFirstOrThrowArgs> =
  z
    .object({
      select: Electric_cyl_imagesSelectSchema.optional(),
      include: Electric_cyl_imagesIncludeSchema.optional(),
      where: Electric_cyl_imagesWhereInputSchema.optional(),
      orderBy: z
        .union([
          Electric_cyl_imagesOrderByWithRelationInputSchema.array(),
          Electric_cyl_imagesOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: Electric_cyl_imagesWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: Electric_cyl_imagesScalarFieldEnumSchema.array().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_imagesFindFirstOrThrowArgs>;

export const Electric_cyl_imagesFindManyArgsSchema: z.ZodType<Prisma.Electric_cyl_imagesFindManyArgs> =
  z
    .object({
      select: Electric_cyl_imagesSelectSchema.optional(),
      include: Electric_cyl_imagesIncludeSchema.optional(),
      where: Electric_cyl_imagesWhereInputSchema.optional(),
      orderBy: z
        .union([
          Electric_cyl_imagesOrderByWithRelationInputSchema.array(),
          Electric_cyl_imagesOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: Electric_cyl_imagesWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: Electric_cyl_imagesScalarFieldEnumSchema.array().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_imagesFindManyArgs>;

export const Electric_cyl_imagesAggregateArgsSchema: z.ZodType<Prisma.Electric_cyl_imagesAggregateArgs> =
  z
    .object({
      where: Electric_cyl_imagesWhereInputSchema.optional(),
      orderBy: z
        .union([
          Electric_cyl_imagesOrderByWithRelationInputSchema.array(),
          Electric_cyl_imagesOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: Electric_cyl_imagesWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_imagesAggregateArgs>;

export const Electric_cyl_imagesGroupByArgsSchema: z.ZodType<Prisma.Electric_cyl_imagesGroupByArgs> =
  z
    .object({
      where: Electric_cyl_imagesWhereInputSchema.optional(),
      orderBy: z
        .union([
          Electric_cyl_imagesOrderByWithAggregationInputSchema.array(),
          Electric_cyl_imagesOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: Electric_cyl_imagesScalarFieldEnumSchema.array(),
      having:
        Electric_cyl_imagesScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_imagesGroupByArgs>;

export const Electric_cyl_imagesFindUniqueArgsSchema: z.ZodType<Prisma.Electric_cyl_imagesFindUniqueArgs> =
  z
    .object({
      select: Electric_cyl_imagesSelectSchema.optional(),
      include: Electric_cyl_imagesIncludeSchema.optional(),
      where: Electric_cyl_imagesWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_imagesFindUniqueArgs>;

export const Electric_cyl_imagesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Electric_cyl_imagesFindUniqueOrThrowArgs> =
  z
    .object({
      select: Electric_cyl_imagesSelectSchema.optional(),
      include: Electric_cyl_imagesIncludeSchema.optional(),
      where: Electric_cyl_imagesWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_imagesFindUniqueOrThrowArgs>;

export const Electric_cyl_scansFindFirstArgsSchema: z.ZodType<Prisma.Electric_cyl_scansFindFirstArgs> =
  z
    .object({
      select: Electric_cyl_scansSelectSchema.optional(),
      include: Electric_cyl_scansIncludeSchema.optional(),
      where: Electric_cyl_scansWhereInputSchema.optional(),
      orderBy: z
        .union([
          Electric_cyl_scansOrderByWithRelationInputSchema.array(),
          Electric_cyl_scansOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: Electric_cyl_scansWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: Electric_cyl_scansScalarFieldEnumSchema.array().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_scansFindFirstArgs>;

export const Electric_cyl_scansFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Electric_cyl_scansFindFirstOrThrowArgs> =
  z
    .object({
      select: Electric_cyl_scansSelectSchema.optional(),
      include: Electric_cyl_scansIncludeSchema.optional(),
      where: Electric_cyl_scansWhereInputSchema.optional(),
      orderBy: z
        .union([
          Electric_cyl_scansOrderByWithRelationInputSchema.array(),
          Electric_cyl_scansOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: Electric_cyl_scansWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: Electric_cyl_scansScalarFieldEnumSchema.array().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_scansFindFirstOrThrowArgs>;

export const Electric_cyl_scansFindManyArgsSchema: z.ZodType<Prisma.Electric_cyl_scansFindManyArgs> =
  z
    .object({
      select: Electric_cyl_scansSelectSchema.optional(),
      include: Electric_cyl_scansIncludeSchema.optional(),
      where: Electric_cyl_scansWhereInputSchema.optional(),
      orderBy: z
        .union([
          Electric_cyl_scansOrderByWithRelationInputSchema.array(),
          Electric_cyl_scansOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: Electric_cyl_scansWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: Electric_cyl_scansScalarFieldEnumSchema.array().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_scansFindManyArgs>;

export const Electric_cyl_scansAggregateArgsSchema: z.ZodType<Prisma.Electric_cyl_scansAggregateArgs> =
  z
    .object({
      where: Electric_cyl_scansWhereInputSchema.optional(),
      orderBy: z
        .union([
          Electric_cyl_scansOrderByWithRelationInputSchema.array(),
          Electric_cyl_scansOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: Electric_cyl_scansWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_scansAggregateArgs>;

export const Electric_cyl_scansGroupByArgsSchema: z.ZodType<Prisma.Electric_cyl_scansGroupByArgs> =
  z
    .object({
      where: Electric_cyl_scansWhereInputSchema.optional(),
      orderBy: z
        .union([
          Electric_cyl_scansOrderByWithAggregationInputSchema.array(),
          Electric_cyl_scansOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: Electric_cyl_scansScalarFieldEnumSchema.array(),
      having: Electric_cyl_scansScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_scansGroupByArgs>;

export const Electric_cyl_scansFindUniqueArgsSchema: z.ZodType<Prisma.Electric_cyl_scansFindUniqueArgs> =
  z
    .object({
      select: Electric_cyl_scansSelectSchema.optional(),
      include: Electric_cyl_scansIncludeSchema.optional(),
      where: Electric_cyl_scansWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_scansFindUniqueArgs>;

export const Electric_cyl_scansFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Electric_cyl_scansFindUniqueOrThrowArgs> =
  z
    .object({
      select: Electric_cyl_scansSelectSchema.optional(),
      include: Electric_cyl_scansIncludeSchema.optional(),
      where: Electric_cyl_scansWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_scansFindUniqueOrThrowArgs>;

export const Electric_phenotypersFindFirstArgsSchema: z.ZodType<Prisma.Electric_phenotypersFindFirstArgs> =
  z
    .object({
      select: Electric_phenotypersSelectSchema.optional(),
      include: Electric_phenotypersIncludeSchema.optional(),
      where: Electric_phenotypersWhereInputSchema.optional(),
      orderBy: z
        .union([
          Electric_phenotypersOrderByWithRelationInputSchema.array(),
          Electric_phenotypersOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: Electric_phenotypersWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: Electric_phenotypersScalarFieldEnumSchema.array().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_phenotypersFindFirstArgs>;

export const Electric_phenotypersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Electric_phenotypersFindFirstOrThrowArgs> =
  z
    .object({
      select: Electric_phenotypersSelectSchema.optional(),
      include: Electric_phenotypersIncludeSchema.optional(),
      where: Electric_phenotypersWhereInputSchema.optional(),
      orderBy: z
        .union([
          Electric_phenotypersOrderByWithRelationInputSchema.array(),
          Electric_phenotypersOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: Electric_phenotypersWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: Electric_phenotypersScalarFieldEnumSchema.array().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_phenotypersFindFirstOrThrowArgs>;

export const Electric_phenotypersFindManyArgsSchema: z.ZodType<Prisma.Electric_phenotypersFindManyArgs> =
  z
    .object({
      select: Electric_phenotypersSelectSchema.optional(),
      include: Electric_phenotypersIncludeSchema.optional(),
      where: Electric_phenotypersWhereInputSchema.optional(),
      orderBy: z
        .union([
          Electric_phenotypersOrderByWithRelationInputSchema.array(),
          Electric_phenotypersOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: Electric_phenotypersWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: Electric_phenotypersScalarFieldEnumSchema.array().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_phenotypersFindManyArgs>;

export const Electric_phenotypersAggregateArgsSchema: z.ZodType<Prisma.Electric_phenotypersAggregateArgs> =
  z
    .object({
      where: Electric_phenotypersWhereInputSchema.optional(),
      orderBy: z
        .union([
          Electric_phenotypersOrderByWithRelationInputSchema.array(),
          Electric_phenotypersOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: Electric_phenotypersWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_phenotypersAggregateArgs>;

export const Electric_phenotypersGroupByArgsSchema: z.ZodType<Prisma.Electric_phenotypersGroupByArgs> =
  z
    .object({
      where: Electric_phenotypersWhereInputSchema.optional(),
      orderBy: z
        .union([
          Electric_phenotypersOrderByWithAggregationInputSchema.array(),
          Electric_phenotypersOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: Electric_phenotypersScalarFieldEnumSchema.array(),
      having:
        Electric_phenotypersScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_phenotypersGroupByArgs>;

export const Electric_phenotypersFindUniqueArgsSchema: z.ZodType<Prisma.Electric_phenotypersFindUniqueArgs> =
  z
    .object({
      select: Electric_phenotypersSelectSchema.optional(),
      include: Electric_phenotypersIncludeSchema.optional(),
      where: Electric_phenotypersWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.Electric_phenotypersFindUniqueArgs>;

export const Electric_phenotypersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Electric_phenotypersFindUniqueOrThrowArgs> =
  z
    .object({
      select: Electric_phenotypersSelectSchema.optional(),
      include: Electric_phenotypersIncludeSchema.optional(),
      where: Electric_phenotypersWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.Electric_phenotypersFindUniqueOrThrowArgs>;

export const Electric_cyl_experimentsCreateArgsSchema: z.ZodType<Prisma.Electric_cyl_experimentsCreateArgs> =
  z
    .object({
      select: Electric_cyl_experimentsSelectSchema.optional(),
      include: Electric_cyl_experimentsIncludeSchema.optional(),
      data: z.union([
        Electric_cyl_experimentsCreateInputSchema,
        Electric_cyl_experimentsUncheckedCreateInputSchema,
      ]),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_experimentsCreateArgs>;

export const Electric_cyl_experimentsUpsertArgsSchema: z.ZodType<Prisma.Electric_cyl_experimentsUpsertArgs> =
  z
    .object({
      select: Electric_cyl_experimentsSelectSchema.optional(),
      include: Electric_cyl_experimentsIncludeSchema.optional(),
      where: Electric_cyl_experimentsWhereUniqueInputSchema,
      create: z.union([
        Electric_cyl_experimentsCreateInputSchema,
        Electric_cyl_experimentsUncheckedCreateInputSchema,
      ]),
      update: z.union([
        Electric_cyl_experimentsUpdateInputSchema,
        Electric_cyl_experimentsUncheckedUpdateInputSchema,
      ]),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_experimentsUpsertArgs>;

export const Electric_cyl_experimentsCreateManyArgsSchema: z.ZodType<Prisma.Electric_cyl_experimentsCreateManyArgs> =
  z
    .object({
      data: Electric_cyl_experimentsCreateManyInputSchema.array(),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_experimentsCreateManyArgs>;

export const Electric_cyl_experimentsDeleteArgsSchema: z.ZodType<Prisma.Electric_cyl_experimentsDeleteArgs> =
  z
    .object({
      select: Electric_cyl_experimentsSelectSchema.optional(),
      include: Electric_cyl_experimentsIncludeSchema.optional(),
      where: Electric_cyl_experimentsWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_experimentsDeleteArgs>;

export const Electric_cyl_experimentsUpdateArgsSchema: z.ZodType<Prisma.Electric_cyl_experimentsUpdateArgs> =
  z
    .object({
      select: Electric_cyl_experimentsSelectSchema.optional(),
      include: Electric_cyl_experimentsIncludeSchema.optional(),
      data: z.union([
        Electric_cyl_experimentsUpdateInputSchema,
        Electric_cyl_experimentsUncheckedUpdateInputSchema,
      ]),
      where: Electric_cyl_experimentsWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_experimentsUpdateArgs>;

export const Electric_cyl_experimentsUpdateManyArgsSchema: z.ZodType<Prisma.Electric_cyl_experimentsUpdateManyArgs> =
  z
    .object({
      data: z.union([
        Electric_cyl_experimentsUpdateManyMutationInputSchema,
        Electric_cyl_experimentsUncheckedUpdateManyInputSchema,
      ]),
      where: Electric_cyl_experimentsWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_experimentsUpdateManyArgs>;

export const Electric_cyl_experimentsDeleteManyArgsSchema: z.ZodType<Prisma.Electric_cyl_experimentsDeleteManyArgs> =
  z
    .object({
      where: Electric_cyl_experimentsWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_experimentsDeleteManyArgs>;

export const Electric_cyl_imagesCreateArgsSchema: z.ZodType<Prisma.Electric_cyl_imagesCreateArgs> =
  z
    .object({
      select: Electric_cyl_imagesSelectSchema.optional(),
      include: Electric_cyl_imagesIncludeSchema.optional(),
      data: z.union([
        Electric_cyl_imagesCreateInputSchema,
        Electric_cyl_imagesUncheckedCreateInputSchema,
      ]),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_imagesCreateArgs>;

export const Electric_cyl_imagesUpsertArgsSchema: z.ZodType<Prisma.Electric_cyl_imagesUpsertArgs> =
  z
    .object({
      select: Electric_cyl_imagesSelectSchema.optional(),
      include: Electric_cyl_imagesIncludeSchema.optional(),
      where: Electric_cyl_imagesWhereUniqueInputSchema,
      create: z.union([
        Electric_cyl_imagesCreateInputSchema,
        Electric_cyl_imagesUncheckedCreateInputSchema,
      ]),
      update: z.union([
        Electric_cyl_imagesUpdateInputSchema,
        Electric_cyl_imagesUncheckedUpdateInputSchema,
      ]),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_imagesUpsertArgs>;

export const Electric_cyl_imagesCreateManyArgsSchema: z.ZodType<Prisma.Electric_cyl_imagesCreateManyArgs> =
  z
    .object({
      data: Electric_cyl_imagesCreateManyInputSchema.array(),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_imagesCreateManyArgs>;

export const Electric_cyl_imagesDeleteArgsSchema: z.ZodType<Prisma.Electric_cyl_imagesDeleteArgs> =
  z
    .object({
      select: Electric_cyl_imagesSelectSchema.optional(),
      include: Electric_cyl_imagesIncludeSchema.optional(),
      where: Electric_cyl_imagesWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_imagesDeleteArgs>;

export const Electric_cyl_imagesUpdateArgsSchema: z.ZodType<Prisma.Electric_cyl_imagesUpdateArgs> =
  z
    .object({
      select: Electric_cyl_imagesSelectSchema.optional(),
      include: Electric_cyl_imagesIncludeSchema.optional(),
      data: z.union([
        Electric_cyl_imagesUpdateInputSchema,
        Electric_cyl_imagesUncheckedUpdateInputSchema,
      ]),
      where: Electric_cyl_imagesWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_imagesUpdateArgs>;

export const Electric_cyl_imagesUpdateManyArgsSchema: z.ZodType<Prisma.Electric_cyl_imagesUpdateManyArgs> =
  z
    .object({
      data: z.union([
        Electric_cyl_imagesUpdateManyMutationInputSchema,
        Electric_cyl_imagesUncheckedUpdateManyInputSchema,
      ]),
      where: Electric_cyl_imagesWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_imagesUpdateManyArgs>;

export const Electric_cyl_imagesDeleteManyArgsSchema: z.ZodType<Prisma.Electric_cyl_imagesDeleteManyArgs> =
  z
    .object({
      where: Electric_cyl_imagesWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_imagesDeleteManyArgs>;

export const Electric_cyl_scansCreateArgsSchema: z.ZodType<Prisma.Electric_cyl_scansCreateArgs> =
  z
    .object({
      select: Electric_cyl_scansSelectSchema.optional(),
      include: Electric_cyl_scansIncludeSchema.optional(),
      data: z.union([
        Electric_cyl_scansCreateInputSchema,
        Electric_cyl_scansUncheckedCreateInputSchema,
      ]),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_scansCreateArgs>;

export const Electric_cyl_scansUpsertArgsSchema: z.ZodType<Prisma.Electric_cyl_scansUpsertArgs> =
  z
    .object({
      select: Electric_cyl_scansSelectSchema.optional(),
      include: Electric_cyl_scansIncludeSchema.optional(),
      where: Electric_cyl_scansWhereUniqueInputSchema,
      create: z.union([
        Electric_cyl_scansCreateInputSchema,
        Electric_cyl_scansUncheckedCreateInputSchema,
      ]),
      update: z.union([
        Electric_cyl_scansUpdateInputSchema,
        Electric_cyl_scansUncheckedUpdateInputSchema,
      ]),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_scansUpsertArgs>;

export const Electric_cyl_scansCreateManyArgsSchema: z.ZodType<Prisma.Electric_cyl_scansCreateManyArgs> =
  z
    .object({
      data: Electric_cyl_scansCreateManyInputSchema.array(),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_scansCreateManyArgs>;

export const Electric_cyl_scansDeleteArgsSchema: z.ZodType<Prisma.Electric_cyl_scansDeleteArgs> =
  z
    .object({
      select: Electric_cyl_scansSelectSchema.optional(),
      include: Electric_cyl_scansIncludeSchema.optional(),
      where: Electric_cyl_scansWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_scansDeleteArgs>;

export const Electric_cyl_scansUpdateArgsSchema: z.ZodType<Prisma.Electric_cyl_scansUpdateArgs> =
  z
    .object({
      select: Electric_cyl_scansSelectSchema.optional(),
      include: Electric_cyl_scansIncludeSchema.optional(),
      data: z.union([
        Electric_cyl_scansUpdateInputSchema,
        Electric_cyl_scansUncheckedUpdateInputSchema,
      ]),
      where: Electric_cyl_scansWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_scansUpdateArgs>;

export const Electric_cyl_scansUpdateManyArgsSchema: z.ZodType<Prisma.Electric_cyl_scansUpdateManyArgs> =
  z
    .object({
      data: z.union([
        Electric_cyl_scansUpdateManyMutationInputSchema,
        Electric_cyl_scansUncheckedUpdateManyInputSchema,
      ]),
      where: Electric_cyl_scansWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_scansUpdateManyArgs>;

export const Electric_cyl_scansDeleteManyArgsSchema: z.ZodType<Prisma.Electric_cyl_scansDeleteManyArgs> =
  z
    .object({
      where: Electric_cyl_scansWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_cyl_scansDeleteManyArgs>;

export const Electric_phenotypersCreateArgsSchema: z.ZodType<Prisma.Electric_phenotypersCreateArgs> =
  z
    .object({
      select: Electric_phenotypersSelectSchema.optional(),
      include: Electric_phenotypersIncludeSchema.optional(),
      data: z.union([
        Electric_phenotypersCreateInputSchema,
        Electric_phenotypersUncheckedCreateInputSchema,
      ]),
    })
    .strict() as z.ZodType<Prisma.Electric_phenotypersCreateArgs>;

export const Electric_phenotypersUpsertArgsSchema: z.ZodType<Prisma.Electric_phenotypersUpsertArgs> =
  z
    .object({
      select: Electric_phenotypersSelectSchema.optional(),
      include: Electric_phenotypersIncludeSchema.optional(),
      where: Electric_phenotypersWhereUniqueInputSchema,
      create: z.union([
        Electric_phenotypersCreateInputSchema,
        Electric_phenotypersUncheckedCreateInputSchema,
      ]),
      update: z.union([
        Electric_phenotypersUpdateInputSchema,
        Electric_phenotypersUncheckedUpdateInputSchema,
      ]),
    })
    .strict() as z.ZodType<Prisma.Electric_phenotypersUpsertArgs>;

export const Electric_phenotypersCreateManyArgsSchema: z.ZodType<Prisma.Electric_phenotypersCreateManyArgs> =
  z
    .object({
      data: Electric_phenotypersCreateManyInputSchema.array(),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_phenotypersCreateManyArgs>;

export const Electric_phenotypersDeleteArgsSchema: z.ZodType<Prisma.Electric_phenotypersDeleteArgs> =
  z
    .object({
      select: Electric_phenotypersSelectSchema.optional(),
      include: Electric_phenotypersIncludeSchema.optional(),
      where: Electric_phenotypersWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.Electric_phenotypersDeleteArgs>;

export const Electric_phenotypersUpdateArgsSchema: z.ZodType<Prisma.Electric_phenotypersUpdateArgs> =
  z
    .object({
      select: Electric_phenotypersSelectSchema.optional(),
      include: Electric_phenotypersIncludeSchema.optional(),
      data: z.union([
        Electric_phenotypersUpdateInputSchema,
        Electric_phenotypersUncheckedUpdateInputSchema,
      ]),
      where: Electric_phenotypersWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.Electric_phenotypersUpdateArgs>;

export const Electric_phenotypersUpdateManyArgsSchema: z.ZodType<Prisma.Electric_phenotypersUpdateManyArgs> =
  z
    .object({
      data: z.union([
        Electric_phenotypersUpdateManyMutationInputSchema,
        Electric_phenotypersUncheckedUpdateManyInputSchema,
      ]),
      where: Electric_phenotypersWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_phenotypersUpdateManyArgs>;

export const Electric_phenotypersDeleteManyArgsSchema: z.ZodType<Prisma.Electric_phenotypersDeleteManyArgs> =
  z
    .object({
      where: Electric_phenotypersWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.Electric_phenotypersDeleteManyArgs>;

interface Electric_cyl_experimentsGetPayload extends HKT {
  readonly _A?:
    | boolean
    | null
    | undefined
    | Prisma.Electric_cyl_experimentsArgs;
  readonly type: Omit<
    Prisma.Electric_cyl_experimentsGetPayload<this["_A"]>,
    "Please either choose `select` or `include`"
  >;
}

interface Electric_cyl_imagesGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.Electric_cyl_imagesArgs;
  readonly type: Omit<
    Prisma.Electric_cyl_imagesGetPayload<this["_A"]>,
    "Please either choose `select` or `include`"
  >;
}

interface Electric_cyl_scansGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.Electric_cyl_scansArgs;
  readonly type: Omit<
    Prisma.Electric_cyl_scansGetPayload<this["_A"]>,
    "Please either choose `select` or `include`"
  >;
}

interface Electric_phenotypersGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.Electric_phenotypersArgs;
  readonly type: Omit<
    Prisma.Electric_phenotypersGetPayload<this["_A"]>,
    "Please either choose `select` or `include`"
  >;
}

export const tableSchemas = {
  electric_cyl_experiments: {
    fields: new Map([
      ["id", "UUID"],
      ["name", "TEXT"],
      ["species", "TEXT"],
    ]),
    relations: [
      new Relation(
        "electric_cyl_scans",
        "",
        "",
        "electric_cyl_scans",
        "Electric_cyl_experimentsToElectric_cyl_scans",
        "many"
      ),
    ],
    modelSchema: (Electric_cyl_experimentsCreateInputSchema as any)
      .partial()
      .or(
        (Electric_cyl_experimentsUncheckedCreateInputSchema as any).partial()
      ),
    createSchema: Electric_cyl_experimentsCreateArgsSchema,
    createManySchema: Electric_cyl_experimentsCreateManyArgsSchema,
    findUniqueSchema: Electric_cyl_experimentsFindUniqueArgsSchema,
    findSchema: Electric_cyl_experimentsFindFirstArgsSchema,
    updateSchema: Electric_cyl_experimentsUpdateArgsSchema,
    updateManySchema: Electric_cyl_experimentsUpdateManyArgsSchema,
    upsertSchema: Electric_cyl_experimentsUpsertArgsSchema,
    deleteSchema: Electric_cyl_experimentsDeleteArgsSchema,
    deleteManySchema: Electric_cyl_experimentsDeleteManyArgsSchema,
  } as TableSchema<
    z.infer<typeof Electric_cyl_experimentsUncheckedCreateInputSchema>,
    Prisma.Electric_cyl_experimentsCreateArgs["data"],
    Prisma.Electric_cyl_experimentsUpdateArgs["data"],
    Prisma.Electric_cyl_experimentsFindFirstArgs["select"],
    Prisma.Electric_cyl_experimentsFindFirstArgs["where"],
    Prisma.Electric_cyl_experimentsFindUniqueArgs["where"],
    Omit<Prisma.Electric_cyl_experimentsInclude, "_count">,
    Prisma.Electric_cyl_experimentsFindFirstArgs["orderBy"],
    Prisma.Electric_cyl_experimentsScalarFieldEnum,
    Electric_cyl_experimentsGetPayload
  >,
  electric_cyl_images: {
    fields: new Map([
      ["id", "UUID"],
      ["scan_id", "UUID"],
      ["frame_number", "INT4"],
      ["path", "TEXT"],
      ["url", "TEXT"],
      ["status", "TEXT"],
      ["supabase_object_path", "TEXT"],
    ]),
    relations: [
      new Relation(
        "electric_cyl_scans",
        "scan_id",
        "id",
        "electric_cyl_scans",
        "Electric_cyl_imagesToElectric_cyl_scans",
        "one"
      ),
    ],
    modelSchema: (Electric_cyl_imagesCreateInputSchema as any)
      .partial()
      .or((Electric_cyl_imagesUncheckedCreateInputSchema as any).partial()),
    createSchema: Electric_cyl_imagesCreateArgsSchema,
    createManySchema: Electric_cyl_imagesCreateManyArgsSchema,
    findUniqueSchema: Electric_cyl_imagesFindUniqueArgsSchema,
    findSchema: Electric_cyl_imagesFindFirstArgsSchema,
    updateSchema: Electric_cyl_imagesUpdateArgsSchema,
    updateManySchema: Electric_cyl_imagesUpdateManyArgsSchema,
    upsertSchema: Electric_cyl_imagesUpsertArgsSchema,
    deleteSchema: Electric_cyl_imagesDeleteArgsSchema,
    deleteManySchema: Electric_cyl_imagesDeleteManyArgsSchema,
  } as TableSchema<
    z.infer<typeof Electric_cyl_imagesUncheckedCreateInputSchema>,
    Prisma.Electric_cyl_imagesCreateArgs["data"],
    Prisma.Electric_cyl_imagesUpdateArgs["data"],
    Prisma.Electric_cyl_imagesFindFirstArgs["select"],
    Prisma.Electric_cyl_imagesFindFirstArgs["where"],
    Prisma.Electric_cyl_imagesFindUniqueArgs["where"],
    Omit<Prisma.Electric_cyl_imagesInclude, "_count">,
    Prisma.Electric_cyl_imagesFindFirstArgs["orderBy"],
    Prisma.Electric_cyl_imagesScalarFieldEnum,
    Electric_cyl_imagesGetPayload
  >,
  electric_cyl_scans: {
    fields: new Map([
      ["id", "UUID"],
      ["phenotyper_id", "UUID"],
      ["scanner_id", "TEXT"],
      ["plant_qr_code", "TEXT"],
      ["path", "TEXT"],
      ["capture_date", "TIMESTAMPTZ"],
      ["num_frames", "INT4"],
      ["exposure_time", "INT4"],
      ["gain", "FLOAT4"],
      ["brightness", "FLOAT4"],
      ["contrast", "FLOAT4"],
      ["gamma", "FLOAT4"],
      ["seconds_per_rot", "FLOAT4"],
      ["experiment_name", "TEXT"],
      ["wave_number", "INT4"],
      ["plant_age_days", "INT4"],
      ["cyl_experiment_id", "UUID"],
      ["deleted", "INT4"],
    ]),
    relations: [
      new Relation(
        "electric_cyl_images",
        "",
        "",
        "electric_cyl_images",
        "Electric_cyl_imagesToElectric_cyl_scans",
        "many"
      ),
      new Relation(
        "electric_cyl_experiments",
        "cyl_experiment_id",
        "id",
        "electric_cyl_experiments",
        "Electric_cyl_experimentsToElectric_cyl_scans",
        "one"
      ),
      new Relation(
        "electric_phenotypers",
        "phenotyper_id",
        "id",
        "electric_phenotypers",
        "Electric_cyl_scansToElectric_phenotypers",
        "one"
      ),
    ],
    modelSchema: (Electric_cyl_scansCreateInputSchema as any)
      .partial()
      .or((Electric_cyl_scansUncheckedCreateInputSchema as any).partial()),
    createSchema: Electric_cyl_scansCreateArgsSchema,
    createManySchema: Electric_cyl_scansCreateManyArgsSchema,
    findUniqueSchema: Electric_cyl_scansFindUniqueArgsSchema,
    findSchema: Electric_cyl_scansFindFirstArgsSchema,
    updateSchema: Electric_cyl_scansUpdateArgsSchema,
    updateManySchema: Electric_cyl_scansUpdateManyArgsSchema,
    upsertSchema: Electric_cyl_scansUpsertArgsSchema,
    deleteSchema: Electric_cyl_scansDeleteArgsSchema,
    deleteManySchema: Electric_cyl_scansDeleteManyArgsSchema,
  } as TableSchema<
    z.infer<typeof Electric_cyl_scansUncheckedCreateInputSchema>,
    Prisma.Electric_cyl_scansCreateArgs["data"],
    Prisma.Electric_cyl_scansUpdateArgs["data"],
    Prisma.Electric_cyl_scansFindFirstArgs["select"],
    Prisma.Electric_cyl_scansFindFirstArgs["where"],
    Prisma.Electric_cyl_scansFindUniqueArgs["where"],
    Omit<Prisma.Electric_cyl_scansInclude, "_count">,
    Prisma.Electric_cyl_scansFindFirstArgs["orderBy"],
    Prisma.Electric_cyl_scansScalarFieldEnum,
    Electric_cyl_scansGetPayload
  >,
  electric_phenotypers: {
    fields: new Map([
      ["id", "UUID"],
      ["name", "TEXT"],
      ["email", "TEXT"],
    ]),
    relations: [
      new Relation(
        "electric_cyl_scans",
        "",
        "",
        "electric_cyl_scans",
        "Electric_cyl_scansToElectric_phenotypers",
        "many"
      ),
    ],
    modelSchema: (Electric_phenotypersCreateInputSchema as any)
      .partial()
      .or((Electric_phenotypersUncheckedCreateInputSchema as any).partial()),
    createSchema: Electric_phenotypersCreateArgsSchema,
    createManySchema: Electric_phenotypersCreateManyArgsSchema,
    findUniqueSchema: Electric_phenotypersFindUniqueArgsSchema,
    findSchema: Electric_phenotypersFindFirstArgsSchema,
    updateSchema: Electric_phenotypersUpdateArgsSchema,
    updateManySchema: Electric_phenotypersUpdateManyArgsSchema,
    upsertSchema: Electric_phenotypersUpsertArgsSchema,
    deleteSchema: Electric_phenotypersDeleteArgsSchema,
    deleteManySchema: Electric_phenotypersDeleteManyArgsSchema,
  } as TableSchema<
    z.infer<typeof Electric_phenotypersUncheckedCreateInputSchema>,
    Prisma.Electric_phenotypersCreateArgs["data"],
    Prisma.Electric_phenotypersUpdateArgs["data"],
    Prisma.Electric_phenotypersFindFirstArgs["select"],
    Prisma.Electric_phenotypersFindFirstArgs["where"],
    Prisma.Electric_phenotypersFindUniqueArgs["where"],
    Omit<Prisma.Electric_phenotypersInclude, "_count">,
    Prisma.Electric_phenotypersFindFirstArgs["orderBy"],
    Prisma.Electric_phenotypersScalarFieldEnum,
    Electric_phenotypersGetPayload
  >,
};

export const schema = new DbSchema(tableSchemas, migrations);
export type Electric = ElectricClient<typeof schema>;
