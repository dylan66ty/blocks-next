import _Radio from './src/radio.vue'
import type { App } from 'vue'
import { getComponentPrefix } from '../../utils/global-config'


const Radio = {
  ..._Radio,
  install: (app: App): void => {
    const componentPrefix = getComponentPrefix()
    app.component(componentPrefix + _Radio.name, _Radio)
  }
}


export type RadioInstance = InstanceType<typeof _Radio>
export default Radio
