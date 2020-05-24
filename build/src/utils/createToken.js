'use strict';

var jwt = require('jsonwebtoken');

var secret = 'gps2.0';
var expiresIn = "1d";

module.exports = function (user) {
    var payload = {
        id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        imageProfile: user.imageProfile
    };

    return jwt.sign(payload, secret, { expiresIn: expiresIn });
};