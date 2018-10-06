'use strict'

const express = require('express')
const router = express.Router()
const config = require('config')
const News = require('../models/news')

router.get('/:media/:category', function (req, res, next) {
  (async () => {
    let mediaName = req.params.media
    let category = req.params.category
    // メディア情報を取得
    let media = config.get(`Media.${mediaName}`)
    let url = media.url + category

    // todo validate

    const news = await new News(category)
    await news.build(url)
    await news.setSelectors(media.selector)
    await news.scraping()
  })()
})

module.exports = router