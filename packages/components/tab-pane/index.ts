import { withInstall } from '../../utils/vue-utils'
import _TabPane from '../tabs/src/tab-pane.vue'

export const TabPane = withInstall(_TabPane)
export type TabPaneInstance = InstanceType<typeof _TabPane>
export default TabPane
