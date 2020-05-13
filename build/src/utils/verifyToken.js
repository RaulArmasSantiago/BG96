'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (_ref) {
    var req = _ref.req;

    var Authorization = req.get('Authorization');
    if (Authorization) {
        var token = Authorization.replace('JWT ', '');

        var _jwt$verify = _jsonwebtoken2.default.verify(token, process.env.JWT_SECRET),
            id = _jwt$verify.id;

        return _User2.default.findById(id);
    }
};