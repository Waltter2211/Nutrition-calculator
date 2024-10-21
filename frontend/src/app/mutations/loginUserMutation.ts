import { gql } from 'apollo-angular';

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    loginUser(input: $input) {
      token
    }
  }
`;
