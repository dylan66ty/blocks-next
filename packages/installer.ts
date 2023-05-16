import type { App, Plugin } from 'vue';
import { COMPONENT_INSTALLED_KEY } from './utils/global-config';

import { Button } from './components/button';
import { ButtonGroup } from './components/button-group';
import { Checkbox } from './components/checkbox';
import { CheckboxGroup } from './components/checkbox-group';
import { Radio } from './components/radio';
import { RadioGroup } from './components/radio-group';
import { Input } from './components/input';
import { Space } from './components/space';
import { Switch } from './components/switch';
import { Form } from './components/form';
import { FormItem } from './components/form-item';
import { Trigger } from './components/trigger';
import { Select } from './components/select';
import { Scrollbar } from './components/scrollbar';

const components = [
  Button,
  ButtonGroup,
  Space,
  Input,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Switch,
  Form,
  FormItem,
  Trigger,
  Select,
  Scrollbar,
] as Plugin[];

export type IApp = App & { [COMPONENT_INSTALLED_KEY]: boolean };

export const install = function (app: IApp) {
  if (app[COMPONENT_INSTALLED_KEY]) return;
  app[COMPONENT_INSTALLED_KEY] = true;
  components.forEach((component) => app.use(component));
};

export default {
  install,
};
