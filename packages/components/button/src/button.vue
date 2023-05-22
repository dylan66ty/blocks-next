<script lang="ts">
  import type { PropType } from 'vue';
  import { reactive, computed, defineComponent } from 'vue';
  import { debounce } from '../../../utils/throttle-debounce';
  import { getComponentNamespace } from '../../../utils/global-config';

  import Search from '../../icon/src/base/search.vue'
  import Plus from '../../icon/src/base/plus.vue'
  

  import type { IThemeType } from './types';

  export default defineComponent({
    name: getComponentNamespace('Button'),
    components: {},
    props: {
      disabled: Boolean,
      block: Boolean,
      loading: Boolean,
      loadingFill: {
        type: Boolean,
        default: false,
      },
      dropdown: String as PropType<'up' | 'down'>,
      shape: String as PropType<'circle' | 'square' | 'round'>,
      radius: { type: Boolean, default: true },
      hover: { type: Boolean, default: true },
      type: { type: String as PropType<IThemeType | 'mode' | string>, default: 'normal' },
      fillMode: {
        type: String as PropType<'outline' | 'reverse' | 'none' | 'normal'>,
        default: 'normal',
      },
      size: { type: String as PropType<'mini' | 'small' | 'large' | 'normal'>, default: 'normal' },
      delay: {
        type: [Number, String] as PropType<number | string>,
        default: 0,
      },
      leftIcon: String as PropType<'add' | 'delete' | 'search'>,
      rightIcon: String as PropType<'add' | 'delete' | 'search'>,
      await: Function,
    },
    emits: ['click'],
    setup(props, { emit }) {
      const state = reactive({
        clicked: false,
      });

      const cns = computed(() => {
        return {
          'bn-btn': true,
          'bn-btn-hover': props.hover && !props.disabled,
          'bn-btn-radius': props.radius,

          'bn-btn-primary': props.type == 'primary',
          'bn-btn-success': props.type == 'success',
          'bn-btn-danger': props.type == 'danger',
          'bn-btn-warning': props.type == 'warning',
          'bn-btn-strong': props.type == 'strong',
          'bn-btn-mode': props.type == 'mode',
          'bn-btn-info': props.type == 'info',
          'bn-btn-normal': props.type == 'normal' || !props.type,

          'bn-btn-outline': props.fillMode == 'outline',
          'bn-btn-none': props.fillMode == 'none',
          'bn-btn-reverse': props.fillMode == 'reverse',

          'bn-btn-mini': props.size == 'mini',
          'bn-btn-small': props.size == 'small',
          'bn-btn-large': props.size == 'large',

          'bn-btn-loading': props.loading,
          'bn-btn-loading-mode-fill': props.loadingFill,
          'bn-btn-loading-fill': isLoading.value && props.loadingFill,
          'bn-btn-block': props.block,

          'bn-btn-circle': props.shape == 'circle',
          'bn-btn-square': props.shape == 'square',
          'bn-btn-round': props.shape == 'round',

          'bn-btn-flex': !!props.dropdown,
        };
      });
      const isLoading = computed(() => {
        return props.loading || state.clicked;
      });

      const handleClick = async (event: unknown) => {
        // 当前正在加载中
        if (isLoading.value || props.disabled) {
          return;
        }
        if (typeof props.await === 'function') {
          // 执行Async/Promise Func
          state.clicked = true;
          const send = props.await();
          if (
            Object.prototype.toString.call(send) === '[object Promise]' ||
            Object.prototype.toString.call(send) === '[object AsyncFunction]'
          ) {
            send.finally(() => {
              state.clicked = false;
            });
          } else {
            state.clicked = false;
          }
          return emit('click', event);
        }
        if (props.delay === 0) return emit('click', event);

        state.clicked = true;
        // 执行节流
        const callback = await debounce(() => {
          state.clicked = false;
          emit('click', event);
        }, +props.delay);

        callback();
      };
      function selectIcon(name: string) {
        if (name === 'add') {
          return Plus;
        }
        if (name === 'search') {
          return Search;
        }
        return '';
      }
      const rightIconComponent = computed(() => {
        return selectIcon(props.rightIcon as string);
      });

      const leftIconComponent = computed(() => {
        return selectIcon(props.leftIcon as string);
      });

      return {
        cns,
        handleClick,
        leftIconComponent,
        rightIconComponent,
        isLoading,
      };
    },
  });
</script>

<template>
  <button :class="cns" :disabled="disabled" :hover="!disabled" @click.stop.prevent="handleClick">
    <template v-if="leftIcon">
      <component :is="leftIconComponent"></component>
    </template>
    <span v-if="$slots.default" class="bn-btn-slot">
      <slot></slot>
    </span>
    <!-- <caret v-if="dropdown" :direction="dropdown" stroke="currentColor" /> -->
    <template v-if="rightIcon">
      <component :is="rightIconComponent"></component>
    </template>
    <svg viewBox="0 0 50 50" class="loading-svg" :class="isLoading ? 'show' : ''">
      <circle cx="25" cy="25" r="20" fill="none" class="path" max="100"></circle>
    </svg>
  </button>
</template>
