import { withInstallFunction } from '../../utils/vue-utils'
import _MessageBox from './src/message-box'

export const MessageBox = withInstallFunction(_MessageBox, '$messageBox')

export default MessageBox
