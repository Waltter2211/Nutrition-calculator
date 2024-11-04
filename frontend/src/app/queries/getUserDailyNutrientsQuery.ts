import { gql } from 'apollo-angular';

export const GET_USER_DAILY_NUTRIENTS = gql`
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
