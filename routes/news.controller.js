'use strict'

const express = require('express')
const router = express.Router()
// const News = require('../models/news')
const WotopiMedia = require('../models/wotopiMedia')

router.get('/:category', function (req, res, next) {
  (async () => {
    let baseUrl = 'https://wotopi.jp/archives/category/'
    let url = baseUrl + req.params.category
    console.log(url)
    const wotopi = await new WotopiMedia()
    await wotopi.build(url)
    await wotopi.scraping()
  })()
})

module.exports = router