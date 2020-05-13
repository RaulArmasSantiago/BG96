import User from '../models/User';
import createToken from './createToken';

module.exports = (email,password) => {

    return new Promise((resolve,reject) => {
        User
            .findOne({email:email})
            .then(user => {
                user
                    .comparePassword( password, (err, isMatch) => {
                        if (isMatch){
                            resolve(createToken(user));
                        } else {
                            reject(new Error("Las contraseñas no coinciden"));
                        }
                    })
            })
            .catch((err) => {
                reject(err)
            })
})

}
