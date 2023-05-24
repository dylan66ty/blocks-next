import { withInstall } from '../../utils/vue-utils';
import _Tooltip from './src/tooltip';

export const Tooltip = withInstall(_Tooltip);

export type TooltipInstance = InstanceType<typeof _Tooltip>;
export default Tooltip;