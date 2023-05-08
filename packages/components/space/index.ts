import _Space from './src/space.vue'
import type { App } from 'vue'
import { getComponentPrefix } from '../../utils/global-config'


const Space = {
  ..._Space,
  install: (app: App): void => {
    const componentPrefix = getComponentPrefix()
    app.component(componentPrefix + _Space.name, _Space)
  }
}


export type SpaceInstance = InstanceType<typeof _Space>
export default Space

