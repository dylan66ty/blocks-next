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
import BnIconAppBi from './menu/app-bi.vue'
import BnIconAppBuilding from './menu/app-building.vue'
import BnIconAppCleat from './menu/app-cleat.vue'
import BnIconAppCustomer from './menu/app-customer.vue'
import BnIconAppHome from './menu/app-home.vue'
import BnIconAppMarket from './menu/app-market.vue'
import BnIconAppMoney from './menu/app-money.vue'
import BnIconAppOa from './menu/app-oa.vue'
import BnIconAppPie from './menu/app-pie.vue'
import BnIconAppSem from './menu/app-sem.vue'

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
  BnIconAppSem
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
  BnIconAppSem
}
