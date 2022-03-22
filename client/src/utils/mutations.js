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

export const UPDATE_POST = gql`
    mutation updatePost($postId: ID!, $postText: String!) {
        updatePost(postId: $postId, postText: $postText) {
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
`;

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
    `;

export const DELETE_CHARACTER = gql`
mutation deleteCharacter($_id: ID!) {
    deleteCharacter (_id: $_id) {
        username
        _id
    }
}`;

export const UPDATE_CHARACTER = gql`
mutation updateCharacter($_id: ID!, $level: Int, $class: String, $background: String, $race: String, $alignment: String, $bio: String, 
    $str: Int, $dex: Int, $con: Int, $wis: Int, $int: Int, $cha: Int) {
        updateCharacter(_id: $_id, level: $level, class: $class, background: $background, race: $race, alignment: $alignment, bio: $bio, 
            str: $str, dex: $dex, con: $con, wis: $wis, int: $int, cha: $cha) {
                _id
                name
                background
                class
                level
                race
                alignment
                bio
                str
                dex
                con
                wis
                int
                cha
            }
    }`;

export const ADD_PLAYER = gql`
    mutation addPlayer($campaignId: ID!) {
        addPlayer(campaignId: $campaignId) {
            _id
            campaignName
            description
            setting
            playerCount
            players {
                _id
                username
            }
        }
    }
`;

export const DELETE_CAMPAIGN = gql`
    mutation deleteCampaign($campaignId: ID!) {
        deleteCampaign(campaignId: $campaignId) {
            _id
            username
            campaignName
            setting
            description
            playerCount
            players {
                _id
                username
            }
        }
    }
`;
