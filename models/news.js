'use strict'

const puppeteerExtensionClass = require('../lib/puppeteerExtensionClass')
const delay = require('delay')

class News extends puppeteerExtensionClass {

  constructor () {
    super()
  }

  /**
   * scraping
   *
   */
  async scraping () {
    // 詳細ページのURLを取得
    const results = await this.page.evaluate(() =>
      Array.from(document.querySelectorAll('#sinkan dt a'))
        .map(a => a.href))

    // 詳細から各データを抽出
    let data = []
    for (const url of results) {
      await this.initPage()
      await this.goToURL(url)

      let title = await this.page.evaluate(() =>
        document.querySelector('h1.syoseki').textContent)
      let overview = await this.page.evaluate(() =>
        document.querySelector('.info > p.syoseki').textContent)

      data.push(
        {
          'title'   : title,
          'overview': overview

        })
      console.log(data)
      await delay(1000)
    }

    this.closeBrowser()
  }

  /**
   * screenshot
   *
   * @param {String} path
   */
  async screenshot (path) {
    try {
      await this.page.screenshot({
        path: path
      })
      this.closeBrowser()
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = News