import type { App } from 'vue'
import BnIconArrowDown from './base/arrow-down.vue'
import BnIconArrowLeft from './base/arrow-left.vue'
import BnIconArrowRight from './base/arrow-right.vue'
import BnIconArrowUp from './base/arrow-up.vue'
import BnIconCalendar from './base/calendar.vue'
import BnIconCaretFill from './base/caret-fill.vue'
import BnIconCaret from './base/caret.vue'
import BnIconCheckFill from './base/check-fill.vue'
import BnIconCheck from './base/check.vue'
import BnIconClock from './base/clock.vue'
import BnIconCloseFill from './base/close-fill.vue'
import BnIconClose from './base/close.vue'
import BnIconDelete from './base/delete.vue'
import BnIconDocument from './base/document.vue'
import BnIconEmpty from './base/empty.vue'
import BnIconFolderOpen from './base/folder-open.vue'
import BnIconFolder from './base/folder.vue'
import BnIconHide from './base/hide.vue'
import BnIconLoading from './base/loading.vue'
import BnIconMinus from './base/minus.vue'
import BnIconMoreFill from './base/more-fill.vue'
import BnIconPlus from './base/plus.vue'
import BnIconPrompt from './base/prompt.vue'
import BnIconSearch from './base/search.vue'
import BnIconSetting from './base/setting.vue'
import BnIconSuperArrowLeft from './base/super-arrow-left.vue'
import BnIconSuperArrowRight from './base/super-arrow-right.vue'
import BnIconView from './base/view.vue'
import BnIconWarningFill from './base/warning-fill.vue'
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
import BnIconAppAddress from './bus/app-address.vue'
import BnIconAppArrowUp from './bus/app-arrow-up.vue'
import BnIconAppCallUp from './bus/app-call-up.vue'
import BnIconAppCall from './bus/app-call.vue'
import BnIconAppCopy from './bus/app-copy.vue'
import BnIconAppDownload from './bus/app-download.vue'
import BnIconAppDrag from './bus/app-drag.vue'
import BnIconAppEdit from './bus/app-edit.vue'
import BnIconAppEnterprise from './bus/app-enterprise.vue'
import BnIconAppExclamationPoint from './bus/app-exclamation-point.vue'
import BnIconAppFax from './bus/app-fax.vue'
import BnIconAppIphone from './bus/app-iphone.vue'
import BnIconAppLetter from './bus/app-letter.vue'
import BnIconAppLove2 from './bus/app-love-2.vue'
import BnIconAppLove from './bus/app-love.vue'
import BnIconAppMinus from './bus/app-minus.vue'
import BnIconAppNewPage from './bus/app-new-page.vue'
import BnIconAppOaBirthday from './bus/app-oa-birthday.vue'
import BnIconAppOaCircle from './bus/app-oa-circle.vue'
import BnIconAppOaLocation from './bus/app-oa-location.vue'
import BnIconAppOaSend from './bus/app-oa-send.vue'
import BnIconAppOaTelephone from './bus/app-oa-telephone.vue'
import BnIconAppOverview from './bus/app-overview.vue'
import BnIconAppPc2 from './bus/app-pc-2.vue'
import BnIconAppPc from './bus/app-pc.vue'
import BnIconAppPlus from './bus/app-plus.vue'
import BnIconAppQq from './bus/app-qq.vue'
import BnIconAppQuery from './bus/app-query.vue'
import BnIconAppQuestion from './bus/app-question.vue'
import BnIconAppSearch2 from './bus/app-search-2.vue'
import BnIconAppSearch from './bus/app-search.vue'
import BnIconAppSetting from './bus/app-setting.vue'
import BnIconAppTodo from './bus/app-todo.vue'
import BnIconAppWechat from './bus/app-wechat.vue'

const components = [
  BnIconArrowDown,
  BnIconArrowLeft,
  BnIconArrowRight,
  BnIconArrowUp,
  BnIconCalendar,
  BnIconCaretFill,
  BnIconCaret,
  BnIconCheckFill,
  BnIconCheck,
  BnIconClock,
  BnIconCloseFill,
  BnIconClose,
  BnIconDelete,
  BnIconDocument,
  BnIconEmpty,
  BnIconFolderOpen,
  BnIconFolder,
  BnIconHide,
  BnIconLoading,
  BnIconMinus,
  BnIconMoreFill,
  BnIconPlus,
  BnIconPrompt,
  BnIconSearch,
  BnIconSetting,
  BnIconSuperArrowLeft,
  BnIconSuperArrowRight,
  BnIconView,
  BnIconWarningFill,
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
  BnIconAppDrag,
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
  BnIconAppOaBirthday,
  BnIconAppOaCircle,
  BnIconAppOaLocation,
  BnIconAppOaSend,
  BnIconAppOaTelephone,
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
  BnIconArrowDown,
  BnIconArrowLeft,
  BnIconArrowRight,
  BnIconArrowUp,
  BnIconCalendar,
  BnIconCaretFill,
  BnIconCaret,
  BnIconCheckFill,
  BnIconCheck,
  BnIconClock,
  BnIconCloseFill,
  BnIconClose,
  BnIconDelete,
  BnIconDocument,
  BnIconEmpty,
  BnIconFolderOpen,
  BnIconFolder,
  BnIconHide,
  BnIconLoading,
  BnIconMinus,
  BnIconMoreFill,
  BnIconPlus,
  BnIconPrompt,
  BnIconSearch,
  BnIconSetting,
  BnIconSuperArrowLeft,
  BnIconSuperArrowRight,
  BnIconView,
  BnIconWarningFill,
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
  BnIconAppDrag,
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
  BnIconAppOaBirthday,
  BnIconAppOaCircle,
  BnIconAppOaLocation,
  BnIconAppOaSend,
  BnIconAppOaTelephone,
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
  BnIconAppWechat
}
