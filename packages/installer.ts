import type { App, Plugin } from 'vue';
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
import { Pagination } from './components/pagination'

// plugin 
import { Message } from './components/message'

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
  Pagination
] as Plugin[];

const plugins = [
  Message
]

export const install = function (app:App) {
  // 组件注册
  components.forEach((component) => app.use(component));
  // 插件注册
  plugins.forEach(plugin => app.use(plugin));
};

export default {
  install,
};
