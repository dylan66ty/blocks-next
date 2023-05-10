import _Input from './src/input.vue'
import type { App } from 'vue'
import { getComponentPrefix } from '../../utils/global-config'


const Input = {
  ..._Input,
  install: (app: App): void => {
    const componentPrefix = getComponentPrefix()
    app.component(componentPrefix + _Input.name, _Input)
  }
}


export type InputInstance = InstanceType<typeof _Input>
export default Input
