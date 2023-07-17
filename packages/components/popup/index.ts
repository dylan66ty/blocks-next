import { withInstall } from '../../utils/vue-utils'
import _Popup from './src/popup.vue'

export const Popup = withInstall(_Popup)

export type PopupInstance = InstanceType<typeof _Popup>
export default PopupInstance
