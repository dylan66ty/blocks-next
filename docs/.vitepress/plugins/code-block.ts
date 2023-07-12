import markdown from 'markdown-it'
import type MarkdownIt from 'markdown-it'
import { highlight } from '../utils/highlight'

const ApiMd = new markdown()

const codeBlock = (md: MarkdownIt) => {
  const fence = md.renderer.rules.fence!

  ApiMd.renderer.rules = md.renderer.rules
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, ...rest] = args
    const token = tokens[idx]
    if (token.tag === 'code') {
      const lang = token.info.trim()
      const content = highlight(token.content, lang)
      return `
        <div class="language-${lang}" language="${lang}">
        ${content}
        </div>
      `
    }
    return fence.call(md, ...args)
  }
}

export default codeBlock
