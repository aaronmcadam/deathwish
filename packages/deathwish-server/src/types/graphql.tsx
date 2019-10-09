/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };

/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
}


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export interface CreateDeathwishInput {
  deathwish: DeathwishAttributes,
}

export interface CreateDeathwishPayload {
   __typename?: 'CreateDeathwishPayload',
  deathwish?: Maybe<Deathwish>,
}

export interface Deathwish {
   __typename?: 'Deathwish',
  id: Scalars['ID'],
  type: DeathwishType,
  title: Scalars['String'],
  description: Scalars['String'],
  cost: Scalars['Int'],
  recipients: Scalars['String'],
}

export interface DeathwishAttributes {
  type: DeathwishType,
  title: Scalars['String'],
  description: Scalars['String'],
  cost: Scalars['Int'],
  recipients: Scalars['String'],
}

export enum DeathwishType {
  Holiday = 'holiday',
  Money = 'money',
  Video = 'video'
}

export interface DeleteDeathwishAttributes {
  id: Scalars['ID'],
}

export interface DeleteDeathwishInput {
  deathwish: DeleteDeathwishAttributes,
}

export interface DeleteDeathwishPayload {
   __typename?: 'DeleteDeathwishPayload',
  deathwish?: Maybe<Deathwish>,
}

export interface Mutation {
   __typename?: 'Mutation',
  createDeathwish?: Maybe<CreateDeathwishPayload>,
  updateDeathwish?: Maybe<UpdateDeathwishPayload>,
  deleteDeathwish?: Maybe<DeleteDeathwishPayload>,
}


export interface MutationCreateDeathwishArgs {
  input: CreateDeathwishInput
}


export interface MutationUpdateDeathwishArgs {
  input: UpdateDeathwishInput
}


export interface MutationDeleteDeathwishArgs {
  input: DeleteDeathwishInput
}

export interface Query {
   __typename?: 'Query',
  deathwishes: Array<Deathwish>,
  deathwish?: Maybe<Deathwish>,
}


export interface QueryDeathwishArgs {
  id: Scalars['ID']
}

export interface UpdateDeathwishAttributes {
  id: Scalars['ID'],
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  cost?: Maybe<Scalars['Int']>,
  recipients?: Maybe<Scalars['String']>,
}

export interface UpdateDeathwishInput {
  deathwish: UpdateDeathwishAttributes,
}

export interface UpdateDeathwishPayload {
   __typename?: 'UpdateDeathwishPayload',
  deathwish?: Maybe<Deathwish>,
}


export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  Deathwish: ResolverTypeWrapper<Deathwish>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  DeathwishType: DeathwishType,
  String: ResolverTypeWrapper<Scalars['String']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Mutation: ResolverTypeWrapper<{}>,
  CreateDeathwishInput: CreateDeathwishInput,
  DeathwishAttributes: DeathwishAttributes,
  CreateDeathwishPayload: ResolverTypeWrapper<CreateDeathwishPayload>,
  UpdateDeathwishInput: UpdateDeathwishInput,
  UpdateDeathwishAttributes: UpdateDeathwishAttributes,
  UpdateDeathwishPayload: ResolverTypeWrapper<UpdateDeathwishPayload>,
  DeleteDeathwishInput: DeleteDeathwishInput,
  DeleteDeathwishAttributes: DeleteDeathwishAttributes,
  DeleteDeathwishPayload: ResolverTypeWrapper<DeleteDeathwishPayload>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  CacheControlScope: CacheControlScope,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  Deathwish: Deathwish,
  ID: Scalars['ID'],
  DeathwishType: DeathwishType,
  String: Scalars['String'],
  Int: Scalars['Int'],
  Mutation: {},
  CreateDeathwishInput: CreateDeathwishInput,
  DeathwishAttributes: DeathwishAttributes,
  CreateDeathwishPayload: CreateDeathwishPayload,
  UpdateDeathwishInput: UpdateDeathwishInput,
  UpdateDeathwishAttributes: UpdateDeathwishAttributes,
  UpdateDeathwishPayload: UpdateDeathwishPayload,
  DeleteDeathwishInput: DeleteDeathwishInput,
  DeleteDeathwishAttributes: DeleteDeathwishAttributes,
  DeleteDeathwishPayload: DeleteDeathwishPayload,
  Boolean: Scalars['Boolean'],
  CacheControlScope: CacheControlScope,
  Upload: Scalars['Upload'],
}>;

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = {   maxAge?: Maybe<Maybe<Scalars['Int']>>,
  scope?: Maybe<Maybe<CacheControlScope>> }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CreateDeathwishPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateDeathwishPayload'] = ResolversParentTypes['CreateDeathwishPayload']> = ResolversObject<{
  deathwish?: Resolver<Maybe<ResolversTypes['Deathwish']>, ParentType, ContextType>,
}>;

export type DeathwishResolvers<ContextType = any, ParentType extends ResolversParentTypes['Deathwish'] = ResolversParentTypes['Deathwish']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  type?: Resolver<ResolversTypes['DeathwishType'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  cost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  recipients?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
}>;

export type DeleteDeathwishPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteDeathwishPayload'] = ResolversParentTypes['DeleteDeathwishPayload']> = ResolversObject<{
  deathwish?: Resolver<Maybe<ResolversTypes['Deathwish']>, ParentType, ContextType>,
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createDeathwish?: Resolver<Maybe<ResolversTypes['CreateDeathwishPayload']>, ParentType, ContextType, RequireFields<MutationCreateDeathwishArgs, 'input'>>,
  updateDeathwish?: Resolver<Maybe<ResolversTypes['UpdateDeathwishPayload']>, ParentType, ContextType, RequireFields<MutationUpdateDeathwishArgs, 'input'>>,
  deleteDeathwish?: Resolver<Maybe<ResolversTypes['DeleteDeathwishPayload']>, ParentType, ContextType, RequireFields<MutationDeleteDeathwishArgs, 'input'>>,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  deathwishes?: Resolver<Array<ResolversTypes['Deathwish']>, ParentType, ContextType>,
  deathwish?: Resolver<Maybe<ResolversTypes['Deathwish']>, ParentType, ContextType, RequireFields<QueryDeathwishArgs, 'id'>>,
}>;

export type UpdateDeathwishPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateDeathwishPayload'] = ResolversParentTypes['UpdateDeathwishPayload']> = ResolversObject<{
  deathwish?: Resolver<Maybe<ResolversTypes['Deathwish']>, ParentType, ContextType>,
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type Resolvers<ContextType = any> = ResolversObject<{
  CreateDeathwishPayload?: CreateDeathwishPayloadResolvers<ContextType>,
  Deathwish?: DeathwishResolvers<ContextType>,
  DeleteDeathwishPayload?: DeleteDeathwishPayloadResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  UpdateDeathwishPayload?: UpdateDeathwishPayloadResolvers<ContextType>,
  Upload?: GraphQLScalarType,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>,
}>;


/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;