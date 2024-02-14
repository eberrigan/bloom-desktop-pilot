import { z } from 'zod';
import type { Prisma } from './prismaClient';
import { type TableSchema, DbSchema, Relation, ElectricClient, type HKT } from 'electric-sql/client/model';
import migrations from './migrations';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const ImagesScalarFieldEnumSchema = z.enum(['id','scanid','framenumber','path','url','status']);

export const PhenotypersScalarFieldEnumSchema = z.enum(['id','name','email']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const ScansScalarFieldEnumSchema = z.enum(['id','phenotyperid','plantqrcode','path','capturedate','numframes','exposuretime','gain','brightness','contrast','gamma','secondsperrotation']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// IMAGES SCHEMA
/////////////////////////////////////////

export const ImagesSchema = z.object({
  id: z.string().uuid(),
  scanid: z.string().uuid().nullable(),
  framenumber: z.number().int().gte(-2147483648).lte(2147483647).nullable(),
  path: z.string().nullable(),
  url: z.string().nullable(),
  status: z.string().nullable(),
})

export type Images = z.infer<typeof ImagesSchema>

/////////////////////////////////////////
// PHENOTYPERS SCHEMA
/////////////////////////////////////////

export const PhenotypersSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nullable(),
  email: z.string().nullable(),
})

export type Phenotypers = z.infer<typeof PhenotypersSchema>

/////////////////////////////////////////
// SCANS SCHEMA
/////////////////////////////////////////

export const ScansSchema = z.object({
  id: z.string().uuid(),
  phenotyperid: z.string().uuid().nullable(),
  plantqrcode: z.string().nullable(),
  path: z.string().nullable(),
  capturedate: z.coerce.date().nullable(),
  numframes: z.number().int().gte(-2147483648).lte(2147483647).nullable(),
  exposuretime: z.number().int().gte(-2147483648).lte(2147483647).nullable(),
  gain: z.number().or(z.nan()).nullable(),
  brightness: z.number().or(z.nan()).nullable(),
  contrast: z.number().or(z.nan()).nullable(),
  gamma: z.number().or(z.nan()).nullable(),
  secondsperrotation: z.number().or(z.nan()).nullable(),
})

export type Scans = z.infer<typeof ScansSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// IMAGES
//------------------------------------------------------

export const ImagesIncludeSchema: z.ZodType<Prisma.ImagesInclude> = z.object({
  scans: z.union([z.boolean(),z.lazy(() => ScansArgsSchema)]).optional(),
}).strict()

export const ImagesArgsSchema: z.ZodType<Prisma.ImagesArgs> = z.object({
  select: z.lazy(() => ImagesSelectSchema).optional(),
  include: z.lazy(() => ImagesIncludeSchema).optional(),
}).strict();

export const ImagesSelectSchema: z.ZodType<Prisma.ImagesSelect> = z.object({
  id: z.boolean().optional(),
  scanid: z.boolean().optional(),
  framenumber: z.boolean().optional(),
  path: z.boolean().optional(),
  url: z.boolean().optional(),
  status: z.boolean().optional(),
  scans: z.union([z.boolean(),z.lazy(() => ScansArgsSchema)]).optional(),
}).strict()

// PHENOTYPERS
//------------------------------------------------------

