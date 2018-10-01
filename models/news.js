'use strict'

const puppeteerExtension = require('../lib/puppeteerExtension')
const delay = require('delay')

class News extends puppeteerExtension {

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
      Array.from(document.querySelectorAll('#sinkan dt a'))
        .map(a => a.href))

    // 詳細から各データを抽出
    let contents = []
    for (const url of data) {
      await this.initPage()
      await this.goToURL(url)

      let title = await this.page.evaluate(() =>
        document.querySelector('h1.syoseki').textContent)
      let overview = await this.page.evaluate(() =>
        document.querySelector('.info > p.syoseki').textContent)

      contents.push(
        {
          'title'   : title,
          'overview': overview

        })

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