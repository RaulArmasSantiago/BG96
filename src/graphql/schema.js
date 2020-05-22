import {gql} from 'apollo-server-express';

const typeDefs = gql`
    type Gps {
        IMEI: String!,
        latitud: String,
        longitud: String
    }

    type Query {
        allGps: [Gps]
        fetchGps(IMEI: String!) : Gps
    }

    type Mutation {
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
    },

    type Subscription {
        gpsCreated: Gps
        gpsUpdated(IMEI: String!): Gps
    }
`;

module.exports = typeDefs;
