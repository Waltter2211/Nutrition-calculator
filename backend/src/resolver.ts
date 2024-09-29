import { mapperHelperFunction } from "./helpers/helperFunctions.js";
import { Food } from "./models/food.js";
import { NutrientCard } from "./models/nutrientCard.js";
import { User } from "./models/user.js";

export const resolvers = {
  Query: {
    // Resolver for test Query
    hello: () => 'Hello',
    // Resolver for fetching all foods
    getUser: async (_:any, { userId }:{ userId:string }) => {
      // Try to fetch user from database by id
      try {
        return await User.findById(userId)
      } catch (error) {
        // Returns error on failure
        return error
      }
    },
    getFoods: async () => {
      // Try to fetch all foods
      try {
        return await Food.find({})
      } catch (error) {
        // Returns error on failure
        return error
      }
    },
    // Resolver for fetching single food item with i'ts ID
    getFood: async (_:any, { foodId }: { foodId:string }) => {
      // Try to fetch Food with food ID
      try {
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
      // Try to create User with user object
      try {
        return await User.create(userObj)
      } catch (error) {
        // Returns error on failure
        return error
      }
    },

    // Resolver function to update user information
    updateUserInfo: async (_:any, { input }:any) => {
      // Try to find user with id
      try {
        const foundUser = await User.findById(input._id)
        // If user is found with provided id
        if (foundUser) {
          // Update user fields with new information
          foundUser.name = input.name
          foundUser.email = input.email
          foundUser.password = input.password
          // Update user with new user information to database
          return await User.updateOne({ _id: foundUser._id }, foundUser)
        }
      } catch (error) {
        // Returns error on failure
        return error
      }
    },
    // Resolver function to delete user
    deleteUser: async (_:any, { input }:any) => {
      // Try to delete user from database
      try {
        return await User.deleteOne({ _id: input })
      } catch (error) {
        // Returns error on failure
        return error
      }
    },
    // Resolver function to delete nutrient card from user
    deleteNutrientCard: async (_:any, { input }:any) => {
      // Try to delete nutrient card from database
      try {
        return await NutrientCard.deleteOne({ _id: input })
      } catch (error) {
        // Returns error on failure
        return error
      }
    },
    // Resolver function to delete food
    deleteFood: async (_:any, { input }:any) => {
      // Try to delete food from database
      try {
        return await Food.deleteOne({ _id: input })
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
      // Try to create Food with food object
      try {
        return await Food.create(foodObj)
      } catch (error) {
        // Returns error on failure
        return error
      }
    },

    // Resolver for adding food to user nutrient card list
    addFoodToUser: async (_:any, { input }:any) => {
      // Try to fetch user with user ID
      try {
        const foundUser = await User.findById(input.userId)
        // If user is found with ID try to fetch food with ID
        if (foundUser) {
          const foundFood = await Food.findById(input.foodId)
          // If food is found with ID check if user has already nutrient card for current day add food details to it
          if (foundFood) {
            const foundNutrientCard = await NutrientCard.findOne({ $and: [ { user: foundUser._id }, { addedDate: new Date().toLocaleDateString() } ] })
            // If nutrient card is found for current day push food object to foods list
            if (foundNutrientCard) {
              try {
                // Update nutrient card values and push added food object to foods list
                foundNutrientCard.dailyCalories += foundFood.calories
                foundNutrientCard.dailyProteins += foundFood.proteins
                foundNutrientCard.dailyCarbohydrates += foundFood.carbohydrates
                foundNutrientCard.dailyFats += foundFood.fats
                foundNutrientCard.foodsList.push(foundFood)
                // Update nutrient card into database
                return await NutrientCard.updateOne({ _id: foundNutrientCard._id }, foundNutrientCard)
              } catch (error) {
                // Returns error on failure
                return error
              }
            } 
            // Else create new food card with found food nutrient details
            else {
              const nutrientCardObj = {
                user: foundUser._id,
                dailyCalories: foundFood.calories,
                dailyProteins: foundFood.proteins,
                dailyCarbohydrates: foundFood.carbohydrates,
                dailyFats: foundFood.fats,
                foodsList: [foundFood._id],
                addedDate: new Date().toLocaleDateString()
              }
              // Create new nutrient card object and push it to database
              await NutrientCard.create(nutrientCardObj)
              // Fetch newly created nutrient card from database
              const foundNutrientCard = await NutrientCard.findOne({ $and: [ { user: foundUser._id }, { addedDate: new Date().toLocaleDateString() } ] })
              // If newly created nutrient card is found
              if (foundNutrientCard) {
                // Push it's id to user object
                foundUser.dailyNutrients.push(foundNutrientCard._id)
                // Update user with updated user object
                return await User.updateOne({ _id: foundUser._id }, foundUser)
              }
            }
          }
        }
      } catch (error) {
        // Returns error on failure
        return error
      }
    }
  },

  // Resolver for users
  User: {
    // Resolver function for fetching nutrient card for user
    dailyNutrients: async ({ dailyNutrients }:any) => {
      // Try to fetch all user nutrient cards
      try {
      return await mapperHelperFunction(dailyNutrients, NutrientCard)
      } catch (error) {
        // Returns error on failure
        return error
      }
    }
  },

  // Resolver for nutrient card
  NutrientCard: {
    // Resolver function for fetching user for nutrient card
    user: async (parent:any) => {
      // Try to fetch user by userId
      try {
        return await User.findById(parent.user)
      } catch (error) {
        // Returns error on failure
        return error
      }
    },
    // Resolver function for fetching foodsList for nutrient card
    foodsList: async (parent:any) => {
      // Try to fetch user by userId
      try {
        return await mapperHelperFunction(parent.foodsList, Food)
      } catch (error) {
        // Returns error on failure
        return error
      }
    }
  }
};