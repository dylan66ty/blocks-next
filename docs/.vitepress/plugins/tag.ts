import type MarkdownIt from 'markdown-it'

export default (md: MarkdownIt): void => {
  md.renderer.rules.tag = (tokens, idx) => {
    const token = tokens[idx]
    const value = token.content
    const tagClass = ['beta', 'delete'].includes(value) ? `is-${value}` : ''
    return `<span class="vp-tag ${tagClass}">${value}</span>`
  }

  md.inline.ruler.before('emphasis', 'tag', (state, silent) => {
    // md写法 eg: ^(beta)
    const tagRegExp = /^\^\(([^)]*)\)/
    const str = state.src.slice(state.pos, state.posMax)
    if (!tagRegExp.test(str)) return false
    if (silent) return true

    const result = str.match(tagRegExp)

    if (!result) return false

    const token = state.push('tag', 'tag', 0)
    token.content = result[1].trim()
    token.level = state.level
    state.pos += result[0].length
    return true
  })
}
