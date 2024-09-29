import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** AddFoodToUser input for adding food item to user's nutrient card */
export type AddFoodToUserInput = {
  foodId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

/** Food type which holds information of each food */
export type Food = {
  __typename?: 'Food';
  _id: Scalars['ID']['output'];
  calories: Scalars['Int']['output'];
  carbohydrates: Scalars['Int']['output'];
  fats: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  proteins: Scalars['Int']['output'];
};

/** Food input for creating food object */
export type FoodInput = {
  calories: Scalars['Int']['input'];
  carbohydrates: Scalars['Int']['input'];
  fats: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  proteins: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Mutation to add Food */
  addFood?: Maybe<Food>;
  /** Mutation to add Food for user */
  addFoodToUser?: Maybe<UpdateSuccess>;
  /** Mutation to add NutrientCard */
  addNutrientCard?: Maybe<NutrientCard>;
  /** Mutation to add User */
  addUser?: Maybe<User>;
};


export type MutationAddFoodArgs = {
  input?: InputMaybe<FoodInput>;
};


export type MutationAddFoodToUserArgs = {
  input?: InputMaybe<AddFoodToUserInput>;
};


export type MutationAddNutrientCardArgs = {
  input?: InputMaybe<NutrientCardInput>;
};


export type MutationAddUserArgs = {
  input?: InputMaybe<UserInput>;
};

/** Nutrient card type which holds information for each nutrient card */
export type NutrientCard = {
  __typename?: 'NutrientCard';
  _id: Scalars['ID']['output'];
  addedDate?: Maybe<Scalars['String']['output']>;
  dailyCalories: Scalars['Int']['output'];
  dailyCarbohydrates: Scalars['Int']['output'];
  dailyFats: Scalars['Int']['output'];
  dailyProteins: Scalars['Int']['output'];
  foodsList: Array<Food>;
  user: User;
};

/** NutrientCard input for creating nutrient card object */
export type NutrientCardInput = {
  user: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** Query for fetching single Food */
  getFood?: Maybe<Food>;
  /** Query for fetching all foods */
  getFoods?: Maybe<Array<Maybe<Food>>>;
  /** Query for fetching user */
  getUser?: Maybe<User>;
  /** Test Query */
  hello?: Maybe<Scalars['String']['output']>;
};


export type QueryGetFoodArgs = {
  foodId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUserArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** Update success type for successfully updating database */
export type UpdateSuccess = {
  __typename?: 'UpdateSuccess';
  acknowledged?: Maybe<Scalars['Boolean']['output']>;
  matchedCount?: Maybe<Scalars['Int']['output']>;
  modifiedCount?: Maybe<Scalars['Int']['output']>;
  upsertedId?: Maybe<Scalars['String']['output']>;
};

/** User type which holds information for user */
export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']['output']>;
  dailyNutrients: Array<Maybe<NutrientCard>>;
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
};

/** User input for creating user type */
export type UserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddFoodToUserInput: AddFoodToUserInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Food: ResolverTypeWrapper<Food>;
  FoodInput: FoodInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  NutrientCard: ResolverTypeWrapper<NutrientCard>;
  NutrientCardInput: NutrientCardInput;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateSuccess: ResolverTypeWrapper<UpdateSuccess>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddFoodToUserInput: AddFoodToUserInput;
  Boolean: Scalars['Boolean']['output'];
  Food: Food;
  FoodInput: FoodInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  NutrientCard: NutrientCard;
  NutrientCardInput: NutrientCardInput;
  Query: {};
  String: Scalars['String']['output'];
  UpdateSuccess: UpdateSuccess;
  User: User;
  UserInput: UserInput;
};

export type FoodResolvers<ContextType = any, ParentType extends ResolversParentTypes['Food'] = ResolversParentTypes['Food']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  calories?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  carbohydrates?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fats?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  proteins?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addFood?: Resolver<Maybe<ResolversTypes['Food']>, ParentType, ContextType, Partial<MutationAddFoodArgs>>;
  addFoodToUser?: Resolver<Maybe<ResolversTypes['UpdateSuccess']>, ParentType, ContextType, Partial<MutationAddFoodToUserArgs>>;
  addNutrientCard?: Resolver<Maybe<ResolversTypes['NutrientCard']>, ParentType, ContextType, Partial<MutationAddNutrientCardArgs>>;
  addUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationAddUserArgs>>;
};

export type NutrientCardResolvers<ContextType = any, ParentType extends ResolversParentTypes['NutrientCard'] = ResolversParentTypes['NutrientCard']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  addedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dailyCalories?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  dailyCarbohydrates?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  dailyFats?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  dailyProteins?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  foodsList?: Resolver<Array<ResolversTypes['Food']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getFood?: Resolver<Maybe<ResolversTypes['Food']>, ParentType, ContextType, Partial<QueryGetFoodArgs>>;
  getFoods?: Resolver<Maybe<Array<Maybe<ResolversTypes['Food']>>>, ParentType, ContextType>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryGetUserArgs>>;
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type UpdateSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateSuccess'] = ResolversParentTypes['UpdateSuccess']> = {
  acknowledged?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  matchedCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  modifiedCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  upsertedId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  dailyNutrients?: Resolver<Array<Maybe<ResolversTypes['NutrientCard']>>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Food?: FoodResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NutrientCard?: NutrientCardResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UpdateSuccess?: UpdateSuccessResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

