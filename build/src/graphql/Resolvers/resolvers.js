'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _apolloServerExpress = require('apollo-server-express');

var _Gps = require('../../models/Gps');

var _Gps2 = _interopRequireDefault(_Gps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-polyfill");


var GPS_CREATED = 'GPS_CREATED';
var GPS_UPDATED = 'gps_updated';

var pubsub = new _apolloServerExpress.PubSub();

var resolvers = {
    Query: {
        allGps: async function allGps() {
            return await _Gps2.default.find().exec();
        },
        fetchGps: async function fetchGps(_, _ref) {
            var IMEI = _ref.IMEI;

            return await _Gps2.default.findOne(IMEI);
        }
    },

    Mutation: {
        // GPS
        createGps: async function createGps(_, input) {
            var gps = await _Gps2.default.create(input);
            await pubsub.publish(GPS_CREATED, { gpsCreated: gps });
            return gps;
        },
        updateGps: async function updateGps(_, input) {
            var gps = await _Gps2.default.findOneAndUpdate({ IMEI: input.IMEI }, { $set: { latitud: input.latitud, longitud: input.longitud } }, { new: true });
            await pubsub.publish(GPS_UPDATED, { gpsUpdated: gps });
            return gps;
        }
    },

    Subscription: {
        gpsCreated: {
            subscribe: (0, _apolloServerExpress.withFilter)(function () {
                return pubsub.asyncIterator('gpsCreated');
            }, function (params, variables) {
                return true;
            })
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