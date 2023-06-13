import type { StyleValue } from 'vue';
import {
  createApp,
  defineComponent,
  Transition,
  onMounted,
  nextTick,
  computed,
  reactive,
  onUnmounted,
} from 'vue';
import { getComponentNamespace, getNamespace } from '../../../utils/global-config';
import LoadingIcon from '../../icon/src/base/loading.vue';
import { getElement, getScrollBarWidth, getStyle, setStyle } from '../../../utils/dom';
import usePopupManager from '../../../hooks/use-popup-manager';
import type { LoadingOptions } from './type';

const getResolveOptions = (options: LoadingOptions) => {
  const _options: LoadingOptions = {
    background: options.background,
    text: options.text || '',
    color: options.color,
    customClass: options.customClass,
    renderTo: options.renderTo || document.body,
    iconSize: options.iconSize || 16,
    fullScreen: options.fullScreen,
  };

  if (_options.fullScreen) {
    _options.renderTo = document.body;
  }

  return _options;
};

export const createLoadingComponent = (options: LoadingOptions) => {
  const resolveOptions = getResolveOptions(options);

  const mountEle = getElement(resolveOptions.renderTo);
  if (!mountEle) return;

  const data = reactive<Record<string, any>>({
    ...resolveOptions,
    visible: false,
  });

  const destroy = () => {
    resetMountElStyle();
    vm.$el?.parentNode.removeChild(vm.$el);
    app.unmount();
  };

  const LoadingComponent = defineComponent({
    name: getComponentNamespace('Loading'),
    setup() {
      const ns = getNamespace('loading');
      onMounted(() => {
        data.visible = true;
      });

      const { zIndex } = usePopupManager('message', { runOnMounted: true });

      onUnmounted(() => {
        data.visible = false;
      });
      const cls = computed(() => [`${ns}__mask`, data.customClass && data.customClass]);

      const style = computed(() => {
        const style: StyleValue = {
          color: data.color ? data.color : `var(--bn-primary)`,
          background: data.background,
          zIndex: zIndex.value,
          position: data.fullScreen ? 'fixed' : 'absolute',
        };
        return style;
      });

      return () => (
        <Transition name="bn-fade-in" onAfterLeave={destroy}>
          {data.visible && (
            <div class={cls.value} style={style.value}>
              <div class={[`${ns}__spinner`]}>
                <LoadingIcon size={data.iconSize} />
              </div>
              {data.text && <div class={[`${ns}__text`]}>{data.text}</div>}
            </div>
          )}
        </Transition>
      );
    },
  });

  const app = createApp(LoadingComponent);
  const vm = app.mount(document.createElement('div'));

  const cancelLoading = () => {
    data.visible = false;
  };


  const originStyle = {
    position: '',
    overflow: '',
    width: ''
  }

  const resetMountElStyle = () => {
    setStyle(mountEle, {
      overflow: originStyle.overflow,
      width: originStyle.width,
      // @ts-ignore
      position: originStyle.position
    });
  };

  const addMountElStyle = () => {
    const position = getStyle(mountEle, 'position');
    if (position === 'static') {
      setStyle(mountEle, { position: 'relative' });
    } else {
      originStyle.position = position;
    }

    const overflow = getStyle(mountEle, 'overflow');
    if (overflow !== 'visible') {
      originStyle.overflow = overflow;
    }

    setStyle(mountEle, { overflow: 'hidden', width: `calc(100% - ${getScrollBarWidth(mountEle)}px)` });
  };

  const appendLoading = () => {
    addMountElStyle();
    nextTick(() => {
      mountEle.appendChild(vm.$el);
    });
  };

  const updateText = (text: string) => {
    data.text = text;
  };

  return {
    cancelLoading,
    appendLoading,
    updateText,
  };
};
