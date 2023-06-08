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
import { Tooltip } from './components/tooltip';
import { Drawer } from './components/drawer';
import { Table } from './components/table';
import { Empty } from './components/empty';
import { Tabs } from './components/tabs';
import { TabPane } from './components/tab-pane';
import { Popconfirm } from './components/popconfirm';
import {Loading} from './components/loading';
import { Progress } from './components/progress'


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
  Drawer,
  Table,
  Empty,
  Tabs,
  TabPane,
  Popconfirm,
  Progress
] as Plugin[];

const plugins = [
  Message,
  MessageBox,
  Notification,
  Loading
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
