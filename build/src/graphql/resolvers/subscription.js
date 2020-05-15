'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pubsub = require('../pubsub');

var _pubsub2 = _interopRequireDefault(_pubsub);

var _graphqlSubscriptions = require('graphql-subscriptions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    gpsAdded: {
        subscribe: function subscribe() {
            return _pubsub2.default.asyncIterator('gpsAdded');
        }
    },

    gpsUpdated: {
        subscribe: function subscribe() {
            return _pubsub2.default.asyncIterator('gpsUpdated');
        }
    }
};