export const typeDefs = `#graphql
    type Query {
        "Test Query"
        hello: String
        "Query for fetching user with token"
        getUser(token: String!): User
        "Query for fetching single Meal"
        getMeal(mealId: String!): Meal
        "Query for fetching all foods"
        getAllFoods: [Food]
        "Query for fetching single Food"
        getFood(foodId: String!): Food
        "Query for fetching weekly nutrient data"
        getWeeklyData(token: String!, date: String!): [NutrientCard]
        "Query for fetching single or multiple Foods with name"
        searchFoods(foodsName: String): [Food]!
    }

    type Mutation {
        "Mutation to login"
        loginUser(input: LoginInput!): LoginInfo
        "Mutation to add User"
        addUser(input: CreateUserInput!): User
        "Mutation to add Nutrient card for user"
        addNutrientCard(input: NutrientCardInput!): UpdateSuccess
        "Mutation to add Food for user"
        addFoodToUser(input: AddFoodToUserInput!): UpdateSuccess
        "Mutation to add Water for user"
        addWaterToUser(input: AddWaterToUserInput!): UpdateSuccess
        "Mutation to add Steps for user"
        addStepsToUser(input: AddStepsToUserInput!): UpdateSuccess
        "Mutation to update user"
        updateUserInfo(input: UpdateUserInput!): UpdateSuccess
        "Mutation to delete user"
        deleteUser(input: DeleteUserInput!): UpdateSuccess
        "Mutation to delete nutrient card"
        deleteNutrientCard(input: String!): UpdateSuccess
        "Mutation to add Food"
        addFood(input: FoodInput!): Food
        "Mutation to delete Meal"
        deleteMealFromUser(input: DeleteMealFromUserInput!): UpdateSuccess
        "Mutation to delete food"
        deleteFood(input: String!): UpdateSuccess
    }

    "Login type which has user email and login token"
    type LoginInfo {
        token: String!
    }

    "Login input type which has user information"
    input LoginInput {
        email: String!
        password: String!
    }

    "User type which holds information for user"
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        dailyNutrients: [NutrientCard]!
        goalCalories: Int!
        goalProteins: Int!
        goalCarbohydrates: Int!
        goalFats: Int!
        goalWater: Int!
        goalSteps: Int!
    }

    "User input for creating user type"
    input CreateUserInput {
        username: String!
        email: String!
        password: String!
    }

    "User input for updating user type"
    input UpdateUserInput {
        token: String!
        username: String!
        email: String!
        password: String!
    }

    "User input for deleting user type"
    input DeleteUserInput {
        token: String!
    }

    "Nutrient card type which holds information for each nutrient card"
    type NutrientCard {
        _id: ID!
        user: User!
        dailyCalories: Int!
        dailyProteins: Int!
        dailyCarbohydrates: Int!
        dailyFats: Int!
        dailyWater: Int!
        dailySteps: Int!
        mealsList: [Meal]!
        addedDate: String!
    }

    "NutrientCard input for creating nutrient card object"
    input NutrientCardInput {
        token: String!
    }

    "Meal type which holds information of food eaten"
    type Meal {
        _id: ID!
        user: User!
        nutrientCard: NutrientCard!
        foodEaten: Food!
        gramsEaten: Int!
        caloriesCount: Int!
        proteinsCount: Int!
        carbohydratesCount: Int!
        fatsCount: Int!
    }

    "Food type which holds information of each food"
    type Food {
        _id: ID!
        name: String!
        calories: Int!
        proteins: Int!
        carbohydrates: Int!
        fats: Int!
    }

    "Food input for creating food object"
    input FoodInput {
        name: String!
        calories: Int!
        proteins: Int!
        carbohydrates: Int!
        fats: Int!
    }

    "AddFoodToUser input for adding food item to user's nutrient card"
    input AddFoodToUserInput {
        token: String!
        foodId: String!
        gramsEaten: Int!
        caloriesCount: Int!
        proteinsCount: Int!
        carbohydratesCount: Int!
        fatsCount: Int!
    }

    "AddWaterToUser input for adding water to user's nutrient card"
    input AddWaterToUserInput {
        token: String!
    }

    "AddStepsToUser input for adding steps to user's nutrient card"
    input AddStepsToUserInput {
        token: String!
        stepsCount: Int!
    }

    "DeleteMealFromUser input for deleting meal from user"
    input DeleteMealFromUserInput {
        token: String!
        mealId: String!
    }

    "Update success type for successfully updating database"
    type UpdateSuccess {
        acknowledged: Boolean
        modifiedCount: Int
        upsertedId: String
        matchedCount: Int
    }
`;
