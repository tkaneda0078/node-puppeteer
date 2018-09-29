'use strict'

const puppeteer = require('puppeteer')

/**
 * puppeteer拡張用クラス
 */
class puppeteerExtensionClass {

  /**
   * constructor
   */
  constructor () {
    this.browser = null
    this.page = null
  }

  /**
   * build
   */
  async build (url) {
    await this.initBrowser()
    await this.initPage()
    await this.goToURL(url)
  }

  async initBrowser () {
    this.browser = await puppeteer.launch({headless: false})
  }

  async initPage () {
    this.page = await this.browser.newPage()
  }

  async goToURL (url) {
    await this.page.goto(url)
  }

  async closeBrowser () {
    await this.browser.close()
  }

  /**
   * scraping
   */
  async scraping () {}

  /**
   * screenshot
   */
  async screenshot () {}
}

module.exports = puppeteerExtensionClass