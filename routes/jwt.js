const jwt = require('jsonwebtoken')

require('dotenv').config()

exports.validateToken = async (req, res, next) => {
    const token = req.header('auth-token')
    
    if (!token) return res.status(401).send('Access Denied')

    try {
        const verified = jwt.verify(token, process.env.SALT_TOKEN)
        req.user = verified
        next()
    } catch (err) {
        return res.status(401).send('Invalid Token')
    }
}