import { withInstall } from '../../utils/vue-utils'
import _Checkbox from './src/checkbox.vue'
export const Checkbox = withInstall(_Checkbox)

export type CheckboxInstance = InstanceType<typeof _Checkbox>
export default Checkbox
