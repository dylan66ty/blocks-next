import { withInstall  } from '../../utils/vue-utils';
import _Select from './src/select.vue';

export const Select = withInstall(_Select);
export type SelectInstance = InstanceType<typeof _Select>;
export default Select;
