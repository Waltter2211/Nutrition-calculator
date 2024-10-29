import { gql } from 'apollo-angular';

export const GET_ALL_FOODS = gql`
  query GetAllFoods {
    getAllFoods {
      _id
      name
      calories
      proteins
      carbohydrates
      fats
    }
  }
`;
