import { withInstall } from '../../utils/vue-utils'
import _Input from './src/input.vue'

export const Input = withInstall(_Input)

export type InputInstance = InstanceType<typeof _Input>
export default Input
