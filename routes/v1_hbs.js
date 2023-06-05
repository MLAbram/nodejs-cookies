const express = require('express')
const app = express()
const hbs = require('hbs')
const bodyParser = require('body-parser')
const cookieJwtAuth = require('./cookie')
const jwt = require('jsonwebtoken')

app.set('view engine', 'hbs')

app.use(express.static(process.cwd() + '/html'))
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

hbs.registerPartials(process.cwd() + '/views')

app.get('/', (req, res) => {
    return res.status(200).render('index', {
        navbar_title: 'Node.js Cookie Demo'
    })
})

app.get('/test-1', cookieJwtAuth.validateCookie, (req, res) => {
    return res.status(200).render('test-1', {
        navbar_title: 'Node.js Cookie Demo | Test #1'
    })
})

app.get('/test-2', cookieJwtAuth.validateCookie, (req, res) => {
    return res.status(200).render('test-2', {
        navbar_title: 'Node.js Cookie Demo | Test #2'
    })
})

app.get('/profile', cookieJwtAuth.validateCookie, (req, res) => {
    return res.status(200).render('profile', {
        navbar_title: 'Node.js Cookie Demo | Profile',
        user: {
            id: '123456',
            email: 'jd@email.com',
            first_name: 'Jon', 
            last_name: 'Doe'  
        }
    })
})

app.get('/faq', cookieJwtAuth.validateCookie, (req, res) => {
    return res.status(200).render('faq', {
        navbar_title: 'Node.js Cookie Demo | FAQ'
    })
})

app.get('/enable-cookie', (req, res) => {
    const user = {
        id: '123456',
        email: 'jd@email.com',
        first_name: 'Jon', 
        last_name: 'Doe'  
    }

    const token = jwt.sign(user, process.env.SALT_TOKEN, { expiresIn: '15m'})

    res.cookie('myCookie', token, {
        httpOnly: true,
        secure: true,
        signed: true
    })

    return res.status(200).render('index', {
        navbar_title: 'Node.js Cookie Demo',
        user: user
    })

    // // create token; https://jwt.io/
    // const token = jwt.sign ({
    //     id: '123456',
    //     email: 'jd@email.com',
    //     first_name: 'Jon', 
    //     last_name: 'Doe'                                
    // }, 
    //     process.env.SALT_TOKEN, 
    // {
    //     expiresIn: process.env.SALT_EXPIRE
    // })

    // // set token to cookie
    // const cookieToken = {
    //     expires: new Date(
    //         Date.now() + process.env.COOKIE_EXPIRE * 43200000
    //     ),
    //         httpOnly: true
    // }

    // res.cookie('myCookie', token, cookieToken, {
    //     httpOnly: true
    // })

    // return res.status(200).render('index', {
    //     cookie_active: true,
    //     navbar_title: 'Node.js Cookie Demo',
    //     user: {
    //         id: '123456',
    //         email: 'jd@email.com',
    //         first_name: 'Jon', 
    //         last_name: 'Doe'                                
    //     }
    // })
})

app.get('/logout', cookieJwtAuth.disableCookie)

module.exports = app