'use strict';

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _createToken = require('./createToken');

var _createToken2 = _interopRequireDefault(_createToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (email, password) {

    return new Promise(function (resolve, reject) {
        _User2.default.findOne({ email: email }).then(function (user) {
            user.comparePassword(password, function (err, isMatch) {
                if (isMatch) {
                    resolve((0, _createToken2.default)(user));
                } else {
                    reject(new Error("Las contraseñas no coinciden"));
                }
            });
        }).catch(function (err) {
            reject(err);
        });
    });
};