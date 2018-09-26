'use strict'

const express = require('express')
const router = express.Router()
const puppeteer = require('puppeteer')
const News = require('../models/news')

router.get('/', function (req, res, next) {

  const news = new News('https://yahoo.co.jp')
  news.screenshot()
  console.log("take Screenshot!!!")
})

module.exports = router