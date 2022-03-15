const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        userName: String
    }

    type Auth {
        token: ID
        user: User
    }
    
    type Query {
        me: User
        users: [User]
    }
   
    type Mutation {
        login(userName: String!): Auth
        addUser(userName: String!): Auth
    }`

module.exports = typeDefs; 