const express = require('express')
const app = express()
const jwtAuth = require('./jwt')

app.get('/', (req, res) => {
    res.status(200).json({Message: 'Node.JS Cookie Demo'})
})

app.get('/test-1', jwtAuth.validateToken, async (req, res) => {
    res.status(200).json({Message: 'Test #1'})
})

app.get('/test-2', jwtAuth.validateToken, async (req, res) => {
    res.status(200).json({Message: 'Test #2'})
})

module.exports = app