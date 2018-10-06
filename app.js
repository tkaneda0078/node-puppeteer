'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const news = require('./routes/news.controller')
require('dotenv').config()

const app = express()

app.use(helmet())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/:media/:category', news)

app.listen(process.env.PORT || 3000, () =>
  console.log('Server connected'))