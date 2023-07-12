import { withInstall } from '../../utils/vue-utils'
import _DescriptionsItem from '../descriptions/src/descriptions-item'

export const DescriptionsItem = withInstall(_DescriptionsItem)
export type DescriptionItemsInstance = InstanceType<typeof _DescriptionsItem>
export default DescriptionsItem
