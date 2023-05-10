import type { App, Plugin } from 'vue';

import { 
  Button, 
  ButtonGroup,
  Space,
  Input,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup
} from './components'


const components = [
  Button,
  ButtonGroup,
  Space,
  Input,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup
] as Plugin[];

export const install = function (app: App) {
  components.forEach((component) => app.use(component));
};

export default {
  install
};
