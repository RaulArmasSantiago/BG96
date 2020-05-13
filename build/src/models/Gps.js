"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Gps = new Schema({
    "IMEI": {
        type: String,
        required: true,
        unique: true
    },
    "latitud": {
        type: String
    }, "longitud": {
        type: String
    },
    "create_at": {
        type: Date,
        default: new Date()
    }
}, { collection: "Gps", timestamps: true });
exports.default = _mongoose2.default.model('Gps', Gps);