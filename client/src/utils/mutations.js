import { gql } from '@apollo/client';

// login with username and password
export const LOGIN_USER = gql `
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// register new user with email, username, and password 
export const ADD_USER = gql `
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_POST = gql`
    mutation addPost($postText: String!) {
        addPost(postText: $postText) {
            _id
            postText
            createdAt
            username
            commentCount
            comments {
                _id
            }
        }
    }
`;

export const DELETE_POST = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId) {
            _id
            username
        }
    }
`;

export const ADD_COMMENT = gql`
    mutation addComment($postId: ID!, $commentText: String!) {
        addComment(postId: $postId, commentText: $commentText) {
            _id
            commentCount
            comments {
                _id
                commentText
                createdAt
                username
            }
        }
    }
`;

export const ADD_CAMPAIGN = gql`
mutation addCampaign($campaignName: String!, $description: String!, $setting: String!) {
    addCampaign (campaignName: $campaignName
                description: $description
                setting: $setting) {
        campaignName
        description
        setting 
        }
    }
`

export const ADD_CHARACTER = gql` 
mutation addCharacter($name: String!, $class: String!, $level: Int, $background: String, 
    $race: String, $alignment: String, $bio: String) {
        addCharacter (name: $name, class: $class, level: $level, background: $background, 
            race: $race, alignment: $alignment, bio: $bio) {
                name
                class
                level
                background
                race
                alignment
                bio
            }
    }
    `