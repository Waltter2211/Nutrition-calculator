import { gql } from "apollo-angular";

export const ADD_USER = gql`
  mutation addUser($input: CreateUserInput!) {
    addUser(input: $input) {
      username
    }
  }
`;
