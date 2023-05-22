import { withInstall } from '../../utils/vue-utils';
import _Tooltip from './src/tooltip.vue';

export const Tooltip = withInstall(_Tooltip);

export type TooltipInstance = InstanceType<typeof _Tooltip>;
export default Tooltip;