import jwt from 'jsonwebtoken';
import User from '../models/User';

module.exports = function ({ req }) {
    const Authorization = req.get('Authorization')
    if (Authorization) {
        const token = Authorization.replace('JWT ', '');
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        return User.findById(id);
    }
}