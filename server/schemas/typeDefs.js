const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        dmstatus: Boolean
        characterCount: Int
        posts: [Post]
        characters: [Character]
        campaigns: [Campaign]
    }

    type Post {
        _id: ID
        postText: String
        createdAt: String
        username: String
        commentCount: Int
        comments: [Comment]
    }

    type Comment {
        _id: ID
        commentText: String
        createdAt: String
        username: String
    }

    type Character {
        _id: ID 
        username: String
        name: String
        class: String
        level: Int
        background: String
        race: String
        alignment: String
        bio: String
        str: Int
        dex: Int
        con: Int
        int: Int
        wis: Int
        cha: Int
    }

    type Campaign {
        _id: ID
        username: String
        campaignName: String
        description: String
        setting: String
        playerCount: Int
        players: [User]
    }

    type Auth {
        token: ID!
        user: User
    }
    
    type Query {
        me: User
        user(username: String!): User
        users: [User]
        posts(username: String): [Post]
        post(_id: ID!): Post
        character(_id: ID!): Character
        campaign(_id: ID!): Campaign
        campaigns: [Campaign]

    }
    
    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addPost(postText: String!): Post
        updatePost(postId: ID!, postText: String!): Post
        deletePost(postId: ID!): Post
        addComment(postId: ID!, commentText: String!): Post
        addCharacter(name: String!, class: String!, level: Int, background: String, 
            race: String, alignment: String, bio: String): Character
        addCampaign(campaignName: String!, description: String!, setting: String!): Campaign
        deleteCharacter(_id: ID!): Character
        updateCharacter(_id: ID!, level: Int, class: String, background: String, race: String, alignment: String, bio: String, 
            str: Int, dex: Int, con: Int, wis: Int, int: Int, cha: Int): Character
        addPlayer(campaignId: ID!): Campaign
        deleteCampaign(campaignId: ID!): Campaign
    }
`;

module.exports = typeDefs; 