import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';

import Demo from '../components/v-demo.vue';
import message from '../components/message';
import { copyStr } from '../utils/helper'
import '../styles/app.scss';

import BlocksNext, { Icon } from '@blocks-next/index';
import '@blocks-next/theme-default/index.scss';


export default <Theme>{
  ...DefaultTheme,
  enhanceApp({ app }) {
    // register global components
    app.use(BlocksNext);
    app.use(Icon)
    app.component('Demo', Demo);
    
    app.config.globalProperties.message = message
    app.config.globalProperties.copyStr = copyStr
    
  },
};
