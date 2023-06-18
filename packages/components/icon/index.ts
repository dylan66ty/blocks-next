import type { App } from 'vue'
import { getComponentNamespace } from '../../utils/global-config'
import baseComponents from './base-components'
import menuComponents from './menu-components'

const components = [...baseComponents, ...menuComponents]

const install = (app: App) => {
  components.forEach((component) => {
    app.component(getComponentNamespace('Icon') + component.name, component)
  })
}

export default {
  install
}
