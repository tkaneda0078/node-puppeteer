'use strict'

const puppeteer = require('puppeteer')
const delay = require('delay')

class News {

  constructor (url) {
    this.url = url
    this.browser = null
    this.page = null
  }

  /**
   * build
   *
   */
  async build () {
    await this.initBrowser()
    await this.initPage()
    await this.goToURL(this.url)
  }

  // todo スーパークラスにまとめる
  async initBrowser () {
    this.browser = await puppeteer.launch({headless: false})
  }

  // todo スーパークラスにまとめる
  async initPage () {
    this.page = await this.browser.newPage()
  }

  // todo スーパークラスにまとめる
  async goToURL (url) {
    await this.page.goto(url)
  }

  // todo スーパークラスにまとめる
  async closeBrowser () {
    await this.browser.close()
  }

  /**
   * scraping
   *
   */
  async startScraping () {
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