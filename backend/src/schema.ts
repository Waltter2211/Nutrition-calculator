export const typeDefs = `#graphql
    type Query {
        "Test Query"
        hello: String
        "Query for fetching user"
        getUser(userId: String): User
        "Query for fetching all foods"
        getFoods: [Food]
        "Query for fetching single Food"
        getFood(foodId: String): Food
    }

    type Mutation {
        "Mutation to login"
        loginUser(input: LoginInput): LoginInfo
        "Mutation to add User"
        addUser(input: CreateUserInput): User
        "Mutation to add Food"
        addFood(input: FoodInput): Food
        "Mutation to add Food for user"
        addFoodToUser(input: AddFoodToUserInput): UpdateSuccess
        "Mutation to update user"
        updateUserInfo(input: UpdateUserInput): UpdateSuccess
        "Mutation to delete user"
        deleteUser(input: String): UpdateSuccess
        "Mutation to delete nutrient card"
        deleteNutrientCard(input: String): UpdateSuccess
        "Mutation to delete food"
        deleteFood(input: String): UpdateSuccess
    }

    "Login type which has user email and login token"
    type LoginInfo {
        email: String!
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
        name: String!
        email: String!
        password: String!
        dailyNutrients: [NutrientCard]!
    }

    "User input for creating user type"
    input CreateUserInput {
        name: String!
        email: String!
        password: String!
    }

    "User input for updating user type"
    input UpdateUserInput {
        _id: ID!
        name: String!
        email: String!
        password: String!
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
        mealsList: [Meal]!
        addedDate: String
    }

    "NutrientCard input for creating nutrient card object"
    input NutrientCardInput {
        user: String!
    }

    "Meal type which holds information of food eaten"
    type Meal {
        _id: ID!
        userId: User!
        foodEaten: Food!
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
        userId: String!
        token: String!
        foodId: String!
        caloriesCount: Int!
        proteinsCount: Int!
        carbohydratesCount: Int!
        fatsCount: Int!
    }

    "Update success type for successfully updating database"
    type UpdateSuccess {
        acknowledged: Boolean
        modifiedCount: Int
        upsertedId: String
        matchedCount: Int
    }
`;
