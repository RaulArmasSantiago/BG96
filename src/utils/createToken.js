const jwt =  require('jsonwebtoken')

module.exports = (user) =>{
    const  payload = {
        id:user._id,
        email:user.email,
        first_name:user.first_name,
        last_name:user.last_name
    }

    return jwt.sign(payload, process.env.JWT_SECRET);
}