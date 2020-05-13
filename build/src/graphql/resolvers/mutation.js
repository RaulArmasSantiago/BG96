'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Gps = require('../../models/Gps');

var _Gps2 = _interopRequireDefault(_Gps);

var _pubsub = require('../pubsub');

var _pubsub2 = _interopRequireDefault(_pubsub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } //Mongo Models


// Subscriptions


exports.default = {
    //GPS
    createGps: function createGps(_, _ref, context) {
        var _this = this;

        var input = _ref.input;
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _Gps2.default.create(input).then(function (gps) {
                                _pubsub2.default.publish('gpsAdded', { gpsAdded: gps });
                                return gps.toObject();
                            }).catch(function (err) {
                                throw err;
                            });

                        case 2:
                            return _context.abrupt('return', _context.sent);

                        case 3:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },
    updateGps: function updateGps(root, _ref2) {
        var _this2 = this;

        var id = _ref2.id,
            input = _ref2.input;
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _Gps2.default.findOneAndUpdate({ IMEI: id }, { $set: input }, { new: true }).then(function (gps) {
                                _pubsub2.default.publish('gpsUpdated', { gpsUpdated: gps });
                                return gps.toObject();
                            }).catch(function (err) {
                                throw err;
                            });

                        case 2:
                            return _context2.abrupt('return', _context2.sent);

                        case 3:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    }
};