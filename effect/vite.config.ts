import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-macros/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    DefineOptions({
      plugins: {
        vue: vue({
          reactivityTransform: true
        }),
        vueJsx: vueJsx()
      }
    })
  ],
  server: {
    // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
    host: '0.0.0.0',
    // 服务器端口号
    port: 3001
  },
  resolve: {
    alias: [
      {
        find: '@blocks-next',
        replacement: `${path.resolve(__dirname, '../packages')}`
      }
    ]
  }
})
