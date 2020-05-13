'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Password encrypt config
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({

    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birth_date: {
        type: Date
    },
    gender: {
        type: String,
        enum: ["Male", "Female"]
    },
    nationality: {
        type: String
    },
    /*    user_payment: { 
            type: String 
        },
        subscription_id: {
            type: Schema.Types.ObjectId,
            ref: "subscriptions"
        },
        history: [
            {
                type: Schema.Types.ObjectId,
                ref: 'movies'
            }
        ],
        favorites: [
            {
                type: Schema.Types.ObjectId,
                ref: 'movies'
            }
        ], */
    is_active: {
        type: Boolean,
        default: true
    }

}, { 'collection': 'User', 'timestamps': true });

// https://mongoosejs.com/docs/middleware.html#pre
UserSchema.pre('save', function (next) {

    // Documento que será guardado
    var user = this;

    // Si el documento no modifica/crea password, continuamos 
    if (!user.isModified('password')) {
        return next();
    }

    // De lo contrario, encriptamos el password del usuarioy lo seteamos al documento (user) que se guardará
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, hash) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!err) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt('return', next(err));

                            case 2:
                                user.password = hash;
                                next();

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }());
    });
});

// Agregamos un método para comparar contraseñas
UserSchema.methods.comparePassword = function (candidate, cb) {
    console.log(this.password);
    bcrypt.compare(candidate, this.password, function (err, isMatch) {
        cb(err, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);