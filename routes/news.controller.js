'use strict'

const express = require('express')
const router = express.Router()
const puppeteer = require('puppeteer')
const News = require('../models/news')

router.get('/', function (req, res, next) {
  (async () => {
    let url = 'https://www.shuwasystem.co.jp/newbook.html'
    const news = await new News()
    await news.build(url)
    await news.scraping()
    // await news.screenshot('example.png')
  })()
})

module.exports = router