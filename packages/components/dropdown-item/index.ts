import { withInstall } from '../../utils/vue-utils'
import _DropdownItem from '../dropdown/src/dropdown-item.vue'

export const DropdownItem = withInstall(_DropdownItem)

export type DropdownItemInstance = InstanceType<typeof _DropdownItem>
export default DropdownItemInstance
