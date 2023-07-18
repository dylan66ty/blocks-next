import { withInstall } from '../../utils/vue-utils'
import _Dropdown from './src/dropdown'

export const Dropdown = withInstall(_Dropdown)

export type DropdownInstance = InstanceType<typeof _Dropdown>
export default DropdownInstance
