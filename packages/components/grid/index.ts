import { withInstall } from '../../utils/vue-utils';
import _Grid from './src/grid.vue';

export const Grid = withInstall(_Grid);
export type GridInstance = InstanceType<typeof _Grid>;
export default Grid;
