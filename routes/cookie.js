// const express = require('express')
// const app = express()
const jwt = require('jsonwebtoken')
// const { promisify } = require('util')

require('dotenv').config()

exports.validateCookie = async (req, res, next) => {
    const token = req.cookies.myCookie
    console.log('token: ' + token)
    try {
        const user = jwt.verify(token, process.env.SALT_TOKEN)
        console.log('user: ' + user)
        req.user = user
        next()
    } catch (err) {
        console.log('Err: ' + err)
        // res.clearCookie('myCookie')
        // return res.redirect('/')
    }
    
    // if (req.cookies.myCookie) {
    //     try {
    //         verify token exists
    //         const decoded = await promisify(jwt.verify)(req.cookies.myCookie,
    //             process.env.SALT_TOKEN
    //         )
            
    //         req.user = ({
    //             id: '123456',
    //             email: 'jd@email.com',
    //             first_name: 'Jon', 
    //             last_name: 'Doe'
    //         })
    //     } catch (error) {
    //         next()
    //     }
    // } else {
    //     next()
    // }    
}

exports.disableCookie = async (req, res) => {
    res.cookie('myCookie', 'disableCookie', {
        expires: new Date(Date.now() + 1 * 1000),
        httpOnly: true
    })

    res.status(200).redirect('/')
}