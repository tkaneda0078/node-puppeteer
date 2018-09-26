'use strict'

const express = require('express')
const router = express.Router()
const puppeteer = require('puppeteer')
const News = require('../models/news')

router.get('/', function (req, res, next) {
  (async () => {
    const news = await new News('https://yahoo.co.jp')
    await news.build()
    await news.screenshot('example.png')
  })()
})

module.exports = router