const process = require('process')
const path = require('path')
const fs = require('fs-extra')
const MarkdownIt = require('markdown-it')
const { JSDOM } = require('jsdom')

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
  const msg = {
    msgtype: 'markdown',
    text: {
      content: `
       #### blocks-next新版发布
       **日期** ${info.date}
       **版本** ${info.version}
       **文档** [链接](http://192.168.21.136:88/docs/)
       ${info.contents.map((item) => '- ' + item).join('\n')}
      `,
      mentioned_list: ['@all'],
      mentioned_mobile_list: ['@all']
    }
  }

  console.log(msg)
}
