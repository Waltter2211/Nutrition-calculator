import { gql } from 'apollo-angular';

export const GET_USER = gql`
  query GetUser($token: String!) {
    getUser(token: $token) {
      _id
      username
      email
    }
  }
`;
