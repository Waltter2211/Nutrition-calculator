import {
  jwtTokenVerifier,
  mapperHelperFunction,
  getWeeklyDataHelper,
} from "./helpers/helperFunctions.js";
import { Food } from "./models/food.js";
import { Meal } from "./models/meal.js";
import { NutrientCard } from "./models/nutrientCard.js";
import { User } from "./models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const resolvers = {
  Query: {
    // Resolver for test Query
    hello: () => "Hello",
    // Resolver for fetching user with token and ID
    getUser: async (_: any, { token }: any) => {
      try {
        const verifiedToken = jwtTokenVerifier(token);
        if (typeof verifiedToken === "object") {
          return await User.findById(verifiedToken.userId);
        } else {
          // Returns invalid user token on failure
          throw new Error("Invalid user token");
        }
      } catch (error) {
        return error;
      }
    },
    // Resolver for fetching all foods
    getAllFoods: async () => {
      try {
        return await Food.find({});
      } catch (error) {
        return error;
      }
    },
    // Resolver for fetching single food item with i'ts ID
    getFood: async (_: any, { foodId }: { foodId: string }) => {
      try {
        return await Food.findById(foodId);
      } catch (error) {
        return error;
      }
    },
    // Resolver for fetching single or multiple foods with it's name
    searchFoods: async (_: any, { foodsName }: { foodsName: string }) => {
      try {
        return await Food.find({ name: { $regex: foodsName } });
      } catch (error) {
        return error;
      }
    },
    // Resolver for fetching single meal with i'ts ID
    getMeal: async (_: any, { mealId }: { mealId: string }) => {
      try {
        return await Meal.findById(mealId);
      } catch (error) {
        return error;
      }
    },
    // Resolver for fetching nutrient card with it's ID
    getWeeklyData: async (
      _: any,
      { token, date }: { token: string; date: string }
    ) => {
      try {
        const verifiedToken = jwtTokenVerifier(token);
        if (typeof verifiedToken === "object") {
          const { userId } = verifiedToken;
          const dateParse =
            date.split(".").reverse().join("-") + "T00:00:00.000Z";
          let dateNumber = new Date(dateParse).getDay();

          if (dateNumber === 0) {
            dateNumber += 7;
          }

          let weeklyDataArr = [];

          switch (dateNumber) {
            case 1:
              console.log("Monday");
              weeklyDataArr = await getWeeklyDataHelper(
                dateParse,
                userId,
                NutrientCard,
                dateNumber
              );
              return weeklyDataArr;

            case 2:
              console.log("Tuesday");
              weeklyDataArr = await getWeeklyDataHelper(
                dateParse,
                userId,
                NutrientCard,
                dateNumber
              );
              return weeklyDataArr;

            case 3:
              console.log("Wednesday");
              weeklyDataArr = await getWeeklyDataHelper(
                dateParse,
                userId,
                NutrientCard,
                dateNumber
              );
              return weeklyDataArr;

            case 4:
              console.log("Thursday");
              weeklyDataArr = await getWeeklyDataHelper(
                dateParse,
                userId,
                NutrientCard,
                dateNumber
              );
              return weeklyDataArr;

            case 5:
              console.log("Friday");
              weeklyDataArr = await getWeeklyDataHelper(
                dateParse,
                userId,
                NutrientCard,
                dateNumber
              );
              return weeklyDataArr;

            case 6:
              console.log("Saturday");
              weeklyDataArr = await getWeeklyDataHelper(
                dateParse,
                userId,
                NutrientCard,
                dateNumber
              );
              return weeklyDataArr;

            case 7:
              console.log("Sunday");
              weeklyDataArr = await getWeeklyDataHelper(
                dateParse,
                userId,
                NutrientCard,
                dateNumber
              );
              console.log("sundayyy",weeklyDataArr)
              return weeklyDataArr;

            default:
              console.log("Error");
              break;
          }
        } else {
          // Returns invalid user token on failure
          throw new Error("Invalid user token");
        }
      } catch (error) {
        return error;
      }
    },
  },

  Mutation: {
    loginUser: async (_: any, { input }: any) => {
      // Try to generate json token using user input as a payload
      try {
        // First try to find user from database using email from input
        const foundUser = await User.findOne({ email: input.email });
        if (foundUser) {
          // Compare decrypted password with password from input
          const decryptedPass = await bcrypt.compare(
            input.password,
            foundUser.password
          );
          if (decryptedPass) {
            // Create login object for jwt token
            const loginObj = {
              userId: foundUser._id,
              email: foundUser.email,
            };

            const token = jwt.sign(loginObj, "jsontoken");
            return { token: token };
          } else {
            throw new Error("Incorrect password");
          }
        } else {
          throw new Error("No user matches this email");
        }
      } catch (error) {
        return error;
      }
    },

    // Resolver for adding user
    addUser: async (_: any, { input }: any) => {
      // Try to create User with user object
      try {
        // First builds User object and crypts password
        const hashedPass = await bcrypt.hash(input.password, 10);
        const userObj = {
          username: input.username,
          email: input.email,
          password: hashedPass,
          dailyNutrients: [],
        };
        return await User.create(userObj);
      } catch (error) {
        throw new Error("Email in use");
        /* return error; */
      }
    },

    // Resolver function to update user information
    updateUserInfo: async (_: any, { input }: any) => {
      // Try to find user with id
      try {
        // Try to verify users token
        const verifiedToken = jwtTokenVerifier(input.token);
        if (typeof verifiedToken === "object") {
          const foundUser = await User.findById(verifiedToken.userId);
          // If user is found with provided id
          if (foundUser) {
            const hashedPass = await bcrypt.hash(input.password, 10);
            // Update user fields with new information
            foundUser.username = input.username;
            foundUser.email = input.email;
            foundUser.password = hashedPass;

            return await User.updateOne({ _id: foundUser._id }, foundUser);
          }
        } else {
          throw new Error("Invalid token");
        }
      } catch (error) {
        return error;
      }
    },
    // Resolver function to delete user
    deleteUser: async (_: any, { input }: any) => {
      // Try to delete user from database
      try {
        const verifiedToken = jwtTokenVerifier(input.token);
        if (typeof verifiedToken === "object") {
          return await User.deleteOne({ _id: verifiedToken.userId });
        } else {
          throw new Error("Invalid token");
        }
      } catch (error) {
        return error;
      }
    },
    // Resolver function to delete nutrient card from user
    deleteNutrientCard: async (_: any, { input }: any) => {
      // Try to delete nutrient card from database
      try {
        return await NutrientCard.deleteOne({ _id: input });
      } catch (error) {
        return error;
      }
    },
    // Resolver function to delete food
    deleteFood: async (_: any, { input }: any) => {
      // Try to delete food from database
      try {
        return await Food.deleteOne({ _id: input });
      } catch (error) {
        return error;
      }
    },
    // Resolver for adding food
    addFood: async (_: any, { input }: any) => {
      // First builds Food object
      const foodObj = {
        name: input.name,
        calories: input.calories,
        proteins: input.proteins,
        carbohydrates: input.carbohydrates,
        fats: input.fats,
      };
      // Try to create Food with food object
      try {
        return await Food.create(foodObj);
      } catch (error) {
        return error;
      }
    },

    // Resolver for adding nutrient card for user
    addNutrientCard: async (_: any, { input }: any) => {
      try {
        const verifiedToken = jwtTokenVerifier(input.token);
        if (typeof verifiedToken === "object") {
          const foundUser = await User.findById(verifiedToken.userId);
          if (foundUser) {
            const foundNutrientCard = await NutrientCard.findOne({
              $and: [
                { user: foundUser._id },
                {
                  addedDate: new Date()
                    .toISOString()
                    .substring(0, 10)
                    .split("-")
                    .reverse()
                    .join("."),
                },
              ],
            });
            if (!foundNutrientCard) {
              const nutrientCardObj = {
                user: foundUser._id,
                dailyCalories: 0,
                dailyProteins: 0,
                dailyCarbohydrates: 0,
                dailyFats: 0,
                dailyWater: 0,
                dailySteps: 0,
                mealsList: [],
                addedDate: new Date()
                  .toISOString()
                  .substring(0, 10)
                  .split("-")
                  .reverse()
                  .join("."),
              };

              // Create new nutrient card object and push it to database
              await NutrientCard.create(nutrientCardObj);

              // Fetch newly created nutrient card from database
              const foundNutrientCard = await NutrientCard.findOne({
                $and: [
                  { user: foundUser._id },
                  {
                    addedDate: new Date()
                      .toISOString()
                      .substring(0, 10)
                      .split("-")
                      .reverse()
                      .join("."),
                  },
                ],
              });

              // If newly created nutrient card is found
              if (foundNutrientCard) {
                // Push it's id to user object
                foundUser.dailyNutrients.push(foundNutrientCard._id);
                // Update user with updated user object
                return await User.updateOne({ _id: foundUser._id }, foundUser);
              }
            }
          } else {
            throw new Error("No valid user found");
          }
        } else {
          throw new Error("Invalid user token");
        }
      } catch (error) {
        return error;
      }
    },

    // Resolver for adding food to user nutrient card list
    addFoodToUser: async (_: any, { input }: any) => {
      // Try to fetch user with user ID
      try {
        // Try to verify users token
        const verifiedToken = jwtTokenVerifier(input.token);
        if (typeof verifiedToken === "object") {
          const foundUser = await User.findById(verifiedToken.userId);
          // If user is found with ID try to fetch food with ID
          if (foundUser) {
            const foundFood = await Food.findById(input.foodId);
            // If food is found with ID check if user has already nutrient card for current day add food details to it
            if (foundFood) {
              const foundNutrientCard = await NutrientCard.findOne({
                $and: [
                  { user: foundUser._id },
                  {
                    addedDate: new Date()
                      .toISOString()
                      .substring(0, 10)
                      .split("-")
                      .reverse()
                      .join("."),
                  },
                ],
              });
              // If nutrient card is found for current day push food object to foods list
              if (foundNutrientCard) {
                const mealObj = {
                  user: foundUser._id,
                  nutrientCard: foundNutrientCard._id,
                  foodEaten: foundFood._id,
                  gramsEaten: input.gramsEaten,
                  caloriesCount: input.caloriesCount,
                  proteinsCount: input.proteinsCount,
                  carbohydratesCount: input.carbohydratesCount,
                  fatsCount: input.fatsCount,
                };
                // Create new meal object which stores information about food eaten
                const createdMeal = await Meal.create(mealObj);

                // Update nutrient card values and push added food object to foods list
                foundNutrientCard.dailyCalories += createdMeal.caloriesCount;
                foundNutrientCard.dailyProteins += createdMeal.proteinsCount;
                foundNutrientCard.dailyCarbohydrates +=
                  createdMeal.carbohydratesCount;
                foundNutrientCard.dailyFats += createdMeal.fatsCount;
                foundNutrientCard.mealsList.push(createdMeal._id);
                // Update nutrient card into database
                return await NutrientCard.updateOne(
                  { _id: foundNutrientCard._id },
                  foundNutrientCard
                );
              }
              // Else create new food card with found food nutrient details
              /* else {
                const nutrientCardObj = {
                  user: foundUser._id,
                  dailyCalories: 0,
                  dailyProteins: 0,
                  dailyCarbohydrates: 0,
                  dailyFats: 0,
                  dailyWater: 0,
                  dailySteps: 0,
                  mealsList: [],
                  addedDate: new Date()
                    .toISOString()
                    .substring(0, 10)
                    .split("-")
                    .reverse()
                    .join("."),
                };

                // Create new nutrient card object and push it to database
                const createdNutrientCard = await NutrientCard.create(
                  nutrientCardObj
                );

                const mealObj = {
                  user: foundUser._id,
                  nutrientCard: createdNutrientCard._id,
                  foodEaten: foundFood._id,
                  gramsEaten: input.gramsEaten,
                  caloriesCount: input.caloriesCount,
                  proteinsCount: input.proteinsCount,
                  carbohydratesCount: input.carbohydratesCount,
                  fatsCount: input.fatsCount,
                };

                // Create new meal object which stores information about food eaten
                const createdMeal = await Meal.create(mealObj);

                // Create new nutrient card object with created meal added
                const updatedNutrientCardObj = {
                  user: foundUser._id,
                  dailyCalories: createdMeal.caloriesCount,
                  dailyProteins: createdMeal.proteinsCount,
                  dailyCarbohydrates: createdMeal.carbohydratesCount,
                  dailyFats: createdMeal.fatsCount,
                  mealsList: [createdMeal._id],
                  addedDate: new Date()
                    .toISOString()
                    .substring(0, 10)
                    .split("-")
                    .reverse()
                    .join("."),
                };

                // Update created meal to created nutrient cards list
                await NutrientCard.updateOne(
                  { _id: createdNutrientCard._id },
                  updatedNutrientCardObj
                );

                // Fetch newly created nutrient card from database
                const foundNutrientCard = await NutrientCard.findOne({
                  $and: [
                    { user: foundUser._id },
                    {
                      addedDate: new Date()
                        .toISOString()
                        .substring(0, 10)
                        .split("-")
                        .reverse()
                        .join("."),
                    },
                  ],
                });
                // If newly created nutrient card is found
                if (foundNutrientCard) {
                  // Push it's id to user object
                  foundUser.dailyNutrients.push(foundNutrientCard._id);
                  // Update user with updated user object
                  return await User.updateOne(
                    { _id: foundUser._id },
                    foundUser
                  );
                }
              } */
            }
          } else {
            throw new Error("No valid user found");
          }
        } else {
          throw new Error("Invalid token");
        }
      } catch (error) {
        return error;
      }
    },

    // Resolver for adding water to user
    addWaterToUser: async (_: any, { input }: any) => {
      // Try to verify user token
      try {
        const verifiedToken = jwtTokenVerifier(input.token);
        if (typeof verifiedToken === "object") {
          const foundUser = await User.findById(verifiedToken.userId);
          if (foundUser) {
            const foundNutrientCard = await NutrientCard.findOne({
              $and: [
                { user: foundUser._id },
                {
                  addedDate: new Date()
                    .toISOString()
                    .substring(0, 10)
                    .split("-")
                    .reverse()
                    .join("."),
                },
              ],
            });
            if (foundNutrientCard) {
              // Convert and create updated nutrient card object
              const convertedObj = foundNutrientCard.toObject();
              const updatedNutrientCardObj = {
                ...convertedObj,
                dailyWater: (convertedObj.dailyWater += 1),
              };
              return await NutrientCard.updateOne(
                { _id: foundNutrientCard._id },
                updatedNutrientCardObj
              );
            }
          } else {
            throw new Error("No valid user found");
          }
        } else {
          throw new Error("Invalid token");
        }
      } catch (error) {
        return error;
      }
    },

    // Resolver for adding steps to user
    addStepsToUser: async (_: any, { input }: any) => {
      // Try to verify user token
      try {
        const verifiedToken = jwtTokenVerifier(input.token);
        if (typeof verifiedToken === "object") {
          const foundUser = await User.findById(verifiedToken.userId);
          if (foundUser) {
            const foundNutrientCard = await NutrientCard.findOne({
              $and: [
                { user: foundUser._id },
                {
                  addedDate: new Date()
                    .toISOString()
                    .substring(0, 10)
                    .split("-")
                    .reverse()
                    .join("."),
                },
              ],
            });
            if (foundNutrientCard) {
              // Convert and create updated nutrient card object
              const convertedObj = foundNutrientCard.toObject();
              const updatedNutrientCardObj = {
                ...convertedObj,
                dailySteps: (convertedObj.dailySteps += input.stepsCount),
              };
              return await NutrientCard.updateOne(
                { _id: foundNutrientCard._id },
                updatedNutrientCardObj
              );
            }
          } else {
            throw new Error("No valid user found");
          }
        } else {
          throw new Error("Invalid token");
        }
      } catch (error) {
        return error;
      }
    },

    // Resolver function for deleting meal from user
    deleteMealFromUser: async (_: any, { input }: any) => {
      // Try to delete meal from user
      try {
        // Check if user has valid token
        const verifiedToken = jwtTokenVerifier(input.token);
        if (typeof verifiedToken === "object") {
          const foundUser = await User.findById(verifiedToken.userId);
          if (foundUser) {
            const foundMeal = await Meal.findById(input.mealId);
            if (foundMeal) {
              // If user and meal are found try to fetch nutrient card
              const foundNutrientCard = await NutrientCard.findById(
                foundMeal.nutrientCard
              );
              if (foundNutrientCard) {
                // If nutrient card is found update daily values and delete meal
                foundNutrientCard.dailyCalories -= foundMeal.caloriesCount;
                foundNutrientCard.dailyProteins -= foundMeal.proteinsCount;
                foundNutrientCard.dailyCarbohydrates -=
                  foundMeal.carbohydratesCount;
                foundNutrientCard.dailyFats -= foundMeal.fatsCount;

                // Delete meal from nutrient card meals list and update
                const arrIndex = foundNutrientCard.mealsList.findIndex(
                  (item) => item.toString() === foundMeal._id.toString()
                );
                foundNutrientCard.mealsList.splice(arrIndex, 1);
                await NutrientCard.updateOne(
                  { _id: foundNutrientCard._id },
                  foundNutrientCard
                );
                // Delete meal from database
                return await Meal.deleteOne({ _id: foundMeal._id });
              } else {
                throw new Error("No nutrient card found");
              }
            } else {
              throw new Error("No meal found with ID");
            }
          } else {
            throw new Error("No valid user found");
          }
        } else {
          throw new Error("Invalid token");
        }
      } catch (error) {
        return error;
      }
    },
  },

  // Resolver for users
  User: {
    // Resolver function for fetching nutrient card for user
    dailyNutrients: async ({ dailyNutrients }: any) => {
      // Try to fetch all user nutrient cards
      try {
        return await mapperHelperFunction(dailyNutrients, NutrientCard);
      } catch (error) {
        return error;
      }
    },
  },

  // Resolver for nutrient card
  NutrientCard: {
    // Resolver function for fetching user for nutrient card
    user: async (parent: any) => {
      // Try to fetch user by userId
      try {
        return await User.findById(parent.user);
      } catch (error) {
        return error;
      }
    },
    // Resolver function for fetching foodsList for nutrient card
    mealsList: async (parent: any) => {
      // Try to fetch user by userId
      try {
        return await mapperHelperFunction(parent.mealsList, Meal);
      } catch (error) {
        return error;
      }
    },
  },

  // Resolver for meal
  Meal: {
    // Resolver function for fetching food eaten
    foodEaten: async (parent: any) => {
      // Try to fetch food by foodId
      try {
        return await Food.findById(parent.foodEaten);
      } catch (error) {
        return error;
      }
    },
    // Resolver function for fetching user for meal
    user: async (parent: any) => {
      // Try to fetch user by userId
      try {
        return await User.findById(parent.user);
      } catch (error) {
        return error;
      }
    },

    // Resolver function for fetching nutrient card
    nutrientCard: async (parent: any) => {
      // Try to fetch nutrient card by nutrientCardId
      try {
        return await NutrientCard.findById(parent.nutrientCard);
      } catch (error) {
        return error;
      }
    },
  },
};
