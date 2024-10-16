import { gql } from 'apollo-angular';

export const LOGIN_USER = gql`
  mutation Mutation($input: LoginInput) {
    loginUser(input: $input) {
      token
    }
  }
`;
