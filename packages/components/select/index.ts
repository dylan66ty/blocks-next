import { withInstall } from '../../utils/vue-utils';
import _Select from './src/select.vue';
import _Option from './src/option.vue';

export const Select = withInstall(_Select, {
  Option: _Option,
});
export type SelectInstance = InstanceType<typeof _Select>;
export type OptionInstance = InstanceType<typeof _Option>;
export default Select;
