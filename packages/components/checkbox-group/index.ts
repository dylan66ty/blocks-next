import _CheckboxGroup from '../checkbox/src/checkbox-group.vue'
import type { App } from 'vue'
import { getComponentPrefix } from '../../utils/global-config'


const CheckboxGroup = {
  ..._CheckboxGroup,
  install: (app: App): void => {
    const componentPrefix = getComponentPrefix()
    app.component(componentPrefix + _CheckboxGroup.name, _CheckboxGroup)
  }
}


export type CheckboxGroupInstance = InstanceType<typeof _CheckboxGroup>
export default CheckboxGroup