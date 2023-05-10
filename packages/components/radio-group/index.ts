import _RadioGroup from '../radio/src/radio-group.vue'
import type { App } from 'vue'
import { getComponentPrefix } from '../../utils/global-config'


const RadioGroup = {
  ..._RadioGroup,
  install: (app: App): void => {
    const componentPrefix = getComponentPrefix()
    app.component(componentPrefix + _RadioGroup.name, _RadioGroup)
  }
}


export type RadioGroupInstance = InstanceType<typeof _RadioGroup>
export default RadioGroup