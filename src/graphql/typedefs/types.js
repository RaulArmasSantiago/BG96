//Imports: GraphQL
import { gql } from 'apollo-server-express';

//GraphQL: TypeDefs
const TYPEDEFS = gql`
    
scalar ObjectID

type AuthToken{
    token:String
}

type Gps {
    _id: ObjectID!
    IMEI:String
    latitud:String
    longitud:String
}

input GpsInput {
    IMEI:String!
    latitud:String
    longitud:String
}

type Query {
    #Gps
    oneGps(id: String) : Gps
    allGps:[Gps]
}

type Mutation {
    #GPS
    createGps(input: GpsInput) : Gps
    updateGps(id: String, input: GpsInput) : Gps
}

type Subscription {
    gpsAdded: Gps
    gpsUpdated: Gps
}
`;

//Exports
export default TYPEDEFS;
