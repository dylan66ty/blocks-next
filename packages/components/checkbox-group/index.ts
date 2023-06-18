import _CheckboxGroup from '../checkbox/src/checkbox-group.vue'
import { withInstall } from '../../utils/vue-utils'

export const CheckboxGroup = withInstall(_CheckboxGroup)

export type CheckboxGroupInstance = InstanceType<typeof _CheckboxGroup>
export default CheckboxGroup
