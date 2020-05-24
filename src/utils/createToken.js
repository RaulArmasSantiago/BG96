const jwt =  require('jsonwebtoken')

const secret = 'gps2.0'
const expiresIn = "1d"

module.exports = (user) =>{
    const  payload = {
        id:user._id,
        email:user.email,
        first_name:user.first_name,
        last_name:user.last_name,
        imageProfile:user.imageProfile
    }

    return jwt.sign(payload, secret,{expiresIn});
}