import { createApp } from 'vue';
import BlocksNext, {Icon} from '@blocks-next/index';
import '@blocks-next/theme-default/index.scss';

import App from './App.vue';

const app = createApp(App);


app.use(BlocksNext);
app.use(Icon)



app.mount('#app');
