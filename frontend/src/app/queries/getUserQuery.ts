import { gql } from 'apollo-angular';

export const GET_USER = gql`
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
