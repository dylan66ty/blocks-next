import { withInstallFunction } from '../../utils/vue-utils';
import _Notification from './src/notification';

export const Notification = withInstallFunction(_Notification, '$notification')


export default Notification