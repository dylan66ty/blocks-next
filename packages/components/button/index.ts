import _Button from './src/button.vue'
import type { App } from 'vue'
import { getComponentPrefix } from '../../utils/global-config'


const Button = {
  ..._Button,
  install: (app: App): void => {
    const componentPrefix = getComponentPrefix()
    app.component(componentPrefix + _Button.name, _Button)
  }
}


export type ButtonInstance = InstanceType<typeof _Button>
export default Button

