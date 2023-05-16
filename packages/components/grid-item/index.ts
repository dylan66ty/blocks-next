import _GridItem from '../grid/src/grid-item.vue';
import { withInstall } from '../../utils/vue-utils';

export const GridItem = withInstall(_GridItem);
export type GridItemInstance = InstanceType<typeof _GridItem>;
export default GridItem;
