import { withInstall } from '../../utils/vue-utils'
import _Popconfirm from './src/popconfirm'

export const Popconfirm = withInstall(_Popconfirm)

export type PopconfirmInstance = InstanceType<typeof _Popconfirm>
export default PopconfirmInstance
