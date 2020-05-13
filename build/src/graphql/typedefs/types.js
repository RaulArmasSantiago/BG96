'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(['\n    \nscalar ObjectID\n\ntype AuthToken{\n    token:String\n}\n\ntype Gps {\n    _id: ObjectID!\n    IMEI:String\n    latitud:String\n    longitud:String\n}\n\ninput GpsInput {\n    IMEI:String!\n    latitud:String\n    longitud:String\n}\n\ntype Query {\n    #Gps\n    oneGps(id: String) : Gps\n    allGps:[Gps]\n}\n\ntype Mutation {\n    #GPS\n    createGps(input: GpsInput) : Gps\n    updateGps(id: String, input: GpsInput) : Gps\n}\n\ntype Subscription {\n    gpsAdded: Gps\n    gpsUpdated: Gps\n}\n'], ['\n    \nscalar ObjectID\n\ntype AuthToken{\n    token:String\n}\n\ntype Gps {\n    _id: ObjectID!\n    IMEI:String\n    latitud:String\n    longitud:String\n}\n\ninput GpsInput {\n    IMEI:String!\n    latitud:String\n    longitud:String\n}\n\ntype Query {\n    #Gps\n    oneGps(id: String) : Gps\n    allGps:[Gps]\n}\n\ntype Mutation {\n    #GPS\n    createGps(input: GpsInput) : Gps\n    updateGps(id: String, input: GpsInput) : Gps\n}\n\ntype Subscription {\n    gpsAdded: Gps\n    gpsUpdated: Gps\n}\n']);

var _apolloServerExpress = require('apollo-server-express');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } //Imports: GraphQL


//GraphQL: TypeDefs
var TYPEDEFS = (0, _apolloServerExpress.gql)(_templateObject);

//Exports
exports.default = TYPEDEFS;