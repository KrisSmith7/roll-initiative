const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        userName: String
    }
    
    type Query {
        users: [User]
    }

    type Auth {
        token: ID
        user: User
    }
    
    type Mutation {
        addUser(userName: String!): Auth
    }`

module.exports = typeDefs; 