import {gql} from "apollo-server-express";

const typeDefs = gql`
    scalar Date
    enum UserStatusType {
        block
        active
    }

    type EntityResult {
        messages: [String!]
    }

    type User {
        id: ID!
        email: String!
        userName: String!
        password: String!
        status:UserStatusType!
        lastTimeLogin: Date!
        createdBy: String!
        createdOn: Date!
        lastModifiedBy: String!
        lastModifiedOn: Date!
    }
    union UserResult = User | EntityResult



    type Query {
        me: UserResult!
        checkEmail(email: String!): String!
    }

    type Mutation {
        register(email: String!, userName: String!, password: String!): String!
        login(userName: String!, password: String!): String!
        logout(userName: String!): String!

    }
`;

export default typeDefs;
