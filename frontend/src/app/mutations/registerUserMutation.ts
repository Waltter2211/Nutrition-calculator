import { gql } from "apollo-angular";

export const REGISTER_USER = gql`
  mutation AddUser($input: CreateUserInput!) {
    addUser(input: $input) {
      username
    }
  }
`;
