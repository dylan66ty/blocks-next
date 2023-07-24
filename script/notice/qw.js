const process = require('process')
const path = require('path')
const fs = require('fs-extra')
const MarkdownIt = require('markdown-it')
const { JSDOM } = require('jsdom')
const axios = require('axios').default
const consola = require('consola')

const WEBHOOK_URL =
  'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=130f260f-2889-4844-b9be-327257a7ba2c'

const info = getInfo()

send(info)

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
  const params = {
    msgtype: 'markdown',
    markdown: {
      content: `# blocks-next新版发布\n**日期** <font color="comment">${
        info.date
      }</font>\n**版本** <font color="info">${
        info.version
      }</font>\n**文档** http://192.168.21.136:88/docs/ [预览](http://192.168.21.136:88/docs/)\n${info.contents
        .map((item, idx) => `${idx + 1}. ` + item)
        .join('\n')}\n <@所有人>【不回复】
      `
    }
  }

  axios
    .post(WEBHOOK_URL, params, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: false
    })
    .then((res) => {
      if (res.data.errcode === 0) {
        consola.success('已通知')
      }
    })
}