export const PhenotypersIncludeSchema: z.ZodType<Prisma.PhenotypersInclude> = z.object({
  scans: z.union([z.boolean(),z.lazy(() => ScansFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PhenotypersCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PhenotypersArgsSchema: z.ZodType<Prisma.PhenotypersArgs> = z.object({
  select: z.lazy(() => PhenotypersSelectSchema).optional(),
  include: z.lazy(() => PhenotypersIncludeSchema).optional(),
}).strict();

export const PhenotypersCountOutputTypeArgsSchema: z.ZodType<Prisma.PhenotypersCountOutputTypeArgs> = z.object({
  select: z.lazy(() => PhenotypersCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PhenotypersCountOutputTypeSelectSchema: z.ZodType<Prisma.PhenotypersCountOutputTypeSelect> = z.object({
  scans: z.boolean().optional(),
}).strict();

export const PhenotypersSelectSchema: z.ZodType<Prisma.PhenotypersSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  scans: z.union([z.boolean(),z.lazy(() => ScansFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PhenotypersCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SCANS
//------------------------------------------------------

export const ScansIncludeSchema: z.ZodType<Prisma.ScansInclude> = z.object({
  images: z.union([z.boolean(),z.lazy(() => ImagesFindManyArgsSchema)]).optional(),
  phenotypers: z.union([z.boolean(),z.lazy(() => PhenotypersArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ScansCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ScansArgsSchema: z.ZodType<Prisma.ScansArgs> = z.object({
  select: z.lazy(() => ScansSelectSchema).optional(),
  include: z.lazy(() => ScansIncludeSchema).optional(),
}).strict();

export const ScansCountOutputTypeArgsSchema: z.ZodType<Prisma.ScansCountOutputTypeArgs> = z.object({
  select: z.lazy(() => ScansCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ScansCountOutputTypeSelectSchema: z.ZodType<Prisma.ScansCountOutputTypeSelect> = z.object({
  images: z.boolean().optional(),
}).strict();

export const ScansSelectSchema: z.ZodType<Prisma.ScansSelect> = z.object({
  id: z.boolean().optional(),
  phenotyperid: z.boolean().optional(),
  plantqrcode: z.boolean().optional(),
  path: z.boolean().optional(),
  capturedate: z.boolean().optional(),
  numframes: z.boolean().optional(),
  exposuretime: z.boolean().optional(),
  gain: z.boolean().optional(),
  brightness: z.boolean().optional(),
  contrast: z.boolean().optional(),
  gamma: z.boolean().optional(),
  secondsperrotation: z.boolean().optional(),
  images: z.union([z.boolean(),z.lazy(() => ImagesFindManyArgsSchema)]).optional(),
  phenotypers: z.union([z.boolean(),z.lazy(() => PhenotypersArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ScansCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ImagesWhereInputSchema: z.ZodType<Prisma.ImagesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ImagesWhereInputSchema),z.lazy(() => ImagesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImagesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImagesWhereInputSchema),z.lazy(() => ImagesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  scanid: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  framenumber: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  path: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scans: z.union([ z.lazy(() => ScansRelationFilterSchema),z.lazy(() => ScansWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ImagesOrderByWithRelationInputSchema: z.ZodType<Prisma.ImagesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  scanid: z.lazy(() => SortOrderSchema).optional(),
  framenumber: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  scans: z.lazy(() => ScansOrderByWithRelationInputSchema).optional()
}).strict();

export const ImagesWhereUniqueInputSchema: z.ZodType<Prisma.ImagesWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const ImagesOrderByWithAggregationInputSchema: z.ZodType<Prisma.ImagesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  scanid: z.lazy(() => SortOrderSchema).optional(),
  framenumber: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ImagesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ImagesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ImagesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ImagesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ImagesSumOrderByAggregateInputSchema).optional()
}).strict();

export const ImagesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ImagesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ImagesScalarWhereWithAggregatesInputSchema),z.lazy(() => ImagesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImagesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImagesScalarWhereWithAggregatesInputSchema),z.lazy(() => ImagesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  scanid: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  framenumber: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  path: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const PhenotypersWhereInputSchema: z.ZodType<Prisma.PhenotypersWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PhenotypersWhereInputSchema),z.lazy(() => PhenotypersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PhenotypersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PhenotypersWhereInputSchema),z.lazy(() => PhenotypersWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scans: z.lazy(() => ScansListRelationFilterSchema).optional()
}).strict();

export const PhenotypersOrderByWithRelationInputSchema: z.ZodType<Prisma.PhenotypersOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  scans: z.lazy(() => ScansOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PhenotypersWhereUniqueInputSchema: z.ZodType<Prisma.PhenotypersWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const PhenotypersOrderByWithAggregationInputSchema: z.ZodType<Prisma.PhenotypersOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PhenotypersCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PhenotypersMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PhenotypersMinOrderByAggregateInputSchema).optional()
}).strict();

export const PhenotypersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PhenotypersScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PhenotypersScalarWhereWithAggregatesInputSchema),z.lazy(() => PhenotypersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PhenotypersScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PhenotypersScalarWhereWithAggregatesInputSchema),z.lazy(() => PhenotypersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ScansWhereInputSchema: z.ZodType<Prisma.ScansWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ScansWhereInputSchema),z.lazy(() => ScansWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScansWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScansWhereInputSchema),z.lazy(() => ScansWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  phenotyperid: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  plantqrcode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  path: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  capturedate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  numframes: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  exposuretime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  gain: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  brightness: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  contrast: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  gamma: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  secondsperrotation: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  images: z.lazy(() => ImagesListRelationFilterSchema).optional(),
  phenotypers: z.union([ z.lazy(() => PhenotypersRelationFilterSchema),z.lazy(() => PhenotypersWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ScansOrderByWithRelationInputSchema: z.ZodType<Prisma.ScansOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phenotyperid: z.lazy(() => SortOrderSchema).optional(),
  plantqrcode: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  capturedate: z.lazy(() => SortOrderSchema).optional(),
  numframes: z.lazy(() => SortOrderSchema).optional(),
  exposuretime: z.lazy(() => SortOrderSchema).optional(),
  gain: z.lazy(() => SortOrderSchema).optional(),
  brightness: z.lazy(() => SortOrderSchema).optional(),
  contrast: z.lazy(() => SortOrderSchema).optional(),
  gamma: z.lazy(() => SortOrderSchema).optional(),
  secondsperrotation: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => ImagesOrderByRelationAggregateInputSchema).optional(),
  phenotypers: z.lazy(() => PhenotypersOrderByWithRelationInputSchema).optional()
}).strict();

export const ScansWhereUniqueInputSchema: z.ZodType<Prisma.ScansWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const ScansOrderByWithAggregationInputSchema: z.ZodType<Prisma.ScansOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phenotyperid: z.lazy(() => SortOrderSchema).optional(),
  plantqrcode: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  capturedate: z.lazy(() => SortOrderSchema).optional(),
  numframes: z.lazy(() => SortOrderSchema).optional(),
  exposuretime: z.lazy(() => SortOrderSchema).optional(),
  gain: z.lazy(() => SortOrderSchema).optional(),
  brightness: z.lazy(() => SortOrderSchema).optional(),
  contrast: z.lazy(() => SortOrderSchema).optional(),
  gamma: z.lazy(() => SortOrderSchema).optional(),
  secondsperrotation: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ScansCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ScansAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ScansMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ScansMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ScansSumOrderByAggregateInputSchema).optional()
}).strict();

export const ScansScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ScansScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ScansScalarWhereWithAggregatesInputSchema),z.lazy(() => ScansScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScansScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScansScalarWhereWithAggregatesInputSchema),z.lazy(() => ScansScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  phenotyperid: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  plantqrcode: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  path: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  capturedate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  numframes: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  exposuretime: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  gain: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  brightness: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  contrast: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  gamma: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  secondsperrotation: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const ImagesCreateInputSchema: z.ZodType<Prisma.ImagesCreateInput> = z.object({
  id: z.string().uuid(),
  framenumber: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  path: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  scans: z.lazy(() => ScansCreateNestedOneWithoutImagesInputSchema).optional()
}).strict();

export const ImagesUncheckedCreateInputSchema: z.ZodType<Prisma.ImagesUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  scanid: z.string().uuid().optional().nullable(),
  framenumber: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  path: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  status: z.string().optional().nullable()
}).strict();

export const ImagesUpdateInputSchema: z.ZodType<Prisma.ImagesUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  framenumber: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  path: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scans: z.lazy(() => ScansUpdateOneWithoutImagesNestedInputSchema).optional()
}).strict();

export const ImagesUncheckedUpdateInputSchema: z.ZodType<Prisma.ImagesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scanid: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  framenumber: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  path: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ImagesCreateManyInputSchema: z.ZodType<Prisma.ImagesCreateManyInput> = z.object({
  id: z.string().uuid(),
  scanid: z.string().uuid().optional().nullable(),
  framenumber: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  path: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  status: z.string().optional().nullable()
}).strict();

export const ImagesUpdateManyMutationInputSchema: z.ZodType<Prisma.ImagesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  framenumber: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  path: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ImagesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ImagesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scanid: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  framenumber: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  path: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PhenotypersCreateInputSchema: z.ZodType<Prisma.PhenotypersCreateInput> = z.object({
  id: z.string().uuid(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  scans: z.lazy(() => ScansCreateNestedManyWithoutPhenotypersInputSchema).optional()
}).strict();

export const PhenotypersUncheckedCreateInputSchema: z.ZodType<Prisma.PhenotypersUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  scans: z.lazy(() => ScansUncheckedCreateNestedManyWithoutPhenotypersInputSchema).optional()
}).strict();

export const PhenotypersUpdateInputSchema: z.ZodType<Prisma.PhenotypersUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scans: z.lazy(() => ScansUpdateManyWithoutPhenotypersNestedInputSchema).optional()
}).strict();

export const PhenotypersUncheckedUpdateInputSchema: z.ZodType<Prisma.PhenotypersUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scans: z.lazy(() => ScansUncheckedUpdateManyWithoutPhenotypersNestedInputSchema).optional()
}).strict();

export const PhenotypersCreateManyInputSchema: z.ZodType<Prisma.PhenotypersCreateManyInput> = z.object({
  id: z.string().uuid(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable()
}).strict();

export const PhenotypersUpdateManyMutationInputSchema: z.ZodType<Prisma.PhenotypersUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PhenotypersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PhenotypersUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ScansCreateInputSchema: z.ZodType<Prisma.ScansCreateInput> = z.object({
  id: z.string().uuid(),
  plantqrcode: z.string().optional().nullable(),
  path: z.string().optional().nullable(),
  capturedate: z.coerce.date().optional().nullable(),
  numframes: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  exposuretime: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  gain: z.number().or(z.nan()).optional().nullable(),
  brightness: z.number().or(z.nan()).optional().nullable(),
  contrast: z.number().or(z.nan()).optional().nullable(),
  gamma: z.number().or(z.nan()).optional().nullable(),
  secondsperrotation: z.number().or(z.nan()).optional().nullable(),
  images: z.lazy(() => ImagesCreateNestedManyWithoutScansInputSchema).optional(),
  phenotypers: z.lazy(() => PhenotypersCreateNestedOneWithoutScansInputSchema).optional()
}).strict();

export const ScansUncheckedCreateInputSchema: z.ZodType<Prisma.ScansUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  phenotyperid: z.string().uuid().optional().nullable(),
  plantqrcode: z.string().optional().nullable(),
  path: z.string().optional().nullable(),
  capturedate: z.coerce.date().optional().nullable(),
  numframes: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  exposuretime: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  gain: z.number().or(z.nan()).optional().nullable(),
  brightness: z.number().or(z.nan()).optional().nullable(),
  contrast: z.number().or(z.nan()).optional().nullable(),
  gamma: z.number().or(z.nan()).optional().nullable(),
  secondsperrotation: z.number().or(z.nan()).optional().nullable(),
  images: z.lazy(() => ImagesUncheckedCreateNestedManyWithoutScansInputSchema).optional()
}).strict();

export const ScansUpdateInputSchema: z.ZodType<Prisma.ScansUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  plantqrcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  path: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capturedate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numframes: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  exposuretime: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gain: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brightness: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contrast: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gamma: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondsperrotation: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.lazy(() => ImagesUpdateManyWithoutScansNestedInputSchema).optional(),
  phenotypers: z.lazy(() => PhenotypersUpdateOneWithoutScansNestedInputSchema).optional()
}).strict();

export const ScansUncheckedUpdateInputSchema: z.ZodType<Prisma.ScansUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phenotyperid: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  plantqrcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  path: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capturedate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numframes: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  exposuretime: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gain: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brightness: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contrast: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gamma: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondsperrotation: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.lazy(() => ImagesUncheckedUpdateManyWithoutScansNestedInputSchema).optional()
}).strict();

export const ScansCreateManyInputSchema: z.ZodType<Prisma.ScansCreateManyInput> = z.object({
  id: z.string().uuid(),
  phenotyperid: z.string().uuid().optional().nullable(),
  plantqrcode: z.string().optional().nullable(),
  path: z.string().optional().nullable(),
  capturedate: z.coerce.date().optional().nullable(),
  numframes: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  exposuretime: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  gain: z.number().or(z.nan()).optional().nullable(),
  brightness: z.number().or(z.nan()).optional().nullable(),
  contrast: z.number().or(z.nan()).optional().nullable(),
  gamma: z.number().or(z.nan()).optional().nullable(),
  secondsperrotation: z.number().or(z.nan()).optional().nullable()
}).strict();

export const ScansUpdateManyMutationInputSchema: z.ZodType<Prisma.ScansUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  plantqrcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  path: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capturedate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numframes: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  exposuretime: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gain: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brightness: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contrast: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gamma: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondsperrotation: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ScansUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ScansUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phenotyperid: z.union([ z.string().uuid(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  plantqrcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  path: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capturedate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numframes: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  exposuretime: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gain: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brightness: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contrast: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gamma: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondsperrotation: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const UuidNullableFilterSchema: z.ZodType<Prisma.UuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ScansRelationFilterSchema: z.ZodType<Prisma.ScansRelationFilter> = z.object({
  is: z.lazy(() => ScansWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ScansWhereInputSchema).optional().nullable()
}).strict();

export const ImagesCountOrderByAggregateInputSchema: z.ZodType<Prisma.ImagesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  scanid: z.lazy(() => SortOrderSchema).optional(),
  framenumber: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImagesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ImagesAvgOrderByAggregateInput> = z.object({
  framenumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImagesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ImagesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  scanid: z.lazy(() => SortOrderSchema).optional(),
  framenumber: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImagesMinOrderByAggregateInputSchema: z.ZodType<Prisma.ImagesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  scanid: z.lazy(() => SortOrderSchema).optional(),
  framenumber: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImagesSumOrderByAggregateInputSchema: z.ZodType<Prisma.ImagesSumOrderByAggregateInput> = z.object({
  framenumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const UuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.UuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const ScansListRelationFilterSchema: z.ZodType<Prisma.ScansListRelationFilter> = z.object({
  every: z.lazy(() => ScansWhereInputSchema).optional(),
  some: z.lazy(() => ScansWhereInputSchema).optional(),
  none: z.lazy(() => ScansWhereInputSchema).optional()
}).strict();

export const ScansOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ScansOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PhenotypersCountOrderByAggregateInputSchema: z.ZodType<Prisma.PhenotypersCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PhenotypersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PhenotypersMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PhenotypersMinOrderByAggregateInputSchema: z.ZodType<Prisma.PhenotypersMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ImagesListRelationFilterSchema: z.ZodType<Prisma.ImagesListRelationFilter> = z.object({
  every: z.lazy(() => ImagesWhereInputSchema).optional(),
  some: z.lazy(() => ImagesWhereInputSchema).optional(),
  none: z.lazy(() => ImagesWhereInputSchema).optional()
}).strict();

export const PhenotypersRelationFilterSchema: z.ZodType<Prisma.PhenotypersRelationFilter> = z.object({
  is: z.lazy(() => PhenotypersWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PhenotypersWhereInputSchema).optional().nullable()
}).strict();

export const ImagesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ImagesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScansCountOrderByAggregateInputSchema: z.ZodType<Prisma.ScansCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phenotyperid: z.lazy(() => SortOrderSchema).optional(),
  plantqrcode: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  capturedate: z.lazy(() => SortOrderSchema).optional(),
  numframes: z.lazy(() => SortOrderSchema).optional(),
  exposuretime: z.lazy(() => SortOrderSchema).optional(),
  gain: z.lazy(() => SortOrderSchema).optional(),
  brightness: z.lazy(() => SortOrderSchema).optional(),
  contrast: z.lazy(() => SortOrderSchema).optional(),
  gamma: z.lazy(() => SortOrderSchema).optional(),
  secondsperrotation: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScansAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ScansAvgOrderByAggregateInput> = z.object({
  numframes: z.lazy(() => SortOrderSchema).optional(),
  exposuretime: z.lazy(() => SortOrderSchema).optional(),
  gain: z.lazy(() => SortOrderSchema).optional(),
  brightness: z.lazy(() => SortOrderSchema).optional(),
  contrast: z.lazy(() => SortOrderSchema).optional(),
  gamma: z.lazy(() => SortOrderSchema).optional(),
  secondsperrotation: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScansMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ScansMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phenotyperid: z.lazy(() => SortOrderSchema).optional(),
  plantqrcode: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  capturedate: z.lazy(() => SortOrderSchema).optional(),
  numframes: z.lazy(() => SortOrderSchema).optional(),
  exposuretime: z.lazy(() => SortOrderSchema).optional(),
  gain: z.lazy(() => SortOrderSchema).optional(),
  brightness: z.lazy(() => SortOrderSchema).optional(),
  contrast: z.lazy(() => SortOrderSchema).optional(),
  gamma: z.lazy(() => SortOrderSchema).optional(),
  secondsperrotation: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScansMinOrderByAggregateInputSchema: z.ZodType<Prisma.ScansMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phenotyperid: z.lazy(() => SortOrderSchema).optional(),
  plantqrcode: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  capturedate: z.lazy(() => SortOrderSchema).optional(),
  numframes: z.lazy(() => SortOrderSchema).optional(),
  exposuretime: z.lazy(() => SortOrderSchema).optional(),
  gain: z.lazy(() => SortOrderSchema).optional(),
  brightness: z.lazy(() => SortOrderSchema).optional(),
  contrast: z.lazy(() => SortOrderSchema).optional(),
  gamma: z.lazy(() => SortOrderSchema).optional(),
  secondsperrotation: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScansSumOrderByAggregateInputSchema: z.ZodType<Prisma.ScansSumOrderByAggregateInput> = z.object({
  numframes: z.lazy(() => SortOrderSchema).optional(),
  exposuretime: z.lazy(() => SortOrderSchema).optional(),
  gain: z.lazy(() => SortOrderSchema).optional(),
  brightness: z.lazy(() => SortOrderSchema).optional(),
  contrast: z.lazy(() => SortOrderSchema).optional(),
  gamma: z.lazy(() => SortOrderSchema).optional(),
  secondsperrotation: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const ScansCreateNestedOneWithoutImagesInputSchema: z.ZodType<Prisma.ScansCreateNestedOneWithoutImagesInput> = z.object({
  create: z.union([ z.lazy(() => ScansCreateWithoutImagesInputSchema),z.lazy(() => ScansUncheckedCreateWithoutImagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ScansCreateOrConnectWithoutImagesInputSchema).optional(),
  connect: z.lazy(() => ScansWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const ScansUpdateOneWithoutImagesNestedInputSchema: z.ZodType<Prisma.ScansUpdateOneWithoutImagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ScansCreateWithoutImagesInputSchema),z.lazy(() => ScansUncheckedCreateWithoutImagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ScansCreateOrConnectWithoutImagesInputSchema).optional(),
  upsert: z.lazy(() => ScansUpsertWithoutImagesInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ScansWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ScansUpdateWithoutImagesInputSchema),z.lazy(() => ScansUncheckedUpdateWithoutImagesInputSchema) ]).optional(),
}).strict();

export const ScansCreateNestedManyWithoutPhenotypersInputSchema: z.ZodType<Prisma.ScansCreateNestedManyWithoutPhenotypersInput> = z.object({
  create: z.union([ z.lazy(() => ScansCreateWithoutPhenotypersInputSchema),z.lazy(() => ScansCreateWithoutPhenotypersInputSchema).array(),z.lazy(() => ScansUncheckedCreateWithoutPhenotypersInputSchema),z.lazy(() => ScansUncheckedCreateWithoutPhenotypersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScansCreateOrConnectWithoutPhenotypersInputSchema),z.lazy(() => ScansCreateOrConnectWithoutPhenotypersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScansCreateManyPhenotypersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ScansWhereUniqueInputSchema),z.lazy(() => ScansWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ScansUncheckedCreateNestedManyWithoutPhenotypersInputSchema: z.ZodType<Prisma.ScansUncheckedCreateNestedManyWithoutPhenotypersInput> = z.object({
  create: z.union([ z.lazy(() => ScansCreateWithoutPhenotypersInputSchema),z.lazy(() => ScansCreateWithoutPhenotypersInputSchema).array(),z.lazy(() => ScansUncheckedCreateWithoutPhenotypersInputSchema),z.lazy(() => ScansUncheckedCreateWithoutPhenotypersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScansCreateOrConnectWithoutPhenotypersInputSchema),z.lazy(() => ScansCreateOrConnectWithoutPhenotypersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScansCreateManyPhenotypersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ScansWhereUniqueInputSchema),z.lazy(() => ScansWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ScansUpdateManyWithoutPhenotypersNestedInputSchema: z.ZodType<Prisma.ScansUpdateManyWithoutPhenotypersNestedInput> = z.object({
  create: z.union([ z.lazy(() => ScansCreateWithoutPhenotypersInputSchema),z.lazy(() => ScansCreateWithoutPhenotypersInputSchema).array(),z.lazy(() => ScansUncheckedCreateWithoutPhenotypersInputSchema),z.lazy(() => ScansUncheckedCreateWithoutPhenotypersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScansCreateOrConnectWithoutPhenotypersInputSchema),z.lazy(() => ScansCreateOrConnectWithoutPhenotypersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ScansUpsertWithWhereUniqueWithoutPhenotypersInputSchema),z.lazy(() => ScansUpsertWithWhereUniqueWithoutPhenotypersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScansCreateManyPhenotypersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ScansWhereUniqueInputSchema),z.lazy(() => ScansWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ScansWhereUniqueInputSchema),z.lazy(() => ScansWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ScansWhereUniqueInputSchema),z.lazy(() => ScansWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ScansWhereUniqueInputSchema),z.lazy(() => ScansWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ScansUpdateWithWhereUniqueWithoutPhenotypersInputSchema),z.lazy(() => ScansUpdateWithWhereUniqueWithoutPhenotypersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ScansUpdateManyWithWhereWithoutPhenotypersInputSchema),z.lazy(() => ScansUpdateManyWithWhereWithoutPhenotypersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ScansScalarWhereInputSchema),z.lazy(() => ScansScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ScansUncheckedUpdateManyWithoutPhenotypersNestedInputSchema: z.ZodType<Prisma.ScansUncheckedUpdateManyWithoutPhenotypersNestedInput> = z.object({
  create: z.union([ z.lazy(() => ScansCreateWithoutPhenotypersInputSchema),z.lazy(() => ScansCreateWithoutPhenotypersInputSchema).array(),z.lazy(() => ScansUncheckedCreateWithoutPhenotypersInputSchema),z.lazy(() => ScansUncheckedCreateWithoutPhenotypersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ScansCreateOrConnectWithoutPhenotypersInputSchema),z.lazy(() => ScansCreateOrConnectWithoutPhenotypersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ScansUpsertWithWhereUniqueWithoutPhenotypersInputSchema),z.lazy(() => ScansUpsertWithWhereUniqueWithoutPhenotypersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ScansCreateManyPhenotypersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ScansWhereUniqueInputSchema),z.lazy(() => ScansWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ScansWhereUniqueInputSchema),z.lazy(() => ScansWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ScansWhereUniqueInputSchema),z.lazy(() => ScansWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ScansWhereUniqueInputSchema),z.lazy(() => ScansWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ScansUpdateWithWhereUniqueWithoutPhenotypersInputSchema),z.lazy(() => ScansUpdateWithWhereUniqueWithoutPhenotypersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ScansUpdateManyWithWhereWithoutPhenotypersInputSchema),z.lazy(() => ScansUpdateManyWithWhereWithoutPhenotypersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ScansScalarWhereInputSchema),z.lazy(() => ScansScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ImagesCreateNestedManyWithoutScansInputSchema: z.ZodType<Prisma.ImagesCreateNestedManyWithoutScansInput> = z.object({
  create: z.union([ z.lazy(() => ImagesCreateWithoutScansInputSchema),z.lazy(() => ImagesCreateWithoutScansInputSchema).array(),z.lazy(() => ImagesUncheckedCreateWithoutScansInputSchema),z.lazy(() => ImagesUncheckedCreateWithoutScansInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImagesCreateOrConnectWithoutScansInputSchema),z.lazy(() => ImagesCreateOrConnectWithoutScansInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImagesCreateManyScansInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImagesWhereUniqueInputSchema),z.lazy(() => ImagesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PhenotypersCreateNestedOneWithoutScansInputSchema: z.ZodType<Prisma.PhenotypersCreateNestedOneWithoutScansInput> = z.object({
  create: z.union([ z.lazy(() => PhenotypersCreateWithoutScansInputSchema),z.lazy(() => PhenotypersUncheckedCreateWithoutScansInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PhenotypersCreateOrConnectWithoutScansInputSchema).optional(),
  connect: z.lazy(() => PhenotypersWhereUniqueInputSchema).optional()
}).strict();

export const ImagesUncheckedCreateNestedManyWithoutScansInputSchema: z.ZodType<Prisma.ImagesUncheckedCreateNestedManyWithoutScansInput> = z.object({
  create: z.union([ z.lazy(() => ImagesCreateWithoutScansInputSchema),z.lazy(() => ImagesCreateWithoutScansInputSchema).array(),z.lazy(() => ImagesUncheckedCreateWithoutScansInputSchema),z.lazy(() => ImagesUncheckedCreateWithoutScansInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImagesCreateOrConnectWithoutScansInputSchema),z.lazy(() => ImagesCreateOrConnectWithoutScansInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImagesCreateManyScansInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImagesWhereUniqueInputSchema),z.lazy(() => ImagesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ImagesUpdateManyWithoutScansNestedInputSchema: z.ZodType<Prisma.ImagesUpdateManyWithoutScansNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImagesCreateWithoutScansInputSchema),z.lazy(() => ImagesCreateWithoutScansInputSchema).array(),z.lazy(() => ImagesUncheckedCreateWithoutScansInputSchema),z.lazy(() => ImagesUncheckedCreateWithoutScansInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImagesCreateOrConnectWithoutScansInputSchema),z.lazy(() => ImagesCreateOrConnectWithoutScansInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImagesUpsertWithWhereUniqueWithoutScansInputSchema),z.lazy(() => ImagesUpsertWithWhereUniqueWithoutScansInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImagesCreateManyScansInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImagesWhereUniqueInputSchema),z.lazy(() => ImagesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImagesWhereUniqueInputSchema),z.lazy(() => ImagesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImagesWhereUniqueInputSchema),z.lazy(() => ImagesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImagesWhereUniqueInputSchema),z.lazy(() => ImagesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImagesUpdateWithWhereUniqueWithoutScansInputSchema),z.lazy(() => ImagesUpdateWithWhereUniqueWithoutScansInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImagesUpdateManyWithWhereWithoutScansInputSchema),z.lazy(() => ImagesUpdateManyWithWhereWithoutScansInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImagesScalarWhereInputSchema),z.lazy(() => ImagesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PhenotypersUpdateOneWithoutScansNestedInputSchema: z.ZodType<Prisma.PhenotypersUpdateOneWithoutScansNestedInput> = z.object({
  create: z.union([ z.lazy(() => PhenotypersCreateWithoutScansInputSchema),z.lazy(() => PhenotypersUncheckedCreateWithoutScansInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PhenotypersCreateOrConnectWithoutScansInputSchema).optional(),
  upsert: z.lazy(() => PhenotypersUpsertWithoutScansInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => PhenotypersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PhenotypersUpdateWithoutScansInputSchema),z.lazy(() => PhenotypersUncheckedUpdateWithoutScansInputSchema) ]).optional(),
}).strict();

export const ImagesUncheckedUpdateManyWithoutScansNestedInputSchema: z.ZodType<Prisma.ImagesUncheckedUpdateManyWithoutScansNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImagesCreateWithoutScansInputSchema),z.lazy(() => ImagesCreateWithoutScansInputSchema).array(),z.lazy(() => ImagesUncheckedCreateWithoutScansInputSchema),z.lazy(() => ImagesUncheckedCreateWithoutScansInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImagesCreateOrConnectWithoutScansInputSchema),z.lazy(() => ImagesCreateOrConnectWithoutScansInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImagesUpsertWithWhereUniqueWithoutScansInputSchema),z.lazy(() => ImagesUpsertWithWhereUniqueWithoutScansInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImagesCreateManyScansInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImagesWhereUniqueInputSchema),z.lazy(() => ImagesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImagesWhereUniqueInputSchema),z.lazy(() => ImagesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImagesWhereUniqueInputSchema),z.lazy(() => ImagesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImagesWhereUniqueInputSchema),z.lazy(() => ImagesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImagesUpdateWithWhereUniqueWithoutScansInputSchema),z.lazy(() => ImagesUpdateWithWhereUniqueWithoutScansInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImagesUpdateManyWithWhereWithoutScansInputSchema),z.lazy(() => ImagesUpdateManyWithWhereWithoutScansInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImagesScalarWhereInputSchema),z.lazy(() => ImagesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const NestedUuidNullableFilterSchema: z.ZodType<Prisma.NestedUuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedUuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const ScansCreateWithoutImagesInputSchema: z.ZodType<Prisma.ScansCreateWithoutImagesInput> = z.object({
  id: z.string(),
  plantqrcode: z.string().optional().nullable(),
  path: z.string().optional().nullable(),
  capturedate: z.coerce.date().optional().nullable(),
  numframes: z.number().optional().nullable(),
  exposuretime: z.number().optional().nullable(),
  gain: z.number().optional().nullable(),
  brightness: z.number().optional().nullable(),
  contrast: z.number().optional().nullable(),
  gamma: z.number().optional().nullable(),
  secondsperrotation: z.number().optional().nullable(),
  phenotypers: z.lazy(() => PhenotypersCreateNestedOneWithoutScansInputSchema).optional()
}).strict();

export const ScansUncheckedCreateWithoutImagesInputSchema: z.ZodType<Prisma.ScansUncheckedCreateWithoutImagesInput> = z.object({
  id: z.string(),
  phenotyperid: z.string().optional().nullable(),
  plantqrcode: z.string().optional().nullable(),
  path: z.string().optional().nullable(),
  capturedate: z.coerce.date().optional().nullable(),
  numframes: z.number().optional().nullable(),
  exposuretime: z.number().optional().nullable(),
  gain: z.number().optional().nullable(),
  brightness: z.number().optional().nullable(),
  contrast: z.number().optional().nullable(),
  gamma: z.number().optional().nullable(),
  secondsperrotation: z.number().optional().nullable()
}).strict();

export const ScansCreateOrConnectWithoutImagesInputSchema: z.ZodType<Prisma.ScansCreateOrConnectWithoutImagesInput> = z.object({
  where: z.lazy(() => ScansWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ScansCreateWithoutImagesInputSchema),z.lazy(() => ScansUncheckedCreateWithoutImagesInputSchema) ]),
}).strict();

export const ScansUpsertWithoutImagesInputSchema: z.ZodType<Prisma.ScansUpsertWithoutImagesInput> = z.object({
  update: z.union([ z.lazy(() => ScansUpdateWithoutImagesInputSchema),z.lazy(() => ScansUncheckedUpdateWithoutImagesInputSchema) ]),
  create: z.union([ z.lazy(() => ScansCreateWithoutImagesInputSchema),z.lazy(() => ScansUncheckedCreateWithoutImagesInputSchema) ]),
}).strict();

export const ScansUpdateWithoutImagesInputSchema: z.ZodType<Prisma.ScansUpdateWithoutImagesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  plantqrcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  path: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capturedate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numframes: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  exposuretime: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gain: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brightness: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contrast: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gamma: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondsperrotation: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phenotypers: z.lazy(() => PhenotypersUpdateOneWithoutScansNestedInputSchema).optional()
}).strict();

export const ScansUncheckedUpdateWithoutImagesInputSchema: z.ZodType<Prisma.ScansUncheckedUpdateWithoutImagesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phenotyperid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  plantqrcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  path: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capturedate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numframes: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  exposuretime: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gain: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brightness: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contrast: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gamma: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondsperrotation: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ScansCreateWithoutPhenotypersInputSchema: z.ZodType<Prisma.ScansCreateWithoutPhenotypersInput> = z.object({
  id: z.string(),
  plantqrcode: z.string().optional().nullable(),
  path: z.string().optional().nullable(),
  capturedate: z.coerce.date().optional().nullable(),
  numframes: z.number().optional().nullable(),
  exposuretime: z.number().optional().nullable(),
  gain: z.number().optional().nullable(),
  brightness: z.number().optional().nullable(),
  contrast: z.number().optional().nullable(),
  gamma: z.number().optional().nullable(),
  secondsperrotation: z.number().optional().nullable(),
  images: z.lazy(() => ImagesCreateNestedManyWithoutScansInputSchema).optional()
}).strict();

export const ScansUncheckedCreateWithoutPhenotypersInputSchema: z.ZodType<Prisma.ScansUncheckedCreateWithoutPhenotypersInput> = z.object({
  id: z.string(),
  plantqrcode: z.string().optional().nullable(),
  path: z.string().optional().nullable(),
  capturedate: z.coerce.date().optional().nullable(),
  numframes: z.number().optional().nullable(),
  exposuretime: z.number().optional().nullable(),
  gain: z.number().optional().nullable(),
  brightness: z.number().optional().nullable(),
  contrast: z.number().optional().nullable(),
  gamma: z.number().optional().nullable(),
  secondsperrotation: z.number().optional().nullable(),
  images: z.lazy(() => ImagesUncheckedCreateNestedManyWithoutScansInputSchema).optional()
}).strict();

export const ScansCreateOrConnectWithoutPhenotypersInputSchema: z.ZodType<Prisma.ScansCreateOrConnectWithoutPhenotypersInput> = z.object({
  where: z.lazy(() => ScansWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ScansCreateWithoutPhenotypersInputSchema),z.lazy(() => ScansUncheckedCreateWithoutPhenotypersInputSchema) ]),
}).strict();

export const ScansCreateManyPhenotypersInputEnvelopeSchema: z.ZodType<Prisma.ScansCreateManyPhenotypersInputEnvelope> = z.object({
  data: z.lazy(() => ScansCreateManyPhenotypersInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ScansUpsertWithWhereUniqueWithoutPhenotypersInputSchema: z.ZodType<Prisma.ScansUpsertWithWhereUniqueWithoutPhenotypersInput> = z.object({
  where: z.lazy(() => ScansWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ScansUpdateWithoutPhenotypersInputSchema),z.lazy(() => ScansUncheckedUpdateWithoutPhenotypersInputSchema) ]),
  create: z.union([ z.lazy(() => ScansCreateWithoutPhenotypersInputSchema),z.lazy(() => ScansUncheckedCreateWithoutPhenotypersInputSchema) ]),
}).strict();

export const ScansUpdateWithWhereUniqueWithoutPhenotypersInputSchema: z.ZodType<Prisma.ScansUpdateWithWhereUniqueWithoutPhenotypersInput> = z.object({
  where: z.lazy(() => ScansWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ScansUpdateWithoutPhenotypersInputSchema),z.lazy(() => ScansUncheckedUpdateWithoutPhenotypersInputSchema) ]),
}).strict();

export const ScansUpdateManyWithWhereWithoutPhenotypersInputSchema: z.ZodType<Prisma.ScansUpdateManyWithWhereWithoutPhenotypersInput> = z.object({
  where: z.lazy(() => ScansScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ScansUpdateManyMutationInputSchema),z.lazy(() => ScansUncheckedUpdateManyWithoutScansInputSchema) ]),
}).strict();

export const ScansScalarWhereInputSchema: z.ZodType<Prisma.ScansScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ScansScalarWhereInputSchema),z.lazy(() => ScansScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScansScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScansScalarWhereInputSchema),z.lazy(() => ScansScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  phenotyperid: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  plantqrcode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  path: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  capturedate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  numframes: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  exposuretime: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  gain: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  brightness: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  contrast: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  gamma: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  secondsperrotation: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const ImagesCreateWithoutScansInputSchema: z.ZodType<Prisma.ImagesCreateWithoutScansInput> = z.object({
  id: z.string(),
  framenumber: z.number().optional().nullable(),
  path: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  status: z.string().optional().nullable()
}).strict();

export const ImagesUncheckedCreateWithoutScansInputSchema: z.ZodType<Prisma.ImagesUncheckedCreateWithoutScansInput> = z.object({
  id: z.string(),
  framenumber: z.number().optional().nullable(),
  path: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  status: z.string().optional().nullable()
}).strict();

export const ImagesCreateOrConnectWithoutScansInputSchema: z.ZodType<Prisma.ImagesCreateOrConnectWithoutScansInput> = z.object({
  where: z.lazy(() => ImagesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ImagesCreateWithoutScansInputSchema),z.lazy(() => ImagesUncheckedCreateWithoutScansInputSchema) ]),
}).strict();

export const ImagesCreateManyScansInputEnvelopeSchema: z.ZodType<Prisma.ImagesCreateManyScansInputEnvelope> = z.object({
  data: z.lazy(() => ImagesCreateManyScansInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PhenotypersCreateWithoutScansInputSchema: z.ZodType<Prisma.PhenotypersCreateWithoutScansInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable()
}).strict();

export const PhenotypersUncheckedCreateWithoutScansInputSchema: z.ZodType<Prisma.PhenotypersUncheckedCreateWithoutScansInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable()
}).strict();

export const PhenotypersCreateOrConnectWithoutScansInputSchema: z.ZodType<Prisma.PhenotypersCreateOrConnectWithoutScansInput> = z.object({
  where: z.lazy(() => PhenotypersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PhenotypersCreateWithoutScansInputSchema),z.lazy(() => PhenotypersUncheckedCreateWithoutScansInputSchema) ]),
}).strict();

export const ImagesUpsertWithWhereUniqueWithoutScansInputSchema: z.ZodType<Prisma.ImagesUpsertWithWhereUniqueWithoutScansInput> = z.object({
  where: z.lazy(() => ImagesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ImagesUpdateWithoutScansInputSchema),z.lazy(() => ImagesUncheckedUpdateWithoutScansInputSchema) ]),
  create: z.union([ z.lazy(() => ImagesCreateWithoutScansInputSchema),z.lazy(() => ImagesUncheckedCreateWithoutScansInputSchema) ]),
}).strict();

export const ImagesUpdateWithWhereUniqueWithoutScansInputSchema: z.ZodType<Prisma.ImagesUpdateWithWhereUniqueWithoutScansInput> = z.object({
  where: z.lazy(() => ImagesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ImagesUpdateWithoutScansInputSchema),z.lazy(() => ImagesUncheckedUpdateWithoutScansInputSchema) ]),
}).strict();

export const ImagesUpdateManyWithWhereWithoutScansInputSchema: z.ZodType<Prisma.ImagesUpdateManyWithWhereWithoutScansInput> = z.object({
  where: z.lazy(() => ImagesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ImagesUpdateManyMutationInputSchema),z.lazy(() => ImagesUncheckedUpdateManyWithoutImagesInputSchema) ]),
}).strict();

export const ImagesScalarWhereInputSchema: z.ZodType<Prisma.ImagesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ImagesScalarWhereInputSchema),z.lazy(() => ImagesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImagesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImagesScalarWhereInputSchema),z.lazy(() => ImagesScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  scanid: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  framenumber: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  path: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const PhenotypersUpsertWithoutScansInputSchema: z.ZodType<Prisma.PhenotypersUpsertWithoutScansInput> = z.object({
  update: z.union([ z.lazy(() => PhenotypersUpdateWithoutScansInputSchema),z.lazy(() => PhenotypersUncheckedUpdateWithoutScansInputSchema) ]),
  create: z.union([ z.lazy(() => PhenotypersCreateWithoutScansInputSchema),z.lazy(() => PhenotypersUncheckedCreateWithoutScansInputSchema) ]),
}).strict();

export const PhenotypersUpdateWithoutScansInputSchema: z.ZodType<Prisma.PhenotypersUpdateWithoutScansInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PhenotypersUncheckedUpdateWithoutScansInputSchema: z.ZodType<Prisma.PhenotypersUncheckedUpdateWithoutScansInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ScansCreateManyPhenotypersInputSchema: z.ZodType<Prisma.ScansCreateManyPhenotypersInput> = z.object({
  id: z.string().uuid(),
  plantqrcode: z.string().optional().nullable(),
  path: z.string().optional().nullable(),
  capturedate: z.coerce.date().optional().nullable(),
  numframes: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  exposuretime: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  gain: z.number().or(z.nan()).optional().nullable(),
  brightness: z.number().or(z.nan()).optional().nullable(),
  contrast: z.number().or(z.nan()).optional().nullable(),
  gamma: z.number().or(z.nan()).optional().nullable(),
  secondsperrotation: z.number().or(z.nan()).optional().nullable()
}).strict();

export const ScansUpdateWithoutPhenotypersInputSchema: z.ZodType<Prisma.ScansUpdateWithoutPhenotypersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  plantqrcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  path: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capturedate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numframes: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  exposuretime: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gain: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brightness: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contrast: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gamma: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondsperrotation: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.lazy(() => ImagesUpdateManyWithoutScansNestedInputSchema).optional()
}).strict();

export const ScansUncheckedUpdateWithoutPhenotypersInputSchema: z.ZodType<Prisma.ScansUncheckedUpdateWithoutPhenotypersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  plantqrcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  path: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capturedate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numframes: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  exposuretime: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gain: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brightness: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contrast: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gamma: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondsperrotation: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.lazy(() => ImagesUncheckedUpdateManyWithoutScansNestedInputSchema).optional()
}).strict();

export const ScansUncheckedUpdateManyWithoutScansInputSchema: z.ZodType<Prisma.ScansUncheckedUpdateManyWithoutScansInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  plantqrcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  path: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capturedate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numframes: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  exposuretime: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gain: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  brightness: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contrast: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gamma: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  secondsperrotation: z.union([ z.number().or(z.nan()),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ImagesCreateManyScansInputSchema: z.ZodType<Prisma.ImagesCreateManyScansInput> = z.object({
  id: z.string().uuid(),
  framenumber: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  path: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  status: z.string().optional().nullable()
}).strict();

export const ImagesUpdateWithoutScansInputSchema: z.ZodType<Prisma.ImagesUpdateWithoutScansInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  framenumber: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  path: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ImagesUncheckedUpdateWithoutScansInputSchema: z.ZodType<Prisma.ImagesUncheckedUpdateWithoutScansInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  framenumber: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  path: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ImagesUncheckedUpdateManyWithoutImagesInputSchema: z.ZodType<Prisma.ImagesUncheckedUpdateManyWithoutImagesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  framenumber: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  path: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ImagesFindFirstArgsSchema: z.ZodType<Prisma.ImagesFindFirstArgs> = z.object({
  select: ImagesSelectSchema.optional(),
  include: ImagesIncludeSchema.optional(),
  where: ImagesWhereInputSchema.optional(),
  orderBy: z.union([ ImagesOrderByWithRelationInputSchema.array(),ImagesOrderByWithRelationInputSchema ]).optional(),
  cursor: ImagesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ImagesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ImagesFindFirstArgs>

export const ImagesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ImagesFindFirstOrThrowArgs> = z.object({
  select: ImagesSelectSchema.optional(),
  include: ImagesIncludeSchema.optional(),
  where: ImagesWhereInputSchema.optional(),
  orderBy: z.union([ ImagesOrderByWithRelationInputSchema.array(),ImagesOrderByWithRelationInputSchema ]).optional(),
  cursor: ImagesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ImagesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ImagesFindFirstOrThrowArgs>

export const ImagesFindManyArgsSchema: z.ZodType<Prisma.ImagesFindManyArgs> = z.object({
  select: ImagesSelectSchema.optional(),
  include: ImagesIncludeSchema.optional(),
  where: ImagesWhereInputSchema.optional(),
  orderBy: z.union([ ImagesOrderByWithRelationInputSchema.array(),ImagesOrderByWithRelationInputSchema ]).optional(),
  cursor: ImagesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ImagesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ImagesFindManyArgs>

export const ImagesAggregateArgsSchema: z.ZodType<Prisma.ImagesAggregateArgs> = z.object({
  where: ImagesWhereInputSchema.optional(),
  orderBy: z.union([ ImagesOrderByWithRelationInputSchema.array(),ImagesOrderByWithRelationInputSchema ]).optional(),
  cursor: ImagesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ImagesAggregateArgs>

export const ImagesGroupByArgsSchema: z.ZodType<Prisma.ImagesGroupByArgs> = z.object({
  where: ImagesWhereInputSchema.optional(),
  orderBy: z.union([ ImagesOrderByWithAggregationInputSchema.array(),ImagesOrderByWithAggregationInputSchema ]).optional(),
  by: ImagesScalarFieldEnumSchema.array(),
  having: ImagesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ImagesGroupByArgs>

export const ImagesFindUniqueArgsSchema: z.ZodType<Prisma.ImagesFindUniqueArgs> = z.object({
  select: ImagesSelectSchema.optional(),
  include: ImagesIncludeSchema.optional(),
  where: ImagesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ImagesFindUniqueArgs>

export const ImagesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ImagesFindUniqueOrThrowArgs> = z.object({
  select: ImagesSelectSchema.optional(),
  include: ImagesIncludeSchema.optional(),
  where: ImagesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ImagesFindUniqueOrThrowArgs>

export const PhenotypersFindFirstArgsSchema: z.ZodType<Prisma.PhenotypersFindFirstArgs> = z.object({
  select: PhenotypersSelectSchema.optional(),
  include: PhenotypersIncludeSchema.optional(),
  where: PhenotypersWhereInputSchema.optional(),
  orderBy: z.union([ PhenotypersOrderByWithRelationInputSchema.array(),PhenotypersOrderByWithRelationInputSchema ]).optional(),
  cursor: PhenotypersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PhenotypersScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.PhenotypersFindFirstArgs>

export const PhenotypersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PhenotypersFindFirstOrThrowArgs> = z.object({
  select: PhenotypersSelectSchema.optional(),
  include: PhenotypersIncludeSchema.optional(),
  where: PhenotypersWhereInputSchema.optional(),
  orderBy: z.union([ PhenotypersOrderByWithRelationInputSchema.array(),PhenotypersOrderByWithRelationInputSchema ]).optional(),
  cursor: PhenotypersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PhenotypersScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.PhenotypersFindFirstOrThrowArgs>

export const PhenotypersFindManyArgsSchema: z.ZodType<Prisma.PhenotypersFindManyArgs> = z.object({
  select: PhenotypersSelectSchema.optional(),
  include: PhenotypersIncludeSchema.optional(),
  where: PhenotypersWhereInputSchema.optional(),
  orderBy: z.union([ PhenotypersOrderByWithRelationInputSchema.array(),PhenotypersOrderByWithRelationInputSchema ]).optional(),
  cursor: PhenotypersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PhenotypersScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.PhenotypersFindManyArgs>

export const PhenotypersAggregateArgsSchema: z.ZodType<Prisma.PhenotypersAggregateArgs> = z.object({
  where: PhenotypersWhereInputSchema.optional(),
  orderBy: z.union([ PhenotypersOrderByWithRelationInputSchema.array(),PhenotypersOrderByWithRelationInputSchema ]).optional(),
  cursor: PhenotypersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.PhenotypersAggregateArgs>

export const PhenotypersGroupByArgsSchema: z.ZodType<Prisma.PhenotypersGroupByArgs> = z.object({
  where: PhenotypersWhereInputSchema.optional(),
  orderBy: z.union([ PhenotypersOrderByWithAggregationInputSchema.array(),PhenotypersOrderByWithAggregationInputSchema ]).optional(),
  by: PhenotypersScalarFieldEnumSchema.array(),
  having: PhenotypersScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.PhenotypersGroupByArgs>

export const PhenotypersFindUniqueArgsSchema: z.ZodType<Prisma.PhenotypersFindUniqueArgs> = z.object({
  select: PhenotypersSelectSchema.optional(),
  include: PhenotypersIncludeSchema.optional(),
  where: PhenotypersWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.PhenotypersFindUniqueArgs>

export const PhenotypersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PhenotypersFindUniqueOrThrowArgs> = z.object({
  select: PhenotypersSelectSchema.optional(),
  include: PhenotypersIncludeSchema.optional(),
  where: PhenotypersWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.PhenotypersFindUniqueOrThrowArgs>

export const ScansFindFirstArgsSchema: z.ZodType<Prisma.ScansFindFirstArgs> = z.object({
  select: ScansSelectSchema.optional(),
  include: ScansIncludeSchema.optional(),
  where: ScansWhereInputSchema.optional(),
  orderBy: z.union([ ScansOrderByWithRelationInputSchema.array(),ScansOrderByWithRelationInputSchema ]).optional(),
  cursor: ScansWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ScansScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ScansFindFirstArgs>

export const ScansFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ScansFindFirstOrThrowArgs> = z.object({
  select: ScansSelectSchema.optional(),
  include: ScansIncludeSchema.optional(),
  where: ScansWhereInputSchema.optional(),
  orderBy: z.union([ ScansOrderByWithRelationInputSchema.array(),ScansOrderByWithRelationInputSchema ]).optional(),
  cursor: ScansWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ScansScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ScansFindFirstOrThrowArgs>

export const ScansFindManyArgsSchema: z.ZodType<Prisma.ScansFindManyArgs> = z.object({
  select: ScansSelectSchema.optional(),
  include: ScansIncludeSchema.optional(),
  where: ScansWhereInputSchema.optional(),
  orderBy: z.union([ ScansOrderByWithRelationInputSchema.array(),ScansOrderByWithRelationInputSchema ]).optional(),
  cursor: ScansWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ScansScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ScansFindManyArgs>

export const ScansAggregateArgsSchema: z.ZodType<Prisma.ScansAggregateArgs> = z.object({
  where: ScansWhereInputSchema.optional(),
  orderBy: z.union([ ScansOrderByWithRelationInputSchema.array(),ScansOrderByWithRelationInputSchema ]).optional(),
  cursor: ScansWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ScansAggregateArgs>

export const ScansGroupByArgsSchema: z.ZodType<Prisma.ScansGroupByArgs> = z.object({
  where: ScansWhereInputSchema.optional(),
  orderBy: z.union([ ScansOrderByWithAggregationInputSchema.array(),ScansOrderByWithAggregationInputSchema ]).optional(),
  by: ScansScalarFieldEnumSchema.array(),
  having: ScansScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ScansGroupByArgs>

export const ScansFindUniqueArgsSchema: z.ZodType<Prisma.ScansFindUniqueArgs> = z.object({
  select: ScansSelectSchema.optional(),
  include: ScansIncludeSchema.optional(),
  where: ScansWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ScansFindUniqueArgs>

export const ScansFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ScansFindUniqueOrThrowArgs> = z.object({
  select: ScansSelectSchema.optional(),
  include: ScansIncludeSchema.optional(),
  where: ScansWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ScansFindUniqueOrThrowArgs>

export const ImagesCreateArgsSchema: z.ZodType<Prisma.ImagesCreateArgs> = z.object({
  select: ImagesSelectSchema.optional(),
  include: ImagesIncludeSchema.optional(),
  data: z.union([ ImagesCreateInputSchema,ImagesUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.ImagesCreateArgs>

export const ImagesUpsertArgsSchema: z.ZodType<Prisma.ImagesUpsertArgs> = z.object({
  select: ImagesSelectSchema.optional(),
  include: ImagesIncludeSchema.optional(),
  where: ImagesWhereUniqueInputSchema,
  create: z.union([ ImagesCreateInputSchema,ImagesUncheckedCreateInputSchema ]),
  update: z.union([ ImagesUpdateInputSchema,ImagesUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.ImagesUpsertArgs>

export const ImagesCreateManyArgsSchema: z.ZodType<Prisma.ImagesCreateManyArgs> = z.object({
  data: ImagesCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ImagesCreateManyArgs>

export const ImagesDeleteArgsSchema: z.ZodType<Prisma.ImagesDeleteArgs> = z.object({
  select: ImagesSelectSchema.optional(),
  include: ImagesIncludeSchema.optional(),
  where: ImagesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ImagesDeleteArgs>

export const ImagesUpdateArgsSchema: z.ZodType<Prisma.ImagesUpdateArgs> = z.object({
  select: ImagesSelectSchema.optional(),
  include: ImagesIncludeSchema.optional(),
  data: z.union([ ImagesUpdateInputSchema,ImagesUncheckedUpdateInputSchema ]),
  where: ImagesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ImagesUpdateArgs>

export const ImagesUpdateManyArgsSchema: z.ZodType<Prisma.ImagesUpdateManyArgs> = z.object({
  data: z.union([ ImagesUpdateManyMutationInputSchema,ImagesUncheckedUpdateManyInputSchema ]),
  where: ImagesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ImagesUpdateManyArgs>

export const ImagesDeleteManyArgsSchema: z.ZodType<Prisma.ImagesDeleteManyArgs> = z.object({
  where: ImagesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ImagesDeleteManyArgs>

export const PhenotypersCreateArgsSchema: z.ZodType<Prisma.PhenotypersCreateArgs> = z.object({
  select: PhenotypersSelectSchema.optional(),
  include: PhenotypersIncludeSchema.optional(),
  data: z.union([ PhenotypersCreateInputSchema,PhenotypersUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.PhenotypersCreateArgs>

export const PhenotypersUpsertArgsSchema: z.ZodType<Prisma.PhenotypersUpsertArgs> = z.object({
  select: PhenotypersSelectSchema.optional(),
  include: PhenotypersIncludeSchema.optional(),
  where: PhenotypersWhereUniqueInputSchema,
  create: z.union([ PhenotypersCreateInputSchema,PhenotypersUncheckedCreateInputSchema ]),
  update: z.union([ PhenotypersUpdateInputSchema,PhenotypersUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.PhenotypersUpsertArgs>

export const PhenotypersCreateManyArgsSchema: z.ZodType<Prisma.PhenotypersCreateManyArgs> = z.object({
  data: PhenotypersCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.PhenotypersCreateManyArgs>

export const PhenotypersDeleteArgsSchema: z.ZodType<Prisma.PhenotypersDeleteArgs> = z.object({
  select: PhenotypersSelectSchema.optional(),
  include: PhenotypersIncludeSchema.optional(),
  where: PhenotypersWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.PhenotypersDeleteArgs>

export const PhenotypersUpdateArgsSchema: z.ZodType<Prisma.PhenotypersUpdateArgs> = z.object({
  select: PhenotypersSelectSchema.optional(),
  include: PhenotypersIncludeSchema.optional(),
  data: z.union([ PhenotypersUpdateInputSchema,PhenotypersUncheckedUpdateInputSchema ]),
  where: PhenotypersWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.PhenotypersUpdateArgs>

export const PhenotypersUpdateManyArgsSchema: z.ZodType<Prisma.PhenotypersUpdateManyArgs> = z.object({
  data: z.union([ PhenotypersUpdateManyMutationInputSchema,PhenotypersUncheckedUpdateManyInputSchema ]),
  where: PhenotypersWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.PhenotypersUpdateManyArgs>

export const PhenotypersDeleteManyArgsSchema: z.ZodType<Prisma.PhenotypersDeleteManyArgs> = z.object({
  where: PhenotypersWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.PhenotypersDeleteManyArgs>

export const ScansCreateArgsSchema: z.ZodType<Prisma.ScansCreateArgs> = z.object({
  select: ScansSelectSchema.optional(),
  include: ScansIncludeSchema.optional(),
  data: z.union([ ScansCreateInputSchema,ScansUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.ScansCreateArgs>

export const ScansUpsertArgsSchema: z.ZodType<Prisma.ScansUpsertArgs> = z.object({
  select: ScansSelectSchema.optional(),
  include: ScansIncludeSchema.optional(),
  where: ScansWhereUniqueInputSchema,
  create: z.union([ ScansCreateInputSchema,ScansUncheckedCreateInputSchema ]),
  update: z.union([ ScansUpdateInputSchema,ScansUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.ScansUpsertArgs>

export const ScansCreateManyArgsSchema: z.ZodType<Prisma.ScansCreateManyArgs> = z.object({
  data: ScansCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ScansCreateManyArgs>

export const ScansDeleteArgsSchema: z.ZodType<Prisma.ScansDeleteArgs> = z.object({
  select: ScansSelectSchema.optional(),
  include: ScansIncludeSchema.optional(),
  where: ScansWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ScansDeleteArgs>

export const ScansUpdateArgsSchema: z.ZodType<Prisma.ScansUpdateArgs> = z.object({
  select: ScansSelectSchema.optional(),
  include: ScansIncludeSchema.optional(),
  data: z.union([ ScansUpdateInputSchema,ScansUncheckedUpdateInputSchema ]),
  where: ScansWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ScansUpdateArgs>

export const ScansUpdateManyArgsSchema: z.ZodType<Prisma.ScansUpdateManyArgs> = z.object({
  data: z.union([ ScansUpdateManyMutationInputSchema,ScansUncheckedUpdateManyInputSchema ]),
  where: ScansWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ScansUpdateManyArgs>

export const ScansDeleteManyArgsSchema: z.ZodType<Prisma.ScansDeleteManyArgs> = z.object({
  where: ScansWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ScansDeleteManyArgs>

interface ImagesGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ImagesArgs
  readonly type: Prisma.ImagesGetPayload<this['_A']>
}

interface PhenotypersGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.PhenotypersArgs
  readonly type: Prisma.PhenotypersGetPayload<this['_A']>
}

interface ScansGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ScansArgs
  readonly type: Prisma.ScansGetPayload<this['_A']>
}

export const tableSchemas = {
  images: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "scanid",
        "UUID"
      ],
      [
        "framenumber",
        "INT4"
      ],
      [
        "path",
        "TEXT"
      ],
      [
        "url",
        "TEXT"
      ],
      [
        "status",
        "TEXT"
      ]
    ]),
    relations: [
      new Relation("scans", "scanid", "id", "scans", "ImagesToScans", "one"),
    ],
    modelSchema: (ImagesCreateInputSchema as any)
      .partial()
      .or((ImagesUncheckedCreateInputSchema as any).partial()),
    createSchema: ImagesCreateArgsSchema,
    createManySchema: ImagesCreateManyArgsSchema,
    findUniqueSchema: ImagesFindUniqueArgsSchema,
    findSchema: ImagesFindFirstArgsSchema,
    updateSchema: ImagesUpdateArgsSchema,
    updateManySchema: ImagesUpdateManyArgsSchema,
    upsertSchema: ImagesUpsertArgsSchema,
    deleteSchema: ImagesDeleteArgsSchema,
    deleteManySchema: ImagesDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof ImagesCreateInputSchema>,
    Prisma.ImagesCreateArgs['data'],
    Prisma.ImagesUpdateArgs['data'],
    Prisma.ImagesFindFirstArgs['select'],
    Prisma.ImagesFindFirstArgs['where'],
    Prisma.ImagesFindUniqueArgs['where'],
    Omit<Prisma.ImagesInclude, '_count'>,
    Prisma.ImagesFindFirstArgs['orderBy'],
    Prisma.ImagesScalarFieldEnum,
    ImagesGetPayload
  >,
  phenotypers: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "name",
        "TEXT"
      ],
      [
        "email",
        "TEXT"
      ]
    ]),
    relations: [
      new Relation("scans", "", "", "scans", "PhenotypersToScans", "many"),
    ],
    modelSchema: (PhenotypersCreateInputSchema as any)
      .partial()
      .or((PhenotypersUncheckedCreateInputSchema as any).partial()),
    createSchema: PhenotypersCreateArgsSchema,
    createManySchema: PhenotypersCreateManyArgsSchema,
    findUniqueSchema: PhenotypersFindUniqueArgsSchema,
    findSchema: PhenotypersFindFirstArgsSchema,
    updateSchema: PhenotypersUpdateArgsSchema,
    updateManySchema: PhenotypersUpdateManyArgsSchema,
    upsertSchema: PhenotypersUpsertArgsSchema,
    deleteSchema: PhenotypersDeleteArgsSchema,
    deleteManySchema: PhenotypersDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof PhenotypersCreateInputSchema>,
    Prisma.PhenotypersCreateArgs['data'],
    Prisma.PhenotypersUpdateArgs['data'],
    Prisma.PhenotypersFindFirstArgs['select'],
    Prisma.PhenotypersFindFirstArgs['where'],
    Prisma.PhenotypersFindUniqueArgs['where'],
    Omit<Prisma.PhenotypersInclude, '_count'>,
    Prisma.PhenotypersFindFirstArgs['orderBy'],
    Prisma.PhenotypersScalarFieldEnum,
    PhenotypersGetPayload
  >,
  scans: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "phenotyperid",
        "UUID"
      ],
      [
        "plantqrcode",
        "TEXT"
      ],
      [
        "path",
        "TEXT"
      ],
      [
        "capturedate",
        "TIMESTAMPTZ"
      ],
      [
        "numframes",
        "INT4"
      ],
      [
        "exposuretime",
        "INT4"
      ],
      [
        "gain",
        "FLOAT4"
      ],
      [
        "brightness",
        "FLOAT4"
      ],
      [
        "contrast",
        "FLOAT4"
      ],
      [
        "gamma",
        "FLOAT4"
      ],
      [
        "secondsperrotation",
        "FLOAT4"
      ]
    ]),
    relations: [
      new Relation("images", "", "", "images", "ImagesToScans", "many"),
      new Relation("phenotypers", "phenotyperid", "id", "phenotypers", "PhenotypersToScans", "one"),
    ],
    modelSchema: (ScansCreateInputSchema as any)
      .partial()
      .or((ScansUncheckedCreateInputSchema as any).partial()),
    createSchema: ScansCreateArgsSchema,
    createManySchema: ScansCreateManyArgsSchema,
    findUniqueSchema: ScansFindUniqueArgsSchema,
    findSchema: ScansFindFirstArgsSchema,
    updateSchema: ScansUpdateArgsSchema,
    updateManySchema: ScansUpdateManyArgsSchema,
    upsertSchema: ScansUpsertArgsSchema,
    deleteSchema: ScansDeleteArgsSchema,
    deleteManySchema: ScansDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof ScansCreateInputSchema>,
    Prisma.ScansCreateArgs['data'],
    Prisma.ScansUpdateArgs['data'],
    Prisma.ScansFindFirstArgs['select'],
    Prisma.ScansFindFirstArgs['where'],
    Prisma.ScansFindUniqueArgs['where'],
    Omit<Prisma.ScansInclude, '_count'>,
    Prisma.ScansFindFirstArgs['orderBy'],
    Prisma.ScansScalarFieldEnum,
    ScansGetPayload
  >,
}

export const schema = new DbSchema(tableSchemas, migrations)
export type Electric = ElectricClient<typeof schema>
