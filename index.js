const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const v1_hbs = require('./routes/v1_hbs')
const v1_api = require('./routes/v1_api')

require('dotenv').config()

hbs.registerPartials(process.cwd() + '/views')

app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.static(process.cwd() + '/html'))
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/', v1_hbs)
app.use('/api/v1', v1_api)



app.listen(3000, () => {
  console.log('Server listening on port: 3000.')
})