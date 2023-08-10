import type { Component } from 'vue'
import VApp from './v-app.vue'
import VHome from './content/v-home.vue'
import VDemo from './demo/v-demo.vue'

import '../styles/css-var.scss'
import '../styles/app.scss'

export { default as VNotFound } from './content/v-not-found.vue'



export default VApp

export const globals: [string, Component][] = [
  ['Demo', VDemo],
  ['Home', VHome]
]
