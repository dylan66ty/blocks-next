import { withInstall } from '../../utils/vue-utils'
import _Tree from './src/tree'

export const Tree = withInstall(_Tree)
export type TreeInstance = InstanceType<typeof _Tree>
export * from './src/type'
export default Tree
