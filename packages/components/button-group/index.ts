import _ButtonGroup from '../button/src/button-group.vue';
import { withInstall } from '../../utils/vue-utils';

export const ButtonGroup = withInstall(_ButtonGroup);

export type ButtonGroupInstance = InstanceType<typeof _ButtonGroup>;
export default ButtonGroup;
