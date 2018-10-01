'use strict'

const puppeteerExtension = require('../lib/puppeteerExtension')
const delay = require('delay')

/**
 * wotopiメディア用
 *
 */
class WotopiMedia extends puppeteerExtension {

  constructor () {
    super()
  }

  /**
   * scraping
   *
   */
  async scraping () {
    // 詳細ページのURLを取得
    const data = await this.page.evaluate(() =>
      Array.from(document.querySelectorAll('.figure-list > .col a'))
        .map(a => a.href))

    // 詳細から各データを抽出
    let contents = []
    for (const url of data) {
      await this.initPage()
      await this.goToURL(url)

      let title = await this.page.evaluate(() =>
        document.querySelector('h1.post-title').textContent)
      let image = await this.page.evaluate(() =>
        document.querySelector('.post-image > img').src)

      contents.push(
        {
          'url'     : url,
          'title'   : title,
          'image'   : image

        })

      await delay(2000)
    }

    this.closeBrowser()
  }

}

module.exports = WotopiMedia