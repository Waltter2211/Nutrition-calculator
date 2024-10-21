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
  proteinsCount: Scalars['Int']['input'];
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
  /** Mutation to add User */
  addUser?: Maybe<User>;
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


export type MutationAddUserArgs = {
  input: CreateUserInput;
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
  mealsList: Array<Maybe<Meal>>;
  user: User;
};

/** NutrientCard input for creating nutrient card object */
export type NutrientCardInput = {
  token: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** Query for fetching single Food */
  getFood?: Maybe<Food>;
  /** Query for fetching all foods */
  getFoods?: Maybe<Array<Maybe<Food>>>;
  /** Query for fetching single Meal */
  getMeal?: Maybe<Meal>;
  /** Query for fetching user with token */
  getUser?: Maybe<User>;
  /** Test Query */
  hello?: Maybe<Scalars['String']['output']>;
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
  password: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type LoginUserMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser?: { __typename?: 'LoginInfo', token: string } | null };

export type AddUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser?: { __typename?: 'User', username: string } | null };

export type GetUserDailyNutrientsQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type GetUserDailyNutrientsQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', dailyNutrients: Array<{ __typename?: 'NutrientCard', _id: string, dailyCalories: number, dailyProteins: number, dailyCarbohydrates: number, dailyFats: number, addedDate: string, mealsList: Array<{ __typename?: 'Meal', _id: string, caloriesCount: number, proteinsCount: number, carbohydratesCount: number, fatsCount: number, foodEaten: { __typename?: 'Food', _id: string, name: string } } | null> } | null> } | null };

export type GetUserQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', _id?: string | null, username: string, email: string, password: string, dailyNutrients: Array<{ __typename?: 'NutrientCard', _id: string, dailyCalories: number, dailyProteins: number, dailyCarbohydrates: number, dailyFats: number, addedDate: string, user: { __typename?: 'User', _id?: string | null, username: string, email: string, password: string }, mealsList: Array<{ __typename?: 'Meal', _id: string, caloriesCount: number, proteinsCount: number, carbohydratesCount: number, fatsCount: number, nutrientCard: { __typename?: 'NutrientCard', _id: string, dailyCalories: number, dailyProteins: number, dailyCarbohydrates: number, dailyFats: number, addedDate: string }, foodEaten: { __typename?: 'Food', _id: string, name: string, calories: number, proteins: number, carbohydrates: number, fats: number } } | null> } | null> } | null };

export const LoginUserDocument = gql`
    mutation LoginUser($input: LoginInput!) {
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
    mutation AddUser($input: CreateUserInput!) {
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
export const GetUserDailyNutrientsDocument = gql`
    query GetUserDailyNutrients($token: String!) {
  getUser(token: $token) {
    dailyNutrients {
      _id
      dailyCalories
      dailyProteins
      dailyCarbohydrates
      dailyFats
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
      }
    }
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
    password
    dailyNutrients {
      _id
      user {
        _id
        username
        email
        password
      }
      dailyCalories
      dailyProteins
      dailyCarbohydrates
      dailyFats
      mealsList {
        _id
        nutrientCard {
          _id
          dailyCalories
          dailyProteins
          dailyCarbohydrates
          dailyFats
          addedDate
        }
        foodEaten {
          _id
          name
          calories
          proteins
          carbohydrates
          fats
        }
        caloriesCount
        proteinsCount
        carbohydratesCount
        fatsCount
      }
      addedDate
    }
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