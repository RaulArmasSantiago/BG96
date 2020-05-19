'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    type Gps {\n        IMEI: String!,\n        latitud: String,\n        longitud: String\n    }\n\n    type Query {\n        allGps: [Gps]\n        fetchGps(IMEI: String!) : Gps\n    }\n\n    type Mutation {\n        createGps (\n            IMEI: String!\n            latitud: String\n            longitud: String\n        ) : Gps\n\n        updateGps (\n            IMEI: String!\n            latitud: String!\n            longitud: String!\n        ) : Gps\n    },\n\n    type Subscription {\n        gpsCreated: Gps\n        gpsUpdated(IMEI: String): Gps\n    }\n'], ['\n    type Gps {\n        IMEI: String!,\n        latitud: String,\n        longitud: String\n    }\n\n    type Query {\n        allGps: [Gps]\n        fetchGps(IMEI: String!) : Gps\n    }\n\n    type Mutation {\n        createGps (\n            IMEI: String!\n            latitud: String\n            longitud: String\n        ) : Gps\n\n        updateGps (\n            IMEI: String!\n            latitud: String!\n            longitud: String!\n        ) : Gps\n    },\n\n    type Subscription {\n        gpsCreated: Gps\n        gpsUpdated(IMEI: String): Gps\n    }\n']);

var _apolloServerExpress = require('apollo-server-express');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = (0, _apolloServerExpress.gql)(_templateObject);

module.exports = typeDefs;