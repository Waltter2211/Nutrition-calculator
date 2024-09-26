import { Food } from "./models/food.js";
import { User } from "./models/user.js";

export const resolvers = {
  Query: {
    // Resolver for test Query
    hello: () => 'Hello',
    // Resolver for fetching all foods
    getFoods: async () => {
      try {
        // Try to fetch all foods
        return await Food.find({})
      } catch (error) {
        // Returns error on failure
        return error
      }
    },
    // Resolver for fetching single food item with i'ts ID
    getFood: async (_:any, { foodId }: { foodId:string }) => {
      try {
        // Try to fetch Food with food id
        return await Food.findById(foodId)
      } catch (error) {
        // Returns error on failure
        return error
      }
    }
  },

  Mutation: {
    // Resolver for adding user
    addUser: async (_:any, { input }:any) => {
      // First builds User object
      const userObj = {
        name: input.name,
        email: input.email,
        password: input.password,
        dailyNutrients: []
      }
      try {
        // Try to create User with user object
        return await User.create(userObj)
      } catch (error) {
        // Returns error on failure
        return error
      }
    },
    // Resolver for adding food
    addFood: async (_:any, { input }:any) => {
      // First builds Food object
      const foodObj = {
        name: input.name,
        calories: input.calories,
        proteins: input.proteins,
        carbohydrates: input.carbohydrates,
        fats: input.fats
      }

      try {
        // Try to create Food with food object
        return await Food.create(foodObj)
      } catch (error) {
        // Returns error on failure
        return error
      }
    }
  }
};