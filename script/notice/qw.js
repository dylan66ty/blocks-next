const path = require('path')
const fs = require('fs-extra')
const MarkdownIt = require('markdown-it')
const { JSDOM } = require('jsdom')
const axios = require('axios').default
const { composeAsync, promiseDefer } = require('../utils')
const config = require('../config')

function getInfo() {
  const changelogspath = path.resolve(process.cwd(), 'docs/guide/changelogs.md')
  const md = new MarkdownIt()
  const html = md.render(fs.readFileSync(changelogspath, 'utf-8'))
  const dom = JSDOM.fragment(html)
  const version = dom.querySelector('h2').innerHTML
  const date = dom.querySelector('p code').innerHTML
  const contents = [...dom.querySelector('ul').children].map((li) => li.innerHTML)
  return {
    version,
    date,
    contents
  }
}

function send(info) {
  const { promise, resolve, reject } = promiseDefer()
  const params = {
    msgtype: 'markdown',
    markdown: {
      content: `# blocks-next新版发布\n**日期** <font color="comment">${
        info.date
      }</font>\n**版本** <font color="info">${info.version}</font>\n**文档** ${
        config.DOC_URL
      } [预览](${config.DOC_URL})\n${info.contents
        .map((item, idx) => `${idx + 1}. ` + item)
        .join('\n')}\n <@所有人>【不回复】
      `
    }
  }
  axios
    .post(config.WEBHOOK_URL, params, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: false
    })
    .then((res) => {
      if (res.data.errcode === 0) {
        resolve()
      } else {
        reject(res.data.errMsg)
      }
    })

  return promise
}

module.exports = composeAsync(send, getInfo)
