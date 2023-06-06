const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cookieAuth = require('./cookie')

app.get('/', cookieAuth.validate, (req, res) => {
    if (!req.user) {
        return res.status(200).render('index', {
            navbar_title: 'Node.js Cookie Demo'
        })
    } else {
        return res.status(200).render('index', {
            navbar_title: 'Node.js Cookie Demo',
            userInfo: req.user
        })
    }
})

app.get('/test-1', cookieAuth.validate, (req, res) => {
    return res.status(200).render('test-1', {
        navbar_title: 'Node.js Cookie Demo | Test #1',
        userInfo: req.user
    })
})

app.get('/test-2', cookieAuth.validate, (req, res) => {
    return res.status(200).render('test-2', {
        navbar_title: 'Node.js Cookie Demo | Test #2',
        userInfo: req.user
    })
})

app.get('/profile', cookieAuth.validate, (req, res) => {
    return res.status(200).render('profile', {
        navbar_title: 'Node.js Cookie Demo | Profile',
        userInfo: req.user
    })
})

app.get('/faq', cookieAuth.validate, (req, res) => {
    return res.status(200).render('faq', {
        navbar_title: 'Node.js Cookie Demo | FAQ',
        userInfo: req.user
    })
})

app.get('/enable-cookie', (req, res) => {
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
        }).render('index', {
            navbar_title: 'Node.js Cookie Demo',
            userInfo: userInfo
        })
    } catch (err) {
        console.log(err)
    }
})

app.get('/logout', cookieAuth.expire, (req, res) => {
    return res.status(200).render('index', {
        navbar_title: 'Node.js Cookie Demo'
    })
})

module.exports = app