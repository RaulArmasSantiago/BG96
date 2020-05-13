'use strict';

var jwt = require('jsonwebtoken');

module.exports = function (user) {
    var payload = {
        id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
    };

    return jwt.sign(payload, process.env.JWT_SECRET);
};