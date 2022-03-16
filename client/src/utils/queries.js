import { gql } from '@apollo/client';

export const QUERY_THOUGHT = gql`
  query thought($id: ID!) {
    thought(_id: $id) {
      _id
      thoughtText
      createdAt
      username
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query thoughts($usernameL String) {
    thoughts(username: $username) {
      _id
      thoughtText
      createdAt
      username
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

