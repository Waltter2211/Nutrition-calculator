import { gql } from 'apollo-angular';

export const ADD_NUTRIENT_CARD = gql`
  mutation addNutrientCard($input: NutrientCardInput!) {
    addNutrientCard(input: $input) {
      acknowledged
      matchedCount
      modifiedCount
      upsertedId
    }
  }
`;
