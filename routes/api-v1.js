const express = require('express'), app = express()
const jwt = require('jsonwebtoken')
const cookieAuth = require('./cookie')

app.get('/', (req, res) => {
    res.status(200).json({Message: 'Node.JS Cookie Demo'})
})

app.get('/create-cookie', (req, res) => {
    try {
        const userInfo = {
            id: '123456',
            email: 'jd@email.com',
            first_name: 'Jon', 
            last_name: 'Doe'  
        }

        const token = jwt.sign(userInfo, process.env.SALT_TOKEN, { expiresIn: '1h' })

        res.cookie('myCookie', token, {
            maxAge: 900000, // 15 minutes
            secure: true,
            httpOnly: true
        }).status(200).json({Message: 'Cookie Created'})
    } catch (err) {
        console.log(err)
    }
})

app.get('/expire-cookie', cookieAuth.expire, (req, res) => {
    res.status(200).json({Message: 'Cookie Expired'})
})

app.get('/test', cookieAuth.validate, async (req, res) => {
    res.status(200).json({Message: 'Test #1'})
})

module.exports = app