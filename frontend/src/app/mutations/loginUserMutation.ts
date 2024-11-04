import { gql } from 'apollo-angular';

export const LOGIN_USER = gql`
  mutation loginUser($input: LoginInput!) {
    loginUser(input: $input) {
      token
    }
  }
`;
