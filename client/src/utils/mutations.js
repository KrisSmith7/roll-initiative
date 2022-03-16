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

export const ADD_THOUGHT = gql`
    mutation addThought($thoughtText: String!) {
        addThought(thoughtText: $thoughtText) {
            _id
            thoughtText
            createdAt
            username
        }
    }
`;