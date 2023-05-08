import _ButtonGroup from '../button/src/button-group.vue'
import type { App } from 'vue'
import { getComponentPrefix } from '../../utils/global-config'


const ButtonGroup = {
  ..._ButtonGroup,
  install: (app: App): void => {
    const componentPrefix = getComponentPrefix()
    app.component(componentPrefix + _ButtonGroup.name, _ButtonGroup)
  }
}


export type ButtonGroupInstance = InstanceType<typeof _ButtonGroup>
export default ButtonGroup
