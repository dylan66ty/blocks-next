import { withInstall } from '../../utils/vue-utils'
import _Badge from './src/badge.vue'

export const Badge = withInstall(_Badge)
export type BadgeInstance = InstanceType<typeof _Badge>
export default Badge
