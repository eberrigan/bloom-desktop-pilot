
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Electric_cyl_images
 * 
 */
export type Electric_cyl_images = {
  /**
   * @zod.string.uuid()
   */
  id: string
  /**
   * @zod.string.uuid()
   */
  scan_id: string | null
  /**
   * @zod.number.int().gte(-2147483648).lte(2147483647)
   */
  frame_number: number | null
  path: string | null
  url: string | null
  status: string | null
  supabase_object_path: string | null
}

/**
 * Model Electric_cyl_scans
 * 
 */
export type Electric_cyl_scans = {
  /**
   * @zod.string.uuid()
   */
  id: string
  /**
   * @zod.string.uuid()
   */
  phenotyper_id: string | null
  scanner_id: string | null
  plant_qr_code: string | null
  path: string | null
  capture_date: Date | null
  /**
   * @zod.number.int().gte(-2147483648).lte(2147483647)
   */
  num_frames: number | null
  /**
   * @zod.number.int().gte(-2147483648).lte(2147483647)
   */
  exposure_time: number | null
  /**
   * @zod.custom.use(z.number().or(z.nan()))
   */
  gain: number | null
  /**
   * @zod.custom.use(z.number().or(z.nan()))
   */
  brightness: number | null
  /**
   * @zod.custom.use(z.number().or(z.nan()))
   */
  contrast: number | null
  /**
   * @zod.custom.use(z.number().or(z.nan()))
   */
  gamma: number | null
  /**
   * @zod.custom.use(z.number().or(z.nan()))
   */
  seconds_per_rot: number | null
  experiment_name: string | null
  /**
   * @zod.number.int().gte(-2147483648).lte(2147483647)
   */
  wave_number: number | null
  /**
   * @zod.number.int().gte(-2147483648).lte(2147483647)
   */
  plant_age_days: number | null
}

/**
 * Model Electric_phenotypers
 * 
 */
