import {gql} from 'apollo-server-express';

const typeDefs = gql`
    #TOKEN
    type Token{
        token: String
    }

    #GPS
    type Gps {
        _id: ID!
        IMEI: String!,
        latitud: String,
        longitud: String
    }

    #USERS
    type User {
        _id: ID!
        first_name: String!
        last_name: String!
        email: String!
        password: String!
        myGps:[Gps],
        imageProfile: String
    }

    type Query {
        #GPS
        allGps: [Gps]
        fetchGps(IMEI: String!) : Gps

        #USER
        allUsers: [User]
        singleUser(id:ID!): User
    }

    type Mutation {
        #GPS
        createGps (
            IMEI: String!
            latitud: String
            longitud: String
        ) : Gps

        updateGps (
            IMEI: String!
            latitud: String!
            longitud: String!
        ) : Gps

        #USER
        createUser (
            first_name: String!
            last_name: String!
            email: String!
            password: String!
        ): User

        updateUser (
            first_name: String
            last_name: String
            password: String
            imageProfile: String
        ): User

        login (email: String!, password: String): Token
    },

    type Subscription {
        gpsCreated: Gps
        gpsUpdated: Gps
    }
`;

module.exports = typeDefs;
