import { gql } from 'apollo-angular';

export const ADD_WATER_TO_USER = gql`
  mutation addWaterToUser($input: AddWaterToUserInput!) {
    addWaterToUser(input: $input) {
      acknowledged
      matchedCount
      modifiedCount
      upsertedId
    }
  }
`;