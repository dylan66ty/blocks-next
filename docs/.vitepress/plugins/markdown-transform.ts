import path from 'path'

import type { Plugin } from 'vite'
import { projRoot } from '../utils/paths'

type Append = Record<'headers' | 'footers' | 'scriptSetups', string[]>

export function MarkdownTransform(): Plugin {
  return {
    name: 'md-transform-plus',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md')) return
      const componentId = path.basename(id, '.md')
      const filePath = path
        .relative(
          path.resolve(id, '..'),
          `${path.resolve(projRoot, 'example', `${componentId}/*.vue`)}`
        )
        .split(path.sep)
        .join('/')
      const append: Append = {
        headers: [],
        footers: [],
        scriptSetups: [
          `const demos = import.meta.globEager('${
            filePath.startsWith('../') ? filePath : `./${filePath}`
          }')`,
          `const path = '${filePath}'`
        ]
      }

      return combineMarkdown(
        code,
        [combineScriptSetup(append.scriptSetups), ...append.headers],
        append.footers
      )
    }
  }
}

const combineMarkdown = (code: string, headers: string[], footers: string[]) => {
  const frontmatterEnds = code.indexOf('---\n\n')
  const firstHeader = code.search(/\n#{1,6}\s.+/)
  const sliceIndex = firstHeader < 0 ? (frontmatterEnds < 0 ? 0 : frontmatterEnds + 4) : firstHeader

  if (headers.length > 0)
    code = code.slice(0, sliceIndex) + headers.join('\n') + code.slice(sliceIndex)
  code += footers.join('\n')
  return `${code}\n`
}

const combineScriptSetup = (codes: string[]) =>
  `\n\n<script setup>
${codes.join('\n')}
</script> \n
`
