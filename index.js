const express = require('express'), app = express()
const cookieParser = require('cookie-parser')
const apiV1 = require('./routes/api-v1')

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use('/api/v1', apiV1)

app.listen(3000, () => {
  console.log('Server listening on port: 3000.')
})