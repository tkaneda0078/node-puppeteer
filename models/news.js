'use strict'

const puppeteer = require('puppeteer')

class News {

  /**
   * constructor
   * @param {String} url
   */
  constructor (url) {
    this.url = url
  }

  /**
   * screenshot
   *
   */
  async screenshot () {
    try {
      let browser = await puppeteer.launch({
        headless: true,
        slowMo: 50,
      })
      let page = await browser.newPage()
      await page.goto(this.url)
      await page.screenshot({path: 'example.png'})
      await browser.close()
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = News