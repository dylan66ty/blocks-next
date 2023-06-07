import { withInstall } from '../../utils/vue-utils';
import _Tabs from './src/tabs';

export const Tabs = withInstall(_Tabs);
export type TabsInstance = InstanceType<typeof _Tabs>;
export default Tabs;