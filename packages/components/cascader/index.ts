import { withInstall } from '../../utils/vue-utils'
import _Cascader from './src/cascader.vue'

export const Cascader = withInstall(_Cascader)
export type CascaderInstance = InstanceType<typeof _Cascader>
export default Cascader
