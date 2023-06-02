const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

require('dotenv').config()

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.myCookie) {
        try {
            // verify token exists
            const decoded = await promisify(jwt.verify)(req.cookies.myCookie,
                process.env.SALT_TOKEN
            )

            req.user = ({
                id: '123456',
                email: 'jd@email.com',
                first_name: 'Jon', 
                last_name: 'Doe'
            })
        } catch (error) {
            next()
        }
    } else {
        next()
    }    
}

exports.loggedOut = async (req, res) => {
    res.cookie('myCookie', 'LoggedOut', {
        expires: new Date(Date.now() + 1 * 1000),
        httpOnly: true
    })

    res.status(200).redirect('/')
}