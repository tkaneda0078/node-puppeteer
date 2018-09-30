'use strict'

const express = require('express')
const router = express.Router()
const puppeteer = require('puppeteer')
const News = require('../models/news')
const WotopiMedia = require('../models/wotopiMedia')

router.get('/', function (req, res, next) {
  (async () => {
    let url = 'https://www.shuwasystem.co.jp/newbook.html'
    const news = await new News()
    await news.build(url)
    await news.scraping()
    // await news.screenshot('example.png')
  })()
})

// sample
router.get('/fashion', function (req, res, next) {
  (async () => {
    let url = 'https://wotopi.jp/archives/category/fashion'
    const wotopi = await new WotopiMedia()
    await wotopi.build(url)
    await wotopi.scraping()
  })()
})

module.exports = router