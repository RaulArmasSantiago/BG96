'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ref2;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _apolloServerExpress = require('apollo-server-express');

var _types = require('./typedefs/types');

var _types2 = _interopRequireDefault(_types);

var _query = require('./resolvers/query');

var _query2 = _interopRequireDefault(_query);

var _mutation = require('./resolvers/mutation');

var _mutation2 = _interopRequireDefault(_mutation);

var _subscription = require('./resolvers/subscription');

var _subscription2 = _interopRequireDefault(_subscription);

var _verifyToken = require('../utils/verifyToken');

var _verifyToken2 = _interopRequireDefault(_verifyToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } //Imports: GraphQL Apollo Server


//Imports: GraphQL TypeDef & Resolvers


// Imports: Utilities


// GraphQL: Schema
var SERVER = new _apolloServerExpress.ApolloServer((_ref2 = {
    typeDefs: _types2.default,
    resolvers: { Query: _query2.default, Mutation: _mutation2.default, Subscription: _subscription2.default },
    context: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_context) {
            return regeneratorRuntime.wrap(function _callee$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.t0 = _extends;
                            _context2.t1 = {};
                            _context2.t2 = _context;
                            _context2.next = 5;
                            return (0, _verifyToken2.default)(_context);

                        case 5:
                            _context2.t3 = _context2.sent;
                            _context2.t4 = {
                                user: _context2.t3
                            };
                            return _context2.abrupt('return', (0, _context2.t0)(_context2.t1, _context2.t2, _context2.t4));

                        case 8:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee, undefined);
        }));

        function context(_x) {
            return _ref.apply(this, arguments);
        }

        return context;
    }(),
    playground: {
        endpoint: 'http://azureiothub-bg9596.herokuapp.com/graphql',
        subscriptionEndpoint: 'ws://azureiothub-bg9596.herokuapp.com/graphql',
        settings: {
            'editor.editor.theme': 'light'
        }
    }
}, _defineProperty(_ref2, 'playground', true), _defineProperty(_ref2, 'introspection', true), _ref2));

exports.default = SERVER;