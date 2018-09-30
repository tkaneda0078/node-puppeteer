'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const news = require('./routes/news.controller')

const app = express()

app.use(helmet())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/', news)
app.use('/fashion', news)

app.listen(process.env.PORT || 3000, () =>
  console.log('Server connected'))