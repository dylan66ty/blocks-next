import { withInstall } from '../../utils/vue-utils';
import _Empty from './src/empty.vue';

export const Empty = withInstall(_Empty);
export type EmptyInstance = InstanceType<typeof _Empty>;
export default Empty;
