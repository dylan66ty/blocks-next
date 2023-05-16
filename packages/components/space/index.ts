import { withInstall } from '../../utils/vue-utils';
import _Space from './src/space.vue';

export const Space = withInstall(_Space);

export type SpaceInstance = InstanceType<typeof _Space>;
export default Space;
