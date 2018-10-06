'use strict'

const puppeteerExtension = require('../lib/puppeteerExtension')
const admin = require('../config/firebase/firebase.admin')
const delay = require('delay')

class News extends puppeteerExtension {

  constructor (category) {
    super()
    this.category = category
    this.selectors = []
  }

  async setSelectors (selector) {
    this.selectors = selector
  }

  async getSelectors () {
    return this.selectors
  }

  /**
   * scraping
   *
   */
  async scraping () {
    let selectors = this.getSelectors()

    try {
      const db = admin.database();
      const ref = db.ref('category')
      let categoryRef = ref.child(this.category)

      // 各詳細ページのURLを取得
      const data = await this.page.evaluate(selector => {
        return Array.from(document.querySelectorAll(selector))
          .map(a => a.href)
      }, selectors.a)

      // 詳細ページから各データを抽出
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

        // コンテンツ保存
        categoryRef.push().set({
          'image': image,
          'title': title,
          'url'  : url
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