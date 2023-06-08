<script lang="ts">
  import type { PropType } from 'vue';
  import { getCurrentInstance, reactive, computed, defineComponent } from 'vue';
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config';
  import Loading from '../../icon/src/base/loading.vue';
  import { isFunction, isPromise } from '../../../utils/is';

  export default defineComponent({
    name: getComponentNamespace('Button'),
    components: {
      Loading,
    },
    props: {
      disabled: Boolean,
      block: Boolean,
      loading: Boolean,
      loadingFill: {
        type: Boolean,
        default: false,
      },
      shape: {
        type: String as PropType<'circle' | 'round'>,
        default: undefined,
      },
      link: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String as PropType<'primary' | 'success' | 'danger' | 'warning' | 'strong' | 'card'>,
        default: undefined,
      },
      plain: {
        type: Boolean,
        default: false,
      },
      size: {
        type: String as PropType<'mini' | 'small' | 'large' | 'normal'>,
        default: 'normal',
      },
      border: {
        type: Boolean,
        default: true,
      },
    },
    emits: ['click'],
    setup(props) {
      const state = reactive({
        clicked: false,
      });

      const ns = getNamespace('button');
      const cls = computed(() => {
        const _cls = [
          ns,
          props.type && `${ns}--${props.type}`,
          props.disabled && `is-disabled`,
          props.block && `is-block`,
          props.plain && 'is-plain',
          props.shape && `is-${props.shape}`,
          props.link && `is-link`,
          props.size && `is-${props.size}`,
          !props.border && `is-hide-border`,
          isLoading.value && `is-loading`,
        ];

        return _cls;
      });

      const isLoading = computed(() => {
        return props.loading || state.clicked;
      });

      const instance = getCurrentInstance();

      const handleClick = async (event: Event) => {
        if (isLoading.value) return;
        const externalClickFn = instance?.vnode?.props?.onClick;
        if (isFunction(externalClickFn)) {
          const ret = externalClickFn(event);
          if (isPromise(ret)) {
            state.clicked = true;
            ret.finally(() => {
              state.clicked = false;
            });
          }
        }
      };
      return {
        ns,
        cls,
        handleClick,
        isLoading,
      };
    },
  });
</script>

<template>
  <button
    :class="cls"
    type="button"
    :disabled="disabled"
    :hover="!disabled"
    @click.stop.prevent="handleClick"
  >
    <span>
      <slot></slot>
    </span>
    <span
      v-if="isLoading"
      :class="[
        `${ns}__loading`,
        {
          'is-fill': loadingFill,
        },
      ]"
    >
      <Loading />
    </span>
  </button>
</template>
