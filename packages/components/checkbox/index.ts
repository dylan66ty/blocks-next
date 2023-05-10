import _Checkbox from './src/checkbox.vue'
import type { App } from 'vue'
import { getComponentPrefix } from '../../utils/global-config'


const Checkbox = {
  ..._Checkbox,
  install: (app: App): void => {
    const componentPrefix = getComponentPrefix()
    app.component(componentPrefix + _Checkbox.name, _Checkbox)
  }
}


export type CheckboxInstance = InstanceType<typeof _Checkbox>
export default Checkbox
