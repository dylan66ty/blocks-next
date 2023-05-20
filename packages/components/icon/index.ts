import type { App } from 'vue';
import { getComponentNamespace } from '../../utils/global-config';
import EyeOpen from './src/eye-open.vue';
import EyeClose from './src/eye-close.vue';
import Plus from './src/plus.vue';
import Search from './src/search.vue';
import Time from './src/time.vue';
import Minus from './src/minus.vue';
import Loading from './src/loading.vue';
import Caret from './src/caret.vue';
import Prompt from './src/prompt.vue';
import Close from './src/close.vue';
import Warning from './src/warning.vue';
import Info from './src/info.vue';
import Success from './src/success.vue';
import Error from './src/error.vue'


const components = [EyeOpen, EyeClose, Plus, Minus, Search, Time, Loading, Caret,Prompt,Close,Warning,Info,Success,Error];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(getComponentNamespace('Icon') + component.name, component);
  });
};

export default {
  install,
};
