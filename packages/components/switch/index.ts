import { withInstall } from '../../utils/vue-utils';
import _Switch from './src/switch.vue';

export const Switch = withInstall(_Switch);
export type SwitchInstance = InstanceType<typeof _Switch>;
export default Switch;
