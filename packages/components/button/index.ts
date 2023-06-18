import { withInstall } from '../../utils/vue-utils'
import _Button from './src/button.vue'

export const Button = withInstall(_Button)
export type ButtonInstance = InstanceType<typeof _Button>
export default Button
