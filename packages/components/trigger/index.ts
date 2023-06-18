import { withInstall } from '../../utils/vue-utils'
import _Trigger from './src/trigger'

export const Trigger = withInstall(_Trigger)
export type TriggerInstance = InstanceType<typeof _Trigger>
export default Trigger
