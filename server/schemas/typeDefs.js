const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
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
        login(username: String!): Auth
        addUser(username: String!): Auth
    }`

module.exports = typeDefs; 