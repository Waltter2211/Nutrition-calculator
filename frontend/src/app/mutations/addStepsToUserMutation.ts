import { gql } from 'apollo-angular';

export const ADD_STEPS_TO_USER = gql`
  mutation addStepsToUser($input: AddStepsToUserInput!) {
    addStepsToUser(input: $input) {
      acknowledged
      matchedCount
      modifiedCount
      upsertedId
    }
  }
`;