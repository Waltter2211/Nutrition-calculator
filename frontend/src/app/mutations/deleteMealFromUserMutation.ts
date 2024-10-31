import { gql } from 'apollo-angular';

export const DELETE_MEAL_FROM_USER = gql`
  mutation deleteMealFromUser($input: DeleteMealFromUserInput!) {
    deleteMealFromUser(input: $input) {
      acknowledged
      matchedCount
      modifiedCount
      upsertedId
    }
  }
`;
