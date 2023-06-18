import { withInstall } from '../../utils/vue-utils'
import _Option from '../select/src/option.vue'

export const Option = withInstall(_Option)
export type OptionInstance = InstanceType<typeof _Option>
export default Option
