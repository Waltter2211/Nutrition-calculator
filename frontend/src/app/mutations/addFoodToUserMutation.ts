import { gql } from 'apollo-angular';

const ADD_FOOD_TO_USER = gql`
  mutation addFoodToUser($input: AddFoodToUserInput!) {
    addFoodToUser(input: $input) {
      acknowledged
      matchedCount
      modifiedCount
      upsertedId
    }
  }
`;
