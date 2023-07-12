import { createApp } from 'vue'
import './reset.scss'

// 1、本地调试
import BlocksNext, { Icon } from '@blocks-next/index'
import '@blocks-next/theme-default/index.scss'

// 2、build调试
// 将dist中blocks-next放在当前目录下的node_modules中即可
// import BlocksNext , { Icon } from 'blocks-next'
// import 'blocks-next/theme-default/index.css'

import App from './App.vue'

const app = createApp(App)

app.use(BlocksNext)
app.use(Icon)

app.mount('#app')
