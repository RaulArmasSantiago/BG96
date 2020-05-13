'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlSubscriptions = require('graphql-subscriptions');

var pubsub = new _graphqlSubscriptions.PubSub(); //Subscriptions manager
exports.default = pubsub;