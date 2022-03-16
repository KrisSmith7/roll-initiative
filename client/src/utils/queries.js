import { gql } from '@apollo/client';

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
      _id
      postText
      createdAt
      username
    }
  }
`;

export const QUERY_POSTS = gql`
  query posts($usernameL String) {
    posts(username: $username) {
      _id
      postText
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
      posts {
        _id
        postText
        createdAt
      }
    }
  }
`;

