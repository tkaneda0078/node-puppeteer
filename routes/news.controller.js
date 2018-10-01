'use strict'

const express = require('express')
const router = express.Router()
var config = require('config');
// const News = require('../models/news')
const WotopiMedia = require('../models/wotopiMedia')

router.get('/:category', function (req, res, next) {
  (async () => {
    let category = req.params.category
    // 各メディアのURLを取得
    let mediaUrl = config.get(`Media.${category}`)
    // todo 動的に
    for (let key in mediaUrl) {
      let url = mediaUrl[key] + category
      const wotopi = await new WotopiMedia()
      await wotopi.build(url)
      await wotopi.scraping()
    }
  })()
})

module.exports = router