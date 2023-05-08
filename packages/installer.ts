import type { App, Plugin } from 'vue';

import { 
  Button, 
  ButtonGroup,
  Space
} from './components'


const components = [
  Button,
  ButtonGroup,
  Space
] as Plugin[];

export const install = function (app: App) {
  components.forEach((component) => app.use(component));
};

export default {
  install
};
