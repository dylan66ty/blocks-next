import { withInstall } from '../../utils/vue-utils'
import _Table from './src/table'

export const Table = withInstall(_Table)
export type TableInstance = InstanceType<typeof _Table>
export * from './src/types'
export default Table
