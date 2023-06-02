const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.status(200).json({Message: 'Node.JS Cookie Demo'})
})

app.get('/test-1', async (req, res) => {
    res.status(200).json({Message: 'Test #1'})
})

app.get('/test-2', async (req, res) => {
    res.status(200).json({Message: 'Test #2'})
})

module.exports = app