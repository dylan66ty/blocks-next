import path from 'path'
import type { UserConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import vueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-macros/vite'
import { MarkdownTransform } from './.vitepress/plugins/markdown-transform'

export default (): UserConfig => {
  return {
    resolve: {
      alias: [
        {
          find: '~/',
          replacement: `${path.resolve(__dirname, './.vitepress')}/`
        },
        {
          find: '@blocks-next',
          replacement: `${path.resolve(__dirname, '../packages')}/`
        },
        {
          find: 'blocks-next',
          replacement: `${path.resolve(__dirname, '../packages')}/index`
        }
      ]
    },
    server: {
      host: true
    },
    plugins: [
      DefineOptions({
        plugins: {
          vueJsx: vueJsx()
        }
      }),
      Inspect(), // only applies in dev mode
      MarkdownTransform()
    ],
    css: {
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')]
      }
    }
  }
}
