import { withInstall } from '../../utils/vue-utils';
import _Progress from './src/progress';

export const Progress = withInstall(_Progress);
export type ProgressInstance = InstanceType<typeof _Progress>;
export default Progress;