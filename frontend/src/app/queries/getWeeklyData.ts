import { gql } from 'apollo-angular';

export const GET_WEEKLY_DATA = gql`
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
      user {
        goalCalories
        goalCarbohydrates
        goalFats
        goalProteins
        goalSteps
        goalWater
      }
    }
  }
`;
