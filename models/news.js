'use strict'

const puppeteerExtension = require('../lib/puppeteerExtension')
const delay = require('delay')

class News extends puppeteerExtension {

  constructor () {
    super()
    this.selectors = []
  }

  async setSelectors (selector) {
    this.selectors = selector
  }

  getSelectors () {
    return this.selectors
  }

  /**
   * scraping
   *
   */
  async scraping () {
    let selectors = this.getSelectors()

    // 各詳細ページのURLを取得
    const data = await this.page.evaluate(selector => {
      return Array.from(document.querySelectorAll(selector))
        .map(a => a.href)
    }, selectors.a)

    // 詳細ページから各データを抽出
    let contents = []
    try {
      for (const url of data) {
        await this.initPage()
        await this.goToURL(url)

        // タイトル取得
        let title = await this.page.evaluate(selector => {
          return document.querySelector(selector).textContent
        }, selectors.title)

        // 画像取得
        let image = await this.page.evaluate(selector => {
          return document.querySelector(selector).src
        }, selectors.image)

        contents.push(
          {
            'url'     : url,
            'title'   : title,
            'image'   : image

          })

        await delay(12000)
      }
    } catch (e) {
      console.log(e)
    }

    this.closeBrowser()
  }

}

module.exports = News