const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const v1_hbs = require('./routes/v1_hbs')
const v1_api = require('./routes/v1_api')

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser('secret'))
app.use('/', v1_hbs)
app.use('/api/v1', v1_api)

app.listen(3000, () => {
  console.log('Server listening on port: 3000.')
})