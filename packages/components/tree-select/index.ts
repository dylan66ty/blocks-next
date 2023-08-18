import { withInstall } from '../../utils/vue-utils'
import _TreeSelect from './src/tree-select.vue'

export const TreeSelect = withInstall(_TreeSelect)
export type TreeSelectInstance = InstanceType<typeof _TreeSelect>
export default TreeSelect
