import _Grid from './src/grid.vue'
import _GridItem from './src/grid-item.vue'

import type { App } from 'vue'
import { getComponentPrefix } from '../../utils/global-config'


const Grid = {
  ..._Grid,
  install: (app: App): void => {
    const componentPrefix = getComponentPrefix()
    app.component(componentPrefix + _Grid.name, _Grid)
  }
}


const GridItem = {
  ..._GridItem,
  install: (app: App): void => {
    const componentPrefix = getComponentPrefix()
    app.component(componentPrefix + _Grid.name, _GridItem)
  }
}


export type GridInstance = InstanceType<typeof _Grid>
export type GridItemInstance = InstanceType<typeof _GridItem>

export {
  Grid,
  GridItem
}
