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
import { Option } from './components/select-option'
import { Scrollbar } from './components/scrollbar';
import { Pagination } from './components/pagination';
import { Dialog } from './components/dialog';
import { Tooltip } from './components/tooltip'
import { Drawer } from './components/drawer'

// plugin 
import { Message } from './components/message'
import { MessageBox } from './components/message-box'
import { Notification } from './components/notification'

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
  Option,
  Scrollbar,
  Pagination,
  Dialog,
  Tooltip,
  Drawer
] as Plugin[];

const plugins = [
  Message,
  MessageBox,
  Notification
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
