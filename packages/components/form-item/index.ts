import _FormItem from '../form/src/form-item.vue'
import { withInstall } from '../../utils/vue-utils'

export const FormItem = withInstall(_FormItem)
export type FormItemInstance = InstanceType<typeof _FormItem>
export default FormItem
