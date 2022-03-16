const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
    }

    type Thought {
        _id: ID
        thoughtText: String
        createdAt: String
        userName: String

    }

    type Auth {
        token: ID!
        user: User
    }
    
    type Query {
        me: User
        users: [User]
        thoughts(userName: String): [Thought]
        thought(_id: ID!): Thought
    }
   
    type Mutation {
        login(userName: String!): Auth
        addUser(userName: String!): Auth
        addThought(thoughtText: String!): Thought
    }
`;

module.exports = typeDefs; 