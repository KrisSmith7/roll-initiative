const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        dmstatus: Boolean
        posts: [Post]
        characters: [Character]
    }

    type Post {
        _id: ID
        postText: String
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

    type Auth {
        token: ID!
        user: User
    }
    
    type Query {
        me: User
        users: [User]
        posts(username: String): [Post]
        post(_id: ID!): Post
    }
   
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addPost(postText: String!): Post
        addCharacter(name: String!, class: String!, level: Int, background: String, 
            race: String, alignment: String, bio: String): Character
    }`

module.exports = typeDefs; 