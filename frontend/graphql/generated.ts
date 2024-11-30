import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
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
  caloriesCount: Scalars['Int']['input'];
  carbohydratesCount: Scalars['Int']['input'];
  fatsCount: Scalars['Int']['input'];
  foodId: Scalars['String']['input'];
  gramsEaten: Scalars['Int']['input'];
  proteinsCount: Scalars['Int']['input'];
  token: Scalars['String']['input'];
};

/** AddStepsToUser input for adding steps to user's nutrient card */
export type AddStepsToUserInput = {
  stepsCount: Scalars['Int']['input'];
  token: Scalars['String']['input'];
};

/** AddWaterToUser input for adding water to user's nutrient card */
export type AddWaterToUserInput = {
  token: Scalars['String']['input'];
};

/** User input for creating user type */
export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

/** DeleteMealFromUser input for deleting meal from user */
export type DeleteMealFromUserInput = {
  mealId: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

/** User input for deleting user type */
export type DeleteUserInput = {
  token: Scalars['String']['input'];
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

/** Login type which has user email and login token */
export type LoginInfo = {
  __typename?: 'LoginInfo';
  token: Scalars['String']['output'];
};

/** Login input type which has user information */
export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** Meal type which holds information of food eaten */
export type Meal = {
  __typename?: 'Meal';
  _id: Scalars['ID']['output'];
  caloriesCount: Scalars['Int']['output'];
  carbohydratesCount: Scalars['Int']['output'];
  fatsCount: Scalars['Int']['output'];
  foodEaten: Food;
  gramsEaten: Scalars['Int']['output'];
  nutrientCard: NutrientCard;
  proteinsCount: Scalars['Int']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Mutation to add Food */
  addFood?: Maybe<Food>;
  /** Mutation to add Food for user */
  addFoodToUser?: Maybe<UpdateSuccess>;
  /** Mutation to add Nutrient card for user */
  addNutrientCard?: Maybe<UpdateSuccess>;
  /** Mutation to add Steps for user */
  addStepsToUser?: Maybe<UpdateSuccess>;
  /** Mutation to add User */
  addUser?: Maybe<User>;
  /** Mutation to add Water for user */
  addWaterToUser?: Maybe<UpdateSuccess>;
  /** Mutation to delete food */
  deleteFood?: Maybe<UpdateSuccess>;
  /** Mutation to delete Meal */
  deleteMealFromUser?: Maybe<UpdateSuccess>;
  /** Mutation to delete nutrient card */
  deleteNutrientCard?: Maybe<UpdateSuccess>;
  /** Mutation to delete user */
  deleteUser?: Maybe<UpdateSuccess>;
  /** Mutation to login */
  loginUser?: Maybe<LoginInfo>;
  /** Mutation to update user */
  updateUserInfo?: Maybe<UpdateSuccess>;
};


export type MutationAddFoodArgs = {
  input: FoodInput;
};


export type MutationAddFoodToUserArgs = {
  input: AddFoodToUserInput;
};


export type MutationAddNutrientCardArgs = {
  input: NutrientCardInput;
};


export type MutationAddStepsToUserArgs = {
  input: AddStepsToUserInput;
};


export type MutationAddUserArgs = {
  input: CreateUserInput;
};


export type MutationAddWaterToUserArgs = {
  input: AddWaterToUserInput;
};


export type MutationDeleteFoodArgs = {
  input: Scalars['String']['input'];
};


export type MutationDeleteMealFromUserArgs = {
  input: DeleteMealFromUserInput;
};


export type MutationDeleteNutrientCardArgs = {
  input: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationLoginUserArgs = {
  input: LoginInput;
};


export type MutationUpdateUserInfoArgs = {
  input: UpdateUserInput;
};

/** Nutrient card type which holds information for each nutrient card */
export type NutrientCard = {
  __typename?: 'NutrientCard';
  _id: Scalars['ID']['output'];
  addedDate: Scalars['String']['output'];
  dailyCalories: Scalars['Int']['output'];
  dailyCarbohydrates: Scalars['Int']['output'];
  dailyFats: Scalars['Int']['output'];
  dailyProteins: Scalars['Int']['output'];
  dailySteps: Scalars['Int']['output'];
  dailyWater: Scalars['Int']['output'];
  mealsList: Array<Maybe<Meal>>;
  user: User;
};

/** NutrientCard input for creating nutrient card object */
export type NutrientCardInput = {
  token: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** Query for fetching all foods */
  getAllFoods?: Maybe<Array<Maybe<Food>>>;
  /** Query for fetching single Food */
  getFood?: Maybe<Food>;
  /** Query for fetching single Meal */
  getMeal?: Maybe<Meal>;
  /** Query for fetching user with token */
  getUser?: Maybe<User>;
  /** Query for fetching weekly nutrient data */
  getWeeklyData?: Maybe<Array<Maybe<NutrientCard>>>;
  /** Test Query */
  hello?: Maybe<Scalars['String']['output']>;
  /** Query for fetching single or multiple Foods with name */
  searchFoods: Array<Maybe<Food>>;
};


export type QueryGetFoodArgs = {
  foodId: Scalars['String']['input'];
};


export type QueryGetMealArgs = {
  mealId: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  token: Scalars['String']['input'];
};


export type QueryGetWeeklyDataArgs = {
  date: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type QuerySearchFoodsArgs = {
  foodsName?: InputMaybe<Scalars['String']['input']>;
};

/** Update success type for successfully updating database */
export type UpdateSuccess = {
  __typename?: 'UpdateSuccess';
  acknowledged?: Maybe<Scalars['Boolean']['output']>;
  matchedCount?: Maybe<Scalars['Int']['output']>;
  modifiedCount?: Maybe<Scalars['Int']['output']>;
  upsertedId?: Maybe<Scalars['String']['output']>;
};

/** User input for updating user type */
export type UpdateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

/** User type which holds information for user */
export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']['output']>;
  dailyNutrients: Array<Maybe<NutrientCard>>;
  email: Scalars['String']['output'];
  goalCalories: Scalars['Int']['output'];
  goalCarbohydrates: Scalars['Int']['output'];
  goalFats: Scalars['Int']['output'];
  goalProteins: Scalars['Int']['output'];
  goalSteps: Scalars['Int']['output'];
  goalWater: Scalars['Int']['output'];
  password: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type AddFoodToUserMutationVariables = Exact<{
  input: AddFoodToUserInput;
}>;


export type AddFoodToUserMutation = { __typename?: 'Mutation', addFoodToUser?: { __typename?: 'UpdateSuccess', acknowledged?: boolean | null, matchedCount?: number | null, modifiedCount?: number | null, upsertedId?: string | null } | null };

export type AddNutrientCardMutationVariables = Exact<{
  input: NutrientCardInput;
}>;


export type AddNutrientCardMutation = { __typename?: 'Mutation', addNutrientCard?: { __typename?: 'UpdateSuccess', acknowledged?: boolean | null, matchedCount?: number | null, modifiedCount?: number | null, upsertedId?: string | null } | null };

export type AddStepsToUserMutationVariables = Exact<{
  input: AddStepsToUserInput;
}>;


export type AddStepsToUserMutation = { __typename?: 'Mutation', addStepsToUser?: { __typename?: 'UpdateSuccess', acknowledged?: boolean | null, matchedCount?: number | null, modifiedCount?: number | null, upsertedId?: string | null } | null };

export type AddWaterToUserMutationVariables = Exact<{
  input: AddWaterToUserInput;
}>;


export type AddWaterToUserMutation = { __typename?: 'Mutation', addWaterToUser?: { __typename?: 'UpdateSuccess', acknowledged?: boolean | null, matchedCount?: number | null, modifiedCount?: number | null, upsertedId?: string | null } | null };

export type DeleteMealFromUserMutationVariables = Exact<{
  input: DeleteMealFromUserInput;
}>;


export type DeleteMealFromUserMutation = { __typename?: 'Mutation', deleteMealFromUser?: { __typename?: 'UpdateSuccess', acknowledged?: boolean | null, matchedCount?: number | null, modifiedCount?: number | null, upsertedId?: string | null } | null };

export type LoginUserMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser?: { __typename?: 'LoginInfo', token: string } | null };

export type AddUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser?: { __typename?: 'User', username: string } | null };

export type GetAllFoodsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllFoodsQuery = { __typename?: 'Query', getAllFoods?: Array<{ __typename?: 'Food', _id: string, name: string, calories: number, proteins: number, carbohydrates: number, fats: number } | null> | null };

export type GetUserDailyNutrientsQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type GetUserDailyNutrientsQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', goalCalories: number, goalProteins: number, goalCarbohydrates: number, goalFats: number, goalWater: number, goalSteps: number, dailyNutrients: Array<{ __typename?: 'NutrientCard', _id: string, dailyCalories: number, dailyProteins: number, dailyCarbohydrates: number, dailyFats: number, dailyWater: number, dailySteps: number, addedDate: string, mealsList: Array<{ __typename?: 'Meal', _id: string, caloriesCount: number, proteinsCount: number, carbohydratesCount: number, fatsCount: number, gramsEaten: number, foodEaten: { __typename?: 'Food', _id: string, name: string } } | null> } | null> } | null };

export type GetUserQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', _id?: string | null, username: string, email: string } | null };

export type GetWeeklyDataQueryVariables = Exact<{
  token: Scalars['String']['input'];
  date: Scalars['String']['input'];
}>;


export type GetWeeklyDataQuery = { __typename?: 'Query', getWeeklyData?: Array<{ __typename?: 'NutrientCard', _id: string, addedDate: string, dailyCalories: number, dailyProteins: number, dailyCarbohydrates: number, dailyFats: number, dailyWater: number, dailySteps: number } | null> | null };

export type SearchFoodsQueryVariables = Exact<{
  foodsName?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchFoodsQuery = { __typename?: 'Query', searchFoods: Array<{ __typename?: 'Food', _id: string, name: string, calories: number, proteins: number, carbohydrates: number, fats: number } | null> };

export const AddFoodToUserDocument = gql`
    mutation addFoodToUser($input: AddFoodToUserInput!) {
  addFoodToUser(input: $input) {
    acknowledged
    matchedCount
    modifiedCount
    upsertedId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddFoodToUserGQL extends Apollo.Mutation<AddFoodToUserMutation, AddFoodToUserMutationVariables> {
    document = AddFoodToUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddNutrientCardDocument = gql`
    mutation addNutrientCard($input: NutrientCardInput!) {
  addNutrientCard(input: $input) {
    acknowledged
    matchedCount
    modifiedCount
    upsertedId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddNutrientCardGQL extends Apollo.Mutation<AddNutrientCardMutation, AddNutrientCardMutationVariables> {
    document = AddNutrientCardDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddStepsToUserDocument = gql`
    mutation addStepsToUser($input: AddStepsToUserInput!) {
  addStepsToUser(input: $input) {
    acknowledged
    matchedCount
    modifiedCount
    upsertedId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddStepsToUserGQL extends Apollo.Mutation<AddStepsToUserMutation, AddStepsToUserMutationVariables> {
    document = AddStepsToUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddWaterToUserDocument = gql`
    mutation addWaterToUser($input: AddWaterToUserInput!) {
  addWaterToUser(input: $input) {
    acknowledged
    matchedCount
    modifiedCount
    upsertedId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddWaterToUserGQL extends Apollo.Mutation<AddWaterToUserMutation, AddWaterToUserMutationVariables> {
    document = AddWaterToUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteMealFromUserDocument = gql`
    mutation deleteMealFromUser($input: DeleteMealFromUserInput!) {
  deleteMealFromUser(input: $input) {
    acknowledged
    matchedCount
    modifiedCount
    upsertedId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteMealFromUserGQL extends Apollo.Mutation<DeleteMealFromUserMutation, DeleteMealFromUserMutationVariables> {
    document = DeleteMealFromUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginUserDocument = gql`
    mutation loginUser($input: LoginInput!) {
  loginUser(input: $input) {
    token
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginUserGQL extends Apollo.Mutation<LoginUserMutation, LoginUserMutationVariables> {
    document = LoginUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddUserDocument = gql`
    mutation addUser($input: CreateUserInput!) {
  addUser(input: $input) {
    username
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddUserGQL extends Apollo.Mutation<AddUserMutation, AddUserMutationVariables> {
    document = AddUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAllFoodsDocument = gql`
    query GetAllFoods {
  getAllFoods {
    _id
    name
    calories
    proteins
    carbohydrates
    fats
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllFoodsGQL extends Apollo.Query<GetAllFoodsQuery, GetAllFoodsQueryVariables> {
    document = GetAllFoodsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetUserDailyNutrientsDocument = gql`
    query GetUserDailyNutrients($token: String!) {
  getUser(token: $token) {
    dailyNutrients {
      _id
      dailyCalories
      dailyProteins
      dailyCarbohydrates
      dailyFats
      dailyWater
      dailySteps
      addedDate
      mealsList {
        _id
        caloriesCount
        proteinsCount
        carbohydratesCount
        fatsCount
        foodEaten {
          _id
          name
        }
        gramsEaten
      }
    }
    goalCalories
    goalProteins
    goalCarbohydrates
    goalFats
    goalWater
    goalSteps
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUserDailyNutrientsGQL extends Apollo.Query<GetUserDailyNutrientsQuery, GetUserDailyNutrientsQueryVariables> {
    document = GetUserDailyNutrientsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetUserDocument = gql`
    query GetUser($token: String!) {
  getUser(token: $token) {
    _id
    username
    email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUserGQL extends Apollo.Query<GetUserQuery, GetUserQueryVariables> {
    document = GetUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetWeeklyDataDocument = gql`
    query GetWeeklyData($token: String!, $date: String!) {
  getWeeklyData(token: $token, date: $date) {
    _id
    addedDate
    dailyCalories
    dailyProteins
    dailyCarbohydrates
    dailyFats
    dailyWater
    dailySteps
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetWeeklyDataGQL extends Apollo.Query<GetWeeklyDataQuery, GetWeeklyDataQueryVariables> {
    document = GetWeeklyDataDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SearchFoodsDocument = gql`
    query SearchFoods($foodsName: String) {
  searchFoods(foodsName: $foodsName) {
    _id
    name
    calories
    proteins
    carbohydrates
    fats
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SearchFoodsGQL extends Apollo.Query<SearchFoodsQuery, SearchFoodsQueryVariables> {
    document = SearchFoodsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }