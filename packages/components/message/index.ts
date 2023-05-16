import { withInstallFunction } from '../../utils/vue-utils';
import _Message from './src/message';

export const Message = withInstallFunction(_Message, '$message')

export * from './src/types'

export default Message

