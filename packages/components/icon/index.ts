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
import BnIconEmpty from './base/empty.vue'
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
  BnIconEmpty,
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
  BnIconEmpty,
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
  BnIconAppSem
}
