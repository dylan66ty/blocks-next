import { vLoading } from './src/directive'
import type { App } from 'vue'
import {open} from './src/open'


export const Loading = {
  install(app: App) {
    app.directive('bn-loading', vLoading)
  },
  open
}



