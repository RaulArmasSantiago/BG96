'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _apolloServerExpress = require('apollo-server-express');

var _Gps = require('../../models/Gps');

var _Gps2 = _interopRequireDefault(_Gps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("babel-polyfill");


var GPS_CREATED = 'GPS_CREATED';
var GPS_UPDATED = 'GPS_UPDATED';

var pubsub = new _apolloServerExpress.PubSub();

var resolvers = {
    Query: {
        allGps: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _Gps2.default.find().exec();

                            case 2:
                                return _context.abrupt('return', _context.sent);

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function allGps() {
                return _ref.apply(this, arguments);
            }

            return allGps;
        }(),
        fetchGps: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref2) {
                var IMEI = _ref2.IMEI;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return _Gps2.default.findOne(IMEI);

                            case 2:
                                return _context2.abrupt('return', _context2.sent);

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function fetchGps(_x, _x2) {
                return _ref3.apply(this, arguments);
            }

            return fetchGps;
        }()
    },

    Mutation: {
        // GPS
        createGps: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, input) {
                var gps;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return _Gps2.default.create(input);

                            case 2:
                                gps = _context3.sent;
                                _context3.next = 5;
                                return pubsub.publish(GPS_CREATED, { gpsCreated: gps });

                            case 5:
                                return _context3.abrupt('return', gps);

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function createGps(_x3, _x4) {
                return _ref4.apply(this, arguments);
            }

            return createGps;
        }(),
        updateGps: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, input) {
                var gps;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return _Gps2.default.findOneAndUpdate({ IMEI: input.IMEI }, { $set: { latitud: input.latitud, longitud: input.longitud } }, { new: true });

                            case 2:
                                gps = _context4.sent;
                                _context4.next = 5;
                                return pubsub.publish(GPS_UPDATED, { gpsUpdated: gps });

                            case 5:
                                return _context4.abrupt('return', gps);

                            case 6:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function updateGps(_x5, _x6) {
                return _ref5.apply(this, arguments);
            }

            return updateGps;
        }()
    },

    Subscription: {
        gpsCreated: {
            subscribe: (0, _apolloServerExpress.withFilter)(function () {
                return pubsub.asyncIterator(['GPS_CREATED']);
            }, function (params, variables) {
                return true;
            })
        },

        gpsUpdated: {
            subscribe: function subscribe() {

                var asyncIterator = pubsub.asyncIterator('GPS_UPDATED');

                return asyncIterator;
            }
        }

    }
};

exports.default = resolvers;