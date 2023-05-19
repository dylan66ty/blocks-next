import { withInstall } from '../../utils/vue-utils';
import _Dialog from './src/dialog.vue';

export const Dialog = withInstall(_Dialog);
export type DialogInstance = InstanceType<typeof _Dialog>;
export default Dialog;