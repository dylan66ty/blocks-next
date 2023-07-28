import { withInstall } from '../../utils/vue-utils'
import _DatePicker from './src/date-picker.vue'

export const DatePicker = withInstall(_DatePicker)
export type DatePickerInstance = InstanceType<typeof _DatePicker>
export default DatePicker
