'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _apolloServerExpress = require('apollo-server-express');

var _apolloServer = require('apollo-server');

var _Gps = require('../../models/Gps');

var _Gps2 = _interopRequireDefault(_Gps);

var _User = require('../../models/User');

var _User2 = _interopRequireDefault(_User);

var _callbackToAsyncIterator = require('callback-to-async-iterator');

var _callbackToAsyncIterator2 = _interopRequireDefault(_callbackToAsyncIterator);

var _createToken = require('../../utils/createToken');

var _createToken2 = _interopRequireDefault(_createToken);

var _comparePasswords = require('../../utils/comparePasswords');

var _comparePasswords2 = _interopRequireDefault(_comparePasswords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-polyfill");

//UTILS


var pubsub = new _apolloServer.PubSub();

var resolvers = {
    Query: {

        //GPS
        allGps: async function allGps() {
            return await _Gps2.default.find().exec();
        },
        fetchGps: async function fetchGps(_, _ref) {
            var IMEI = _ref.IMEI;

            return await _Gps2.default.findOne(IMEI);
        },


        //USER
        allUsers: async function allUsers() {
            return await _User2.default.find().exec();
        },
        singleUser: async function singleUser(_, _ref2) {
            var id = _ref2.id;

            return await _User2.default.findOne(id);
        }
    },

    Mutation: {
        // GPS
        createGps: async function createGps(_, input) {
            var gps = await _Gps2.default.create(input);
            await pubsub.publish('gpsCreated', { gpsCreated: { gps: gps } });
            return gps;
        },
        updateGps: async function updateGps(_, input) {
            console.log(input);
            var gps = await _Gps2.default.findOneAndUpdate({ IMEI: input.IMEI }, { $set: { latitud: input.latitud, longitud: input.longitud } }, { new: true });
            await pubsub.publish('gpsUpdated', { gpsUpdated: { gps: gps } });
            return gps;
        },


        // USER
        createUser: async function createUser(_, input) {
            var user = await _User2.default.create(input);
            return user;
        },
        login: async function login(_, input) {
            return await (0, _comparePasswords2.default)(input.email, input.password).then(function (token) {
                return { token: token };
            }).catch(function (err) {
                throw err;
            });
        }
    },

    Subscription: {
        gpsCreated: {
            subscribe: function subscribe() {
                return pubsub.asyncIterator('gpsCretated');
            }
        },

        gpsUpdated: {
            subscribe: (0, _apolloServerExpress.withFilter)(function () {
                return pubsub.asyncIterator('gpsUpdated');
            }, function (params, variables) {
                return params.gpsUpdated.IMEI === variables.IMEI;
            })
        }

    }
};

exports.default = resolvers;