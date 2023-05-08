import EyeOpen from './src/eye-open.vue'
import EyeClose from './src/eye-close.vue'
import Plus from './src/plus.vue'
import Search from './src/search.vue'
import Time from './src/time.vue'
import Minus from './src/minus.vue'

import type {App} from 'vue'
import { getComponentPrefix } from '../../utils/global-config'


const components = [
    EyeOpen,
    EyeClose,
    Plus,
    Minus,
    Search,
    Time,

]

const install = (app:App) => {
    const componentPrefix = getComponentPrefix()
    components.forEach(component => {
      app.component(componentPrefix + 'Icon' + component.name, component)
    })
}

export default {
    install
}

