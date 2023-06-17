import type { Theme } from 'vitepress';

import message from '../components/message';

import { copyStr } from '../utils/helper'

import VApp, { globals , VNotFound} from '../components'

import BlocksNext, { Icon } from '@blocks-next/index';
import '@blocks-next/theme-default/index.scss';

import 'animate.css'

export default <Theme>{
  NotFound: VNotFound,
  Layout: VApp,
  enhanceApp({ app }) {
    // register global components
    app.use(BlocksNext);
    app.use(Icon)

    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })

    app.config.globalProperties.message = message
    app.config.globalProperties.copyStr = copyStr

  },
};
