import { withInstall } from '../../utils/vue-utils'
import _Drawer from './src/drawer.vue'

export const Drawer = withInstall(_Drawer)
export type DrawerInstance = InstanceType<typeof _Drawer>
export default Drawer
