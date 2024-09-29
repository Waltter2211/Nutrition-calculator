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
        "Mutation to add User"
        addUser(input: UserInput): User
        "Mutation to add NutrientCard"
        addNutrientCard(input: NutrientCardInput): NutrientCard
        "Mutation to add Food"
        addFood(input: FoodInput): Food
        "Mutation to add Food for user"
        addFoodToUser(input: AddFoodToUserInput): UpdateSuccess
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
    input UserInput {
        name: String!
        email: String!
        password: String!
    }

    "Nutrient card type which holds information for each nutrient card"
    type NutrientCard {
        _id: ID!
        user: User!
        dailyCalories: Int!
        dailyProteins: Int!
        dailyCarbohydrates: Int!
        dailyFats: Int!
        foodsList: [Food!]!
        addedDate: String
    }

    "NutrientCard input for creating nutrient card object"
    input NutrientCardInput {
        user: String!
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
        foodId: String!
    }

    "Update success type for successfully updating database"
    type UpdateSuccess {
        acknowledged: Boolean
        modifiedCount: Int
        upsertedId: String
        matchedCount: Int
    }
`;