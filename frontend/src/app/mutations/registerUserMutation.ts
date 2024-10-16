import { gql } from "apollo-angular";

export const REGISTER_USER = gql`
  mutation Mutation($input: CreateUserInput) {
    addUser(input: $input) {
      username
    }
  }
`;
