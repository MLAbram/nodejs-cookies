const express = require('express')
const app = express()
const hbs = require('hbs')
const bodyParser = require('body-parser')
const cookieController = require('./cookie')
const jwt = require('jsonwebtoken')

app.set('view engine', 'hbs')

app.use(express.static(process.cwd() + '/html'))
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

hbs.registerPartials(process.cwd() + '/views')

app.get('/', cookieController.isLoggedIn, (req, res) => {
    return res.status(200).render('index', {
        navbar_title: 'Node.js Cookie Demo'
    })
})

app.get('/test-1', cookieController.isLoggedIn, (req, res) => {
    return res.status(200).render('test-1', {
        navbar_title: 'Node.js Cookie Demo | Test #1'
    })
})

app.get('/test-2', (req, res) => {
    return res.status(200).render('test-2', {
        navbar_title: 'Node.js Cookie Demo | Test #2'
    })
})

app.get('/enable-cookie', (req, res) => {
    // create token; https://jwt.io/
    const token = jwt.sign ({
        id: '123456',
        email: 'jd@email.com',
        first_name: 'Jon', 
        last_name: 'Doe'                                
    }, 
        process.env.SALT_TOKEN, 
    {
        expiresIn: process.env.SALT_EXPIRE
    })

    // set token to cookie
    const cookieToken = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 43200000
        ),
            httpOnly: true
    }

    res.cookie('myCookie', token, cookieToken)

    return res.status(200).render('index', {
        cookie_active: true,
        navbar_title: 'Node.js Cookie Demo',
        user: {
            id: '123456',
            email: 'jd@email.com',
            first_name: 'Jon', 
            last_name: 'Doe'                                
        }
    })
})

app.get('/logout', cookieController.loggedOut)

module.exports = app