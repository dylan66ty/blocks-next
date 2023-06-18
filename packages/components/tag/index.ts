import { withInstall } from '../../utils/vue-utils'
import _Tag from './src/tag.vue'

export const Tag = withInstall(_Tag)
export type TagInstance = InstanceType<typeof _Tag>
export default Tag
