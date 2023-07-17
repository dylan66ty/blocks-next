import type { App } from 'vue'
import BnIconCaretFill from './base/caret-fill.vue'
import BnIconCaret from './base/caret.vue'
import BnIconCheck from './base/check.vue'
import BnIconCloseFill from './base/close-fill.vue'
import BnIconClose from './base/close.vue'
import BnIconDelete from './base/delete.vue'
import BnIconEmpty from './base/empty.vue'
import BnIconError from './base/error.vue'
import BnIconEyeClose from './base/eye-close.vue'
import BnIconEyeOpen from './base/eye-open.vue'
import BnIconLoading from './base/loading.vue'
import BnIconMinus from './base/minus.vue'
import BnIconPlus from './base/plus.vue'
import BnIconPrompt from './base/prompt.vue'
import BnIconSearch from './base/search.vue'
import BnIconSetting from './base/setting.vue'
import BnIconSuccess from './base/success.vue'
import BnIconTime from './base/time.vue'
import BnIconWarning from './base/warning.vue'
import BnIconAppBi from './app/app-bi.vue'
import BnIconAppBuilding from './app/app-building.vue'
import BnIconAppCleat from './app/app-cleat.vue'
import BnIconAppCustomer from './app/app-customer.vue'
import BnIconAppHome from './app/app-home.vue'
import BnIconAppMarket from './app/app-market.vue'
import BnIconAppMoney from './app/app-money.vue'
import BnIconAppOa from './app/app-oa.vue'
import BnIconAppPie from './app/app-pie.vue'
import BnIconAppSem from './app/app-sem.vue'
import BnIconAppAddress from './ykc/app-address.vue'
import BnIconAppArrowUp from './ykc/app-arrow-up.vue'
import BnIconAppCallUp from './ykc/app-call-up.vue'
import BnIconAppCall from './ykc/app-call.vue'
import BnIconAppCopy from './ykc/app-copy.vue'
import BnIconAppDownload from './ykc/app-download.vue'
import BnIconAppEdit from './ykc/app-edit.vue'
import BnIconAppEnterprise from './ykc/app-enterprise.vue'
import BnIconAppExclamationPoint from './ykc/app-exclamation-point.vue'
import BnIconAppFax from './ykc/app-fax.vue'
import BnIconAppIphone from './ykc/app-iphone.vue'
import BnIconAppLetter from './ykc/app-letter.vue'
import BnIconAppLove2 from './ykc/app-love-2.vue'
import BnIconAppLove from './ykc/app-love.vue'
import BnIconAppMinus from './ykc/app-minus.vue'
import BnIconAppNewPage from './ykc/app-new-page.vue'
import BnIconAppOverview from './ykc/app-overview.vue'
import BnIconAppPc2 from './ykc/app-pc-2.vue'
import BnIconAppPc from './ykc/app-pc.vue'
import BnIconAppPlus from './ykc/app-plus.vue'
import BnIconAppQq from './ykc/app-qq.vue'
import BnIconAppQuery from './ykc/app-query.vue'
import BnIconAppQuestion from './ykc/app-question.vue'
import BnIconAppSearch2 from './ykc/app-search-2.vue'
import BnIconAppSearch from './ykc/app-search.vue'
import BnIconAppSetting from './ykc/app-setting.vue'
import BnIconAppTodo from './ykc/app-todo.vue'
import BnIconAppUploadImg from './ykc/app-upload-img.vue'
import BnIconAppWechat from './ykc/app-wechat.vue'

const components = [
  BnIconCaretFill,
  BnIconCaret,
  BnIconCheck,
  BnIconCloseFill,
  BnIconClose,
  BnIconDelete,
  BnIconEmpty,
  BnIconError,
  BnIconEyeClose,
  BnIconEyeOpen,
  BnIconLoading,
  BnIconMinus,
  BnIconPlus,
  BnIconPrompt,
  BnIconSearch,
  BnIconSetting,
  BnIconSuccess,
  BnIconTime,
  BnIconWarning,
  BnIconAppBi,
  BnIconAppBuilding,
  BnIconAppCleat,
  BnIconAppCustomer,
  BnIconAppHome,
  BnIconAppMarket,
  BnIconAppMoney,
  BnIconAppOa,
  BnIconAppPie,
  BnIconAppSem,
  BnIconAppAddress,
  BnIconAppArrowUp,
  BnIconAppCallUp,
  BnIconAppCall,
  BnIconAppCopy,
  BnIconAppDownload,
  BnIconAppEdit,
  BnIconAppEnterprise,
  BnIconAppExclamationPoint,
  BnIconAppFax,
  BnIconAppIphone,
  BnIconAppLetter,
  BnIconAppLove2,
  BnIconAppLove,
  BnIconAppMinus,
  BnIconAppNewPage,
  BnIconAppOverview,
  BnIconAppPc2,
  BnIconAppPc,
  BnIconAppPlus,
  BnIconAppQq,
  BnIconAppQuery,
  BnIconAppQuestion,
  BnIconAppSearch2,
  BnIconAppSearch,
  BnIconAppSetting,
  BnIconAppTodo,
  BnIconAppUploadImg,
  BnIconAppWechat
]

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

export default {
  install
}

export {
  BnIconCaretFill,
  BnIconCaret,
  BnIconCheck,
  BnIconCloseFill,
  BnIconClose,
  BnIconDelete,
  BnIconEmpty,
  BnIconError,
  BnIconEyeClose,
  BnIconEyeOpen,
  BnIconLoading,
  BnIconMinus,
  BnIconPlus,
  BnIconPrompt,
  BnIconSearch,
  BnIconSetting,
  BnIconSuccess,
  BnIconTime,
  BnIconWarning,
  BnIconAppBi,
  BnIconAppBuilding,
  BnIconAppCleat,
  BnIconAppCustomer,
  BnIconAppHome,
  BnIconAppMarket,
  BnIconAppMoney,
  BnIconAppOa,
  BnIconAppPie,
  BnIconAppSem,
  BnIconAppAddress,
  BnIconAppArrowUp,
  BnIconAppCallUp,
  BnIconAppCall,
  BnIconAppCopy,
  BnIconAppDownload,
  BnIconAppEdit,
  BnIconAppEnterprise,
  BnIconAppExclamationPoint,
  BnIconAppFax,
  BnIconAppIphone,
  BnIconAppLetter,
  BnIconAppLove2,
  BnIconAppLove,
  BnIconAppMinus,
  BnIconAppNewPage,
  BnIconAppOverview,
  BnIconAppPc2,
  BnIconAppPc,
  BnIconAppPlus,
  BnIconAppQq,
  BnIconAppQuery,
  BnIconAppQuestion,
  BnIconAppSearch2,
  BnIconAppSearch,
  BnIconAppSetting,
  BnIconAppTodo,
  BnIconAppUploadImg,
  BnIconAppWechat
}
