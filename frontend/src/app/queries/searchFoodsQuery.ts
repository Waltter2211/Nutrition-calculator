import { gql } from 'apollo-angular';

export const SEARCH_FOODS = gql`
  query SearchFoods($foodsName: String) {
    searchFoods(foodsName: $foodsName) {
      _id
      name
      calories
      proteins
      carbohydrates
      fats
    }
  }
`;
