import { withInstall } from '../../utils/vue-utils'
import _Radio from './src/radio.vue'

export const Radio = withInstall(_Radio)
export type RadioInstance = InstanceType<typeof _Radio>
export default Radio
