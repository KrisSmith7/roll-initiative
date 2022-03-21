import { gql } from '@apollo/client';

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
      _id
      postText
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentText
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query posts($username: String) {
    posts(username: $username) {
      _id
      postText
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentText
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      dmstatus
      posts {
        _id
        postText
        createdAt
        commentCount
        comments {
          _id
          createdAt
          commentText
          username
        }
      }
      characters {
        _id
        name
        class
        level
        background
        race
        alignment
        bio
        str
        dex
        con
        int
        wis
        cha
      }
      campaigns {
        campaignName
        description
        setting
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      dmstatus
      posts {
        _id
        postText
        createdAt
        commentCount
        comments {
          _id
          createdAt
          commentText
          username
        }
      }
      characters {
        _id
        name
        class
        level
        background
        race
        alignment
        bio
        str
        dex
        con
        int
        wis
        cha
      }
      campaigns {
        campaignName
        description
        setting
      }
    }
  }
`;

export const QUERY_CAMPAIGN = gql`
  query campaigns {
    campaigns {
      _id
      username
      campaignName
      description
      setting
    }
  }
`;

export const QUERY_CHARACTER = gql`
  query character($id: ID!) {
    character(_id: $id) {
      _id
      name
      level
      class
      bio
      background
      race
      alignment
      str
      dex
      con
      int
      wis
      cha
    }
  }`

  export const QUERY_CHARACTERS = gql`
  query characters {
    character {
      name
      level
      class
      bio
      background
    }
  }`
