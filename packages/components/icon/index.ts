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

const components = [EyeOpen, EyeClose, Plus, Minus, Search, Time, Loading, Caret];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(getComponentNamespace('Icon') + component.name, component);
  });
};

export default {
  install,
};