export type Electric_phenotypers = {
  /**
   * @zod.string.uuid()
   */
  id: string
  name: string | null
  email: string | null
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Electric_cyl_images
 * const electric_cyl_images = await prisma.electric_cyl_images.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Electric_cyl_images
   * const electric_cyl_images = await prisma.electric_cyl_images.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

  $transaction<R>(fn: (prisma: Prisma.TransactionClient) => Promise<R>, options?: {maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel}): Promise<R>;

      /**
   * `prisma.electric_cyl_images`: Exposes CRUD operations for the **Electric_cyl_images** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Electric_cyl_images
    * const electric_cyl_images = await prisma.electric_cyl_images.findMany()
    * ```
    */
  get electric_cyl_images(): Prisma.Electric_cyl_imagesDelegate<GlobalReject>;

  /**
   * `prisma.electric_cyl_scans`: Exposes CRUD operations for the **Electric_cyl_scans** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Electric_cyl_scans
    * const electric_cyl_scans = await prisma.electric_cyl_scans.findMany()
    * ```
    */
  get electric_cyl_scans(): Prisma.Electric_cyl_scansDelegate<GlobalReject>;

  /**
   * `prisma.electric_phenotypers`: Exposes CRUD operations for the **Electric_phenotypers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Electric_phenotypers
    * const electric_phenotypers = await prisma.electric_phenotypers.findMany()
    * ```
    */
  get electric_phenotypers(): Prisma.Electric_phenotypersDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.8.1
   * Query Engine version: 23fdc5965b1e05fc54e5f26ed3de66776b93de64
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
export type InputJsonValue = null | string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    Electric_cyl_images: 'Electric_cyl_images',
    Electric_cyl_scans: 'Electric_cyl_scans',
    Electric_phenotypers: 'Electric_phenotypers'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type Electric_cyl_scansCountOutputType
   */


  export type Electric_cyl_scansCountOutputType = {
    electric_cyl_images: number
  }

  export type Electric_cyl_scansCountOutputTypeSelect = {
    electric_cyl_images?: boolean | Electric_cyl_scansCountOutputTypeCountElectric_cyl_imagesArgs
  }

  export type Electric_cyl_scansCountOutputTypeGetPayload<S extends boolean | null | undefined | Electric_cyl_scansCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Electric_cyl_scansCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (Electric_cyl_scansCountOutputTypeArgs)
    ? Electric_cyl_scansCountOutputType 
    : S extends { select: any } & (Electric_cyl_scansCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof Electric_cyl_scansCountOutputType ? Electric_cyl_scansCountOutputType[P] : never
  } 
      : Electric_cyl_scansCountOutputType




  // Custom InputTypes

  /**
   * Electric_cyl_scansCountOutputType without action
   */
  export type Electric_cyl_scansCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the Electric_cyl_scansCountOutputType
     * 
    **/
    select?: Electric_cyl_scansCountOutputTypeSelect | null
  }


  /**
   * Electric_cyl_scansCountOutputType without action
   */
  export type Electric_cyl_scansCountOutputTypeCountElectric_cyl_imagesArgs = {
    where?: Electric_cyl_imagesWhereInput
  }



  /**
   * Count Type Electric_phenotypersCountOutputType
   */


  export type Electric_phenotypersCountOutputType = {
    electric_cyl_scans: number
  }

  export type Electric_phenotypersCountOutputTypeSelect = {
    electric_cyl_scans?: boolean | Electric_phenotypersCountOutputTypeCountElectric_cyl_scansArgs
  }

  export type Electric_phenotypersCountOutputTypeGetPayload<S extends boolean | null | undefined | Electric_phenotypersCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Electric_phenotypersCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (Electric_phenotypersCountOutputTypeArgs)
    ? Electric_phenotypersCountOutputType 
    : S extends { select: any } & (Electric_phenotypersCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof Electric_phenotypersCountOutputType ? Electric_phenotypersCountOutputType[P] : never
  } 
      : Electric_phenotypersCountOutputType




  // Custom InputTypes

  /**
   * Electric_phenotypersCountOutputType without action
   */
  export type Electric_phenotypersCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the Electric_phenotypersCountOutputType
     * 
    **/
    select?: Electric_phenotypersCountOutputTypeSelect | null
  }


  /**
   * Electric_phenotypersCountOutputType without action
   */
  export type Electric_phenotypersCountOutputTypeCountElectric_cyl_scansArgs = {
    where?: Electric_cyl_scansWhereInput
  }



  /**
   * Models
   */

  /**
   * Model Electric_cyl_images
   */


  export type AggregateElectric_cyl_images = {
    _count: Electric_cyl_imagesCountAggregateOutputType | null
    _avg: Electric_cyl_imagesAvgAggregateOutputType | null
    _sum: Electric_cyl_imagesSumAggregateOutputType | null
    _min: Electric_cyl_imagesMinAggregateOutputType | null
    _max: Electric_cyl_imagesMaxAggregateOutputType | null
  }

  export type Electric_cyl_imagesAvgAggregateOutputType = {
    frame_number: number | null
  }

  export type Electric_cyl_imagesSumAggregateOutputType = {
    frame_number: number | null
  }

  export type Electric_cyl_imagesMinAggregateOutputType = {
    id: string | null
    scan_id: string | null
    frame_number: number | null
    path: string | null
    url: string | null
    status: string | null
    supabase_object_path: string | null
  }

  export type Electric_cyl_imagesMaxAggregateOutputType = {
    id: string | null
    scan_id: string | null
    frame_number: number | null
    path: string | null
    url: string | null
    status: string | null
    supabase_object_path: string | null
  }

  export type Electric_cyl_imagesCountAggregateOutputType = {
    id: number
    scan_id: number
    frame_number: number
    path: number
    url: number
    status: number
    supabase_object_path: number
    _all: number
  }


  export type Electric_cyl_imagesAvgAggregateInputType = {
    frame_number?: true
  }

  export type Electric_cyl_imagesSumAggregateInputType = {
    frame_number?: true
  }

  export type Electric_cyl_imagesMinAggregateInputType = {
    id?: true
    scan_id?: true
    frame_number?: true
    path?: true
    url?: true
    status?: true
    supabase_object_path?: true
  }

  export type Electric_cyl_imagesMaxAggregateInputType = {
    id?: true
    scan_id?: true
    frame_number?: true
    path?: true
    url?: true
    status?: true
    supabase_object_path?: true
  }

  export type Electric_cyl_imagesCountAggregateInputType = {
    id?: true
    scan_id?: true
    frame_number?: true
    path?: true
    url?: true
    status?: true
    supabase_object_path?: true
    _all?: true
  }

  export type Electric_cyl_imagesAggregateArgs = {
    /**
     * Filter which Electric_cyl_images to aggregate.
     * 
    **/
    where?: Electric_cyl_imagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Electric_cyl_images to fetch.
     * 
    **/
    orderBy?: Enumerable<Electric_cyl_imagesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: Electric_cyl_imagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Electric_cyl_images from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Electric_cyl_images.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Electric_cyl_images
    **/
    _count?: true | Electric_cyl_imagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Electric_cyl_imagesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Electric_cyl_imagesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Electric_cyl_imagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Electric_cyl_imagesMaxAggregateInputType
  }

  export type GetElectric_cyl_imagesAggregateType<T extends Electric_cyl_imagesAggregateArgs> = {
        [P in keyof T & keyof AggregateElectric_cyl_images]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateElectric_cyl_images[P]>
      : GetScalarType<T[P], AggregateElectric_cyl_images[P]>
  }




  export type Electric_cyl_imagesGroupByArgs = {
    where?: Electric_cyl_imagesWhereInput
    orderBy?: Enumerable<Electric_cyl_imagesOrderByWithAggregationInput>
    by: Array<Electric_cyl_imagesScalarFieldEnum>
    having?: Electric_cyl_imagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Electric_cyl_imagesCountAggregateInputType | true
    _avg?: Electric_cyl_imagesAvgAggregateInputType
    _sum?: Electric_cyl_imagesSumAggregateInputType
    _min?: Electric_cyl_imagesMinAggregateInputType
    _max?: Electric_cyl_imagesMaxAggregateInputType
  }


  export type Electric_cyl_imagesGroupByOutputType = {
    id: string
    scan_id: string | null
    frame_number: number | null
    path: string | null
    url: string | null
    status: string | null
    supabase_object_path: string | null
    _count: Electric_cyl_imagesCountAggregateOutputType | null
    _avg: Electric_cyl_imagesAvgAggregateOutputType | null
    _sum: Electric_cyl_imagesSumAggregateOutputType | null
    _min: Electric_cyl_imagesMinAggregateOutputType | null
    _max: Electric_cyl_imagesMaxAggregateOutputType | null
  }

  type GetElectric_cyl_imagesGroupByPayload<T extends Electric_cyl_imagesGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Electric_cyl_imagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Electric_cyl_imagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Electric_cyl_imagesGroupByOutputType[P]>
            : GetScalarType<T[P], Electric_cyl_imagesGroupByOutputType[P]>
        }
      >
    >


  export type Electric_cyl_imagesSelect = {
    id?: boolean
    scan_id?: boolean
    frame_number?: boolean
    path?: boolean
    url?: boolean
    status?: boolean
    supabase_object_path?: boolean
    electric_cyl_scans?: boolean | Electric_cyl_images$electric_cyl_scansArgs
  }


  export type Electric_cyl_imagesInclude = {
    electric_cyl_scans?: boolean | Electric_cyl_images$electric_cyl_scansArgs
  } 

  export type Electric_cyl_imagesGetPayload<S extends boolean | null | undefined | Electric_cyl_imagesArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Electric_cyl_images :
    S extends undefined ? never :
    S extends { include: any } & (Electric_cyl_imagesArgs | Electric_cyl_imagesFindManyArgs)
    ? Electric_cyl_images  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'electric_cyl_scans' ? Electric_cyl_scansGetPayload<S['include'][P]> | null :  never
  } 
    : S extends { select: any } & (Electric_cyl_imagesArgs | Electric_cyl_imagesFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'electric_cyl_scans' ? Electric_cyl_scansGetPayload<S['select'][P]> | null :  P extends keyof Electric_cyl_images ? Electric_cyl_images[P] : never
  } 
      : Electric_cyl_images


  type Electric_cyl_imagesCountArgs = Merge<
    Omit<Electric_cyl_imagesFindManyArgs, 'select' | 'include'> & {
      select?: Electric_cyl_imagesCountAggregateInputType | true
    }
  >

  export interface Electric_cyl_imagesDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Electric_cyl_images that matches the filter.
     * @param {Electric_cyl_imagesFindUniqueArgs} args - Arguments to find a Electric_cyl_images
     * @example
     * // Get one Electric_cyl_images
     * const electric_cyl_images = await prisma.electric_cyl_images.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends Electric_cyl_imagesFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, Electric_cyl_imagesFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Electric_cyl_images'> extends True ? Prisma__Electric_cyl_imagesClient<Electric_cyl_imagesGetPayload<T>> : Prisma__Electric_cyl_imagesClient<Electric_cyl_imagesGetPayload<T> | null, null>

    /**
     * Find one Electric_cyl_images that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {Electric_cyl_imagesFindUniqueOrThrowArgs} args - Arguments to find a Electric_cyl_images
     * @example
     * // Get one Electric_cyl_images
     * const electric_cyl_images = await prisma.electric_cyl_images.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends Electric_cyl_imagesFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, Electric_cyl_imagesFindUniqueOrThrowArgs>
    ): Prisma__Electric_cyl_imagesClient<Electric_cyl_imagesGetPayload<T>>

    /**
     * Find the first Electric_cyl_images that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_cyl_imagesFindFirstArgs} args - Arguments to find a Electric_cyl_images
     * @example
     * // Get one Electric_cyl_images
     * const electric_cyl_images = await prisma.electric_cyl_images.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends Electric_cyl_imagesFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, Electric_cyl_imagesFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Electric_cyl_images'> extends True ? Prisma__Electric_cyl_imagesClient<Electric_cyl_imagesGetPayload<T>> : Prisma__Electric_cyl_imagesClient<Electric_cyl_imagesGetPayload<T> | null, null>

    /**
     * Find the first Electric_cyl_images that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_cyl_imagesFindFirstOrThrowArgs} args - Arguments to find a Electric_cyl_images
     * @example
     * // Get one Electric_cyl_images
     * const electric_cyl_images = await prisma.electric_cyl_images.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends Electric_cyl_imagesFindFirstOrThrowArgs>(
      args?: SelectSubset<T, Electric_cyl_imagesFindFirstOrThrowArgs>
    ): Prisma__Electric_cyl_imagesClient<Electric_cyl_imagesGetPayload<T>>

    /**
     * Find zero or more Electric_cyl_images that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_cyl_imagesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Electric_cyl_images
     * const electric_cyl_images = await prisma.electric_cyl_images.findMany()
     * 
     * // Get first 10 Electric_cyl_images
     * const electric_cyl_images = await prisma.electric_cyl_images.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const electric_cyl_imagesWithIdOnly = await prisma.electric_cyl_images.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends Electric_cyl_imagesFindManyArgs>(
      args?: SelectSubset<T, Electric_cyl_imagesFindManyArgs>
    ): PrismaPromise<Array<Electric_cyl_imagesGetPayload<T>>>

    /**
     * Create a Electric_cyl_images.
     * @param {Electric_cyl_imagesCreateArgs} args - Arguments to create a Electric_cyl_images.
     * @example
     * // Create one Electric_cyl_images
     * const Electric_cyl_images = await prisma.electric_cyl_images.create({
     *   data: {
     *     // ... data to create a Electric_cyl_images
     *   }
     * })
     * 
    **/
    create<T extends Electric_cyl_imagesCreateArgs>(
      args: SelectSubset<T, Electric_cyl_imagesCreateArgs>
    ): Prisma__Electric_cyl_imagesClient<Electric_cyl_imagesGetPayload<T>>

    /**
     * Create many Electric_cyl_images.
     *     @param {Electric_cyl_imagesCreateManyArgs} args - Arguments to create many Electric_cyl_images.
     *     @example
     *     // Create many Electric_cyl_images
     *     const electric_cyl_images = await prisma.electric_cyl_images.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends Electric_cyl_imagesCreateManyArgs>(
      args?: SelectSubset<T, Electric_cyl_imagesCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Electric_cyl_images.
     * @param {Electric_cyl_imagesDeleteArgs} args - Arguments to delete one Electric_cyl_images.
     * @example
     * // Delete one Electric_cyl_images
     * const Electric_cyl_images = await prisma.electric_cyl_images.delete({
     *   where: {
     *     // ... filter to delete one Electric_cyl_images
     *   }
     * })
     * 
    **/
    delete<T extends Electric_cyl_imagesDeleteArgs>(
      args: SelectSubset<T, Electric_cyl_imagesDeleteArgs>
    ): Prisma__Electric_cyl_imagesClient<Electric_cyl_imagesGetPayload<T>>

    /**
     * Update one Electric_cyl_images.
     * @param {Electric_cyl_imagesUpdateArgs} args - Arguments to update one Electric_cyl_images.
     * @example
     * // Update one Electric_cyl_images
     * const electric_cyl_images = await prisma.electric_cyl_images.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends Electric_cyl_imagesUpdateArgs>(
      args: SelectSubset<T, Electric_cyl_imagesUpdateArgs>
    ): Prisma__Electric_cyl_imagesClient<Electric_cyl_imagesGetPayload<T>>

    /**
     * Delete zero or more Electric_cyl_images.
     * @param {Electric_cyl_imagesDeleteManyArgs} args - Arguments to filter Electric_cyl_images to delete.
     * @example
     * // Delete a few Electric_cyl_images
     * const { count } = await prisma.electric_cyl_images.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends Electric_cyl_imagesDeleteManyArgs>(
      args?: SelectSubset<T, Electric_cyl_imagesDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Electric_cyl_images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_cyl_imagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Electric_cyl_images
     * const electric_cyl_images = await prisma.electric_cyl_images.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends Electric_cyl_imagesUpdateManyArgs>(
      args: SelectSubset<T, Electric_cyl_imagesUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Electric_cyl_images.
     * @param {Electric_cyl_imagesUpsertArgs} args - Arguments to update or create a Electric_cyl_images.
     * @example
     * // Update or create a Electric_cyl_images
     * const electric_cyl_images = await prisma.electric_cyl_images.upsert({
     *   create: {
     *     // ... data to create a Electric_cyl_images
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Electric_cyl_images we want to update
     *   }
     * })
    **/
    upsert<T extends Electric_cyl_imagesUpsertArgs>(
      args: SelectSubset<T, Electric_cyl_imagesUpsertArgs>
    ): Prisma__Electric_cyl_imagesClient<Electric_cyl_imagesGetPayload<T>>

    /**
     * Count the number of Electric_cyl_images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_cyl_imagesCountArgs} args - Arguments to filter Electric_cyl_images to count.
     * @example
     * // Count the number of Electric_cyl_images
     * const count = await prisma.electric_cyl_images.count({
     *   where: {
     *     // ... the filter for the Electric_cyl_images we want to count
     *   }
     * })
    **/
    count<T extends Electric_cyl_imagesCountArgs>(
      args?: Subset<T, Electric_cyl_imagesCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Electric_cyl_imagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Electric_cyl_images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_cyl_imagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Electric_cyl_imagesAggregateArgs>(args: Subset<T, Electric_cyl_imagesAggregateArgs>): PrismaPromise<GetElectric_cyl_imagesAggregateType<T>>

    /**
     * Group by Electric_cyl_images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_cyl_imagesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Electric_cyl_imagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Electric_cyl_imagesGroupByArgs['orderBy'] }
        : { orderBy?: Electric_cyl_imagesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Electric_cyl_imagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetElectric_cyl_imagesGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Electric_cyl_images.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__Electric_cyl_imagesClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    electric_cyl_scans<T extends Electric_cyl_images$electric_cyl_scansArgs= {}>(args?: Subset<T, Electric_cyl_images$electric_cyl_scansArgs>): Prisma__Electric_cyl_scansClient<Electric_cyl_scansGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Electric_cyl_images base type for findUnique actions
   */
  export type Electric_cyl_imagesFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Electric_cyl_images
     * 
    **/
    select?: Electric_cyl_imagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_imagesInclude | null
    /**
     * Filter, which Electric_cyl_images to fetch.
     * 
    **/
    where: Electric_cyl_imagesWhereUniqueInput
  }

  /**
   * Electric_cyl_images findUnique
   */
  export interface Electric_cyl_imagesFindUniqueArgs extends Electric_cyl_imagesFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Electric_cyl_images findUniqueOrThrow
   */
  export type Electric_cyl_imagesFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Electric_cyl_images
     * 
    **/
    select?: Electric_cyl_imagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_imagesInclude | null
    /**
     * Filter, which Electric_cyl_images to fetch.
     * 
    **/
    where: Electric_cyl_imagesWhereUniqueInput
  }


  /**
   * Electric_cyl_images base type for findFirst actions
   */
  export type Electric_cyl_imagesFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Electric_cyl_images
     * 
    **/
    select?: Electric_cyl_imagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_imagesInclude | null
    /**
     * Filter, which Electric_cyl_images to fetch.
     * 
    **/
    where?: Electric_cyl_imagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Electric_cyl_images to fetch.
     * 
    **/
    orderBy?: Enumerable<Electric_cyl_imagesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Electric_cyl_images.
     * 
    **/
    cursor?: Electric_cyl_imagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Electric_cyl_images from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Electric_cyl_images.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Electric_cyl_images.
     * 
    **/
    distinct?: Enumerable<Electric_cyl_imagesScalarFieldEnum>
  }

  /**
   * Electric_cyl_images findFirst
   */
  export interface Electric_cyl_imagesFindFirstArgs extends Electric_cyl_imagesFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Electric_cyl_images findFirstOrThrow
   */
  export type Electric_cyl_imagesFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Electric_cyl_images
     * 
    **/
    select?: Electric_cyl_imagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_imagesInclude | null
    /**
     * Filter, which Electric_cyl_images to fetch.
     * 
    **/
    where?: Electric_cyl_imagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Electric_cyl_images to fetch.
     * 
    **/
    orderBy?: Enumerable<Electric_cyl_imagesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Electric_cyl_images.
     * 
    **/
    cursor?: Electric_cyl_imagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Electric_cyl_images from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Electric_cyl_images.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Electric_cyl_images.
     * 
    **/
    distinct?: Enumerable<Electric_cyl_imagesScalarFieldEnum>
  }


  /**
   * Electric_cyl_images findMany
   */
  export type Electric_cyl_imagesFindManyArgs = {
    /**
     * Select specific fields to fetch from the Electric_cyl_images
     * 
    **/
    select?: Electric_cyl_imagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_imagesInclude | null
    /**
     * Filter, which Electric_cyl_images to fetch.
     * 
    **/
    where?: Electric_cyl_imagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Electric_cyl_images to fetch.
     * 
    **/
    orderBy?: Enumerable<Electric_cyl_imagesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Electric_cyl_images.
     * 
    **/
    cursor?: Electric_cyl_imagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Electric_cyl_images from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Electric_cyl_images.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Electric_cyl_imagesScalarFieldEnum>
  }


  /**
   * Electric_cyl_images create
   */
  export type Electric_cyl_imagesCreateArgs = {
    /**
     * Select specific fields to fetch from the Electric_cyl_images
     * 
    **/
    select?: Electric_cyl_imagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_imagesInclude | null
    /**
     * The data needed to create a Electric_cyl_images.
     * 
    **/
    data: XOR<Electric_cyl_imagesCreateInput, Electric_cyl_imagesUncheckedCreateInput>
  }


  /**
   * Electric_cyl_images createMany
   */
  export type Electric_cyl_imagesCreateManyArgs = {
    /**
     * The data used to create many Electric_cyl_images.
     * 
    **/
    data: Enumerable<Electric_cyl_imagesCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Electric_cyl_images update
   */
  export type Electric_cyl_imagesUpdateArgs = {
    /**
     * Select specific fields to fetch from the Electric_cyl_images
     * 
    **/
    select?: Electric_cyl_imagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_imagesInclude | null
    /**
     * The data needed to update a Electric_cyl_images.
     * 
    **/
    data: XOR<Electric_cyl_imagesUpdateInput, Electric_cyl_imagesUncheckedUpdateInput>
    /**
     * Choose, which Electric_cyl_images to update.
     * 
    **/
    where: Electric_cyl_imagesWhereUniqueInput
  }


  /**
   * Electric_cyl_images updateMany
   */
  export type Electric_cyl_imagesUpdateManyArgs = {
    /**
     * The data used to update Electric_cyl_images.
     * 
    **/
    data: XOR<Electric_cyl_imagesUpdateManyMutationInput, Electric_cyl_imagesUncheckedUpdateManyInput>
    /**
     * Filter which Electric_cyl_images to update
     * 
    **/
    where?: Electric_cyl_imagesWhereInput
  }


  /**
   * Electric_cyl_images upsert
   */
  export type Electric_cyl_imagesUpsertArgs = {
    /**
     * Select specific fields to fetch from the Electric_cyl_images
     * 
    **/
    select?: Electric_cyl_imagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_imagesInclude | null
    /**
     * The filter to search for the Electric_cyl_images to update in case it exists.
     * 
    **/
    where: Electric_cyl_imagesWhereUniqueInput
    /**
     * In case the Electric_cyl_images found by the `where` argument doesn't exist, create a new Electric_cyl_images with this data.
     * 
    **/
    create: XOR<Electric_cyl_imagesCreateInput, Electric_cyl_imagesUncheckedCreateInput>
    /**
     * In case the Electric_cyl_images was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<Electric_cyl_imagesUpdateInput, Electric_cyl_imagesUncheckedUpdateInput>
  }


  /**
   * Electric_cyl_images delete
   */
  export type Electric_cyl_imagesDeleteArgs = {
    /**
     * Select specific fields to fetch from the Electric_cyl_images
     * 
    **/
    select?: Electric_cyl_imagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_imagesInclude | null
    /**
     * Filter which Electric_cyl_images to delete.
     * 
    **/
    where: Electric_cyl_imagesWhereUniqueInput
  }


  /**
   * Electric_cyl_images deleteMany
   */
  export type Electric_cyl_imagesDeleteManyArgs = {
    /**
     * Filter which Electric_cyl_images to delete
     * 
    **/
    where?: Electric_cyl_imagesWhereInput
  }


  /**
   * Electric_cyl_images.electric_cyl_scans
   */
  export type Electric_cyl_images$electric_cyl_scansArgs = {
    /**
     * Select specific fields to fetch from the Electric_cyl_scans
     * 
    **/
    select?: Electric_cyl_scansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_scansInclude | null
    where?: Electric_cyl_scansWhereInput
  }


  /**
   * Electric_cyl_images without action
   */
  export type Electric_cyl_imagesArgs = {
    /**
     * Select specific fields to fetch from the Electric_cyl_images
     * 
    **/
    select?: Electric_cyl_imagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_imagesInclude | null
  }



  /**
   * Model Electric_cyl_scans
   */


  export type AggregateElectric_cyl_scans = {
    _count: Electric_cyl_scansCountAggregateOutputType | null
    _avg: Electric_cyl_scansAvgAggregateOutputType | null
    _sum: Electric_cyl_scansSumAggregateOutputType | null
    _min: Electric_cyl_scansMinAggregateOutputType | null
    _max: Electric_cyl_scansMaxAggregateOutputType | null
  }

  export type Electric_cyl_scansAvgAggregateOutputType = {
    num_frames: number | null
    exposure_time: number | null
    gain: number | null
    brightness: number | null
    contrast: number | null
    gamma: number | null
    seconds_per_rot: number | null
    wave_number: number | null
    plant_age_days: number | null
  }

  export type Electric_cyl_scansSumAggregateOutputType = {
    num_frames: number | null
    exposure_time: number | null
    gain: number | null
    brightness: number | null
    contrast: number | null
    gamma: number | null
    seconds_per_rot: number | null
    wave_number: number | null
    plant_age_days: number | null
  }

  export type Electric_cyl_scansMinAggregateOutputType = {
    id: string | null
    phenotyper_id: string | null
    scanner_id: string | null
    plant_qr_code: string | null
    path: string | null
    capture_date: Date | null
    num_frames: number | null
    exposure_time: number | null
    gain: number | null
    brightness: number | null
    contrast: number | null
    gamma: number | null
    seconds_per_rot: number | null
    experiment_name: string | null
    wave_number: number | null
    plant_age_days: number | null
  }

  export type Electric_cyl_scansMaxAggregateOutputType = {
    id: string | null
    phenotyper_id: string | null
    scanner_id: string | null
    plant_qr_code: string | null
    path: string | null
    capture_date: Date | null
    num_frames: number | null
    exposure_time: number | null
    gain: number | null
    brightness: number | null
    contrast: number | null
    gamma: number | null
    seconds_per_rot: number | null
    experiment_name: string | null
    wave_number: number | null
    plant_age_days: number | null
  }

  export type Electric_cyl_scansCountAggregateOutputType = {
    id: number
    phenotyper_id: number
    scanner_id: number
    plant_qr_code: number
    path: number
    capture_date: number
    num_frames: number
    exposure_time: number
    gain: number
    brightness: number
    contrast: number
    gamma: number
    seconds_per_rot: number
    experiment_name: number
    wave_number: number
    plant_age_days: number
    _all: number
  }


  export type Electric_cyl_scansAvgAggregateInputType = {
    num_frames?: true
    exposure_time?: true
    gain?: true
    brightness?: true
    contrast?: true
    gamma?: true
    seconds_per_rot?: true
    wave_number?: true
    plant_age_days?: true
  }

  export type Electric_cyl_scansSumAggregateInputType = {
    num_frames?: true
    exposure_time?: true
    gain?: true
    brightness?: true
    contrast?: true
    gamma?: true
    seconds_per_rot?: true
    wave_number?: true
    plant_age_days?: true
  }

  export type Electric_cyl_scansMinAggregateInputType = {
    id?: true
    phenotyper_id?: true
    scanner_id?: true
    plant_qr_code?: true
    path?: true
    capture_date?: true
    num_frames?: true
    exposure_time?: true
    gain?: true
    brightness?: true
    contrast?: true
    gamma?: true
    seconds_per_rot?: true
    experiment_name?: true
    wave_number?: true
    plant_age_days?: true
  }

  export type Electric_cyl_scansMaxAggregateInputType = {
    id?: true
    phenotyper_id?: true
    scanner_id?: true
    plant_qr_code?: true
    path?: true
    capture_date?: true
    num_frames?: true
    exposure_time?: true
    gain?: true
    brightness?: true
    contrast?: true
    gamma?: true
    seconds_per_rot?: true
    experiment_name?: true
    wave_number?: true
    plant_age_days?: true
  }

  export type Electric_cyl_scansCountAggregateInputType = {
    id?: true
    phenotyper_id?: true
    scanner_id?: true
    plant_qr_code?: true
    path?: true
    capture_date?: true
    num_frames?: true
    exposure_time?: true
    gain?: true
    brightness?: true
    contrast?: true
    gamma?: true
    seconds_per_rot?: true
    experiment_name?: true
    wave_number?: true
    plant_age_days?: true
    _all?: true
  }

  export type Electric_cyl_scansAggregateArgs = {
    /**
     * Filter which Electric_cyl_scans to aggregate.
     * 
    **/
    where?: Electric_cyl_scansWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Electric_cyl_scans to fetch.
     * 
    **/
    orderBy?: Enumerable<Electric_cyl_scansOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: Electric_cyl_scansWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Electric_cyl_scans from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Electric_cyl_scans.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Electric_cyl_scans
    **/
    _count?: true | Electric_cyl_scansCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Electric_cyl_scansAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Electric_cyl_scansSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Electric_cyl_scansMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Electric_cyl_scansMaxAggregateInputType
  }

  export type GetElectric_cyl_scansAggregateType<T extends Electric_cyl_scansAggregateArgs> = {
        [P in keyof T & keyof AggregateElectric_cyl_scans]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateElectric_cyl_scans[P]>
      : GetScalarType<T[P], AggregateElectric_cyl_scans[P]>
  }




  export type Electric_cyl_scansGroupByArgs = {
    where?: Electric_cyl_scansWhereInput
    orderBy?: Enumerable<Electric_cyl_scansOrderByWithAggregationInput>
    by: Array<Electric_cyl_scansScalarFieldEnum>
    having?: Electric_cyl_scansScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Electric_cyl_scansCountAggregateInputType | true
    _avg?: Electric_cyl_scansAvgAggregateInputType
    _sum?: Electric_cyl_scansSumAggregateInputType
    _min?: Electric_cyl_scansMinAggregateInputType
    _max?: Electric_cyl_scansMaxAggregateInputType
  }


  export type Electric_cyl_scansGroupByOutputType = {
    id: string
    phenotyper_id: string | null
    scanner_id: string | null
    plant_qr_code: string | null
    path: string | null
    capture_date: Date | null
    num_frames: number | null
    exposure_time: number | null
    gain: number | null
    brightness: number | null
    contrast: number | null
    gamma: number | null
    seconds_per_rot: number | null
    experiment_name: string | null
    wave_number: number | null
    plant_age_days: number | null
    _count: Electric_cyl_scansCountAggregateOutputType | null
    _avg: Electric_cyl_scansAvgAggregateOutputType | null
    _sum: Electric_cyl_scansSumAggregateOutputType | null
    _min: Electric_cyl_scansMinAggregateOutputType | null
    _max: Electric_cyl_scansMaxAggregateOutputType | null
  }

  type GetElectric_cyl_scansGroupByPayload<T extends Electric_cyl_scansGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Electric_cyl_scansGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Electric_cyl_scansGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Electric_cyl_scansGroupByOutputType[P]>
            : GetScalarType<T[P], Electric_cyl_scansGroupByOutputType[P]>
        }
      >
    >


  export type Electric_cyl_scansSelect = {
    id?: boolean
    phenotyper_id?: boolean
    scanner_id?: boolean
    plant_qr_code?: boolean
    path?: boolean
    capture_date?: boolean
    num_frames?: boolean
    exposure_time?: boolean
    gain?: boolean
    brightness?: boolean
    contrast?: boolean
    gamma?: boolean
    seconds_per_rot?: boolean
    experiment_name?: boolean
    wave_number?: boolean
    plant_age_days?: boolean
    electric_cyl_images?: boolean | Electric_cyl_scans$electric_cyl_imagesArgs
    electric_phenotypers?: boolean | Electric_cyl_scans$electric_phenotypersArgs
    _count?: boolean | Electric_cyl_scansCountOutputTypeArgs
  }


  export type Electric_cyl_scansInclude = {
    electric_cyl_images?: boolean | Electric_cyl_scans$electric_cyl_imagesArgs
    electric_phenotypers?: boolean | Electric_cyl_scans$electric_phenotypersArgs
    _count?: boolean | Electric_cyl_scansCountOutputTypeArgs
  } 

  export type Electric_cyl_scansGetPayload<S extends boolean | null | undefined | Electric_cyl_scansArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Electric_cyl_scans :
    S extends undefined ? never :
    S extends { include: any } & (Electric_cyl_scansArgs | Electric_cyl_scansFindManyArgs)
    ? Electric_cyl_scans  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'electric_cyl_images' ? Array < Electric_cyl_imagesGetPayload<S['include'][P]>>  :
        P extends 'electric_phenotypers' ? Electric_phenotypersGetPayload<S['include'][P]> | null :
        P extends '_count' ? Electric_cyl_scansCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (Electric_cyl_scansArgs | Electric_cyl_scansFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'electric_cyl_images' ? Array < Electric_cyl_imagesGetPayload<S['select'][P]>>  :
        P extends 'electric_phenotypers' ? Electric_phenotypersGetPayload<S['select'][P]> | null :
        P extends '_count' ? Electric_cyl_scansCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Electric_cyl_scans ? Electric_cyl_scans[P] : never
  } 
      : Electric_cyl_scans


  type Electric_cyl_scansCountArgs = Merge<
    Omit<Electric_cyl_scansFindManyArgs, 'select' | 'include'> & {
      select?: Electric_cyl_scansCountAggregateInputType | true
    }
  >

  export interface Electric_cyl_scansDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Electric_cyl_scans that matches the filter.
     * @param {Electric_cyl_scansFindUniqueArgs} args - Arguments to find a Electric_cyl_scans
     * @example
     * // Get one Electric_cyl_scans
     * const electric_cyl_scans = await prisma.electric_cyl_scans.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends Electric_cyl_scansFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, Electric_cyl_scansFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Electric_cyl_scans'> extends True ? Prisma__Electric_cyl_scansClient<Electric_cyl_scansGetPayload<T>> : Prisma__Electric_cyl_scansClient<Electric_cyl_scansGetPayload<T> | null, null>

    /**
     * Find one Electric_cyl_scans that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {Electric_cyl_scansFindUniqueOrThrowArgs} args - Arguments to find a Electric_cyl_scans
     * @example
     * // Get one Electric_cyl_scans
     * const electric_cyl_scans = await prisma.electric_cyl_scans.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends Electric_cyl_scansFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, Electric_cyl_scansFindUniqueOrThrowArgs>
    ): Prisma__Electric_cyl_scansClient<Electric_cyl_scansGetPayload<T>>

    /**
     * Find the first Electric_cyl_scans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_cyl_scansFindFirstArgs} args - Arguments to find a Electric_cyl_scans
     * @example
     * // Get one Electric_cyl_scans
     * const electric_cyl_scans = await prisma.electric_cyl_scans.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends Electric_cyl_scansFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, Electric_cyl_scansFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Electric_cyl_scans'> extends True ? Prisma__Electric_cyl_scansClient<Electric_cyl_scansGetPayload<T>> : Prisma__Electric_cyl_scansClient<Electric_cyl_scansGetPayload<T> | null, null>

    /**
     * Find the first Electric_cyl_scans that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_cyl_scansFindFirstOrThrowArgs} args - Arguments to find a Electric_cyl_scans
     * @example
     * // Get one Electric_cyl_scans
     * const electric_cyl_scans = await prisma.electric_cyl_scans.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends Electric_cyl_scansFindFirstOrThrowArgs>(
      args?: SelectSubset<T, Electric_cyl_scansFindFirstOrThrowArgs>
    ): Prisma__Electric_cyl_scansClient<Electric_cyl_scansGetPayload<T>>

    /**
     * Find zero or more Electric_cyl_scans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_cyl_scansFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Electric_cyl_scans
     * const electric_cyl_scans = await prisma.electric_cyl_scans.findMany()
     * 
     * // Get first 10 Electric_cyl_scans
     * const electric_cyl_scans = await prisma.electric_cyl_scans.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const electric_cyl_scansWithIdOnly = await prisma.electric_cyl_scans.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends Electric_cyl_scansFindManyArgs>(
      args?: SelectSubset<T, Electric_cyl_scansFindManyArgs>
    ): PrismaPromise<Array<Electric_cyl_scansGetPayload<T>>>

    /**
     * Create a Electric_cyl_scans.
     * @param {Electric_cyl_scansCreateArgs} args - Arguments to create a Electric_cyl_scans.
     * @example
     * // Create one Electric_cyl_scans
     * const Electric_cyl_scans = await prisma.electric_cyl_scans.create({
     *   data: {
     *     // ... data to create a Electric_cyl_scans
     *   }
     * })
     * 
    **/
    create<T extends Electric_cyl_scansCreateArgs>(
      args: SelectSubset<T, Electric_cyl_scansCreateArgs>
    ): Prisma__Electric_cyl_scansClient<Electric_cyl_scansGetPayload<T>>

    /**
     * Create many Electric_cyl_scans.
     *     @param {Electric_cyl_scansCreateManyArgs} args - Arguments to create many Electric_cyl_scans.
     *     @example
     *     // Create many Electric_cyl_scans
     *     const electric_cyl_scans = await prisma.electric_cyl_scans.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends Electric_cyl_scansCreateManyArgs>(
      args?: SelectSubset<T, Electric_cyl_scansCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Electric_cyl_scans.
     * @param {Electric_cyl_scansDeleteArgs} args - Arguments to delete one Electric_cyl_scans.
     * @example
     * // Delete one Electric_cyl_scans
     * const Electric_cyl_scans = await prisma.electric_cyl_scans.delete({
     *   where: {
     *     // ... filter to delete one Electric_cyl_scans
     *   }
     * })
     * 
    **/
    delete<T extends Electric_cyl_scansDeleteArgs>(
      args: SelectSubset<T, Electric_cyl_scansDeleteArgs>
    ): Prisma__Electric_cyl_scansClient<Electric_cyl_scansGetPayload<T>>

    /**
     * Update one Electric_cyl_scans.
     * @param {Electric_cyl_scansUpdateArgs} args - Arguments to update one Electric_cyl_scans.
     * @example
     * // Update one Electric_cyl_scans
     * const electric_cyl_scans = await prisma.electric_cyl_scans.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends Electric_cyl_scansUpdateArgs>(
      args: SelectSubset<T, Electric_cyl_scansUpdateArgs>
    ): Prisma__Electric_cyl_scansClient<Electric_cyl_scansGetPayload<T>>

    /**
     * Delete zero or more Electric_cyl_scans.
     * @param {Electric_cyl_scansDeleteManyArgs} args - Arguments to filter Electric_cyl_scans to delete.
     * @example
     * // Delete a few Electric_cyl_scans
     * const { count } = await prisma.electric_cyl_scans.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends Electric_cyl_scansDeleteManyArgs>(
      args?: SelectSubset<T, Electric_cyl_scansDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Electric_cyl_scans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_cyl_scansUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Electric_cyl_scans
     * const electric_cyl_scans = await prisma.electric_cyl_scans.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends Electric_cyl_scansUpdateManyArgs>(
      args: SelectSubset<T, Electric_cyl_scansUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Electric_cyl_scans.
     * @param {Electric_cyl_scansUpsertArgs} args - Arguments to update or create a Electric_cyl_scans.
     * @example
     * // Update or create a Electric_cyl_scans
     * const electric_cyl_scans = await prisma.electric_cyl_scans.upsert({
     *   create: {
     *     // ... data to create a Electric_cyl_scans
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Electric_cyl_scans we want to update
     *   }
     * })
    **/
    upsert<T extends Electric_cyl_scansUpsertArgs>(
      args: SelectSubset<T, Electric_cyl_scansUpsertArgs>
    ): Prisma__Electric_cyl_scansClient<Electric_cyl_scansGetPayload<T>>

    /**
     * Count the number of Electric_cyl_scans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_cyl_scansCountArgs} args - Arguments to filter Electric_cyl_scans to count.
     * @example
     * // Count the number of Electric_cyl_scans
     * const count = await prisma.electric_cyl_scans.count({
     *   where: {
     *     // ... the filter for the Electric_cyl_scans we want to count
     *   }
     * })
    **/
    count<T extends Electric_cyl_scansCountArgs>(
      args?: Subset<T, Electric_cyl_scansCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Electric_cyl_scansCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Electric_cyl_scans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_cyl_scansAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Electric_cyl_scansAggregateArgs>(args: Subset<T, Electric_cyl_scansAggregateArgs>): PrismaPromise<GetElectric_cyl_scansAggregateType<T>>

    /**
     * Group by Electric_cyl_scans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_cyl_scansGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Electric_cyl_scansGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Electric_cyl_scansGroupByArgs['orderBy'] }
        : { orderBy?: Electric_cyl_scansGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Electric_cyl_scansGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetElectric_cyl_scansGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Electric_cyl_scans.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__Electric_cyl_scansClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    electric_cyl_images<T extends Electric_cyl_scans$electric_cyl_imagesArgs= {}>(args?: Subset<T, Electric_cyl_scans$electric_cyl_imagesArgs>): PrismaPromise<Array<Electric_cyl_imagesGetPayload<T>>| Null>;

    electric_phenotypers<T extends Electric_cyl_scans$electric_phenotypersArgs= {}>(args?: Subset<T, Electric_cyl_scans$electric_phenotypersArgs>): Prisma__Electric_phenotypersClient<Electric_phenotypersGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Electric_cyl_scans base type for findUnique actions
   */
  export type Electric_cyl_scansFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Electric_cyl_scans
     * 
    **/
    select?: Electric_cyl_scansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_scansInclude | null
    /**
     * Filter, which Electric_cyl_scans to fetch.
     * 
    **/
    where: Electric_cyl_scansWhereUniqueInput
  }

  /**
   * Electric_cyl_scans findUnique
   */
  export interface Electric_cyl_scansFindUniqueArgs extends Electric_cyl_scansFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Electric_cyl_scans findUniqueOrThrow
   */
  export type Electric_cyl_scansFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Electric_cyl_scans
     * 
    **/
    select?: Electric_cyl_scansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_scansInclude | null
    /**
     * Filter, which Electric_cyl_scans to fetch.
     * 
    **/
    where: Electric_cyl_scansWhereUniqueInput
  }


  /**
   * Electric_cyl_scans base type for findFirst actions
   */
  export type Electric_cyl_scansFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Electric_cyl_scans
     * 
    **/
    select?: Electric_cyl_scansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_scansInclude | null
    /**
     * Filter, which Electric_cyl_scans to fetch.
     * 
    **/
    where?: Electric_cyl_scansWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Electric_cyl_scans to fetch.
     * 
    **/
    orderBy?: Enumerable<Electric_cyl_scansOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Electric_cyl_scans.
     * 
    **/
    cursor?: Electric_cyl_scansWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Electric_cyl_scans from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Electric_cyl_scans.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Electric_cyl_scans.
     * 
    **/
    distinct?: Enumerable<Electric_cyl_scansScalarFieldEnum>
  }

  /**
   * Electric_cyl_scans findFirst
   */
  export interface Electric_cyl_scansFindFirstArgs extends Electric_cyl_scansFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Electric_cyl_scans findFirstOrThrow
   */
  export type Electric_cyl_scansFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Electric_cyl_scans
     * 
    **/
    select?: Electric_cyl_scansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_scansInclude | null
    /**
     * Filter, which Electric_cyl_scans to fetch.
     * 
    **/
    where?: Electric_cyl_scansWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Electric_cyl_scans to fetch.
     * 
    **/
    orderBy?: Enumerable<Electric_cyl_scansOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Electric_cyl_scans.
     * 
    **/
    cursor?: Electric_cyl_scansWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Electric_cyl_scans from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Electric_cyl_scans.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Electric_cyl_scans.
     * 
    **/
    distinct?: Enumerable<Electric_cyl_scansScalarFieldEnum>
  }


  /**
   * Electric_cyl_scans findMany
   */
  export type Electric_cyl_scansFindManyArgs = {
    /**
     * Select specific fields to fetch from the Electric_cyl_scans
     * 
    **/
    select?: Electric_cyl_scansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_scansInclude | null
    /**
     * Filter, which Electric_cyl_scans to fetch.
     * 
    **/
    where?: Electric_cyl_scansWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Electric_cyl_scans to fetch.
     * 
    **/
    orderBy?: Enumerable<Electric_cyl_scansOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Electric_cyl_scans.
     * 
    **/
    cursor?: Electric_cyl_scansWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Electric_cyl_scans from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Electric_cyl_scans.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Electric_cyl_scansScalarFieldEnum>
  }


  /**
   * Electric_cyl_scans create
   */
  export type Electric_cyl_scansCreateArgs = {
    /**
     * Select specific fields to fetch from the Electric_cyl_scans
     * 
    **/
    select?: Electric_cyl_scansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_scansInclude | null
    /**
     * The data needed to create a Electric_cyl_scans.
     * 
    **/
    data: XOR<Electric_cyl_scansCreateInput, Electric_cyl_scansUncheckedCreateInput>
  }


  /**
   * Electric_cyl_scans createMany
   */
  export type Electric_cyl_scansCreateManyArgs = {
    /**
     * The data used to create many Electric_cyl_scans.
     * 
    **/
    data: Enumerable<Electric_cyl_scansCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Electric_cyl_scans update
   */
  export type Electric_cyl_scansUpdateArgs = {
    /**
     * Select specific fields to fetch from the Electric_cyl_scans
     * 
    **/
    select?: Electric_cyl_scansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_scansInclude | null
    /**
     * The data needed to update a Electric_cyl_scans.
     * 
    **/
    data: XOR<Electric_cyl_scansUpdateInput, Electric_cyl_scansUncheckedUpdateInput>
    /**
     * Choose, which Electric_cyl_scans to update.
     * 
    **/
    where: Electric_cyl_scansWhereUniqueInput
  }


  /**
   * Electric_cyl_scans updateMany
   */
  export type Electric_cyl_scansUpdateManyArgs = {
    /**
     * The data used to update Electric_cyl_scans.
     * 
    **/
    data: XOR<Electric_cyl_scansUpdateManyMutationInput, Electric_cyl_scansUncheckedUpdateManyInput>
    /**
     * Filter which Electric_cyl_scans to update
     * 
    **/
    where?: Electric_cyl_scansWhereInput
  }


  /**
   * Electric_cyl_scans upsert
   */
  export type Electric_cyl_scansUpsertArgs = {
    /**
     * Select specific fields to fetch from the Electric_cyl_scans
     * 
    **/
    select?: Electric_cyl_scansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_scansInclude | null
    /**
     * The filter to search for the Electric_cyl_scans to update in case it exists.
     * 
    **/
    where: Electric_cyl_scansWhereUniqueInput
    /**
     * In case the Electric_cyl_scans found by the `where` argument doesn't exist, create a new Electric_cyl_scans with this data.
     * 
    **/
    create: XOR<Electric_cyl_scansCreateInput, Electric_cyl_scansUncheckedCreateInput>
    /**
     * In case the Electric_cyl_scans was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<Electric_cyl_scansUpdateInput, Electric_cyl_scansUncheckedUpdateInput>
  }


  /**
   * Electric_cyl_scans delete
   */
  export type Electric_cyl_scansDeleteArgs = {
    /**
     * Select specific fields to fetch from the Electric_cyl_scans
     * 
    **/
    select?: Electric_cyl_scansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_scansInclude | null
    /**
     * Filter which Electric_cyl_scans to delete.
     * 
    **/
    where: Electric_cyl_scansWhereUniqueInput
  }


  /**
   * Electric_cyl_scans deleteMany
   */
  export type Electric_cyl_scansDeleteManyArgs = {
    /**
     * Filter which Electric_cyl_scans to delete
     * 
    **/
    where?: Electric_cyl_scansWhereInput
  }


  /**
   * Electric_cyl_scans.electric_cyl_images
   */
  export type Electric_cyl_scans$electric_cyl_imagesArgs = {
    /**
     * Select specific fields to fetch from the Electric_cyl_images
     * 
    **/
    select?: Electric_cyl_imagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_imagesInclude | null
    where?: Electric_cyl_imagesWhereInput
    orderBy?: Enumerable<Electric_cyl_imagesOrderByWithRelationInput>
    cursor?: Electric_cyl_imagesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Electric_cyl_imagesScalarFieldEnum>
  }


  /**
   * Electric_cyl_scans.electric_phenotypers
   */
  export type Electric_cyl_scans$electric_phenotypersArgs = {
    /**
     * Select specific fields to fetch from the Electric_phenotypers
     * 
    **/
    select?: Electric_phenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_phenotypersInclude | null
    where?: Electric_phenotypersWhereInput
  }


  /**
   * Electric_cyl_scans without action
   */
  export type Electric_cyl_scansArgs = {
    /**
     * Select specific fields to fetch from the Electric_cyl_scans
     * 
    **/
    select?: Electric_cyl_scansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_scansInclude | null
  }



  /**
   * Model Electric_phenotypers
   */


  export type AggregateElectric_phenotypers = {
    _count: Electric_phenotypersCountAggregateOutputType | null
    _min: Electric_phenotypersMinAggregateOutputType | null
    _max: Electric_phenotypersMaxAggregateOutputType | null
  }

  export type Electric_phenotypersMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
  }

  export type Electric_phenotypersMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
  }

  export type Electric_phenotypersCountAggregateOutputType = {
    id: number
    name: number
    email: number
    _all: number
  }


  export type Electric_phenotypersMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
  }

  export type Electric_phenotypersMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
  }

  export type Electric_phenotypersCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    _all?: true
  }

  export type Electric_phenotypersAggregateArgs = {
    /**
     * Filter which Electric_phenotypers to aggregate.
     * 
    **/
    where?: Electric_phenotypersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Electric_phenotypers to fetch.
     * 
    **/
    orderBy?: Enumerable<Electric_phenotypersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: Electric_phenotypersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Electric_phenotypers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Electric_phenotypers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Electric_phenotypers
    **/
    _count?: true | Electric_phenotypersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Electric_phenotypersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Electric_phenotypersMaxAggregateInputType
  }

  export type GetElectric_phenotypersAggregateType<T extends Electric_phenotypersAggregateArgs> = {
        [P in keyof T & keyof AggregateElectric_phenotypers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateElectric_phenotypers[P]>
      : GetScalarType<T[P], AggregateElectric_phenotypers[P]>
  }




  export type Electric_phenotypersGroupByArgs = {
    where?: Electric_phenotypersWhereInput
    orderBy?: Enumerable<Electric_phenotypersOrderByWithAggregationInput>
    by: Array<Electric_phenotypersScalarFieldEnum>
    having?: Electric_phenotypersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Electric_phenotypersCountAggregateInputType | true
    _min?: Electric_phenotypersMinAggregateInputType
    _max?: Electric_phenotypersMaxAggregateInputType
  }


  export type Electric_phenotypersGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    _count: Electric_phenotypersCountAggregateOutputType | null
    _min: Electric_phenotypersMinAggregateOutputType | null
    _max: Electric_phenotypersMaxAggregateOutputType | null
  }

  type GetElectric_phenotypersGroupByPayload<T extends Electric_phenotypersGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Electric_phenotypersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Electric_phenotypersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Electric_phenotypersGroupByOutputType[P]>
            : GetScalarType<T[P], Electric_phenotypersGroupByOutputType[P]>
        }
      >
    >


  export type Electric_phenotypersSelect = {
    id?: boolean
    name?: boolean
    email?: boolean
    electric_cyl_scans?: boolean | Electric_phenotypers$electric_cyl_scansArgs
    _count?: boolean | Electric_phenotypersCountOutputTypeArgs
  }


  export type Electric_phenotypersInclude = {
    electric_cyl_scans?: boolean | Electric_phenotypers$electric_cyl_scansArgs
    _count?: boolean | Electric_phenotypersCountOutputTypeArgs
  } 

  export type Electric_phenotypersGetPayload<S extends boolean | null | undefined | Electric_phenotypersArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Electric_phenotypers :
    S extends undefined ? never :
    S extends { include: any } & (Electric_phenotypersArgs | Electric_phenotypersFindManyArgs)
    ? Electric_phenotypers  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'electric_cyl_scans' ? Array < Electric_cyl_scansGetPayload<S['include'][P]>>  :
        P extends '_count' ? Electric_phenotypersCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (Electric_phenotypersArgs | Electric_phenotypersFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'electric_cyl_scans' ? Array < Electric_cyl_scansGetPayload<S['select'][P]>>  :
        P extends '_count' ? Electric_phenotypersCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Electric_phenotypers ? Electric_phenotypers[P] : never
  } 
      : Electric_phenotypers


  type Electric_phenotypersCountArgs = Merge<
    Omit<Electric_phenotypersFindManyArgs, 'select' | 'include'> & {
      select?: Electric_phenotypersCountAggregateInputType | true
    }
  >

  export interface Electric_phenotypersDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Electric_phenotypers that matches the filter.
     * @param {Electric_phenotypersFindUniqueArgs} args - Arguments to find a Electric_phenotypers
     * @example
     * // Get one Electric_phenotypers
     * const electric_phenotypers = await prisma.electric_phenotypers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends Electric_phenotypersFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, Electric_phenotypersFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Electric_phenotypers'> extends True ? Prisma__Electric_phenotypersClient<Electric_phenotypersGetPayload<T>> : Prisma__Electric_phenotypersClient<Electric_phenotypersGetPayload<T> | null, null>

    /**
     * Find one Electric_phenotypers that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {Electric_phenotypersFindUniqueOrThrowArgs} args - Arguments to find a Electric_phenotypers
     * @example
     * // Get one Electric_phenotypers
     * const electric_phenotypers = await prisma.electric_phenotypers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends Electric_phenotypersFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, Electric_phenotypersFindUniqueOrThrowArgs>
    ): Prisma__Electric_phenotypersClient<Electric_phenotypersGetPayload<T>>

    /**
     * Find the first Electric_phenotypers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_phenotypersFindFirstArgs} args - Arguments to find a Electric_phenotypers
     * @example
     * // Get one Electric_phenotypers
     * const electric_phenotypers = await prisma.electric_phenotypers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends Electric_phenotypersFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, Electric_phenotypersFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Electric_phenotypers'> extends True ? Prisma__Electric_phenotypersClient<Electric_phenotypersGetPayload<T>> : Prisma__Electric_phenotypersClient<Electric_phenotypersGetPayload<T> | null, null>

    /**
     * Find the first Electric_phenotypers that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_phenotypersFindFirstOrThrowArgs} args - Arguments to find a Electric_phenotypers
     * @example
     * // Get one Electric_phenotypers
     * const electric_phenotypers = await prisma.electric_phenotypers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends Electric_phenotypersFindFirstOrThrowArgs>(
      args?: SelectSubset<T, Electric_phenotypersFindFirstOrThrowArgs>
    ): Prisma__Electric_phenotypersClient<Electric_phenotypersGetPayload<T>>

    /**
     * Find zero or more Electric_phenotypers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_phenotypersFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Electric_phenotypers
     * const electric_phenotypers = await prisma.electric_phenotypers.findMany()
     * 
     * // Get first 10 Electric_phenotypers
     * const electric_phenotypers = await prisma.electric_phenotypers.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const electric_phenotypersWithIdOnly = await prisma.electric_phenotypers.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends Electric_phenotypersFindManyArgs>(
      args?: SelectSubset<T, Electric_phenotypersFindManyArgs>
    ): PrismaPromise<Array<Electric_phenotypersGetPayload<T>>>

    /**
     * Create a Electric_phenotypers.
     * @param {Electric_phenotypersCreateArgs} args - Arguments to create a Electric_phenotypers.
     * @example
     * // Create one Electric_phenotypers
     * const Electric_phenotypers = await prisma.electric_phenotypers.create({
     *   data: {
     *     // ... data to create a Electric_phenotypers
     *   }
     * })
     * 
    **/
    create<T extends Electric_phenotypersCreateArgs>(
      args: SelectSubset<T, Electric_phenotypersCreateArgs>
    ): Prisma__Electric_phenotypersClient<Electric_phenotypersGetPayload<T>>

    /**
     * Create many Electric_phenotypers.
     *     @param {Electric_phenotypersCreateManyArgs} args - Arguments to create many Electric_phenotypers.
     *     @example
     *     // Create many Electric_phenotypers
     *     const electric_phenotypers = await prisma.electric_phenotypers.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends Electric_phenotypersCreateManyArgs>(
      args?: SelectSubset<T, Electric_phenotypersCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Electric_phenotypers.
     * @param {Electric_phenotypersDeleteArgs} args - Arguments to delete one Electric_phenotypers.
     * @example
     * // Delete one Electric_phenotypers
     * const Electric_phenotypers = await prisma.electric_phenotypers.delete({
     *   where: {
     *     // ... filter to delete one Electric_phenotypers
     *   }
     * })
     * 
    **/
    delete<T extends Electric_phenotypersDeleteArgs>(
      args: SelectSubset<T, Electric_phenotypersDeleteArgs>
    ): Prisma__Electric_phenotypersClient<Electric_phenotypersGetPayload<T>>

    /**
     * Update one Electric_phenotypers.
     * @param {Electric_phenotypersUpdateArgs} args - Arguments to update one Electric_phenotypers.
     * @example
     * // Update one Electric_phenotypers
     * const electric_phenotypers = await prisma.electric_phenotypers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends Electric_phenotypersUpdateArgs>(
      args: SelectSubset<T, Electric_phenotypersUpdateArgs>
    ): Prisma__Electric_phenotypersClient<Electric_phenotypersGetPayload<T>>

    /**
     * Delete zero or more Electric_phenotypers.
     * @param {Electric_phenotypersDeleteManyArgs} args - Arguments to filter Electric_phenotypers to delete.
     * @example
     * // Delete a few Electric_phenotypers
     * const { count } = await prisma.electric_phenotypers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends Electric_phenotypersDeleteManyArgs>(
      args?: SelectSubset<T, Electric_phenotypersDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Electric_phenotypers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_phenotypersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Electric_phenotypers
     * const electric_phenotypers = await prisma.electric_phenotypers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends Electric_phenotypersUpdateManyArgs>(
      args: SelectSubset<T, Electric_phenotypersUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Electric_phenotypers.
     * @param {Electric_phenotypersUpsertArgs} args - Arguments to update or create a Electric_phenotypers.
     * @example
     * // Update or create a Electric_phenotypers
     * const electric_phenotypers = await prisma.electric_phenotypers.upsert({
     *   create: {
     *     // ... data to create a Electric_phenotypers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Electric_phenotypers we want to update
     *   }
     * })
    **/
    upsert<T extends Electric_phenotypersUpsertArgs>(
      args: SelectSubset<T, Electric_phenotypersUpsertArgs>
    ): Prisma__Electric_phenotypersClient<Electric_phenotypersGetPayload<T>>

    /**
     * Count the number of Electric_phenotypers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_phenotypersCountArgs} args - Arguments to filter Electric_phenotypers to count.
     * @example
     * // Count the number of Electric_phenotypers
     * const count = await prisma.electric_phenotypers.count({
     *   where: {
     *     // ... the filter for the Electric_phenotypers we want to count
     *   }
     * })
    **/
    count<T extends Electric_phenotypersCountArgs>(
      args?: Subset<T, Electric_phenotypersCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Electric_phenotypersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Electric_phenotypers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_phenotypersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Electric_phenotypersAggregateArgs>(args: Subset<T, Electric_phenotypersAggregateArgs>): PrismaPromise<GetElectric_phenotypersAggregateType<T>>

    /**
     * Group by Electric_phenotypers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Electric_phenotypersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Electric_phenotypersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Electric_phenotypersGroupByArgs['orderBy'] }
        : { orderBy?: Electric_phenotypersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Electric_phenotypersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetElectric_phenotypersGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Electric_phenotypers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__Electric_phenotypersClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    electric_cyl_scans<T extends Electric_phenotypers$electric_cyl_scansArgs= {}>(args?: Subset<T, Electric_phenotypers$electric_cyl_scansArgs>): PrismaPromise<Array<Electric_cyl_scansGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Electric_phenotypers base type for findUnique actions
   */
  export type Electric_phenotypersFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Electric_phenotypers
     * 
    **/
    select?: Electric_phenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_phenotypersInclude | null
    /**
     * Filter, which Electric_phenotypers to fetch.
     * 
    **/
    where: Electric_phenotypersWhereUniqueInput
  }

  /**
   * Electric_phenotypers findUnique
   */
  export interface Electric_phenotypersFindUniqueArgs extends Electric_phenotypersFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Electric_phenotypers findUniqueOrThrow
   */
  export type Electric_phenotypersFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Electric_phenotypers
     * 
    **/
    select?: Electric_phenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_phenotypersInclude | null
    /**
     * Filter, which Electric_phenotypers to fetch.
     * 
    **/
    where: Electric_phenotypersWhereUniqueInput
  }


  /**
   * Electric_phenotypers base type for findFirst actions
   */
  export type Electric_phenotypersFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Electric_phenotypers
     * 
    **/
    select?: Electric_phenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_phenotypersInclude | null
    /**
     * Filter, which Electric_phenotypers to fetch.
     * 
    **/
    where?: Electric_phenotypersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Electric_phenotypers to fetch.
     * 
    **/
    orderBy?: Enumerable<Electric_phenotypersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Electric_phenotypers.
     * 
    **/
    cursor?: Electric_phenotypersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Electric_phenotypers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Electric_phenotypers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Electric_phenotypers.
     * 
    **/
    distinct?: Enumerable<Electric_phenotypersScalarFieldEnum>
  }

  /**
   * Electric_phenotypers findFirst
   */
  export interface Electric_phenotypersFindFirstArgs extends Electric_phenotypersFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Electric_phenotypers findFirstOrThrow
   */
  export type Electric_phenotypersFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Electric_phenotypers
     * 
    **/
    select?: Electric_phenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_phenotypersInclude | null
    /**
     * Filter, which Electric_phenotypers to fetch.
     * 
    **/
    where?: Electric_phenotypersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Electric_phenotypers to fetch.
     * 
    **/
    orderBy?: Enumerable<Electric_phenotypersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Electric_phenotypers.
     * 
    **/
    cursor?: Electric_phenotypersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Electric_phenotypers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Electric_phenotypers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Electric_phenotypers.
     * 
    **/
    distinct?: Enumerable<Electric_phenotypersScalarFieldEnum>
  }


  /**
   * Electric_phenotypers findMany
   */
  export type Electric_phenotypersFindManyArgs = {
    /**
     * Select specific fields to fetch from the Electric_phenotypers
     * 
    **/
    select?: Electric_phenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_phenotypersInclude | null
    /**
     * Filter, which Electric_phenotypers to fetch.
     * 
    **/
    where?: Electric_phenotypersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Electric_phenotypers to fetch.
     * 
    **/
    orderBy?: Enumerable<Electric_phenotypersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Electric_phenotypers.
     * 
    **/
    cursor?: Electric_phenotypersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Electric_phenotypers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Electric_phenotypers.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Electric_phenotypersScalarFieldEnum>
  }


  /**
   * Electric_phenotypers create
   */
  export type Electric_phenotypersCreateArgs = {
    /**
     * Select specific fields to fetch from the Electric_phenotypers
     * 
    **/
    select?: Electric_phenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_phenotypersInclude | null
    /**
     * The data needed to create a Electric_phenotypers.
     * 
    **/
    data: XOR<Electric_phenotypersCreateInput, Electric_phenotypersUncheckedCreateInput>
  }


  /**
   * Electric_phenotypers createMany
   */
  export type Electric_phenotypersCreateManyArgs = {
    /**
     * The data used to create many Electric_phenotypers.
     * 
    **/
    data: Enumerable<Electric_phenotypersCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Electric_phenotypers update
   */
  export type Electric_phenotypersUpdateArgs = {
    /**
     * Select specific fields to fetch from the Electric_phenotypers
     * 
    **/
    select?: Electric_phenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_phenotypersInclude | null
    /**
     * The data needed to update a Electric_phenotypers.
     * 
    **/
    data: XOR<Electric_phenotypersUpdateInput, Electric_phenotypersUncheckedUpdateInput>
    /**
     * Choose, which Electric_phenotypers to update.
     * 
    **/
    where: Electric_phenotypersWhereUniqueInput
  }


  /**
   * Electric_phenotypers updateMany
   */
  export type Electric_phenotypersUpdateManyArgs = {
    /**
     * The data used to update Electric_phenotypers.
     * 
    **/
    data: XOR<Electric_phenotypersUpdateManyMutationInput, Electric_phenotypersUncheckedUpdateManyInput>
    /**
     * Filter which Electric_phenotypers to update
     * 
    **/
    where?: Electric_phenotypersWhereInput
  }


  /**
   * Electric_phenotypers upsert
   */
  export type Electric_phenotypersUpsertArgs = {
    /**
     * Select specific fields to fetch from the Electric_phenotypers
     * 
    **/
    select?: Electric_phenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_phenotypersInclude | null
    /**
     * The filter to search for the Electric_phenotypers to update in case it exists.
     * 
    **/
    where: Electric_phenotypersWhereUniqueInput
    /**
     * In case the Electric_phenotypers found by the `where` argument doesn't exist, create a new Electric_phenotypers with this data.
     * 
    **/
    create: XOR<Electric_phenotypersCreateInput, Electric_phenotypersUncheckedCreateInput>
    /**
     * In case the Electric_phenotypers was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<Electric_phenotypersUpdateInput, Electric_phenotypersUncheckedUpdateInput>
  }


  /**
   * Electric_phenotypers delete
   */
  export type Electric_phenotypersDeleteArgs = {
    /**
     * Select specific fields to fetch from the Electric_phenotypers
     * 
    **/
    select?: Electric_phenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_phenotypersInclude | null
    /**
     * Filter which Electric_phenotypers to delete.
     * 
    **/
    where: Electric_phenotypersWhereUniqueInput
  }


  /**
   * Electric_phenotypers deleteMany
   */
  export type Electric_phenotypersDeleteManyArgs = {
    /**
     * Filter which Electric_phenotypers to delete
     * 
    **/
    where?: Electric_phenotypersWhereInput
  }


  /**
   * Electric_phenotypers.electric_cyl_scans
   */
  export type Electric_phenotypers$electric_cyl_scansArgs = {
    /**
     * Select specific fields to fetch from the Electric_cyl_scans
     * 
    **/
    select?: Electric_cyl_scansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_cyl_scansInclude | null
    where?: Electric_cyl_scansWhereInput
    orderBy?: Enumerable<Electric_cyl_scansOrderByWithRelationInput>
    cursor?: Electric_cyl_scansWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Electric_cyl_scansScalarFieldEnum>
  }


  /**
   * Electric_phenotypers without action
   */
  export type Electric_phenotypersArgs = {
    /**
     * Select specific fields to fetch from the Electric_phenotypers
     * 
    **/
    select?: Electric_phenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Electric_phenotypersInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Electric_cyl_imagesScalarFieldEnum: {
    id: 'id',
    scan_id: 'scan_id',
    frame_number: 'frame_number',
    path: 'path',
    url: 'url',
    status: 'status',
    supabase_object_path: 'supabase_object_path'
  };

  export type Electric_cyl_imagesScalarFieldEnum = (typeof Electric_cyl_imagesScalarFieldEnum)[keyof typeof Electric_cyl_imagesScalarFieldEnum]


  export const Electric_cyl_scansScalarFieldEnum: {
    id: 'id',
    phenotyper_id: 'phenotyper_id',
    scanner_id: 'scanner_id',
    plant_qr_code: 'plant_qr_code',
    path: 'path',
    capture_date: 'capture_date',
    num_frames: 'num_frames',
    exposure_time: 'exposure_time',
    gain: 'gain',
    brightness: 'brightness',
    contrast: 'contrast',
    gamma: 'gamma',
    seconds_per_rot: 'seconds_per_rot',
    experiment_name: 'experiment_name',
    wave_number: 'wave_number',
    plant_age_days: 'plant_age_days'
  };

  export type Electric_cyl_scansScalarFieldEnum = (typeof Electric_cyl_scansScalarFieldEnum)[keyof typeof Electric_cyl_scansScalarFieldEnum]


  export const Electric_phenotypersScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email'
  };

  export type Electric_phenotypersScalarFieldEnum = (typeof Electric_phenotypersScalarFieldEnum)[keyof typeof Electric_phenotypersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type Electric_cyl_imagesWhereInput = {
    AND?: Enumerable<Electric_cyl_imagesWhereInput>
    OR?: Enumerable<Electric_cyl_imagesWhereInput>
    NOT?: Enumerable<Electric_cyl_imagesWhereInput>
    id?: UuidFilter<"Electric_cyl_images"> | string
    scan_id?: UuidNullableFilter<"Electric_cyl_images"> | string | null
    frame_number?: IntNullableFilter<"Electric_cyl_images"> | number | null
    path?: StringNullableFilter<"Electric_cyl_images"> | string | null
    url?: StringNullableFilter<"Electric_cyl_images"> | string | null
    status?: StringNullableFilter<"Electric_cyl_images"> | string | null
    supabase_object_path?: StringNullableFilter<"Electric_cyl_images"> | string | null
    electric_cyl_scans?: XOR<Electric_cyl_scansNullableRelationFilter, Electric_cyl_scansWhereInput> | null
  }

  export type Electric_cyl_imagesOrderByWithRelationInput = {
    id?: SortOrder
    scan_id?: SortOrderInput | SortOrder
    frame_number?: SortOrderInput | SortOrder
    path?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    supabase_object_path?: SortOrderInput | SortOrder
    electric_cyl_scans?: Electric_cyl_scansOrderByWithRelationInput
  }

  export type Electric_cyl_imagesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: Enumerable<Electric_cyl_imagesWhereInput>
    OR?: Enumerable<Electric_cyl_imagesWhereInput>
    NOT?: Enumerable<Electric_cyl_imagesWhereInput>
    scan_id?: UuidNullableFilter<"Electric_cyl_images"> | string | null
    frame_number?: IntNullableFilter<"Electric_cyl_images"> | number | null
    path?: StringNullableFilter<"Electric_cyl_images"> | string | null
    url?: StringNullableFilter<"Electric_cyl_images"> | string | null
    status?: StringNullableFilter<"Electric_cyl_images"> | string | null
    supabase_object_path?: StringNullableFilter<"Electric_cyl_images"> | string | null
    electric_cyl_scans?: XOR<Electric_cyl_scansNullableRelationFilter, Electric_cyl_scansWhereInput> | null
  }, "id">

  export type Electric_cyl_imagesOrderByWithAggregationInput = {
    id?: SortOrder
    scan_id?: SortOrderInput | SortOrder
    frame_number?: SortOrderInput | SortOrder
    path?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    supabase_object_path?: SortOrderInput | SortOrder
    _count?: Electric_cyl_imagesCountOrderByAggregateInput
    _avg?: Electric_cyl_imagesAvgOrderByAggregateInput
    _max?: Electric_cyl_imagesMaxOrderByAggregateInput
    _min?: Electric_cyl_imagesMinOrderByAggregateInput
    _sum?: Electric_cyl_imagesSumOrderByAggregateInput
  }

  export type Electric_cyl_imagesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<Electric_cyl_imagesScalarWhereWithAggregatesInput>
    OR?: Enumerable<Electric_cyl_imagesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<Electric_cyl_imagesScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter<"Electric_cyl_images"> | string
    scan_id?: UuidNullableWithAggregatesFilter<"Electric_cyl_images"> | string | null
    frame_number?: IntNullableWithAggregatesFilter<"Electric_cyl_images"> | number | null
    path?: StringNullableWithAggregatesFilter<"Electric_cyl_images"> | string | null
    url?: StringNullableWithAggregatesFilter<"Electric_cyl_images"> | string | null
    status?: StringNullableWithAggregatesFilter<"Electric_cyl_images"> | string | null
    supabase_object_path?: StringNullableWithAggregatesFilter<"Electric_cyl_images"> | string | null
  }

  export type Electric_cyl_scansWhereInput = {
    AND?: Enumerable<Electric_cyl_scansWhereInput>
    OR?: Enumerable<Electric_cyl_scansWhereInput>
    NOT?: Enumerable<Electric_cyl_scansWhereInput>
    id?: UuidFilter<"Electric_cyl_scans"> | string
    phenotyper_id?: UuidNullableFilter<"Electric_cyl_scans"> | string | null
    scanner_id?: StringNullableFilter<"Electric_cyl_scans"> | string | null
    plant_qr_code?: StringNullableFilter<"Electric_cyl_scans"> | string | null
    path?: StringNullableFilter<"Electric_cyl_scans"> | string | null
    capture_date?: DateTimeNullableFilter<"Electric_cyl_scans"> | Date | string | null
    num_frames?: IntNullableFilter<"Electric_cyl_scans"> | number | null
    exposure_time?: IntNullableFilter<"Electric_cyl_scans"> | number | null
    gain?: FloatNullableFilter<"Electric_cyl_scans"> | number | null
    brightness?: FloatNullableFilter<"Electric_cyl_scans"> | number | null
    contrast?: FloatNullableFilter<"Electric_cyl_scans"> | number | null
    gamma?: FloatNullableFilter<"Electric_cyl_scans"> | number | null
    seconds_per_rot?: FloatNullableFilter<"Electric_cyl_scans"> | number | null
    experiment_name?: StringNullableFilter<"Electric_cyl_scans"> | string | null
    wave_number?: IntNullableFilter<"Electric_cyl_scans"> | number | null
    plant_age_days?: IntNullableFilter<"Electric_cyl_scans"> | number | null
    electric_cyl_images?: Electric_cyl_imagesListRelationFilter
    electric_phenotypers?: XOR<Electric_phenotypersNullableRelationFilter, Electric_phenotypersWhereInput> | null
  }

  export type Electric_cyl_scansOrderByWithRelationInput = {
    id?: SortOrder
    phenotyper_id?: SortOrderInput | SortOrder
    scanner_id?: SortOrderInput | SortOrder
    plant_qr_code?: SortOrderInput | SortOrder
    path?: SortOrderInput | SortOrder
    capture_date?: SortOrderInput | SortOrder
    num_frames?: SortOrderInput | SortOrder
    exposure_time?: SortOrderInput | SortOrder
    gain?: SortOrderInput | SortOrder
    brightness?: SortOrderInput | SortOrder
    contrast?: SortOrderInput | SortOrder
    gamma?: SortOrderInput | SortOrder
    seconds_per_rot?: SortOrderInput | SortOrder
    experiment_name?: SortOrderInput | SortOrder
    wave_number?: SortOrderInput | SortOrder
    plant_age_days?: SortOrderInput | SortOrder
    electric_cyl_images?: Electric_cyl_imagesOrderByRelationAggregateInput
    electric_phenotypers?: Electric_phenotypersOrderByWithRelationInput
  }

  export type Electric_cyl_scansWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: Enumerable<Electric_cyl_scansWhereInput>
    OR?: Enumerable<Electric_cyl_scansWhereInput>
    NOT?: Enumerable<Electric_cyl_scansWhereInput>
    phenotyper_id?: UuidNullableFilter<"Electric_cyl_scans"> | string | null
    scanner_id?: StringNullableFilter<"Electric_cyl_scans"> | string | null
    plant_qr_code?: StringNullableFilter<"Electric_cyl_scans"> | string | null
    path?: StringNullableFilter<"Electric_cyl_scans"> | string | null
    capture_date?: DateTimeNullableFilter<"Electric_cyl_scans"> | Date | string | null
    num_frames?: IntNullableFilter<"Electric_cyl_scans"> | number | null
    exposure_time?: IntNullableFilter<"Electric_cyl_scans"> | number | null
    gain?: FloatNullableFilter<"Electric_cyl_scans"> | number | null
    brightness?: FloatNullableFilter<"Electric_cyl_scans"> | number | null
    contrast?: FloatNullableFilter<"Electric_cyl_scans"> | number | null
    gamma?: FloatNullableFilter<"Electric_cyl_scans"> | number | null
    seconds_per_rot?: FloatNullableFilter<"Electric_cyl_scans"> | number | null
    experiment_name?: StringNullableFilter<"Electric_cyl_scans"> | string | null
    wave_number?: IntNullableFilter<"Electric_cyl_scans"> | number | null
    plant_age_days?: IntNullableFilter<"Electric_cyl_scans"> | number | null
    electric_cyl_images?: Electric_cyl_imagesListRelationFilter
    electric_phenotypers?: XOR<Electric_phenotypersNullableRelationFilter, Electric_phenotypersWhereInput> | null
  }, "id">

  export type Electric_cyl_scansOrderByWithAggregationInput = {
    id?: SortOrder
    phenotyper_id?: SortOrderInput | SortOrder
    scanner_id?: SortOrderInput | SortOrder
    plant_qr_code?: SortOrderInput | SortOrder
    path?: SortOrderInput | SortOrder
    capture_date?: SortOrderInput | SortOrder
    num_frames?: SortOrderInput | SortOrder
    exposure_time?: SortOrderInput | SortOrder
    gain?: SortOrderInput | SortOrder
    brightness?: SortOrderInput | SortOrder
    contrast?: SortOrderInput | SortOrder
    gamma?: SortOrderInput | SortOrder
    seconds_per_rot?: SortOrderInput | SortOrder
    experiment_name?: SortOrderInput | SortOrder
    wave_number?: SortOrderInput | SortOrder
    plant_age_days?: SortOrderInput | SortOrder
    _count?: Electric_cyl_scansCountOrderByAggregateInput
    _avg?: Electric_cyl_scansAvgOrderByAggregateInput
    _max?: Electric_cyl_scansMaxOrderByAggregateInput
    _min?: Electric_cyl_scansMinOrderByAggregateInput
    _sum?: Electric_cyl_scansSumOrderByAggregateInput
  }

  export type Electric_cyl_scansScalarWhereWithAggregatesInput = {
    AND?: Enumerable<Electric_cyl_scansScalarWhereWithAggregatesInput>
    OR?: Enumerable<Electric_cyl_scansScalarWhereWithAggregatesInput>
    NOT?: Enumerable<Electric_cyl_scansScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter<"Electric_cyl_scans"> | string
    phenotyper_id?: UuidNullableWithAggregatesFilter<"Electric_cyl_scans"> | string | null
    scanner_id?: StringNullableWithAggregatesFilter<"Electric_cyl_scans"> | string | null
    plant_qr_code?: StringNullableWithAggregatesFilter<"Electric_cyl_scans"> | string | null
    path?: StringNullableWithAggregatesFilter<"Electric_cyl_scans"> | string | null
    capture_date?: DateTimeNullableWithAggregatesFilter<"Electric_cyl_scans"> | Date | string | null
    num_frames?: IntNullableWithAggregatesFilter<"Electric_cyl_scans"> | number | null
    exposure_time?: IntNullableWithAggregatesFilter<"Electric_cyl_scans"> | number | null
    gain?: FloatNullableWithAggregatesFilter<"Electric_cyl_scans"> | number | null
    brightness?: FloatNullableWithAggregatesFilter<"Electric_cyl_scans"> | number | null
    contrast?: FloatNullableWithAggregatesFilter<"Electric_cyl_scans"> | number | null
    gamma?: FloatNullableWithAggregatesFilter<"Electric_cyl_scans"> | number | null
    seconds_per_rot?: FloatNullableWithAggregatesFilter<"Electric_cyl_scans"> | number | null
    experiment_name?: StringNullableWithAggregatesFilter<"Electric_cyl_scans"> | string | null
    wave_number?: IntNullableWithAggregatesFilter<"Electric_cyl_scans"> | number | null
    plant_age_days?: IntNullableWithAggregatesFilter<"Electric_cyl_scans"> | number | null
  }

  export type Electric_phenotypersWhereInput = {
    AND?: Enumerable<Electric_phenotypersWhereInput>
    OR?: Enumerable<Electric_phenotypersWhereInput>
    NOT?: Enumerable<Electric_phenotypersWhereInput>
    id?: UuidFilter<"Electric_phenotypers"> | string
    name?: StringNullableFilter<"Electric_phenotypers"> | string | null
    email?: StringNullableFilter<"Electric_phenotypers"> | string | null
    electric_cyl_scans?: Electric_cyl_scansListRelationFilter
  }

  export type Electric_phenotypersOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    electric_cyl_scans?: Electric_cyl_scansOrderByRelationAggregateInput
  }

  export type Electric_phenotypersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: Enumerable<Electric_phenotypersWhereInput>
    OR?: Enumerable<Electric_phenotypersWhereInput>
    NOT?: Enumerable<Electric_phenotypersWhereInput>
    name?: StringNullableFilter<"Electric_phenotypers"> | string | null
    email?: StringNullableFilter<"Electric_phenotypers"> | string | null
    electric_cyl_scans?: Electric_cyl_scansListRelationFilter
  }, "id">

  export type Electric_phenotypersOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    _count?: Electric_phenotypersCountOrderByAggregateInput
    _max?: Electric_phenotypersMaxOrderByAggregateInput
    _min?: Electric_phenotypersMinOrderByAggregateInput
  }

  export type Electric_phenotypersScalarWhereWithAggregatesInput = {
    AND?: Enumerable<Electric_phenotypersScalarWhereWithAggregatesInput>
    OR?: Enumerable<Electric_phenotypersScalarWhereWithAggregatesInput>
    NOT?: Enumerable<Electric_phenotypersScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter<"Electric_phenotypers"> | string
    name?: StringNullableWithAggregatesFilter<"Electric_phenotypers"> | string | null
    email?: StringNullableWithAggregatesFilter<"Electric_phenotypers"> | string | null
  }

  export type Electric_cyl_imagesCreateInput = {
    id: string
    frame_number?: number | null
    path?: string | null
    url?: string | null
    status?: string | null
    supabase_object_path?: string | null
    electric_cyl_scans?: Electric_cyl_scansCreateNestedOneWithoutElectric_cyl_imagesInput
  }

  export type Electric_cyl_imagesUncheckedCreateInput = {
    id: string
    scan_id?: string | null
    frame_number?: number | null
    path?: string | null
    url?: string | null
    status?: string | null
    supabase_object_path?: string | null
  }

  export type Electric_cyl_imagesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    frame_number?: NullableIntFieldUpdateOperationsInput | number | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    supabase_object_path?: NullableStringFieldUpdateOperationsInput | string | null
    electric_cyl_scans?: Electric_cyl_scansUpdateOneWithoutElectric_cyl_imagesNestedInput
  }

  export type Electric_cyl_imagesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    scan_id?: NullableStringFieldUpdateOperationsInput | string | null
    frame_number?: NullableIntFieldUpdateOperationsInput | number | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    supabase_object_path?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Electric_cyl_imagesCreateManyInput = {
    id: string
    scan_id?: string | null
    frame_number?: number | null
    path?: string | null
    url?: string | null
    status?: string | null
    supabase_object_path?: string | null
  }

  export type Electric_cyl_imagesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    frame_number?: NullableIntFieldUpdateOperationsInput | number | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    supabase_object_path?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Electric_cyl_imagesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    scan_id?: NullableStringFieldUpdateOperationsInput | string | null
    frame_number?: NullableIntFieldUpdateOperationsInput | number | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    supabase_object_path?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Electric_cyl_scansCreateInput = {
    id: string
    scanner_id?: string | null
    plant_qr_code?: string | null
    path?: string | null
    capture_date?: Date | string | null
    num_frames?: number | null
    exposure_time?: number | null
    gain?: number | null
    brightness?: number | null
    contrast?: number | null
    gamma?: number | null
    seconds_per_rot?: number | null
    experiment_name?: string | null
    wave_number?: number | null
    plant_age_days?: number | null
    electric_cyl_images?: Electric_cyl_imagesCreateNestedManyWithoutElectric_cyl_scansInput
    electric_phenotypers?: Electric_phenotypersCreateNestedOneWithoutElectric_cyl_scansInput
  }

  export type Electric_cyl_scansUncheckedCreateInput = {
    id: string
    phenotyper_id?: string | null
    scanner_id?: string | null
    plant_qr_code?: string | null
    path?: string | null
    capture_date?: Date | string | null
    num_frames?: number | null
    exposure_time?: number | null
    gain?: number | null
    brightness?: number | null
    contrast?: number | null
    gamma?: number | null
    seconds_per_rot?: number | null
    experiment_name?: string | null
    wave_number?: number | null
    plant_age_days?: number | null
    electric_cyl_images?: Electric_cyl_imagesUncheckedCreateNestedManyWithoutElectric_cyl_scansInput
  }

  export type Electric_cyl_scansUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    scanner_id?: NullableStringFieldUpdateOperationsInput | string | null
    plant_qr_code?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    capture_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    num_frames?: NullableIntFieldUpdateOperationsInput | number | null
    exposure_time?: NullableIntFieldUpdateOperationsInput | number | null
    gain?: NullableFloatFieldUpdateOperationsInput | number | null
    brightness?: NullableFloatFieldUpdateOperationsInput | number | null
    contrast?: NullableFloatFieldUpdateOperationsInput | number | null
    gamma?: NullableFloatFieldUpdateOperationsInput | number | null
    seconds_per_rot?: NullableFloatFieldUpdateOperationsInput | number | null
    experiment_name?: NullableStringFieldUpdateOperationsInput | string | null
    wave_number?: NullableIntFieldUpdateOperationsInput | number | null
    plant_age_days?: NullableIntFieldUpdateOperationsInput | number | null
    electric_cyl_images?: Electric_cyl_imagesUpdateManyWithoutElectric_cyl_scansNestedInput
    electric_phenotypers?: Electric_phenotypersUpdateOneWithoutElectric_cyl_scansNestedInput
  }

  export type Electric_cyl_scansUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phenotyper_id?: NullableStringFieldUpdateOperationsInput | string | null
    scanner_id?: NullableStringFieldUpdateOperationsInput | string | null
    plant_qr_code?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    capture_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    num_frames?: NullableIntFieldUpdateOperationsInput | number | null
    exposure_time?: NullableIntFieldUpdateOperationsInput | number | null
    gain?: NullableFloatFieldUpdateOperationsInput | number | null
    brightness?: NullableFloatFieldUpdateOperationsInput | number | null
    contrast?: NullableFloatFieldUpdateOperationsInput | number | null
    gamma?: NullableFloatFieldUpdateOperationsInput | number | null
    seconds_per_rot?: NullableFloatFieldUpdateOperationsInput | number | null
    experiment_name?: NullableStringFieldUpdateOperationsInput | string | null
    wave_number?: NullableIntFieldUpdateOperationsInput | number | null
    plant_age_days?: NullableIntFieldUpdateOperationsInput | number | null
    electric_cyl_images?: Electric_cyl_imagesUncheckedUpdateManyWithoutElectric_cyl_scansNestedInput
  }

  export type Electric_cyl_scansCreateManyInput = {
    id: string
    phenotyper_id?: string | null
    scanner_id?: string | null
    plant_qr_code?: string | null
    path?: string | null
    capture_date?: Date | string | null
    num_frames?: number | null
    exposure_time?: number | null
    gain?: number | null
    brightness?: number | null
    contrast?: number | null
    gamma?: number | null
    seconds_per_rot?: number | null
    experiment_name?: string | null
    wave_number?: number | null
    plant_age_days?: number | null
  }

  export type Electric_cyl_scansUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    scanner_id?: NullableStringFieldUpdateOperationsInput | string | null
    plant_qr_code?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    capture_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    num_frames?: NullableIntFieldUpdateOperationsInput | number | null
    exposure_time?: NullableIntFieldUpdateOperationsInput | number | null
    gain?: NullableFloatFieldUpdateOperationsInput | number | null
    brightness?: NullableFloatFieldUpdateOperationsInput | number | null
    contrast?: NullableFloatFieldUpdateOperationsInput | number | null
    gamma?: NullableFloatFieldUpdateOperationsInput | number | null
    seconds_per_rot?: NullableFloatFieldUpdateOperationsInput | number | null
    experiment_name?: NullableStringFieldUpdateOperationsInput | string | null
    wave_number?: NullableIntFieldUpdateOperationsInput | number | null
    plant_age_days?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type Electric_cyl_scansUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    phenotyper_id?: NullableStringFieldUpdateOperationsInput | string | null
    scanner_id?: NullableStringFieldUpdateOperationsInput | string | null
    plant_qr_code?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    capture_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    num_frames?: NullableIntFieldUpdateOperationsInput | number | null
    exposure_time?: NullableIntFieldUpdateOperationsInput | number | null
    gain?: NullableFloatFieldUpdateOperationsInput | number | null
    brightness?: NullableFloatFieldUpdateOperationsInput | number | null
    contrast?: NullableFloatFieldUpdateOperationsInput | number | null
    gamma?: NullableFloatFieldUpdateOperationsInput | number | null
    seconds_per_rot?: NullableFloatFieldUpdateOperationsInput | number | null
    experiment_name?: NullableStringFieldUpdateOperationsInput | string | null
    wave_number?: NullableIntFieldUpdateOperationsInput | number | null
    plant_age_days?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type Electric_phenotypersCreateInput = {
    id: string
    name?: string | null
    email?: string | null
    electric_cyl_scans?: Electric_cyl_scansCreateNestedManyWithoutElectric_phenotypersInput
  }

  export type Electric_phenotypersUncheckedCreateInput = {
    id: string
    name?: string | null
    email?: string | null
    electric_cyl_scans?: Electric_cyl_scansUncheckedCreateNestedManyWithoutElectric_phenotypersInput
  }

  export type Electric_phenotypersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    electric_cyl_scans?: Electric_cyl_scansUpdateManyWithoutElectric_phenotypersNestedInput
  }

  export type Electric_phenotypersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    electric_cyl_scans?: Electric_cyl_scansUncheckedUpdateManyWithoutElectric_phenotypersNestedInput
  }

  export type Electric_phenotypersCreateManyInput = {
    id: string
    name?: string | null
    email?: string | null
  }

  export type Electric_phenotypersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Electric_phenotypersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type Electric_cyl_scansNullableRelationFilter = {
    is?: Electric_cyl_scansWhereInput | null
    isNot?: Electric_cyl_scansWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type Electric_cyl_imagesCountOrderByAggregateInput = {
    id?: SortOrder
    scan_id?: SortOrder
    frame_number?: SortOrder
    path?: SortOrder
    url?: SortOrder
    status?: SortOrder
    supabase_object_path?: SortOrder
  }

  export type Electric_cyl_imagesAvgOrderByAggregateInput = {
    frame_number?: SortOrder
  }

  export type Electric_cyl_imagesMaxOrderByAggregateInput = {
    id?: SortOrder
    scan_id?: SortOrder
    frame_number?: SortOrder
    path?: SortOrder
    url?: SortOrder
    status?: SortOrder
    supabase_object_path?: SortOrder
  }

  export type Electric_cyl_imagesMinOrderByAggregateInput = {
    id?: SortOrder
    scan_id?: SortOrder
    frame_number?: SortOrder
    path?: SortOrder
    url?: SortOrder
    status?: SortOrder
    supabase_object_path?: SortOrder
  }

  export type Electric_cyl_imagesSumOrderByAggregateInput = {
    frame_number?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type Electric_cyl_imagesListRelationFilter = {
    every?: Electric_cyl_imagesWhereInput
    some?: Electric_cyl_imagesWhereInput
    none?: Electric_cyl_imagesWhereInput
  }

  export type Electric_phenotypersNullableRelationFilter = {
    is?: Electric_phenotypersWhereInput | null
    isNot?: Electric_phenotypersWhereInput | null
  }

  export type Electric_cyl_imagesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type Electric_cyl_scansCountOrderByAggregateInput = {
    id?: SortOrder
    phenotyper_id?: SortOrder
    scanner_id?: SortOrder
    plant_qr_code?: SortOrder
    path?: SortOrder
    capture_date?: SortOrder
    num_frames?: SortOrder
    exposure_time?: SortOrder
    gain?: SortOrder
    brightness?: SortOrder
    contrast?: SortOrder
    gamma?: SortOrder
    seconds_per_rot?: SortOrder
    experiment_name?: SortOrder
    wave_number?: SortOrder
    plant_age_days?: SortOrder
  }

  export type Electric_cyl_scansAvgOrderByAggregateInput = {
    num_frames?: SortOrder
    exposure_time?: SortOrder
    gain?: SortOrder
    brightness?: SortOrder
    contrast?: SortOrder
    gamma?: SortOrder
    seconds_per_rot?: SortOrder
    wave_number?: SortOrder
    plant_age_days?: SortOrder
  }

  export type Electric_cyl_scansMaxOrderByAggregateInput = {
    id?: SortOrder
    phenotyper_id?: SortOrder
    scanner_id?: SortOrder
    plant_qr_code?: SortOrder
    path?: SortOrder
    capture_date?: SortOrder
    num_frames?: SortOrder
    exposure_time?: SortOrder
    gain?: SortOrder
    brightness?: SortOrder
    contrast?: SortOrder
    gamma?: SortOrder
    seconds_per_rot?: SortOrder
    experiment_name?: SortOrder
    wave_number?: SortOrder
    plant_age_days?: SortOrder
  }

  export type Electric_cyl_scansMinOrderByAggregateInput = {
    id?: SortOrder
    phenotyper_id?: SortOrder
    scanner_id?: SortOrder
    plant_qr_code?: SortOrder
    path?: SortOrder
    capture_date?: SortOrder
    num_frames?: SortOrder
    exposure_time?: SortOrder
    gain?: SortOrder
    brightness?: SortOrder
    contrast?: SortOrder
    gamma?: SortOrder
    seconds_per_rot?: SortOrder
    experiment_name?: SortOrder
    wave_number?: SortOrder
    plant_age_days?: SortOrder
  }

  export type Electric_cyl_scansSumOrderByAggregateInput = {
    num_frames?: SortOrder
    exposure_time?: SortOrder
    gain?: SortOrder
    brightness?: SortOrder
    contrast?: SortOrder
    gamma?: SortOrder
    seconds_per_rot?: SortOrder
    wave_number?: SortOrder
    plant_age_days?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type Electric_cyl_scansListRelationFilter = {
    every?: Electric_cyl_scansWhereInput
    some?: Electric_cyl_scansWhereInput
    none?: Electric_cyl_scansWhereInput
  }

  export type Electric_cyl_scansOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type Electric_phenotypersCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type Electric_phenotypersMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type Electric_phenotypersMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type Electric_cyl_scansCreateNestedOneWithoutElectric_cyl_imagesInput = {
    create?: XOR<Electric_cyl_scansCreateWithoutElectric_cyl_imagesInput, Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_imagesInput>
    connectOrCreate?: Electric_cyl_scansCreateOrConnectWithoutElectric_cyl_imagesInput
    connect?: Electric_cyl_scansWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type Electric_cyl_scansUpdateOneWithoutElectric_cyl_imagesNestedInput = {
    create?: XOR<Electric_cyl_scansCreateWithoutElectric_cyl_imagesInput, Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_imagesInput>
    connectOrCreate?: Electric_cyl_scansCreateOrConnectWithoutElectric_cyl_imagesInput
    upsert?: Electric_cyl_scansUpsertWithoutElectric_cyl_imagesInput
    disconnect?: Electric_cyl_scansWhereInput | boolean
    delete?: Electric_cyl_scansWhereInput | boolean
    connect?: Electric_cyl_scansWhereUniqueInput
    update?: XOR<XOR<Electric_cyl_scansUpdateToOneWithWhereWithoutElectric_cyl_imagesInput, Electric_cyl_scansUpdateWithoutElectric_cyl_imagesInput>, Electric_cyl_scansUncheckedUpdateWithoutElectric_cyl_imagesInput>
  }

  export type Electric_cyl_imagesCreateNestedManyWithoutElectric_cyl_scansInput = {
    create?: XOR<Enumerable<Electric_cyl_imagesCreateWithoutElectric_cyl_scansInput>, Enumerable<Electric_cyl_imagesUncheckedCreateWithoutElectric_cyl_scansInput>>
    connectOrCreate?: Enumerable<Electric_cyl_imagesCreateOrConnectWithoutElectric_cyl_scansInput>
    createMany?: Electric_cyl_imagesCreateManyElectric_cyl_scansInputEnvelope
    connect?: Enumerable<Electric_cyl_imagesWhereUniqueInput>
  }

  export type Electric_phenotypersCreateNestedOneWithoutElectric_cyl_scansInput = {
    create?: XOR<Electric_phenotypersCreateWithoutElectric_cyl_scansInput, Electric_phenotypersUncheckedCreateWithoutElectric_cyl_scansInput>
    connectOrCreate?: Electric_phenotypersCreateOrConnectWithoutElectric_cyl_scansInput
    connect?: Electric_phenotypersWhereUniqueInput
  }

  export type Electric_cyl_imagesUncheckedCreateNestedManyWithoutElectric_cyl_scansInput = {
    create?: XOR<Enumerable<Electric_cyl_imagesCreateWithoutElectric_cyl_scansInput>, Enumerable<Electric_cyl_imagesUncheckedCreateWithoutElectric_cyl_scansInput>>
    connectOrCreate?: Enumerable<Electric_cyl_imagesCreateOrConnectWithoutElectric_cyl_scansInput>
    createMany?: Electric_cyl_imagesCreateManyElectric_cyl_scansInputEnvelope
    connect?: Enumerable<Electric_cyl_imagesWhereUniqueInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type Electric_cyl_imagesUpdateManyWithoutElectric_cyl_scansNestedInput = {
    create?: XOR<Enumerable<Electric_cyl_imagesCreateWithoutElectric_cyl_scansInput>, Enumerable<Electric_cyl_imagesUncheckedCreateWithoutElectric_cyl_scansInput>>
    connectOrCreate?: Enumerable<Electric_cyl_imagesCreateOrConnectWithoutElectric_cyl_scansInput>
    upsert?: Enumerable<Electric_cyl_imagesUpsertWithWhereUniqueWithoutElectric_cyl_scansInput>
    createMany?: Electric_cyl_imagesCreateManyElectric_cyl_scansInputEnvelope
    set?: Enumerable<Electric_cyl_imagesWhereUniqueInput>
    disconnect?: Enumerable<Electric_cyl_imagesWhereUniqueInput>
    delete?: Enumerable<Electric_cyl_imagesWhereUniqueInput>
    connect?: Enumerable<Electric_cyl_imagesWhereUniqueInput>
    update?: Enumerable<Electric_cyl_imagesUpdateWithWhereUniqueWithoutElectric_cyl_scansInput>
    updateMany?: Enumerable<Electric_cyl_imagesUpdateManyWithWhereWithoutElectric_cyl_scansInput>
    deleteMany?: Enumerable<Electric_cyl_imagesScalarWhereInput>
  }

  export type Electric_phenotypersUpdateOneWithoutElectric_cyl_scansNestedInput = {
    create?: XOR<Electric_phenotypersCreateWithoutElectric_cyl_scansInput, Electric_phenotypersUncheckedCreateWithoutElectric_cyl_scansInput>
    connectOrCreate?: Electric_phenotypersCreateOrConnectWithoutElectric_cyl_scansInput
    upsert?: Electric_phenotypersUpsertWithoutElectric_cyl_scansInput
    disconnect?: Electric_phenotypersWhereInput | boolean
    delete?: Electric_phenotypersWhereInput | boolean
    connect?: Electric_phenotypersWhereUniqueInput
    update?: XOR<XOR<Electric_phenotypersUpdateToOneWithWhereWithoutElectric_cyl_scansInput, Electric_phenotypersUpdateWithoutElectric_cyl_scansInput>, Electric_phenotypersUncheckedUpdateWithoutElectric_cyl_scansInput>
  }

  export type Electric_cyl_imagesUncheckedUpdateManyWithoutElectric_cyl_scansNestedInput = {
    create?: XOR<Enumerable<Electric_cyl_imagesCreateWithoutElectric_cyl_scansInput>, Enumerable<Electric_cyl_imagesUncheckedCreateWithoutElectric_cyl_scansInput>>
    connectOrCreate?: Enumerable<Electric_cyl_imagesCreateOrConnectWithoutElectric_cyl_scansInput>
    upsert?: Enumerable<Electric_cyl_imagesUpsertWithWhereUniqueWithoutElectric_cyl_scansInput>
    createMany?: Electric_cyl_imagesCreateManyElectric_cyl_scansInputEnvelope
    set?: Enumerable<Electric_cyl_imagesWhereUniqueInput>
    disconnect?: Enumerable<Electric_cyl_imagesWhereUniqueInput>
    delete?: Enumerable<Electric_cyl_imagesWhereUniqueInput>
    connect?: Enumerable<Electric_cyl_imagesWhereUniqueInput>
    update?: Enumerable<Electric_cyl_imagesUpdateWithWhereUniqueWithoutElectric_cyl_scansInput>
    updateMany?: Enumerable<Electric_cyl_imagesUpdateManyWithWhereWithoutElectric_cyl_scansInput>
    deleteMany?: Enumerable<Electric_cyl_imagesScalarWhereInput>
  }

  export type Electric_cyl_scansCreateNestedManyWithoutElectric_phenotypersInput = {
    create?: XOR<Enumerable<Electric_cyl_scansCreateWithoutElectric_phenotypersInput>, Enumerable<Electric_cyl_scansUncheckedCreateWithoutElectric_phenotypersInput>>
    connectOrCreate?: Enumerable<Electric_cyl_scansCreateOrConnectWithoutElectric_phenotypersInput>
    createMany?: Electric_cyl_scansCreateManyElectric_phenotypersInputEnvelope
    connect?: Enumerable<Electric_cyl_scansWhereUniqueInput>
  }

  export type Electric_cyl_scansUncheckedCreateNestedManyWithoutElectric_phenotypersInput = {
    create?: XOR<Enumerable<Electric_cyl_scansCreateWithoutElectric_phenotypersInput>, Enumerable<Electric_cyl_scansUncheckedCreateWithoutElectric_phenotypersInput>>
    connectOrCreate?: Enumerable<Electric_cyl_scansCreateOrConnectWithoutElectric_phenotypersInput>
    createMany?: Electric_cyl_scansCreateManyElectric_phenotypersInputEnvelope
    connect?: Enumerable<Electric_cyl_scansWhereUniqueInput>
  }

  export type Electric_cyl_scansUpdateManyWithoutElectric_phenotypersNestedInput = {
    create?: XOR<Enumerable<Electric_cyl_scansCreateWithoutElectric_phenotypersInput>, Enumerable<Electric_cyl_scansUncheckedCreateWithoutElectric_phenotypersInput>>
    connectOrCreate?: Enumerable<Electric_cyl_scansCreateOrConnectWithoutElectric_phenotypersInput>
    upsert?: Enumerable<Electric_cyl_scansUpsertWithWhereUniqueWithoutElectric_phenotypersInput>
    createMany?: Electric_cyl_scansCreateManyElectric_phenotypersInputEnvelope
    set?: Enumerable<Electric_cyl_scansWhereUniqueInput>
    disconnect?: Enumerable<Electric_cyl_scansWhereUniqueInput>
    delete?: Enumerable<Electric_cyl_scansWhereUniqueInput>
    connect?: Enumerable<Electric_cyl_scansWhereUniqueInput>
    update?: Enumerable<Electric_cyl_scansUpdateWithWhereUniqueWithoutElectric_phenotypersInput>
    updateMany?: Enumerable<Electric_cyl_scansUpdateManyWithWhereWithoutElectric_phenotypersInput>
    deleteMany?: Enumerable<Electric_cyl_scansScalarWhereInput>
  }

  export type Electric_cyl_scansUncheckedUpdateManyWithoutElectric_phenotypersNestedInput = {
    create?: XOR<Enumerable<Electric_cyl_scansCreateWithoutElectric_phenotypersInput>, Enumerable<Electric_cyl_scansUncheckedCreateWithoutElectric_phenotypersInput>>
    connectOrCreate?: Enumerable<Electric_cyl_scansCreateOrConnectWithoutElectric_phenotypersInput>
    upsert?: Enumerable<Electric_cyl_scansUpsertWithWhereUniqueWithoutElectric_phenotypersInput>
    createMany?: Electric_cyl_scansCreateManyElectric_phenotypersInputEnvelope
    set?: Enumerable<Electric_cyl_scansWhereUniqueInput>
    disconnect?: Enumerable<Electric_cyl_scansWhereUniqueInput>
    delete?: Enumerable<Electric_cyl_scansWhereUniqueInput>
    connect?: Enumerable<Electric_cyl_scansWhereUniqueInput>
    update?: Enumerable<Electric_cyl_scansUpdateWithWhereUniqueWithoutElectric_phenotypersInput>
    updateMany?: Enumerable<Electric_cyl_scansUpdateManyWithWhereWithoutElectric_phenotypersInput>
    deleteMany?: Enumerable<Electric_cyl_scansScalarWhereInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel>
    notIn?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type Electric_cyl_scansCreateWithoutElectric_cyl_imagesInput = {
    id: string
    scanner_id?: string | null
    plant_qr_code?: string | null
    path?: string | null
    capture_date?: Date | string | null
    num_frames?: number | null
    exposure_time?: number | null
    gain?: number | null
    brightness?: number | null
    contrast?: number | null
    gamma?: number | null
    seconds_per_rot?: number | null
    experiment_name?: string | null
    wave_number?: number | null
    plant_age_days?: number | null
    electric_phenotypers?: Electric_phenotypersCreateNestedOneWithoutElectric_cyl_scansInput
  }

  export type Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_imagesInput = {
    id: string
    phenotyper_id?: string | null
    scanner_id?: string | null
    plant_qr_code?: string | null
    path?: string | null
    capture_date?: Date | string | null
    num_frames?: number | null
    exposure_time?: number | null
    gain?: number | null
    brightness?: number | null
    contrast?: number | null
    gamma?: number | null
    seconds_per_rot?: number | null
    experiment_name?: string | null
    wave_number?: number | null
    plant_age_days?: number | null
  }

  export type Electric_cyl_scansCreateOrConnectWithoutElectric_cyl_imagesInput = {
    where: Electric_cyl_scansWhereUniqueInput
    create: XOR<Electric_cyl_scansCreateWithoutElectric_cyl_imagesInput, Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_imagesInput>
  }

  export type Electric_cyl_scansUpsertWithoutElectric_cyl_imagesInput = {
    update: XOR<Electric_cyl_scansUpdateWithoutElectric_cyl_imagesInput, Electric_cyl_scansUncheckedUpdateWithoutElectric_cyl_imagesInput>
    create: XOR<Electric_cyl_scansCreateWithoutElectric_cyl_imagesInput, Electric_cyl_scansUncheckedCreateWithoutElectric_cyl_imagesInput>
    where?: Electric_cyl_scansWhereInput
  }

  export type Electric_cyl_scansUpdateToOneWithWhereWithoutElectric_cyl_imagesInput = {
    where?: Electric_cyl_scansWhereInput
    data: XOR<Electric_cyl_scansUpdateWithoutElectric_cyl_imagesInput, Electric_cyl_scansUncheckedUpdateWithoutElectric_cyl_imagesInput>
  }

  export type Electric_cyl_scansUpdateWithoutElectric_cyl_imagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    scanner_id?: NullableStringFieldUpdateOperationsInput | string | null
    plant_qr_code?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    capture_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    num_frames?: NullableIntFieldUpdateOperationsInput | number | null
    exposure_time?: NullableIntFieldUpdateOperationsInput | number | null
    gain?: NullableFloatFieldUpdateOperationsInput | number | null
    brightness?: NullableFloatFieldUpdateOperationsInput | number | null
    contrast?: NullableFloatFieldUpdateOperationsInput | number | null
    gamma?: NullableFloatFieldUpdateOperationsInput | number | null
    seconds_per_rot?: NullableFloatFieldUpdateOperationsInput | number | null
    experiment_name?: NullableStringFieldUpdateOperationsInput | string | null
    wave_number?: NullableIntFieldUpdateOperationsInput | number | null
    plant_age_days?: NullableIntFieldUpdateOperationsInput | number | null
    electric_phenotypers?: Electric_phenotypersUpdateOneWithoutElectric_cyl_scansNestedInput
  }

  export type Electric_cyl_scansUncheckedUpdateWithoutElectric_cyl_imagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    phenotyper_id?: NullableStringFieldUpdateOperationsInput | string | null
    scanner_id?: NullableStringFieldUpdateOperationsInput | string | null
    plant_qr_code?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    capture_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    num_frames?: NullableIntFieldUpdateOperationsInput | number | null
    exposure_time?: NullableIntFieldUpdateOperationsInput | number | null
    gain?: NullableFloatFieldUpdateOperationsInput | number | null
    brightness?: NullableFloatFieldUpdateOperationsInput | number | null
    contrast?: NullableFloatFieldUpdateOperationsInput | number | null
    gamma?: NullableFloatFieldUpdateOperationsInput | number | null
    seconds_per_rot?: NullableFloatFieldUpdateOperationsInput | number | null
    experiment_name?: NullableStringFieldUpdateOperationsInput | string | null
    wave_number?: NullableIntFieldUpdateOperationsInput | number | null
    plant_age_days?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type Electric_cyl_imagesCreateWithoutElectric_cyl_scansInput = {
    id: string
    frame_number?: number | null
    path?: string | null
    url?: string | null
    status?: string | null
    supabase_object_path?: string | null
  }

  export type Electric_cyl_imagesUncheckedCreateWithoutElectric_cyl_scansInput = {
    id: string
    frame_number?: number | null
    path?: string | null
    url?: string | null
    status?: string | null
    supabase_object_path?: string | null
  }

  export type Electric_cyl_imagesCreateOrConnectWithoutElectric_cyl_scansInput = {
    where: Electric_cyl_imagesWhereUniqueInput
    create: XOR<Electric_cyl_imagesCreateWithoutElectric_cyl_scansInput, Electric_cyl_imagesUncheckedCreateWithoutElectric_cyl_scansInput>
  }

  export type Electric_cyl_imagesCreateManyElectric_cyl_scansInputEnvelope = {
    data: Enumerable<Electric_cyl_imagesCreateManyElectric_cyl_scansInput>
    skipDuplicates?: boolean
  }

  export type Electric_phenotypersCreateWithoutElectric_cyl_scansInput = {
    id: string
    name?: string | null
    email?: string | null
  }

  export type Electric_phenotypersUncheckedCreateWithoutElectric_cyl_scansInput = {
    id: string
    name?: string | null
    email?: string | null
  }

  export type Electric_phenotypersCreateOrConnectWithoutElectric_cyl_scansInput = {
    where: Electric_phenotypersWhereUniqueInput
    create: XOR<Electric_phenotypersCreateWithoutElectric_cyl_scansInput, Electric_phenotypersUncheckedCreateWithoutElectric_cyl_scansInput>
  }

  export type Electric_cyl_imagesUpsertWithWhereUniqueWithoutElectric_cyl_scansInput = {
    where: Electric_cyl_imagesWhereUniqueInput
    update: XOR<Electric_cyl_imagesUpdateWithoutElectric_cyl_scansInput, Electric_cyl_imagesUncheckedUpdateWithoutElectric_cyl_scansInput>
    create: XOR<Electric_cyl_imagesCreateWithoutElectric_cyl_scansInput, Electric_cyl_imagesUncheckedCreateWithoutElectric_cyl_scansInput>
  }

  export type Electric_cyl_imagesUpdateWithWhereUniqueWithoutElectric_cyl_scansInput = {
    where: Electric_cyl_imagesWhereUniqueInput
    data: XOR<Electric_cyl_imagesUpdateWithoutElectric_cyl_scansInput, Electric_cyl_imagesUncheckedUpdateWithoutElectric_cyl_scansInput>
  }

  export type Electric_cyl_imagesUpdateManyWithWhereWithoutElectric_cyl_scansInput = {
    where: Electric_cyl_imagesScalarWhereInput
    data: XOR<Electric_cyl_imagesUpdateManyMutationInput, Electric_cyl_imagesUncheckedUpdateManyWithoutElectric_cyl_scansInput>
  }

  export type Electric_cyl_imagesScalarWhereInput = {
    AND?: Enumerable<Electric_cyl_imagesScalarWhereInput>
    OR?: Enumerable<Electric_cyl_imagesScalarWhereInput>
    NOT?: Enumerable<Electric_cyl_imagesScalarWhereInput>
    id?: UuidFilter<"Electric_cyl_images"> | string
    scan_id?: UuidNullableFilter<"Electric_cyl_images"> | string | null
    frame_number?: IntNullableFilter<"Electric_cyl_images"> | number | null
    path?: StringNullableFilter<"Electric_cyl_images"> | string | null
    url?: StringNullableFilter<"Electric_cyl_images"> | string | null
    status?: StringNullableFilter<"Electric_cyl_images"> | string | null
    supabase_object_path?: StringNullableFilter<"Electric_cyl_images"> | string | null
  }

  export type Electric_phenotypersUpsertWithoutElectric_cyl_scansInput = {
    update: XOR<Electric_phenotypersUpdateWithoutElectric_cyl_scansInput, Electric_phenotypersUncheckedUpdateWithoutElectric_cyl_scansInput>
    create: XOR<Electric_phenotypersCreateWithoutElectric_cyl_scansInput, Electric_phenotypersUncheckedCreateWithoutElectric_cyl_scansInput>
    where?: Electric_phenotypersWhereInput
  }

  export type Electric_phenotypersUpdateToOneWithWhereWithoutElectric_cyl_scansInput = {
    where?: Electric_phenotypersWhereInput
    data: XOR<Electric_phenotypersUpdateWithoutElectric_cyl_scansInput, Electric_phenotypersUncheckedUpdateWithoutElectric_cyl_scansInput>
  }

  export type Electric_phenotypersUpdateWithoutElectric_cyl_scansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Electric_phenotypersUncheckedUpdateWithoutElectric_cyl_scansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Electric_cyl_scansCreateWithoutElectric_phenotypersInput = {
    id: string
    scanner_id?: string | null
    plant_qr_code?: string | null
    path?: string | null
    capture_date?: Date | string | null
    num_frames?: number | null
    exposure_time?: number | null
    gain?: number | null
    brightness?: number | null
    contrast?: number | null
    gamma?: number | null
    seconds_per_rot?: number | null
    experiment_name?: string | null
    wave_number?: number | null
    plant_age_days?: number | null
    electric_cyl_images?: Electric_cyl_imagesCreateNestedManyWithoutElectric_cyl_scansInput
  }

  export type Electric_cyl_scansUncheckedCreateWithoutElectric_phenotypersInput = {
    id: string
    scanner_id?: string | null
    plant_qr_code?: string | null
    path?: string | null
    capture_date?: Date | string | null
    num_frames?: number | null
    exposure_time?: number | null
    gain?: number | null
    brightness?: number | null
    contrast?: number | null
    gamma?: number | null
    seconds_per_rot?: number | null
    experiment_name?: string | null
    wave_number?: number | null
    plant_age_days?: number | null
    electric_cyl_images?: Electric_cyl_imagesUncheckedCreateNestedManyWithoutElectric_cyl_scansInput
  }

  export type Electric_cyl_scansCreateOrConnectWithoutElectric_phenotypersInput = {
    where: Electric_cyl_scansWhereUniqueInput
    create: XOR<Electric_cyl_scansCreateWithoutElectric_phenotypersInput, Electric_cyl_scansUncheckedCreateWithoutElectric_phenotypersInput>
  }

  export type Electric_cyl_scansCreateManyElectric_phenotypersInputEnvelope = {
    data: Enumerable<Electric_cyl_scansCreateManyElectric_phenotypersInput>
    skipDuplicates?: boolean
  }

  export type Electric_cyl_scansUpsertWithWhereUniqueWithoutElectric_phenotypersInput = {
    where: Electric_cyl_scansWhereUniqueInput
    update: XOR<Electric_cyl_scansUpdateWithoutElectric_phenotypersInput, Electric_cyl_scansUncheckedUpdateWithoutElectric_phenotypersInput>
    create: XOR<Electric_cyl_scansCreateWithoutElectric_phenotypersInput, Electric_cyl_scansUncheckedCreateWithoutElectric_phenotypersInput>
  }

  export type Electric_cyl_scansUpdateWithWhereUniqueWithoutElectric_phenotypersInput = {
    where: Electric_cyl_scansWhereUniqueInput
    data: XOR<Electric_cyl_scansUpdateWithoutElectric_phenotypersInput, Electric_cyl_scansUncheckedUpdateWithoutElectric_phenotypersInput>
  }

  export type Electric_cyl_scansUpdateManyWithWhereWithoutElectric_phenotypersInput = {
    where: Electric_cyl_scansScalarWhereInput
    data: XOR<Electric_cyl_scansUpdateManyMutationInput, Electric_cyl_scansUncheckedUpdateManyWithoutElectric_phenotypersInput>
  }

  export type Electric_cyl_scansScalarWhereInput = {
    AND?: Enumerable<Electric_cyl_scansScalarWhereInput>
    OR?: Enumerable<Electric_cyl_scansScalarWhereInput>
    NOT?: Enumerable<Electric_cyl_scansScalarWhereInput>
    id?: UuidFilter<"Electric_cyl_scans"> | string
    phenotyper_id?: UuidNullableFilter<"Electric_cyl_scans"> | string | null
    scanner_id?: StringNullableFilter<"Electric_cyl_scans"> | string | null
    plant_qr_code?: StringNullableFilter<"Electric_cyl_scans"> | string | null
    path?: StringNullableFilter<"Electric_cyl_scans"> | string | null
    capture_date?: DateTimeNullableFilter<"Electric_cyl_scans"> | Date | string | null
    num_frames?: IntNullableFilter<"Electric_cyl_scans"> | number | null
    exposure_time?: IntNullableFilter<"Electric_cyl_scans"> | number | null
    gain?: FloatNullableFilter<"Electric_cyl_scans"> | number | null
    brightness?: FloatNullableFilter<"Electric_cyl_scans"> | number | null
    contrast?: FloatNullableFilter<"Electric_cyl_scans"> | number | null
    gamma?: FloatNullableFilter<"Electric_cyl_scans"> | number | null
    seconds_per_rot?: FloatNullableFilter<"Electric_cyl_scans"> | number | null
    experiment_name?: StringNullableFilter<"Electric_cyl_scans"> | string | null
    wave_number?: IntNullableFilter<"Electric_cyl_scans"> | number | null
    plant_age_days?: IntNullableFilter<"Electric_cyl_scans"> | number | null
  }

  export type Electric_cyl_imagesCreateManyElectric_cyl_scansInput = {
    id: string
    frame_number?: number | null
    path?: string | null
    url?: string | null
    status?: string | null
    supabase_object_path?: string | null
  }

  export type Electric_cyl_imagesUpdateWithoutElectric_cyl_scansInput = {
    id?: StringFieldUpdateOperationsInput | string
    frame_number?: NullableIntFieldUpdateOperationsInput | number | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    supabase_object_path?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Electric_cyl_imagesUncheckedUpdateWithoutElectric_cyl_scansInput = {
    id?: StringFieldUpdateOperationsInput | string
    frame_number?: NullableIntFieldUpdateOperationsInput | number | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    supabase_object_path?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Electric_cyl_imagesUncheckedUpdateManyWithoutElectric_cyl_scansInput = {
    id?: StringFieldUpdateOperationsInput | string
    frame_number?: NullableIntFieldUpdateOperationsInput | number | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    supabase_object_path?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Electric_cyl_scansCreateManyElectric_phenotypersInput = {
    id: string
    scanner_id?: string | null
    plant_qr_code?: string | null
    path?: string | null
    capture_date?: Date | string | null
    num_frames?: number | null
    exposure_time?: number | null
    gain?: number | null
    brightness?: number | null
    contrast?: number | null
    gamma?: number | null
    seconds_per_rot?: number | null
    experiment_name?: string | null
    wave_number?: number | null
    plant_age_days?: number | null
  }

  export type Electric_cyl_scansUpdateWithoutElectric_phenotypersInput = {
    id?: StringFieldUpdateOperationsInput | string
    scanner_id?: NullableStringFieldUpdateOperationsInput | string | null
    plant_qr_code?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    capture_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    num_frames?: NullableIntFieldUpdateOperationsInput | number | null
    exposure_time?: NullableIntFieldUpdateOperationsInput | number | null
    gain?: NullableFloatFieldUpdateOperationsInput | number | null
    brightness?: NullableFloatFieldUpdateOperationsInput | number | null
    contrast?: NullableFloatFieldUpdateOperationsInput | number | null
    gamma?: NullableFloatFieldUpdateOperationsInput | number | null
    seconds_per_rot?: NullableFloatFieldUpdateOperationsInput | number | null
    experiment_name?: NullableStringFieldUpdateOperationsInput | string | null
    wave_number?: NullableIntFieldUpdateOperationsInput | number | null
    plant_age_days?: NullableIntFieldUpdateOperationsInput | number | null
    electric_cyl_images?: Electric_cyl_imagesUpdateManyWithoutElectric_cyl_scansNestedInput
  }

  export type Electric_cyl_scansUncheckedUpdateWithoutElectric_phenotypersInput = {
    id?: StringFieldUpdateOperationsInput | string
    scanner_id?: NullableStringFieldUpdateOperationsInput | string | null
    plant_qr_code?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    capture_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    num_frames?: NullableIntFieldUpdateOperationsInput | number | null
    exposure_time?: NullableIntFieldUpdateOperationsInput | number | null
    gain?: NullableFloatFieldUpdateOperationsInput | number | null
    brightness?: NullableFloatFieldUpdateOperationsInput | number | null
    contrast?: NullableFloatFieldUpdateOperationsInput | number | null
    gamma?: NullableFloatFieldUpdateOperationsInput | number | null
    seconds_per_rot?: NullableFloatFieldUpdateOperationsInput | number | null
    experiment_name?: NullableStringFieldUpdateOperationsInput | string | null
    wave_number?: NullableIntFieldUpdateOperationsInput | number | null
    plant_age_days?: NullableIntFieldUpdateOperationsInput | number | null
    electric_cyl_images?: Electric_cyl_imagesUncheckedUpdateManyWithoutElectric_cyl_scansNestedInput
  }

  export type Electric_cyl_scansUncheckedUpdateManyWithoutElectric_phenotypersInput = {
    id?: StringFieldUpdateOperationsInput | string
    scanner_id?: NullableStringFieldUpdateOperationsInput | string | null
    plant_qr_code?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    capture_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    num_frames?: NullableIntFieldUpdateOperationsInput | number | null
    exposure_time?: NullableIntFieldUpdateOperationsInput | number | null
    gain?: NullableFloatFieldUpdateOperationsInput | number | null
    brightness?: NullableFloatFieldUpdateOperationsInput | number | null
    contrast?: NullableFloatFieldUpdateOperationsInput | number | null
    gamma?: NullableFloatFieldUpdateOperationsInput | number | null
    seconds_per_rot?: NullableFloatFieldUpdateOperationsInput | number | null
    experiment_name?: NullableStringFieldUpdateOperationsInput | string | null
    wave_number?: NullableIntFieldUpdateOperationsInput | number | null
    plant_age_days?: NullableIntFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}