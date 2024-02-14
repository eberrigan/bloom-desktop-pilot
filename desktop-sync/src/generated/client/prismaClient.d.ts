
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
 * Model Images
 * 
 */
export type Images = {
  /**
   * @zod.string.uuid()
   */
  id: string
  /**
   * @zod.string.uuid()
   */
  scanid: string | null
  /**
   * @zod.number.int().gte(-2147483648).lte(2147483647)
   */
  framenumber: number | null
  path: string | null
  url: string | null
  status: string | null
}

/**
 * Model Phenotypers
 * 
 */
export type Phenotypers = {
  /**
   * @zod.string.uuid()
   */
  id: string
  name: string | null
  email: string | null
}

/**
 * Model Scans
 * 
 */
export type Scans = {
  /**
   * @zod.string.uuid()
   */
  id: string
  /**
   * @zod.string.uuid()
   */
  phenotyperid: string | null
  plantqrcode: string | null
  path: string | null
  capturedate: Date | null
  /**
   * @zod.number.int().gte(-2147483648).lte(2147483647)
   */
  numframes: number | null
  /**
   * @zod.number.int().gte(-2147483648).lte(2147483647)
   */
  exposuretime: number | null
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
  secondsperrotation: number | null
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Images
 * const images = await prisma.images.findMany()
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
   * // Fetch zero or more Images
   * const images = await prisma.images.findMany()
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
   * `prisma.images`: Exposes CRUD operations for the **Images** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Images
    * const images = await prisma.images.findMany()
    * ```
    */
  get images(): Prisma.ImagesDelegate<GlobalReject>;

  /**
   * `prisma.phenotypers`: Exposes CRUD operations for the **Phenotypers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Phenotypers
    * const phenotypers = await prisma.phenotypers.findMany()
    * ```
    */
  get phenotypers(): Prisma.PhenotypersDelegate<GlobalReject>;

  /**
   * `prisma.scans`: Exposes CRUD operations for the **Scans** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Scans
    * const scans = await prisma.scans.findMany()
    * ```
    */
  get scans(): Prisma.ScansDelegate<GlobalReject>;
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
   * Query Engine version: d6e67a83f971b175a593ccc12e15c4a757f93ffe
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
    Images: 'Images',
    Phenotypers: 'Phenotypers',
    Scans: 'Scans'
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
   * Count Type PhenotypersCountOutputType
   */


  export type PhenotypersCountOutputType = {
    scans: number
  }

  export type PhenotypersCountOutputTypeSelect = {
    scans?: boolean
  }

  export type PhenotypersCountOutputTypeGetPayload<S extends boolean | null | undefined | PhenotypersCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? PhenotypersCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (PhenotypersCountOutputTypeArgs)
    ? PhenotypersCountOutputType 
    : S extends { select: any } & (PhenotypersCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof PhenotypersCountOutputType ? PhenotypersCountOutputType[P] : never
  } 
      : PhenotypersCountOutputType




  // Custom InputTypes

  /**
   * PhenotypersCountOutputType without action
   */
  export type PhenotypersCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the PhenotypersCountOutputType
     * 
    **/
    select?: PhenotypersCountOutputTypeSelect | null
  }



  /**
   * Count Type ScansCountOutputType
   */


  export type ScansCountOutputType = {
    images: number
  }

  export type ScansCountOutputTypeSelect = {
    images?: boolean
  }

  export type ScansCountOutputTypeGetPayload<S extends boolean | null | undefined | ScansCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ScansCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (ScansCountOutputTypeArgs)
    ? ScansCountOutputType 
    : S extends { select: any } & (ScansCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof ScansCountOutputType ? ScansCountOutputType[P] : never
  } 
      : ScansCountOutputType




  // Custom InputTypes

  /**
   * ScansCountOutputType without action
   */
  export type ScansCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ScansCountOutputType
     * 
    **/
    select?: ScansCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Images
   */


  export type AggregateImages = {
    _count: ImagesCountAggregateOutputType | null
    _avg: ImagesAvgAggregateOutputType | null
    _sum: ImagesSumAggregateOutputType | null
    _min: ImagesMinAggregateOutputType | null
    _max: ImagesMaxAggregateOutputType | null
  }

  export type ImagesAvgAggregateOutputType = {
    framenumber: number | null
  }

  export type ImagesSumAggregateOutputType = {
    framenumber: number | null
  }

  export type ImagesMinAggregateOutputType = {
    id: string | null
    scanid: string | null
    framenumber: number | null
    path: string | null
    url: string | null
    status: string | null
  }

  export type ImagesMaxAggregateOutputType = {
    id: string | null
    scanid: string | null
    framenumber: number | null
    path: string | null
    url: string | null
    status: string | null
  }

  export type ImagesCountAggregateOutputType = {
    id: number
    scanid: number
    framenumber: number
    path: number
    url: number
    status: number
    _all: number
  }


  export type ImagesAvgAggregateInputType = {
    framenumber?: true
  }

  export type ImagesSumAggregateInputType = {
    framenumber?: true
  }

  export type ImagesMinAggregateInputType = {
    id?: true
    scanid?: true
    framenumber?: true
    path?: true
    url?: true
    status?: true
  }

  export type ImagesMaxAggregateInputType = {
    id?: true
    scanid?: true
    framenumber?: true
    path?: true
    url?: true
    status?: true
  }

  export type ImagesCountAggregateInputType = {
    id?: true
    scanid?: true
    framenumber?: true
    path?: true
    url?: true
    status?: true
    _all?: true
  }

  export type ImagesAggregateArgs = {
    /**
     * Filter which Images to aggregate.
     * 
    **/
    where?: ImagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     * 
    **/
    orderBy?: Enumerable<ImagesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ImagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Images
    **/
    _count?: true | ImagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ImagesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ImagesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImagesMaxAggregateInputType
  }

  export type GetImagesAggregateType<T extends ImagesAggregateArgs> = {
        [P in keyof T & keyof AggregateImages]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImages[P]>
      : GetScalarType<T[P], AggregateImages[P]>
  }




  export type ImagesGroupByArgs = {
    where?: ImagesWhereInput
    orderBy?: Enumerable<ImagesOrderByWithAggregationInput>
    by: Array<ImagesScalarFieldEnum>
    having?: ImagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImagesCountAggregateInputType | true
    _avg?: ImagesAvgAggregateInputType
    _sum?: ImagesSumAggregateInputType
    _min?: ImagesMinAggregateInputType
    _max?: ImagesMaxAggregateInputType
  }


  export type ImagesGroupByOutputType = {
    id: string
    scanid: string | null
    framenumber: number | null
    path: string | null
    url: string | null
    status: string | null
    _count: ImagesCountAggregateOutputType | null
    _avg: ImagesAvgAggregateOutputType | null
    _sum: ImagesSumAggregateOutputType | null
    _min: ImagesMinAggregateOutputType | null
    _max: ImagesMaxAggregateOutputType | null
  }

  type GetImagesGroupByPayload<T extends ImagesGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ImagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImagesGroupByOutputType[P]>
            : GetScalarType<T[P], ImagesGroupByOutputType[P]>
        }
      >
    >


  export type ImagesSelect = {
    id?: boolean
    scanid?: boolean
    framenumber?: boolean
    path?: boolean
    url?: boolean
    status?: boolean
    scans?: boolean | ScansArgs
  }


  export type ImagesInclude = {
    scans?: boolean | ScansArgs
  } 

  export type ImagesGetPayload<S extends boolean | null | undefined | ImagesArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Images :
    S extends undefined ? never :
    S extends { include: any } & (ImagesArgs | ImagesFindManyArgs)
    ? Images  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'scans' ? ScansGetPayload<S['include'][P]> | null :  never
  } 
    : S extends { select: any } & (ImagesArgs | ImagesFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'scans' ? ScansGetPayload<S['select'][P]> | null :  P extends keyof Images ? Images[P] : never
  } 
      : Images


  type ImagesCountArgs = Merge<
    Omit<ImagesFindManyArgs, 'select' | 'include'> & {
      select?: ImagesCountAggregateInputType | true
    }
  >

  export interface ImagesDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Images that matches the filter.
     * @param {ImagesFindUniqueArgs} args - Arguments to find a Images
     * @example
     * // Get one Images
     * const images = await prisma.images.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ImagesFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ImagesFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Images'> extends True ? Prisma__ImagesClient<ImagesGetPayload<T>> : Prisma__ImagesClient<ImagesGetPayload<T> | null, null>

    /**
     * Find one Images that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ImagesFindUniqueOrThrowArgs} args - Arguments to find a Images
     * @example
     * // Get one Images
     * const images = await prisma.images.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ImagesFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ImagesFindUniqueOrThrowArgs>
    ): Prisma__ImagesClient<ImagesGetPayload<T>>

    /**
     * Find the first Images that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImagesFindFirstArgs} args - Arguments to find a Images
     * @example
     * // Get one Images
     * const images = await prisma.images.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ImagesFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ImagesFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Images'> extends True ? Prisma__ImagesClient<ImagesGetPayload<T>> : Prisma__ImagesClient<ImagesGetPayload<T> | null, null>

    /**
     * Find the first Images that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImagesFindFirstOrThrowArgs} args - Arguments to find a Images
     * @example
     * // Get one Images
     * const images = await prisma.images.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ImagesFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ImagesFindFirstOrThrowArgs>
    ): Prisma__ImagesClient<ImagesGetPayload<T>>

    /**
     * Find zero or more Images that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImagesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Images
     * const images = await prisma.images.findMany()
     * 
     * // Get first 10 Images
     * const images = await prisma.images.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const imagesWithIdOnly = await prisma.images.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ImagesFindManyArgs>(
      args?: SelectSubset<T, ImagesFindManyArgs>
    ): PrismaPromise<Array<ImagesGetPayload<T>>>

    /**
     * Create a Images.
     * @param {ImagesCreateArgs} args - Arguments to create a Images.
     * @example
     * // Create one Images
     * const Images = await prisma.images.create({
     *   data: {
     *     // ... data to create a Images
     *   }
     * })
     * 
    **/
    create<T extends ImagesCreateArgs>(
      args: SelectSubset<T, ImagesCreateArgs>
    ): Prisma__ImagesClient<ImagesGetPayload<T>>

    /**
     * Create many Images.
     *     @param {ImagesCreateManyArgs} args - Arguments to create many Images.
     *     @example
     *     // Create many Images
     *     const images = await prisma.images.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ImagesCreateManyArgs>(
      args?: SelectSubset<T, ImagesCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Images.
     * @param {ImagesDeleteArgs} args - Arguments to delete one Images.
     * @example
     * // Delete one Images
     * const Images = await prisma.images.delete({
     *   where: {
     *     // ... filter to delete one Images
     *   }
     * })
     * 
    **/
    delete<T extends ImagesDeleteArgs>(
      args: SelectSubset<T, ImagesDeleteArgs>
    ): Prisma__ImagesClient<ImagesGetPayload<T>>

    /**
     * Update one Images.
     * @param {ImagesUpdateArgs} args - Arguments to update one Images.
     * @example
     * // Update one Images
     * const images = await prisma.images.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ImagesUpdateArgs>(
      args: SelectSubset<T, ImagesUpdateArgs>
    ): Prisma__ImagesClient<ImagesGetPayload<T>>

    /**
     * Delete zero or more Images.
     * @param {ImagesDeleteManyArgs} args - Arguments to filter Images to delete.
     * @example
     * // Delete a few Images
     * const { count } = await prisma.images.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ImagesDeleteManyArgs>(
      args?: SelectSubset<T, ImagesDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Images
     * const images = await prisma.images.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ImagesUpdateManyArgs>(
      args: SelectSubset<T, ImagesUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Images.
     * @param {ImagesUpsertArgs} args - Arguments to update or create a Images.
     * @example
     * // Update or create a Images
     * const images = await prisma.images.upsert({
     *   create: {
     *     // ... data to create a Images
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Images we want to update
     *   }
     * })
    **/
    upsert<T extends ImagesUpsertArgs>(
      args: SelectSubset<T, ImagesUpsertArgs>
    ): Prisma__ImagesClient<ImagesGetPayload<T>>

    /**
     * Count the number of Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImagesCountArgs} args - Arguments to filter Images to count.
     * @example
     * // Count the number of Images
     * const count = await prisma.images.count({
     *   where: {
     *     // ... the filter for the Images we want to count
     *   }
     * })
    **/
    count<T extends ImagesCountArgs>(
      args?: Subset<T, ImagesCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ImagesAggregateArgs>(args: Subset<T, ImagesAggregateArgs>): PrismaPromise<GetImagesAggregateType<T>>

    /**
     * Group by Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImagesGroupByArgs} args - Group by arguments.
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
      T extends ImagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImagesGroupByArgs['orderBy'] }
        : { orderBy?: ImagesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ImagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImagesGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Images.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ImagesClient<T, Null = never> implements PrismaPromise<T> {
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

    scans<T extends ScansArgs= {}>(args?: Subset<T, ScansArgs>): Prisma__ScansClient<ScansGetPayload<T> | Null>;

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
   * Images base type for findUnique actions
   */
  export type ImagesFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Images
     * 
    **/
    select?: ImagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ImagesInclude | null
    /**
     * Filter, which Images to fetch.
     * 
    **/
    where: ImagesWhereUniqueInput
  }

  /**
   * Images findUnique
   */
  export interface ImagesFindUniqueArgs extends ImagesFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Images findUniqueOrThrow
   */
  export type ImagesFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Images
     * 
    **/
    select?: ImagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ImagesInclude | null
    /**
     * Filter, which Images to fetch.
     * 
    **/
    where: ImagesWhereUniqueInput
  }


  /**
   * Images base type for findFirst actions
   */
  export type ImagesFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Images
     * 
    **/
    select?: ImagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ImagesInclude | null
    /**
     * Filter, which Images to fetch.
     * 
    **/
    where?: ImagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     * 
    **/
    orderBy?: Enumerable<ImagesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Images.
     * 
    **/
    cursor?: ImagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Images.
     * 
    **/
    distinct?: Enumerable<ImagesScalarFieldEnum>
  }

  /**
   * Images findFirst
   */
  export interface ImagesFindFirstArgs extends ImagesFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Images findFirstOrThrow
   */
  export type ImagesFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Images
     * 
    **/
    select?: ImagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ImagesInclude | null
    /**
     * Filter, which Images to fetch.
     * 
    **/
    where?: ImagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     * 
    **/
    orderBy?: Enumerable<ImagesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Images.
     * 
    **/
    cursor?: ImagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Images.
     * 
    **/
    distinct?: Enumerable<ImagesScalarFieldEnum>
  }


  /**
   * Images findMany
   */
  export type ImagesFindManyArgs = {
    /**
     * Select specific fields to fetch from the Images
     * 
    **/
    select?: ImagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ImagesInclude | null
    /**
     * Filter, which Images to fetch.
     * 
    **/
    where?: ImagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     * 
    **/
    orderBy?: Enumerable<ImagesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Images.
     * 
    **/
    cursor?: ImagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ImagesScalarFieldEnum>
  }


  /**
   * Images create
   */
  export type ImagesCreateArgs = {
    /**
     * Select specific fields to fetch from the Images
     * 
    **/
    select?: ImagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ImagesInclude | null
    /**
     * The data needed to create a Images.
     * 
    **/
    data: XOR<ImagesCreateInput, ImagesUncheckedCreateInput>
  }


  /**
   * Images createMany
   */
  export type ImagesCreateManyArgs = {
    /**
     * The data used to create many Images.
     * 
    **/
    data: Enumerable<ImagesCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Images update
   */
  export type ImagesUpdateArgs = {
    /**
     * Select specific fields to fetch from the Images
     * 
    **/
    select?: ImagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ImagesInclude | null
    /**
     * The data needed to update a Images.
     * 
    **/
    data: XOR<ImagesUpdateInput, ImagesUncheckedUpdateInput>
    /**
     * Choose, which Images to update.
     * 
    **/
    where: ImagesWhereUniqueInput
  }


  /**
   * Images updateMany
   */
  export type ImagesUpdateManyArgs = {
    /**
     * The data used to update Images.
     * 
    **/
    data: XOR<ImagesUpdateManyMutationInput, ImagesUncheckedUpdateManyInput>
    /**
     * Filter which Images to update
     * 
    **/
    where?: ImagesWhereInput
  }


  /**
   * Images upsert
   */
  export type ImagesUpsertArgs = {
    /**
     * Select specific fields to fetch from the Images
     * 
    **/
    select?: ImagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ImagesInclude | null
    /**
     * The filter to search for the Images to update in case it exists.
     * 
    **/
    where: ImagesWhereUniqueInput
    /**
     * In case the Images found by the `where` argument doesn't exist, create a new Images with this data.
     * 
    **/
    create: XOR<ImagesCreateInput, ImagesUncheckedCreateInput>
    /**
     * In case the Images was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ImagesUpdateInput, ImagesUncheckedUpdateInput>
  }


  /**
   * Images delete
   */
  export type ImagesDeleteArgs = {
    /**
     * Select specific fields to fetch from the Images
     * 
    **/
    select?: ImagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ImagesInclude | null
    /**
     * Filter which Images to delete.
     * 
    **/
    where: ImagesWhereUniqueInput
  }


  /**
   * Images deleteMany
   */
  export type ImagesDeleteManyArgs = {
    /**
     * Filter which Images to delete
     * 
    **/
    where?: ImagesWhereInput
  }


  /**
   * Images without action
   */
  export type ImagesArgs = {
    /**
     * Select specific fields to fetch from the Images
     * 
    **/
    select?: ImagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ImagesInclude | null
  }



  /**
   * Model Phenotypers
   */


  export type AggregatePhenotypers = {
    _count: PhenotypersCountAggregateOutputType | null
    _min: PhenotypersMinAggregateOutputType | null
    _max: PhenotypersMaxAggregateOutputType | null
  }

  export type PhenotypersMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
  }

  export type PhenotypersMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
  }

  export type PhenotypersCountAggregateOutputType = {
    id: number
    name: number
    email: number
    _all: number
  }


  export type PhenotypersMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
  }

  export type PhenotypersMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
  }

  export type PhenotypersCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    _all?: true
  }

  export type PhenotypersAggregateArgs = {
    /**
     * Filter which Phenotypers to aggregate.
     * 
    **/
    where?: PhenotypersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phenotypers to fetch.
     * 
    **/
    orderBy?: Enumerable<PhenotypersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PhenotypersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phenotypers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phenotypers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Phenotypers
    **/
    _count?: true | PhenotypersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PhenotypersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PhenotypersMaxAggregateInputType
  }

  export type GetPhenotypersAggregateType<T extends PhenotypersAggregateArgs> = {
        [P in keyof T & keyof AggregatePhenotypers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePhenotypers[P]>
      : GetScalarType<T[P], AggregatePhenotypers[P]>
  }




  export type PhenotypersGroupByArgs = {
    where?: PhenotypersWhereInput
    orderBy?: Enumerable<PhenotypersOrderByWithAggregationInput>
    by: Array<PhenotypersScalarFieldEnum>
    having?: PhenotypersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PhenotypersCountAggregateInputType | true
    _min?: PhenotypersMinAggregateInputType
    _max?: PhenotypersMaxAggregateInputType
  }


  export type PhenotypersGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    _count: PhenotypersCountAggregateOutputType | null
    _min: PhenotypersMinAggregateOutputType | null
    _max: PhenotypersMaxAggregateOutputType | null
  }

  type GetPhenotypersGroupByPayload<T extends PhenotypersGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PhenotypersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PhenotypersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PhenotypersGroupByOutputType[P]>
            : GetScalarType<T[P], PhenotypersGroupByOutputType[P]>
        }
      >
    >


  export type PhenotypersSelect = {
    id?: boolean
    name?: boolean
    email?: boolean
    scans?: boolean | Phenotypers$scansArgs
    _count?: boolean | PhenotypersCountOutputTypeArgs
  }


  export type PhenotypersInclude = {
    scans?: boolean | Phenotypers$scansArgs
    _count?: boolean | PhenotypersCountOutputTypeArgs
  } 

  export type PhenotypersGetPayload<S extends boolean | null | undefined | PhenotypersArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Phenotypers :
    S extends undefined ? never :
    S extends { include: any } & (PhenotypersArgs | PhenotypersFindManyArgs)
    ? Phenotypers  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'scans' ? Array < ScansGetPayload<S['include'][P]>>  :
        P extends '_count' ? PhenotypersCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (PhenotypersArgs | PhenotypersFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'scans' ? Array < ScansGetPayload<S['select'][P]>>  :
        P extends '_count' ? PhenotypersCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Phenotypers ? Phenotypers[P] : never
  } 
      : Phenotypers


  type PhenotypersCountArgs = Merge<
    Omit<PhenotypersFindManyArgs, 'select' | 'include'> & {
      select?: PhenotypersCountAggregateInputType | true
    }
  >

  export interface PhenotypersDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Phenotypers that matches the filter.
     * @param {PhenotypersFindUniqueArgs} args - Arguments to find a Phenotypers
     * @example
     * // Get one Phenotypers
     * const phenotypers = await prisma.phenotypers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PhenotypersFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PhenotypersFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Phenotypers'> extends True ? Prisma__PhenotypersClient<PhenotypersGetPayload<T>> : Prisma__PhenotypersClient<PhenotypersGetPayload<T> | null, null>

    /**
     * Find one Phenotypers that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {PhenotypersFindUniqueOrThrowArgs} args - Arguments to find a Phenotypers
     * @example
     * // Get one Phenotypers
     * const phenotypers = await prisma.phenotypers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PhenotypersFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PhenotypersFindUniqueOrThrowArgs>
    ): Prisma__PhenotypersClient<PhenotypersGetPayload<T>>

    /**
     * Find the first Phenotypers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhenotypersFindFirstArgs} args - Arguments to find a Phenotypers
     * @example
     * // Get one Phenotypers
     * const phenotypers = await prisma.phenotypers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PhenotypersFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PhenotypersFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Phenotypers'> extends True ? Prisma__PhenotypersClient<PhenotypersGetPayload<T>> : Prisma__PhenotypersClient<PhenotypersGetPayload<T> | null, null>

    /**
     * Find the first Phenotypers that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhenotypersFindFirstOrThrowArgs} args - Arguments to find a Phenotypers
     * @example
     * // Get one Phenotypers
     * const phenotypers = await prisma.phenotypers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PhenotypersFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PhenotypersFindFirstOrThrowArgs>
    ): Prisma__PhenotypersClient<PhenotypersGetPayload<T>>

    /**
     * Find zero or more Phenotypers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhenotypersFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Phenotypers
     * const phenotypers = await prisma.phenotypers.findMany()
     * 
     * // Get first 10 Phenotypers
     * const phenotypers = await prisma.phenotypers.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const phenotypersWithIdOnly = await prisma.phenotypers.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PhenotypersFindManyArgs>(
      args?: SelectSubset<T, PhenotypersFindManyArgs>
    ): PrismaPromise<Array<PhenotypersGetPayload<T>>>

    /**
     * Create a Phenotypers.
     * @param {PhenotypersCreateArgs} args - Arguments to create a Phenotypers.
     * @example
     * // Create one Phenotypers
     * const Phenotypers = await prisma.phenotypers.create({
     *   data: {
     *     // ... data to create a Phenotypers
     *   }
     * })
     * 
    **/
    create<T extends PhenotypersCreateArgs>(
      args: SelectSubset<T, PhenotypersCreateArgs>
    ): Prisma__PhenotypersClient<PhenotypersGetPayload<T>>

    /**
     * Create many Phenotypers.
     *     @param {PhenotypersCreateManyArgs} args - Arguments to create many Phenotypers.
     *     @example
     *     // Create many Phenotypers
     *     const phenotypers = await prisma.phenotypers.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PhenotypersCreateManyArgs>(
      args?: SelectSubset<T, PhenotypersCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Phenotypers.
     * @param {PhenotypersDeleteArgs} args - Arguments to delete one Phenotypers.
     * @example
     * // Delete one Phenotypers
     * const Phenotypers = await prisma.phenotypers.delete({
     *   where: {
     *     // ... filter to delete one Phenotypers
     *   }
     * })
     * 
    **/
    delete<T extends PhenotypersDeleteArgs>(
      args: SelectSubset<T, PhenotypersDeleteArgs>
    ): Prisma__PhenotypersClient<PhenotypersGetPayload<T>>

    /**
     * Update one Phenotypers.
     * @param {PhenotypersUpdateArgs} args - Arguments to update one Phenotypers.
     * @example
     * // Update one Phenotypers
     * const phenotypers = await prisma.phenotypers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PhenotypersUpdateArgs>(
      args: SelectSubset<T, PhenotypersUpdateArgs>
    ): Prisma__PhenotypersClient<PhenotypersGetPayload<T>>

    /**
     * Delete zero or more Phenotypers.
     * @param {PhenotypersDeleteManyArgs} args - Arguments to filter Phenotypers to delete.
     * @example
     * // Delete a few Phenotypers
     * const { count } = await prisma.phenotypers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PhenotypersDeleteManyArgs>(
      args?: SelectSubset<T, PhenotypersDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Phenotypers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhenotypersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Phenotypers
     * const phenotypers = await prisma.phenotypers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PhenotypersUpdateManyArgs>(
      args: SelectSubset<T, PhenotypersUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Phenotypers.
     * @param {PhenotypersUpsertArgs} args - Arguments to update or create a Phenotypers.
     * @example
     * // Update or create a Phenotypers
     * const phenotypers = await prisma.phenotypers.upsert({
     *   create: {
     *     // ... data to create a Phenotypers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Phenotypers we want to update
     *   }
     * })
    **/
    upsert<T extends PhenotypersUpsertArgs>(
      args: SelectSubset<T, PhenotypersUpsertArgs>
    ): Prisma__PhenotypersClient<PhenotypersGetPayload<T>>

    /**
     * Count the number of Phenotypers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhenotypersCountArgs} args - Arguments to filter Phenotypers to count.
     * @example
     * // Count the number of Phenotypers
     * const count = await prisma.phenotypers.count({
     *   where: {
     *     // ... the filter for the Phenotypers we want to count
     *   }
     * })
    **/
    count<T extends PhenotypersCountArgs>(
      args?: Subset<T, PhenotypersCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PhenotypersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Phenotypers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhenotypersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PhenotypersAggregateArgs>(args: Subset<T, PhenotypersAggregateArgs>): PrismaPromise<GetPhenotypersAggregateType<T>>

    /**
     * Group by Phenotypers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhenotypersGroupByArgs} args - Group by arguments.
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
      T extends PhenotypersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PhenotypersGroupByArgs['orderBy'] }
        : { orderBy?: PhenotypersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PhenotypersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhenotypersGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Phenotypers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PhenotypersClient<T, Null = never> implements PrismaPromise<T> {
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

    scans<T extends Phenotypers$scansArgs= {}>(args?: Subset<T, Phenotypers$scansArgs>): PrismaPromise<Array<ScansGetPayload<T>>| Null>;

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
   * Phenotypers base type for findUnique actions
   */
  export type PhenotypersFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Phenotypers
     * 
    **/
    select?: PhenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PhenotypersInclude | null
    /**
     * Filter, which Phenotypers to fetch.
     * 
    **/
    where: PhenotypersWhereUniqueInput
  }

  /**
   * Phenotypers findUnique
   */
  export interface PhenotypersFindUniqueArgs extends PhenotypersFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Phenotypers findUniqueOrThrow
   */
  export type PhenotypersFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Phenotypers
     * 
    **/
    select?: PhenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PhenotypersInclude | null
    /**
     * Filter, which Phenotypers to fetch.
     * 
    **/
    where: PhenotypersWhereUniqueInput
  }


  /**
   * Phenotypers base type for findFirst actions
   */
  export type PhenotypersFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Phenotypers
     * 
    **/
    select?: PhenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PhenotypersInclude | null
    /**
     * Filter, which Phenotypers to fetch.
     * 
    **/
    where?: PhenotypersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phenotypers to fetch.
     * 
    **/
    orderBy?: Enumerable<PhenotypersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Phenotypers.
     * 
    **/
    cursor?: PhenotypersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phenotypers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phenotypers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Phenotypers.
     * 
    **/
    distinct?: Enumerable<PhenotypersScalarFieldEnum>
  }

  /**
   * Phenotypers findFirst
   */
  export interface PhenotypersFindFirstArgs extends PhenotypersFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Phenotypers findFirstOrThrow
   */
  export type PhenotypersFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Phenotypers
     * 
    **/
    select?: PhenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PhenotypersInclude | null
    /**
     * Filter, which Phenotypers to fetch.
     * 
    **/
    where?: PhenotypersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phenotypers to fetch.
     * 
    **/
    orderBy?: Enumerable<PhenotypersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Phenotypers.
     * 
    **/
    cursor?: PhenotypersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phenotypers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phenotypers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Phenotypers.
     * 
    **/
    distinct?: Enumerable<PhenotypersScalarFieldEnum>
  }


  /**
   * Phenotypers findMany
   */
  export type PhenotypersFindManyArgs = {
    /**
     * Select specific fields to fetch from the Phenotypers
     * 
    **/
    select?: PhenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PhenotypersInclude | null
    /**
     * Filter, which Phenotypers to fetch.
     * 
    **/
    where?: PhenotypersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phenotypers to fetch.
     * 
    **/
    orderBy?: Enumerable<PhenotypersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Phenotypers.
     * 
    **/
    cursor?: PhenotypersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phenotypers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phenotypers.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PhenotypersScalarFieldEnum>
  }


  /**
   * Phenotypers create
   */
  export type PhenotypersCreateArgs = {
    /**
     * Select specific fields to fetch from the Phenotypers
     * 
    **/
    select?: PhenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PhenotypersInclude | null
    /**
     * The data needed to create a Phenotypers.
     * 
    **/
    data: XOR<PhenotypersCreateInput, PhenotypersUncheckedCreateInput>
  }


  /**
   * Phenotypers createMany
   */
  export type PhenotypersCreateManyArgs = {
    /**
     * The data used to create many Phenotypers.
     * 
    **/
    data: Enumerable<PhenotypersCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Phenotypers update
   */
  export type PhenotypersUpdateArgs = {
    /**
     * Select specific fields to fetch from the Phenotypers
     * 
    **/
    select?: PhenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PhenotypersInclude | null
    /**
     * The data needed to update a Phenotypers.
     * 
    **/
    data: XOR<PhenotypersUpdateInput, PhenotypersUncheckedUpdateInput>
    /**
     * Choose, which Phenotypers to update.
     * 
    **/
    where: PhenotypersWhereUniqueInput
  }


  /**
   * Phenotypers updateMany
   */
  export type PhenotypersUpdateManyArgs = {
    /**
     * The data used to update Phenotypers.
     * 
    **/
    data: XOR<PhenotypersUpdateManyMutationInput, PhenotypersUncheckedUpdateManyInput>
    /**
     * Filter which Phenotypers to update
     * 
    **/
    where?: PhenotypersWhereInput
  }


  /**
   * Phenotypers upsert
   */
  export type PhenotypersUpsertArgs = {
    /**
     * Select specific fields to fetch from the Phenotypers
     * 
    **/
    select?: PhenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PhenotypersInclude | null
    /**
     * The filter to search for the Phenotypers to update in case it exists.
     * 
    **/
    where: PhenotypersWhereUniqueInput
    /**
     * In case the Phenotypers found by the `where` argument doesn't exist, create a new Phenotypers with this data.
     * 
    **/
    create: XOR<PhenotypersCreateInput, PhenotypersUncheckedCreateInput>
    /**
     * In case the Phenotypers was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PhenotypersUpdateInput, PhenotypersUncheckedUpdateInput>
  }


  /**
   * Phenotypers delete
   */
  export type PhenotypersDeleteArgs = {
    /**
     * Select specific fields to fetch from the Phenotypers
     * 
    **/
    select?: PhenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PhenotypersInclude | null
    /**
     * Filter which Phenotypers to delete.
     * 
    **/
    where: PhenotypersWhereUniqueInput
  }


  /**
   * Phenotypers deleteMany
   */
  export type PhenotypersDeleteManyArgs = {
    /**
     * Filter which Phenotypers to delete
     * 
    **/
    where?: PhenotypersWhereInput
  }


  /**
   * Phenotypers.scans
   */
  export type Phenotypers$scansArgs = {
    /**
     * Select specific fields to fetch from the Scans
     * 
    **/
    select?: ScansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ScansInclude | null
    where?: ScansWhereInput
    orderBy?: Enumerable<ScansOrderByWithRelationInput>
    cursor?: ScansWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ScansScalarFieldEnum>
  }


  /**
   * Phenotypers without action
   */
  export type PhenotypersArgs = {
    /**
     * Select specific fields to fetch from the Phenotypers
     * 
    **/
    select?: PhenotypersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PhenotypersInclude | null
  }



  /**
   * Model Scans
   */


  export type AggregateScans = {
    _count: ScansCountAggregateOutputType | null
    _avg: ScansAvgAggregateOutputType | null
    _sum: ScansSumAggregateOutputType | null
    _min: ScansMinAggregateOutputType | null
    _max: ScansMaxAggregateOutputType | null
  }

  export type ScansAvgAggregateOutputType = {
    numframes: number | null
    exposuretime: number | null
    gain: number | null
    brightness: number | null
    contrast: number | null
    gamma: number | null
    secondsperrotation: number | null
  }

  export type ScansSumAggregateOutputType = {
    numframes: number | null
    exposuretime: number | null
    gain: number | null
    brightness: number | null
    contrast: number | null
    gamma: number | null
    secondsperrotation: number | null
  }

  export type ScansMinAggregateOutputType = {
    id: string | null
    phenotyperid: string | null
    plantqrcode: string | null
    path: string | null
    capturedate: Date | null
    numframes: number | null
    exposuretime: number | null
    gain: number | null
    brightness: number | null
    contrast: number | null
    gamma: number | null
    secondsperrotation: number | null
  }

  export type ScansMaxAggregateOutputType = {
    id: string | null
    phenotyperid: string | null
    plantqrcode: string | null
    path: string | null
    capturedate: Date | null
    numframes: number | null
    exposuretime: number | null
    gain: number | null
    brightness: number | null
    contrast: number | null
    gamma: number | null
    secondsperrotation: number | null
  }

  export type ScansCountAggregateOutputType = {
    id: number
    phenotyperid: number
    plantqrcode: number
    path: number
    capturedate: number
    numframes: number
    exposuretime: number
    gain: number
    brightness: number
    contrast: number
    gamma: number
    secondsperrotation: number
    _all: number
  }


  export type ScansAvgAggregateInputType = {
    numframes?: true
    exposuretime?: true
    gain?: true
    brightness?: true
    contrast?: true
    gamma?: true
    secondsperrotation?: true
  }

  export type ScansSumAggregateInputType = {
    numframes?: true
    exposuretime?: true
    gain?: true
    brightness?: true
    contrast?: true
    gamma?: true
    secondsperrotation?: true
  }

  export type ScansMinAggregateInputType = {
    id?: true
    phenotyperid?: true
    plantqrcode?: true
    path?: true
    capturedate?: true
    numframes?: true
    exposuretime?: true
    gain?: true
    brightness?: true
    contrast?: true
    gamma?: true
    secondsperrotation?: true
  }

  export type ScansMaxAggregateInputType = {
    id?: true
    phenotyperid?: true
    plantqrcode?: true
    path?: true
    capturedate?: true
    numframes?: true
    exposuretime?: true
    gain?: true
    brightness?: true
    contrast?: true
    gamma?: true
    secondsperrotation?: true
  }

  export type ScansCountAggregateInputType = {
    id?: true
    phenotyperid?: true
    plantqrcode?: true
    path?: true
    capturedate?: true
    numframes?: true
    exposuretime?: true
    gain?: true
    brightness?: true
    contrast?: true
    gamma?: true
    secondsperrotation?: true
    _all?: true
  }

  export type ScansAggregateArgs = {
    /**
     * Filter which Scans to aggregate.
     * 
    **/
    where?: ScansWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scans to fetch.
     * 
    **/
    orderBy?: Enumerable<ScansOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ScansWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scans from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scans.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Scans
    **/
    _count?: true | ScansCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScansAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScansSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScansMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScansMaxAggregateInputType
  }

  export type GetScansAggregateType<T extends ScansAggregateArgs> = {
        [P in keyof T & keyof AggregateScans]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScans[P]>
      : GetScalarType<T[P], AggregateScans[P]>
  }




  export type ScansGroupByArgs = {
    where?: ScansWhereInput
    orderBy?: Enumerable<ScansOrderByWithAggregationInput>
    by: Array<ScansScalarFieldEnum>
    having?: ScansScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScansCountAggregateInputType | true
    _avg?: ScansAvgAggregateInputType
    _sum?: ScansSumAggregateInputType
    _min?: ScansMinAggregateInputType
    _max?: ScansMaxAggregateInputType
  }


  export type ScansGroupByOutputType = {
    id: string
    phenotyperid: string | null
    plantqrcode: string | null
    path: string | null
    capturedate: Date | null
    numframes: number | null
    exposuretime: number | null
    gain: number | null
    brightness: number | null
    contrast: number | null
    gamma: number | null
    secondsperrotation: number | null
    _count: ScansCountAggregateOutputType | null
    _avg: ScansAvgAggregateOutputType | null
    _sum: ScansSumAggregateOutputType | null
    _min: ScansMinAggregateOutputType | null
    _max: ScansMaxAggregateOutputType | null
  }

  type GetScansGroupByPayload<T extends ScansGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ScansGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScansGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScansGroupByOutputType[P]>
            : GetScalarType<T[P], ScansGroupByOutputType[P]>
        }
      >
    >


  export type ScansSelect = {
    id?: boolean
    phenotyperid?: boolean
    plantqrcode?: boolean
    path?: boolean
    capturedate?: boolean
    numframes?: boolean
    exposuretime?: boolean
    gain?: boolean
    brightness?: boolean
    contrast?: boolean
    gamma?: boolean
    secondsperrotation?: boolean
    images?: boolean | Scans$imagesArgs
    phenotypers?: boolean | PhenotypersArgs
    _count?: boolean | ScansCountOutputTypeArgs
  }


  export type ScansInclude = {
    images?: boolean | Scans$imagesArgs
    phenotypers?: boolean | PhenotypersArgs
    _count?: boolean | ScansCountOutputTypeArgs
  } 

  export type ScansGetPayload<S extends boolean | null | undefined | ScansArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Scans :
    S extends undefined ? never :
    S extends { include: any } & (ScansArgs | ScansFindManyArgs)
    ? Scans  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'images' ? Array < ImagesGetPayload<S['include'][P]>>  :
        P extends 'phenotypers' ? PhenotypersGetPayload<S['include'][P]> | null :
        P extends '_count' ? ScansCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ScansArgs | ScansFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'images' ? Array < ImagesGetPayload<S['select'][P]>>  :
        P extends 'phenotypers' ? PhenotypersGetPayload<S['select'][P]> | null :
        P extends '_count' ? ScansCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Scans ? Scans[P] : never
  } 
      : Scans


  type ScansCountArgs = Merge<
    Omit<ScansFindManyArgs, 'select' | 'include'> & {
      select?: ScansCountAggregateInputType | true
    }
  >

  export interface ScansDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Scans that matches the filter.
     * @param {ScansFindUniqueArgs} args - Arguments to find a Scans
     * @example
     * // Get one Scans
     * const scans = await prisma.scans.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ScansFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ScansFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Scans'> extends True ? Prisma__ScansClient<ScansGetPayload<T>> : Prisma__ScansClient<ScansGetPayload<T> | null, null>

    /**
     * Find one Scans that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ScansFindUniqueOrThrowArgs} args - Arguments to find a Scans
     * @example
     * // Get one Scans
     * const scans = await prisma.scans.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ScansFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ScansFindUniqueOrThrowArgs>
    ): Prisma__ScansClient<ScansGetPayload<T>>

    /**
     * Find the first Scans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScansFindFirstArgs} args - Arguments to find a Scans
     * @example
     * // Get one Scans
     * const scans = await prisma.scans.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ScansFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ScansFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Scans'> extends True ? Prisma__ScansClient<ScansGetPayload<T>> : Prisma__ScansClient<ScansGetPayload<T> | null, null>

    /**
     * Find the first Scans that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScansFindFirstOrThrowArgs} args - Arguments to find a Scans
     * @example
     * // Get one Scans
     * const scans = await prisma.scans.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ScansFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ScansFindFirstOrThrowArgs>
    ): Prisma__ScansClient<ScansGetPayload<T>>

    /**
     * Find zero or more Scans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScansFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Scans
     * const scans = await prisma.scans.findMany()
     * 
     * // Get first 10 Scans
     * const scans = await prisma.scans.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scansWithIdOnly = await prisma.scans.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ScansFindManyArgs>(
      args?: SelectSubset<T, ScansFindManyArgs>
    ): PrismaPromise<Array<ScansGetPayload<T>>>

    /**
     * Create a Scans.
     * @param {ScansCreateArgs} args - Arguments to create a Scans.
     * @example
     * // Create one Scans
     * const Scans = await prisma.scans.create({
     *   data: {
     *     // ... data to create a Scans
     *   }
     * })
     * 
    **/
    create<T extends ScansCreateArgs>(
      args: SelectSubset<T, ScansCreateArgs>
    ): Prisma__ScansClient<ScansGetPayload<T>>

    /**
     * Create many Scans.
     *     @param {ScansCreateManyArgs} args - Arguments to create many Scans.
     *     @example
     *     // Create many Scans
     *     const scans = await prisma.scans.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ScansCreateManyArgs>(
      args?: SelectSubset<T, ScansCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Scans.
     * @param {ScansDeleteArgs} args - Arguments to delete one Scans.
     * @example
     * // Delete one Scans
     * const Scans = await prisma.scans.delete({
     *   where: {
     *     // ... filter to delete one Scans
     *   }
     * })
     * 
    **/
    delete<T extends ScansDeleteArgs>(
      args: SelectSubset<T, ScansDeleteArgs>
    ): Prisma__ScansClient<ScansGetPayload<T>>

    /**
     * Update one Scans.
     * @param {ScansUpdateArgs} args - Arguments to update one Scans.
     * @example
     * // Update one Scans
     * const scans = await prisma.scans.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ScansUpdateArgs>(
      args: SelectSubset<T, ScansUpdateArgs>
    ): Prisma__ScansClient<ScansGetPayload<T>>

    /**
     * Delete zero or more Scans.
     * @param {ScansDeleteManyArgs} args - Arguments to filter Scans to delete.
     * @example
     * // Delete a few Scans
     * const { count } = await prisma.scans.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ScansDeleteManyArgs>(
      args?: SelectSubset<T, ScansDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Scans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScansUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Scans
     * const scans = await prisma.scans.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ScansUpdateManyArgs>(
      args: SelectSubset<T, ScansUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Scans.
     * @param {ScansUpsertArgs} args - Arguments to update or create a Scans.
     * @example
     * // Update or create a Scans
     * const scans = await prisma.scans.upsert({
     *   create: {
     *     // ... data to create a Scans
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Scans we want to update
     *   }
     * })
    **/
    upsert<T extends ScansUpsertArgs>(
      args: SelectSubset<T, ScansUpsertArgs>
    ): Prisma__ScansClient<ScansGetPayload<T>>

    /**
     * Count the number of Scans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScansCountArgs} args - Arguments to filter Scans to count.
     * @example
     * // Count the number of Scans
     * const count = await prisma.scans.count({
     *   where: {
     *     // ... the filter for the Scans we want to count
     *   }
     * })
    **/
    count<T extends ScansCountArgs>(
      args?: Subset<T, ScansCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScansCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Scans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScansAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ScansAggregateArgs>(args: Subset<T, ScansAggregateArgs>): PrismaPromise<GetScansAggregateType<T>>

    /**
     * Group by Scans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScansGroupByArgs} args - Group by arguments.
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
      T extends ScansGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScansGroupByArgs['orderBy'] }
        : { orderBy?: ScansGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ScansGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScansGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Scans.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ScansClient<T, Null = never> implements PrismaPromise<T> {
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

    images<T extends Scans$imagesArgs= {}>(args?: Subset<T, Scans$imagesArgs>): PrismaPromise<Array<ImagesGetPayload<T>>| Null>;

    phenotypers<T extends PhenotypersArgs= {}>(args?: Subset<T, PhenotypersArgs>): Prisma__PhenotypersClient<PhenotypersGetPayload<T> | Null>;

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
   * Scans base type for findUnique actions
   */
  export type ScansFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Scans
     * 
    **/
    select?: ScansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ScansInclude | null
    /**
     * Filter, which Scans to fetch.
     * 
    **/
    where: ScansWhereUniqueInput
  }

  /**
   * Scans findUnique
   */
  export interface ScansFindUniqueArgs extends ScansFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Scans findUniqueOrThrow
   */
  export type ScansFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Scans
     * 
    **/
    select?: ScansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ScansInclude | null
    /**
     * Filter, which Scans to fetch.
     * 
    **/
    where: ScansWhereUniqueInput
  }


  /**
   * Scans base type for findFirst actions
   */
  export type ScansFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Scans
     * 
    **/
    select?: ScansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ScansInclude | null
    /**
     * Filter, which Scans to fetch.
     * 
    **/
    where?: ScansWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scans to fetch.
     * 
    **/
    orderBy?: Enumerable<ScansOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Scans.
     * 
    **/
    cursor?: ScansWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scans from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scans.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scans.
     * 
    **/
    distinct?: Enumerable<ScansScalarFieldEnum>
  }

  /**
   * Scans findFirst
   */
  export interface ScansFindFirstArgs extends ScansFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Scans findFirstOrThrow
   */
  export type ScansFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Scans
     * 
    **/
    select?: ScansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ScansInclude | null
    /**
     * Filter, which Scans to fetch.
     * 
    **/
    where?: ScansWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scans to fetch.
     * 
    **/
    orderBy?: Enumerable<ScansOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Scans.
     * 
    **/
    cursor?: ScansWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scans from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scans.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scans.
     * 
    **/
    distinct?: Enumerable<ScansScalarFieldEnum>
  }


  /**
   * Scans findMany
   */
  export type ScansFindManyArgs = {
    /**
     * Select specific fields to fetch from the Scans
     * 
    **/
    select?: ScansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ScansInclude | null
    /**
     * Filter, which Scans to fetch.
     * 
    **/
    where?: ScansWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scans to fetch.
     * 
    **/
    orderBy?: Enumerable<ScansOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Scans.
     * 
    **/
    cursor?: ScansWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scans from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scans.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ScansScalarFieldEnum>
  }


  /**
   * Scans create
   */
  export type ScansCreateArgs = {
    /**
     * Select specific fields to fetch from the Scans
     * 
    **/
    select?: ScansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ScansInclude | null
    /**
     * The data needed to create a Scans.
     * 
    **/
    data: XOR<ScansCreateInput, ScansUncheckedCreateInput>
  }


  /**
   * Scans createMany
   */
  export type ScansCreateManyArgs = {
    /**
     * The data used to create many Scans.
     * 
    **/
    data: Enumerable<ScansCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Scans update
   */
  export type ScansUpdateArgs = {
    /**
     * Select specific fields to fetch from the Scans
     * 
    **/
    select?: ScansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ScansInclude | null
    /**
     * The data needed to update a Scans.
     * 
    **/
    data: XOR<ScansUpdateInput, ScansUncheckedUpdateInput>
    /**
     * Choose, which Scans to update.
     * 
    **/
    where: ScansWhereUniqueInput
  }


  /**
   * Scans updateMany
   */
  export type ScansUpdateManyArgs = {
    /**
     * The data used to update Scans.
     * 
    **/
    data: XOR<ScansUpdateManyMutationInput, ScansUncheckedUpdateManyInput>
    /**
     * Filter which Scans to update
     * 
    **/
    where?: ScansWhereInput
  }


  /**
   * Scans upsert
   */
  export type ScansUpsertArgs = {
    /**
     * Select specific fields to fetch from the Scans
     * 
    **/
    select?: ScansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ScansInclude | null
    /**
     * The filter to search for the Scans to update in case it exists.
     * 
    **/
    where: ScansWhereUniqueInput
    /**
     * In case the Scans found by the `where` argument doesn't exist, create a new Scans with this data.
     * 
    **/
    create: XOR<ScansCreateInput, ScansUncheckedCreateInput>
    /**
     * In case the Scans was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ScansUpdateInput, ScansUncheckedUpdateInput>
  }


  /**
   * Scans delete
   */
  export type ScansDeleteArgs = {
    /**
     * Select specific fields to fetch from the Scans
     * 
    **/
    select?: ScansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ScansInclude | null
    /**
     * Filter which Scans to delete.
     * 
    **/
    where: ScansWhereUniqueInput
  }


  /**
   * Scans deleteMany
   */
  export type ScansDeleteManyArgs = {
    /**
     * Filter which Scans to delete
     * 
    **/
    where?: ScansWhereInput
  }


  /**
   * Scans.images
   */
  export type Scans$imagesArgs = {
    /**
     * Select specific fields to fetch from the Images
     * 
    **/
    select?: ImagesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ImagesInclude | null
    where?: ImagesWhereInput
    orderBy?: Enumerable<ImagesOrderByWithRelationInput>
    cursor?: ImagesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ImagesScalarFieldEnum>
  }


  /**
   * Scans without action
   */
  export type ScansArgs = {
    /**
     * Select specific fields to fetch from the Scans
     * 
    **/
    select?: ScansSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ScansInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const ImagesScalarFieldEnum: {
    id: 'id',
    scanid: 'scanid',
    framenumber: 'framenumber',
    path: 'path',
    url: 'url',
    status: 'status'
  };

  export type ImagesScalarFieldEnum = (typeof ImagesScalarFieldEnum)[keyof typeof ImagesScalarFieldEnum]


  export const PhenotypersScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email'
  };

  export type PhenotypersScalarFieldEnum = (typeof PhenotypersScalarFieldEnum)[keyof typeof PhenotypersScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const ScansScalarFieldEnum: {
    id: 'id',
    phenotyperid: 'phenotyperid',
    plantqrcode: 'plantqrcode',
    path: 'path',
    capturedate: 'capturedate',
    numframes: 'numframes',
    exposuretime: 'exposuretime',
    gain: 'gain',
    brightness: 'brightness',
    contrast: 'contrast',
    gamma: 'gamma',
    secondsperrotation: 'secondsperrotation'
  };

  export type ScansScalarFieldEnum = (typeof ScansScalarFieldEnum)[keyof typeof ScansScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  /**
   * Deep Input Types
   */


  export type ImagesWhereInput = {
    AND?: Enumerable<ImagesWhereInput>
    OR?: Enumerable<ImagesWhereInput>
    NOT?: Enumerable<ImagesWhereInput>
    id?: UuidFilter | string
    scanid?: UuidNullableFilter | string | null
    framenumber?: IntNullableFilter | number | null
    path?: StringNullableFilter | string | null
    url?: StringNullableFilter | string | null
    status?: StringNullableFilter | string | null
    scans?: XOR<ScansRelationFilter, ScansWhereInput> | null
  }

  export type ImagesOrderByWithRelationInput = {
    id?: SortOrder
    scanid?: SortOrder
    framenumber?: SortOrder
    path?: SortOrder
    url?: SortOrder
    status?: SortOrder
    scans?: ScansOrderByWithRelationInput
  }

  export type ImagesWhereUniqueInput = {
    id?: string
  }

  export type ImagesOrderByWithAggregationInput = {
    id?: SortOrder
    scanid?: SortOrder
    framenumber?: SortOrder
    path?: SortOrder
    url?: SortOrder
    status?: SortOrder
    _count?: ImagesCountOrderByAggregateInput
    _avg?: ImagesAvgOrderByAggregateInput
    _max?: ImagesMaxOrderByAggregateInput
    _min?: ImagesMinOrderByAggregateInput
    _sum?: ImagesSumOrderByAggregateInput
  }

  export type ImagesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ImagesScalarWhereWithAggregatesInput>
    OR?: Enumerable<ImagesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ImagesScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter | string
    scanid?: UuidNullableWithAggregatesFilter | string | null
    framenumber?: IntNullableWithAggregatesFilter | number | null
    path?: StringNullableWithAggregatesFilter | string | null
    url?: StringNullableWithAggregatesFilter | string | null
    status?: StringNullableWithAggregatesFilter | string | null
  }

  export type PhenotypersWhereInput = {
    AND?: Enumerable<PhenotypersWhereInput>
    OR?: Enumerable<PhenotypersWhereInput>
    NOT?: Enumerable<PhenotypersWhereInput>
    id?: UuidFilter | string
    name?: StringNullableFilter | string | null
    email?: StringNullableFilter | string | null
    scans?: ScansListRelationFilter
  }

  export type PhenotypersOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    scans?: ScansOrderByRelationAggregateInput
  }

  export type PhenotypersWhereUniqueInput = {
    id?: string
  }

  export type PhenotypersOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    _count?: PhenotypersCountOrderByAggregateInput
    _max?: PhenotypersMaxOrderByAggregateInput
    _min?: PhenotypersMinOrderByAggregateInput
  }

  export type PhenotypersScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PhenotypersScalarWhereWithAggregatesInput>
    OR?: Enumerable<PhenotypersScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PhenotypersScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter | string
    name?: StringNullableWithAggregatesFilter | string | null
    email?: StringNullableWithAggregatesFilter | string | null
  }

  export type ScansWhereInput = {
    AND?: Enumerable<ScansWhereInput>
    OR?: Enumerable<ScansWhereInput>
    NOT?: Enumerable<ScansWhereInput>
    id?: UuidFilter | string
    phenotyperid?: UuidNullableFilter | string | null
    plantqrcode?: StringNullableFilter | string | null
    path?: StringNullableFilter | string | null
    capturedate?: DateTimeNullableFilter | Date | string | null
    numframes?: IntNullableFilter | number | null
    exposuretime?: IntNullableFilter | number | null
    gain?: FloatNullableFilter | number | null
    brightness?: FloatNullableFilter | number | null
    contrast?: FloatNullableFilter | number | null
    gamma?: FloatNullableFilter | number | null
    secondsperrotation?: FloatNullableFilter | number | null
    images?: ImagesListRelationFilter
    phenotypers?: XOR<PhenotypersRelationFilter, PhenotypersWhereInput> | null
  }

  export type ScansOrderByWithRelationInput = {
    id?: SortOrder
    phenotyperid?: SortOrder
    plantqrcode?: SortOrder
    path?: SortOrder
    capturedate?: SortOrder
    numframes?: SortOrder
    exposuretime?: SortOrder
    gain?: SortOrder
    brightness?: SortOrder
    contrast?: SortOrder
    gamma?: SortOrder
    secondsperrotation?: SortOrder
    images?: ImagesOrderByRelationAggregateInput
    phenotypers?: PhenotypersOrderByWithRelationInput
  }

  export type ScansWhereUniqueInput = {
    id?: string
  }

  export type ScansOrderByWithAggregationInput = {
    id?: SortOrder
    phenotyperid?: SortOrder
    plantqrcode?: SortOrder
    path?: SortOrder
    capturedate?: SortOrder
    numframes?: SortOrder
    exposuretime?: SortOrder
    gain?: SortOrder
    brightness?: SortOrder
    contrast?: SortOrder
    gamma?: SortOrder
    secondsperrotation?: SortOrder
    _count?: ScansCountOrderByAggregateInput
    _avg?: ScansAvgOrderByAggregateInput
    _max?: ScansMaxOrderByAggregateInput
    _min?: ScansMinOrderByAggregateInput
    _sum?: ScansSumOrderByAggregateInput
  }

  export type ScansScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ScansScalarWhereWithAggregatesInput>
    OR?: Enumerable<ScansScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ScansScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter | string
    phenotyperid?: UuidNullableWithAggregatesFilter | string | null
    plantqrcode?: StringNullableWithAggregatesFilter | string | null
    path?: StringNullableWithAggregatesFilter | string | null
    capturedate?: DateTimeNullableWithAggregatesFilter | Date | string | null
    numframes?: IntNullableWithAggregatesFilter | number | null
    exposuretime?: IntNullableWithAggregatesFilter | number | null
    gain?: FloatNullableWithAggregatesFilter | number | null
    brightness?: FloatNullableWithAggregatesFilter | number | null
    contrast?: FloatNullableWithAggregatesFilter | number | null
    gamma?: FloatNullableWithAggregatesFilter | number | null
    secondsperrotation?: FloatNullableWithAggregatesFilter | number | null
  }

  export type ImagesCreateInput = {
    id: string
    framenumber?: number | null
    path?: string | null
    url?: string | null
    status?: string | null
    scans?: ScansCreateNestedOneWithoutImagesInput
  }

  export type ImagesUncheckedCreateInput = {
    id: string
    scanid?: string | null
    framenumber?: number | null
    path?: string | null
    url?: string | null
    status?: string | null
  }

  export type ImagesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    framenumber?: NullableIntFieldUpdateOperationsInput | number | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    scans?: ScansUpdateOneWithoutImagesNestedInput
  }

  export type ImagesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    scanid?: NullableStringFieldUpdateOperationsInput | string | null
    framenumber?: NullableIntFieldUpdateOperationsInput | number | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ImagesCreateManyInput = {
    id: string
    scanid?: string | null
    framenumber?: number | null
    path?: string | null
    url?: string | null
    status?: string | null
  }

  export type ImagesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    framenumber?: NullableIntFieldUpdateOperationsInput | number | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ImagesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    scanid?: NullableStringFieldUpdateOperationsInput | string | null
    framenumber?: NullableIntFieldUpdateOperationsInput | number | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PhenotypersCreateInput = {
    id: string
    name?: string | null
    email?: string | null
    scans?: ScansCreateNestedManyWithoutPhenotypersInput
  }

  export type PhenotypersUncheckedCreateInput = {
    id: string
    name?: string | null
    email?: string | null
    scans?: ScansUncheckedCreateNestedManyWithoutPhenotypersInput
  }

  export type PhenotypersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    scans?: ScansUpdateManyWithoutPhenotypersNestedInput
  }

  export type PhenotypersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    scans?: ScansUncheckedUpdateManyWithoutPhenotypersNestedInput
  }

  export type PhenotypersCreateManyInput = {
    id: string
    name?: string | null
    email?: string | null
  }

  export type PhenotypersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PhenotypersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScansCreateInput = {
    id: string
    plantqrcode?: string | null
    path?: string | null
    capturedate?: Date | string | null
    numframes?: number | null
    exposuretime?: number | null
    gain?: number | null
    brightness?: number | null
    contrast?: number | null
    gamma?: number | null
    secondsperrotation?: number | null
    images?: ImagesCreateNestedManyWithoutScansInput
    phenotypers?: PhenotypersCreateNestedOneWithoutScansInput
  }

  export type ScansUncheckedCreateInput = {
    id: string
    phenotyperid?: string | null
    plantqrcode?: string | null
    path?: string | null
    capturedate?: Date | string | null
    numframes?: number | null
    exposuretime?: number | null
    gain?: number | null
    brightness?: number | null
    contrast?: number | null
    gamma?: number | null
    secondsperrotation?: number | null
    images?: ImagesUncheckedCreateNestedManyWithoutScansInput
  }

  export type ScansUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plantqrcode?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    capturedate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numframes?: NullableIntFieldUpdateOperationsInput | number | null
    exposuretime?: NullableIntFieldUpdateOperationsInput | number | null
    gain?: NullableFloatFieldUpdateOperationsInput | number | null
    brightness?: NullableFloatFieldUpdateOperationsInput | number | null
    contrast?: NullableFloatFieldUpdateOperationsInput | number | null
    gamma?: NullableFloatFieldUpdateOperationsInput | number | null
    secondsperrotation?: NullableFloatFieldUpdateOperationsInput | number | null
    images?: ImagesUpdateManyWithoutScansNestedInput
    phenotypers?: PhenotypersUpdateOneWithoutScansNestedInput
  }

  export type ScansUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phenotyperid?: NullableStringFieldUpdateOperationsInput | string | null
    plantqrcode?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    capturedate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numframes?: NullableIntFieldUpdateOperationsInput | number | null
    exposuretime?: NullableIntFieldUpdateOperationsInput | number | null
    gain?: NullableFloatFieldUpdateOperationsInput | number | null
    brightness?: NullableFloatFieldUpdateOperationsInput | number | null
    contrast?: NullableFloatFieldUpdateOperationsInput | number | null
    gamma?: NullableFloatFieldUpdateOperationsInput | number | null
    secondsperrotation?: NullableFloatFieldUpdateOperationsInput | number | null
    images?: ImagesUncheckedUpdateManyWithoutScansNestedInput
  }

  export type ScansCreateManyInput = {
    id: string
    phenotyperid?: string | null
    plantqrcode?: string | null
    path?: string | null
    capturedate?: Date | string | null
    numframes?: number | null
    exposuretime?: number | null
    gain?: number | null
    brightness?: number | null
    contrast?: number | null
    gamma?: number | null
    secondsperrotation?: number | null
  }

  export type ScansUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plantqrcode?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    capturedate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numframes?: NullableIntFieldUpdateOperationsInput | number | null
    exposuretime?: NullableIntFieldUpdateOperationsInput | number | null
    gain?: NullableFloatFieldUpdateOperationsInput | number | null
    brightness?: NullableFloatFieldUpdateOperationsInput | number | null
    contrast?: NullableFloatFieldUpdateOperationsInput | number | null
    gamma?: NullableFloatFieldUpdateOperationsInput | number | null
    secondsperrotation?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ScansUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    phenotyperid?: NullableStringFieldUpdateOperationsInput | string | null
    plantqrcode?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    capturedate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numframes?: NullableIntFieldUpdateOperationsInput | number | null
    exposuretime?: NullableIntFieldUpdateOperationsInput | number | null
    gain?: NullableFloatFieldUpdateOperationsInput | number | null
    brightness?: NullableFloatFieldUpdateOperationsInput | number | null
    contrast?: NullableFloatFieldUpdateOperationsInput | number | null
    gamma?: NullableFloatFieldUpdateOperationsInput | number | null
    secondsperrotation?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type UuidFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    mode?: QueryMode
    not?: NestedUuidFilter | string
  }

  export type UuidNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    mode?: QueryMode
    not?: NestedUuidNullableFilter | string | null
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type ScansRelationFilter = {
    is?: ScansWhereInput | null
    isNot?: ScansWhereInput | null
  }

  export type ImagesCountOrderByAggregateInput = {
    id?: SortOrder
    scanid?: SortOrder
    framenumber?: SortOrder
    path?: SortOrder
    url?: SortOrder
    status?: SortOrder
  }

  export type ImagesAvgOrderByAggregateInput = {
    framenumber?: SortOrder
  }

  export type ImagesMaxOrderByAggregateInput = {
    id?: SortOrder
    scanid?: SortOrder
    framenumber?: SortOrder
    path?: SortOrder
    url?: SortOrder
    status?: SortOrder
  }

  export type ImagesMinOrderByAggregateInput = {
    id?: SortOrder
    scanid?: SortOrder
    framenumber?: SortOrder
    path?: SortOrder
    url?: SortOrder
    status?: SortOrder
  }

  export type ImagesSumOrderByAggregateInput = {
    framenumber?: SortOrder
  }

  export type UuidWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type UuidNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type ScansListRelationFilter = {
    every?: ScansWhereInput
    some?: ScansWhereInput
    none?: ScansWhereInput
  }

  export type ScansOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PhenotypersCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type PhenotypersMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type PhenotypersMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type FloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type ImagesListRelationFilter = {
    every?: ImagesWhereInput
    some?: ImagesWhereInput
    none?: ImagesWhereInput
  }

  export type PhenotypersRelationFilter = {
    is?: PhenotypersWhereInput | null
    isNot?: PhenotypersWhereInput | null
  }

  export type ImagesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ScansCountOrderByAggregateInput = {
    id?: SortOrder
    phenotyperid?: SortOrder
    plantqrcode?: SortOrder
    path?: SortOrder
    capturedate?: SortOrder
    numframes?: SortOrder
    exposuretime?: SortOrder
    gain?: SortOrder
    brightness?: SortOrder
    contrast?: SortOrder
    gamma?: SortOrder
    secondsperrotation?: SortOrder
  }

  export type ScansAvgOrderByAggregateInput = {
    numframes?: SortOrder
    exposuretime?: SortOrder
    gain?: SortOrder
    brightness?: SortOrder
    contrast?: SortOrder
    gamma?: SortOrder
    secondsperrotation?: SortOrder
  }

  export type ScansMaxOrderByAggregateInput = {
    id?: SortOrder
    phenotyperid?: SortOrder
    plantqrcode?: SortOrder
    path?: SortOrder
    capturedate?: SortOrder
    numframes?: SortOrder
    exposuretime?: SortOrder
    gain?: SortOrder
    brightness?: SortOrder
    contrast?: SortOrder
    gamma?: SortOrder
    secondsperrotation?: SortOrder
  }

  export type ScansMinOrderByAggregateInput = {
    id?: SortOrder
    phenotyperid?: SortOrder
    plantqrcode?: SortOrder
    path?: SortOrder
    capturedate?: SortOrder
    numframes?: SortOrder
    exposuretime?: SortOrder
    gain?: SortOrder
    brightness?: SortOrder
    contrast?: SortOrder
    gamma?: SortOrder
    secondsperrotation?: SortOrder
  }

  export type ScansSumOrderByAggregateInput = {
    numframes?: SortOrder
    exposuretime?: SortOrder
    gain?: SortOrder
    brightness?: SortOrder
    contrast?: SortOrder
    gamma?: SortOrder
    secondsperrotation?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type FloatNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedFloatNullableFilter
    _min?: NestedFloatNullableFilter
    _max?: NestedFloatNullableFilter
  }

  export type ScansCreateNestedOneWithoutImagesInput = {
    create?: XOR<ScansCreateWithoutImagesInput, ScansUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ScansCreateOrConnectWithoutImagesInput
    connect?: ScansWhereUniqueInput
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

  export type ScansUpdateOneWithoutImagesNestedInput = {
    create?: XOR<ScansCreateWithoutImagesInput, ScansUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ScansCreateOrConnectWithoutImagesInput
    upsert?: ScansUpsertWithoutImagesInput
    disconnect?: boolean
    delete?: boolean
    connect?: ScansWhereUniqueInput
    update?: XOR<ScansUpdateWithoutImagesInput, ScansUncheckedUpdateWithoutImagesInput>
  }

  export type ScansCreateNestedManyWithoutPhenotypersInput = {
    create?: XOR<Enumerable<ScansCreateWithoutPhenotypersInput>, Enumerable<ScansUncheckedCreateWithoutPhenotypersInput>>
    connectOrCreate?: Enumerable<ScansCreateOrConnectWithoutPhenotypersInput>
    createMany?: ScansCreateManyPhenotypersInputEnvelope
    connect?: Enumerable<ScansWhereUniqueInput>
  }

  export type ScansUncheckedCreateNestedManyWithoutPhenotypersInput = {
    create?: XOR<Enumerable<ScansCreateWithoutPhenotypersInput>, Enumerable<ScansUncheckedCreateWithoutPhenotypersInput>>
    connectOrCreate?: Enumerable<ScansCreateOrConnectWithoutPhenotypersInput>
    createMany?: ScansCreateManyPhenotypersInputEnvelope
    connect?: Enumerable<ScansWhereUniqueInput>
  }

  export type ScansUpdateManyWithoutPhenotypersNestedInput = {
    create?: XOR<Enumerable<ScansCreateWithoutPhenotypersInput>, Enumerable<ScansUncheckedCreateWithoutPhenotypersInput>>
    connectOrCreate?: Enumerable<ScansCreateOrConnectWithoutPhenotypersInput>
    upsert?: Enumerable<ScansUpsertWithWhereUniqueWithoutPhenotypersInput>
    createMany?: ScansCreateManyPhenotypersInputEnvelope
    set?: Enumerable<ScansWhereUniqueInput>
    disconnect?: Enumerable<ScansWhereUniqueInput>
    delete?: Enumerable<ScansWhereUniqueInput>
    connect?: Enumerable<ScansWhereUniqueInput>
    update?: Enumerable<ScansUpdateWithWhereUniqueWithoutPhenotypersInput>
    updateMany?: Enumerable<ScansUpdateManyWithWhereWithoutPhenotypersInput>
    deleteMany?: Enumerable<ScansScalarWhereInput>
  }

  export type ScansUncheckedUpdateManyWithoutPhenotypersNestedInput = {
    create?: XOR<Enumerable<ScansCreateWithoutPhenotypersInput>, Enumerable<ScansUncheckedCreateWithoutPhenotypersInput>>
    connectOrCreate?: Enumerable<ScansCreateOrConnectWithoutPhenotypersInput>
    upsert?: Enumerable<ScansUpsertWithWhereUniqueWithoutPhenotypersInput>
    createMany?: ScansCreateManyPhenotypersInputEnvelope
    set?: Enumerable<ScansWhereUniqueInput>
    disconnect?: Enumerable<ScansWhereUniqueInput>
    delete?: Enumerable<ScansWhereUniqueInput>
    connect?: Enumerable<ScansWhereUniqueInput>
    update?: Enumerable<ScansUpdateWithWhereUniqueWithoutPhenotypersInput>
    updateMany?: Enumerable<ScansUpdateManyWithWhereWithoutPhenotypersInput>
    deleteMany?: Enumerable<ScansScalarWhereInput>
  }

  export type ImagesCreateNestedManyWithoutScansInput = {
    create?: XOR<Enumerable<ImagesCreateWithoutScansInput>, Enumerable<ImagesUncheckedCreateWithoutScansInput>>
    connectOrCreate?: Enumerable<ImagesCreateOrConnectWithoutScansInput>
    createMany?: ImagesCreateManyScansInputEnvelope
    connect?: Enumerable<ImagesWhereUniqueInput>
  }

  export type PhenotypersCreateNestedOneWithoutScansInput = {
    create?: XOR<PhenotypersCreateWithoutScansInput, PhenotypersUncheckedCreateWithoutScansInput>
    connectOrCreate?: PhenotypersCreateOrConnectWithoutScansInput
    connect?: PhenotypersWhereUniqueInput
  }

  export type ImagesUncheckedCreateNestedManyWithoutScansInput = {
    create?: XOR<Enumerable<ImagesCreateWithoutScansInput>, Enumerable<ImagesUncheckedCreateWithoutScansInput>>
    connectOrCreate?: Enumerable<ImagesCreateOrConnectWithoutScansInput>
    createMany?: ImagesCreateManyScansInputEnvelope
    connect?: Enumerable<ImagesWhereUniqueInput>
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

  export type ImagesUpdateManyWithoutScansNestedInput = {
    create?: XOR<Enumerable<ImagesCreateWithoutScansInput>, Enumerable<ImagesUncheckedCreateWithoutScansInput>>
    connectOrCreate?: Enumerable<ImagesCreateOrConnectWithoutScansInput>
    upsert?: Enumerable<ImagesUpsertWithWhereUniqueWithoutScansInput>
    createMany?: ImagesCreateManyScansInputEnvelope
    set?: Enumerable<ImagesWhereUniqueInput>
    disconnect?: Enumerable<ImagesWhereUniqueInput>
    delete?: Enumerable<ImagesWhereUniqueInput>
    connect?: Enumerable<ImagesWhereUniqueInput>
    update?: Enumerable<ImagesUpdateWithWhereUniqueWithoutScansInput>
    updateMany?: Enumerable<ImagesUpdateManyWithWhereWithoutScansInput>
    deleteMany?: Enumerable<ImagesScalarWhereInput>
  }

  export type PhenotypersUpdateOneWithoutScansNestedInput = {
    create?: XOR<PhenotypersCreateWithoutScansInput, PhenotypersUncheckedCreateWithoutScansInput>
    connectOrCreate?: PhenotypersCreateOrConnectWithoutScansInput
    upsert?: PhenotypersUpsertWithoutScansInput
    disconnect?: boolean
    delete?: boolean
    connect?: PhenotypersWhereUniqueInput
    update?: XOR<PhenotypersUpdateWithoutScansInput, PhenotypersUncheckedUpdateWithoutScansInput>
  }

  export type ImagesUncheckedUpdateManyWithoutScansNestedInput = {
    create?: XOR<Enumerable<ImagesCreateWithoutScansInput>, Enumerable<ImagesUncheckedCreateWithoutScansInput>>
    connectOrCreate?: Enumerable<ImagesCreateOrConnectWithoutScansInput>
    upsert?: Enumerable<ImagesUpsertWithWhereUniqueWithoutScansInput>
    createMany?: ImagesCreateManyScansInputEnvelope
    set?: Enumerable<ImagesWhereUniqueInput>
    disconnect?: Enumerable<ImagesWhereUniqueInput>
    delete?: Enumerable<ImagesWhereUniqueInput>
    connect?: Enumerable<ImagesWhereUniqueInput>
    update?: Enumerable<ImagesUpdateWithWhereUniqueWithoutScansInput>
    updateMany?: Enumerable<ImagesUpdateManyWithWhereWithoutScansInput>
    deleteMany?: Enumerable<ImagesScalarWhereInput>
  }

  export type NestedUuidFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    not?: NestedUuidFilter | string
  }

  export type NestedUuidNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    not?: NestedUuidNullableFilter | string | null
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedUuidWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    not?: NestedUuidWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedUuidNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    not?: NestedUuidNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedFloatNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedFloatNullableFilter
    _min?: NestedFloatNullableFilter
    _max?: NestedFloatNullableFilter
  }

  export type ScansCreateWithoutImagesInput = {
    id: string
    plantqrcode?: string | null
    path?: string | null
    capturedate?: Date | string | null
    numframes?: number | null
    exposuretime?: number | null
    gain?: number | null
    brightness?: number | null
    contrast?: number | null
    gamma?: number | null
    secondsperrotation?: number | null
    phenotypers?: PhenotypersCreateNestedOneWithoutScansInput
  }

  export type ScansUncheckedCreateWithoutImagesInput = {
    id: string
    phenotyperid?: string | null
    plantqrcode?: string | null
    path?: string | null
    capturedate?: Date | string | null
    numframes?: number | null
    exposuretime?: number | null
    gain?: number | null
    brightness?: number | null
    contrast?: number | null
    gamma?: number | null
    secondsperrotation?: number | null
  }

  export type ScansCreateOrConnectWithoutImagesInput = {
    where: ScansWhereUniqueInput
    create: XOR<ScansCreateWithoutImagesInput, ScansUncheckedCreateWithoutImagesInput>
  }

  export type ScansUpsertWithoutImagesInput = {
    update: XOR<ScansUpdateWithoutImagesInput, ScansUncheckedUpdateWithoutImagesInput>
    create: XOR<ScansCreateWithoutImagesInput, ScansUncheckedCreateWithoutImagesInput>
  }

  export type ScansUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    plantqrcode?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    capturedate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numframes?: NullableIntFieldUpdateOperationsInput | number | null
    exposuretime?: NullableIntFieldUpdateOperationsInput | number | null
    gain?: NullableFloatFieldUpdateOperationsInput | number | null
    brightness?: NullableFloatFieldUpdateOperationsInput | number | null
    contrast?: NullableFloatFieldUpdateOperationsInput | number | null
    gamma?: NullableFloatFieldUpdateOperationsInput | number | null
    secondsperrotation?: NullableFloatFieldUpdateOperationsInput | number | null
    phenotypers?: PhenotypersUpdateOneWithoutScansNestedInput
  }

  export type ScansUncheckedUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    phenotyperid?: NullableStringFieldUpdateOperationsInput | string | null
    plantqrcode?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    capturedate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numframes?: NullableIntFieldUpdateOperationsInput | number | null
    exposuretime?: NullableIntFieldUpdateOperationsInput | number | null
    gain?: NullableFloatFieldUpdateOperationsInput | number | null
    brightness?: NullableFloatFieldUpdateOperationsInput | number | null
    contrast?: NullableFloatFieldUpdateOperationsInput | number | null
    gamma?: NullableFloatFieldUpdateOperationsInput | number | null
    secondsperrotation?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ScansCreateWithoutPhenotypersInput = {
    id: string
    plantqrcode?: string | null
    path?: string | null
    capturedate?: Date | string | null
    numframes?: number | null
    exposuretime?: number | null
    gain?: number | null
    brightness?: number | null
    contrast?: number | null
    gamma?: number | null
    secondsperrotation?: number | null
    images?: ImagesCreateNestedManyWithoutScansInput
  }

  export type ScansUncheckedCreateWithoutPhenotypersInput = {
    id: string
    plantqrcode?: string | null
    path?: string | null
    capturedate?: Date | string | null
    numframes?: number | null
    exposuretime?: number | null
    gain?: number | null
    brightness?: number | null
    contrast?: number | null
    gamma?: number | null
    secondsperrotation?: number | null
    images?: ImagesUncheckedCreateNestedManyWithoutScansInput
  }

  export type ScansCreateOrConnectWithoutPhenotypersInput = {
    where: ScansWhereUniqueInput
    create: XOR<ScansCreateWithoutPhenotypersInput, ScansUncheckedCreateWithoutPhenotypersInput>
  }

  export type ScansCreateManyPhenotypersInputEnvelope = {
    data: Enumerable<ScansCreateManyPhenotypersInput>
    skipDuplicates?: boolean
  }

  export type ScansUpsertWithWhereUniqueWithoutPhenotypersInput = {
    where: ScansWhereUniqueInput
    update: XOR<ScansUpdateWithoutPhenotypersInput, ScansUncheckedUpdateWithoutPhenotypersInput>
    create: XOR<ScansCreateWithoutPhenotypersInput, ScansUncheckedCreateWithoutPhenotypersInput>
  }

  export type ScansUpdateWithWhereUniqueWithoutPhenotypersInput = {
    where: ScansWhereUniqueInput
    data: XOR<ScansUpdateWithoutPhenotypersInput, ScansUncheckedUpdateWithoutPhenotypersInput>
  }

  export type ScansUpdateManyWithWhereWithoutPhenotypersInput = {
    where: ScansScalarWhereInput
    data: XOR<ScansUpdateManyMutationInput, ScansUncheckedUpdateManyWithoutScansInput>
  }

  export type ScansScalarWhereInput = {
    AND?: Enumerable<ScansScalarWhereInput>
    OR?: Enumerable<ScansScalarWhereInput>
    NOT?: Enumerable<ScansScalarWhereInput>
    id?: UuidFilter | string
    phenotyperid?: UuidNullableFilter | string | null
    plantqrcode?: StringNullableFilter | string | null
    path?: StringNullableFilter | string | null
    capturedate?: DateTimeNullableFilter | Date | string | null
    numframes?: IntNullableFilter | number | null
    exposuretime?: IntNullableFilter | number | null
    gain?: FloatNullableFilter | number | null
    brightness?: FloatNullableFilter | number | null
    contrast?: FloatNullableFilter | number | null
    gamma?: FloatNullableFilter | number | null
    secondsperrotation?: FloatNullableFilter | number | null
  }

  export type ImagesCreateWithoutScansInput = {
    id: string
    framenumber?: number | null
    path?: string | null
    url?: string | null
    status?: string | null
  }

  export type ImagesUncheckedCreateWithoutScansInput = {
    id: string
    framenumber?: number | null
    path?: string | null
    url?: string | null
    status?: string | null
  }

  export type ImagesCreateOrConnectWithoutScansInput = {
    where: ImagesWhereUniqueInput
    create: XOR<ImagesCreateWithoutScansInput, ImagesUncheckedCreateWithoutScansInput>
  }

  export type ImagesCreateManyScansInputEnvelope = {
    data: Enumerable<ImagesCreateManyScansInput>
    skipDuplicates?: boolean
  }

  export type PhenotypersCreateWithoutScansInput = {
    id: string
    name?: string | null
    email?: string | null
  }

  export type PhenotypersUncheckedCreateWithoutScansInput = {
    id: string
    name?: string | null
    email?: string | null
  }

  export type PhenotypersCreateOrConnectWithoutScansInput = {
    where: PhenotypersWhereUniqueInput
    create: XOR<PhenotypersCreateWithoutScansInput, PhenotypersUncheckedCreateWithoutScansInput>
  }

  export type ImagesUpsertWithWhereUniqueWithoutScansInput = {
    where: ImagesWhereUniqueInput
    update: XOR<ImagesUpdateWithoutScansInput, ImagesUncheckedUpdateWithoutScansInput>
    create: XOR<ImagesCreateWithoutScansInput, ImagesUncheckedCreateWithoutScansInput>
  }

  export type ImagesUpdateWithWhereUniqueWithoutScansInput = {
    where: ImagesWhereUniqueInput
    data: XOR<ImagesUpdateWithoutScansInput, ImagesUncheckedUpdateWithoutScansInput>
  }

  export type ImagesUpdateManyWithWhereWithoutScansInput = {
    where: ImagesScalarWhereInput
    data: XOR<ImagesUpdateManyMutationInput, ImagesUncheckedUpdateManyWithoutImagesInput>
  }

  export type ImagesScalarWhereInput = {
    AND?: Enumerable<ImagesScalarWhereInput>
    OR?: Enumerable<ImagesScalarWhereInput>
    NOT?: Enumerable<ImagesScalarWhereInput>
    id?: UuidFilter | string
    scanid?: UuidNullableFilter | string | null
    framenumber?: IntNullableFilter | number | null
    path?: StringNullableFilter | string | null
    url?: StringNullableFilter | string | null
    status?: StringNullableFilter | string | null
  }

  export type PhenotypersUpsertWithoutScansInput = {
    update: XOR<PhenotypersUpdateWithoutScansInput, PhenotypersUncheckedUpdateWithoutScansInput>
    create: XOR<PhenotypersCreateWithoutScansInput, PhenotypersUncheckedCreateWithoutScansInput>
  }

  export type PhenotypersUpdateWithoutScansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PhenotypersUncheckedUpdateWithoutScansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScansCreateManyPhenotypersInput = {
    id: string
    plantqrcode?: string | null
    path?: string | null
    capturedate?: Date | string | null
    numframes?: number | null
    exposuretime?: number | null
    gain?: number | null
    brightness?: number | null
    contrast?: number | null
    gamma?: number | null
    secondsperrotation?: number | null
  }

  export type ScansUpdateWithoutPhenotypersInput = {
    id?: StringFieldUpdateOperationsInput | string
    plantqrcode?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    capturedate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numframes?: NullableIntFieldUpdateOperationsInput | number | null
    exposuretime?: NullableIntFieldUpdateOperationsInput | number | null
    gain?: NullableFloatFieldUpdateOperationsInput | number | null
    brightness?: NullableFloatFieldUpdateOperationsInput | number | null
    contrast?: NullableFloatFieldUpdateOperationsInput | number | null
    gamma?: NullableFloatFieldUpdateOperationsInput | number | null
    secondsperrotation?: NullableFloatFieldUpdateOperationsInput | number | null
    images?: ImagesUpdateManyWithoutScansNestedInput
  }

  export type ScansUncheckedUpdateWithoutPhenotypersInput = {
    id?: StringFieldUpdateOperationsInput | string
    plantqrcode?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    capturedate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numframes?: NullableIntFieldUpdateOperationsInput | number | null
    exposuretime?: NullableIntFieldUpdateOperationsInput | number | null
    gain?: NullableFloatFieldUpdateOperationsInput | number | null
    brightness?: NullableFloatFieldUpdateOperationsInput | number | null
    contrast?: NullableFloatFieldUpdateOperationsInput | number | null
    gamma?: NullableFloatFieldUpdateOperationsInput | number | null
    secondsperrotation?: NullableFloatFieldUpdateOperationsInput | number | null
    images?: ImagesUncheckedUpdateManyWithoutScansNestedInput
  }

  export type ScansUncheckedUpdateManyWithoutScansInput = {
    id?: StringFieldUpdateOperationsInput | string
    plantqrcode?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    capturedate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numframes?: NullableIntFieldUpdateOperationsInput | number | null
    exposuretime?: NullableIntFieldUpdateOperationsInput | number | null
    gain?: NullableFloatFieldUpdateOperationsInput | number | null
    brightness?: NullableFloatFieldUpdateOperationsInput | number | null
    contrast?: NullableFloatFieldUpdateOperationsInput | number | null
    gamma?: NullableFloatFieldUpdateOperationsInput | number | null
    secondsperrotation?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ImagesCreateManyScansInput = {
    id: string
    framenumber?: number | null
    path?: string | null
    url?: string | null
    status?: string | null
  }

  export type ImagesUpdateWithoutScansInput = {
    id?: StringFieldUpdateOperationsInput | string
    framenumber?: NullableIntFieldUpdateOperationsInput | number | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ImagesUncheckedUpdateWithoutScansInput = {
    id?: StringFieldUpdateOperationsInput | string
    framenumber?: NullableIntFieldUpdateOperationsInput | number | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ImagesUncheckedUpdateManyWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    framenumber?: NullableIntFieldUpdateOperationsInput | number | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
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