const jwt = require('jsonwebtoken')
const { promisify } = require('util')

exports.validate = async (req, res, next) => {
    if (req.cookies.myCookie) {
        try {
            const decoded = jwt.verify(req.cookies.myCookie, process.env.SALT_TOKEN)
            req.user = decoded
            next()
        } catch(err) {
            console.log('Error: ' + err)
        }
    } else {
        next()
    }    
}

exports.expire = async (req, res, next) => {
    res.cookie('myCookie', 'expire', {
        maxAge: 1000,
        httpOnly: true
    })
    next()
}