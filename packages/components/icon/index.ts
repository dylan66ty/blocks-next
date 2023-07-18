import type { App } from 'vue'
import BnIconCaretFill from './base/caret-fill.vue'
import BnIconCaret from './base/caret.vue'
import BnIconCheckFill from './base/check-fill.vue'
import BnIconCheck from './base/check.vue'
import BnIconClock from './base/clock.vue'
import BnIconCloseFill from './base/close-fill.vue'
import BnIconClose from './base/close.vue'
import BnIconDelete from './base/delete.vue'
import BnIconEmpty from './base/empty.vue'
import BnIconHide from './base/hide.vue'
import BnIconLoading from './base/loading.vue'
import BnIconMinus from './base/minus.vue'
import BnIconMoreFill from './base/more-fill.vue'
import BnIconPlus from './base/plus.vue'
import BnIconPrompt from './base/prompt.vue'
import BnIconSearch from './base/search.vue'
import BnIconSetting from './base/setting.vue'
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

const components = [
  BnIconCaretFill,
  BnIconCaret,
  BnIconCheckFill,
  BnIconCheck,
  BnIconClock,
  BnIconCloseFill,
  BnIconClose,
  BnIconDelete,
  BnIconEmpty,
  BnIconHide,
  BnIconLoading,
  BnIconMinus,
  BnIconMoreFill,
  BnIconPlus,
  BnIconPrompt,
  BnIconSearch,
  BnIconSetting,
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
  BnIconCheckFill,
  BnIconCheck,
  BnIconClock,
  BnIconCloseFill,
  BnIconClose,
  BnIconDelete,
  BnIconEmpty,
  BnIconHide,
  BnIconLoading,
  BnIconMinus,
  BnIconMoreFill,
  BnIconPlus,
  BnIconPrompt,
  BnIconSearch,
  BnIconSetting,
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
  BnIconAppSem
}
