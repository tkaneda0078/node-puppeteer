'use strict'

const puppeteer = require('puppeteer')

class News {

  constructor(url) {
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
    await this.goToURL()
  }

  // todo スーパークラスにまとめる
  async initBrowser() {
    this.browser = await puppeteer.launch({ headless: false })
  }

  // todo スーパークラスにまとめる
  async initPage () {
    this.page = await this.browser.newPage()
  }

  // todo スーパークラスにまとめる
  async goToURL () {
    await this.page.goto(this.url)
  }

  // todo スーパークラスにまとめる
  async closeBrowser() {
    await this.browser.close()
  }

  /**
   * screenshot
   *
   * @param {String} path
   */
  async screenshot(path) {
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