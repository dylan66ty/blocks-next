import { withInstall } from '../../utils/vue-utils'
import _Form from './src/form.vue'

export const Form = withInstall(_Form)
export type FormInstance = InstanceType<typeof _Form>
export default Form
