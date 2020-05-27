'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    #TOKEN\n    type Token{\n        token: String\n    }\n\n    #GPS\n    type Gps {\n        _id: ID!\n        IMEI: String!,\n        latitud: String,\n        longitud: String\n    }\n\n    #USERS\n    type User {\n        _id: ID!\n        first_name: String!\n        last_name: String!\n        email: String!\n        password: String!\n        myGps:[Gps],\n        imageProfile: String\n    }\n\n    type Query {\n        #GPS\n        allGps: [Gps]\n        fetchGps(IMEI: String!) : Gps\n\n        #USER\n        allUsers: [User]\n        singleUser(id:ID!): User\n    }\n\n    type Mutation {\n        #GPS\n        createGps (\n            IMEI: String!\n            latitud: String\n            longitud: String\n        ) : Gps\n\n        updateGps (\n            IMEI: String!\n            latitud: String!\n            longitud: String!\n        ) : Gps\n\n        #USER\n        createUser (\n            first_name: String!\n            last_name: String!\n            email: String!\n            password: String!\n        ): User\n\n        updateUser (\n            first_name: String\n            last_name: String\n            password: String\n            imageProfile: String\n        ): User\n\n        login (email: String!, password: String): Token\n    },\n\n    type Subscription {\n        gpsCreated: Gps\n        gpsUpdated(IMEI:String!): Gps\n    }\n'], ['\n    #TOKEN\n    type Token{\n        token: String\n    }\n\n    #GPS\n    type Gps {\n        _id: ID!\n        IMEI: String!,\n        latitud: String,\n        longitud: String\n    }\n\n    #USERS\n    type User {\n        _id: ID!\n        first_name: String!\n        last_name: String!\n        email: String!\n        password: String!\n        myGps:[Gps],\n        imageProfile: String\n    }\n\n    type Query {\n        #GPS\n        allGps: [Gps]\n        fetchGps(IMEI: String!) : Gps\n\n        #USER\n        allUsers: [User]\n        singleUser(id:ID!): User\n    }\n\n    type Mutation {\n        #GPS\n        createGps (\n            IMEI: String!\n            latitud: String\n            longitud: String\n        ) : Gps\n\n        updateGps (\n            IMEI: String!\n            latitud: String!\n            longitud: String!\n        ) : Gps\n\n        #USER\n        createUser (\n            first_name: String!\n            last_name: String!\n            email: String!\n            password: String!\n        ): User\n\n        updateUser (\n            first_name: String\n            last_name: String\n            password: String\n            imageProfile: String\n        ): User\n\n        login (email: String!, password: String): Token\n    },\n\n    type Subscription {\n        gpsCreated: Gps\n        gpsUpdated(IMEI:String!): Gps\n    }\n']);

var _apolloServerExpress = require('apollo-server-express');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = (0, _apolloServerExpress.gql)(_templateObject);

module.exports = typeDefs;