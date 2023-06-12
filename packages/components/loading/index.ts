import type { App } from 'vue';
import { vLoading } from './src/directive';
import { open } from './src/open';

export const Loading = {
  install(app: App) {
    app.directive('bn-loading', vLoading);
  },
  open,
};
