import { withInstall } from '../../utils/vue-utils';
import _Scrollbar from './src/scrollbar.vue';

export const Scrollbar = withInstall(_Scrollbar);

export type ScrollbarInstance = InstanceType<typeof _Scrollbar>;

export default Scrollbar;
