import _RadioGroup from '../radio/src/radio-group.vue'
import { withInstall } from '../../utils/vue-utils'

export const RadioGroup = withInstall(_RadioGroup)

export type RadioGroupInstance = InstanceType<typeof _RadioGroup>
export default RadioGroup
