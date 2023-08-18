<script lang="ts">
  import { getCurrentInstance, reactive, computed, defineComponent } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
  import { isArray, isFunction, isPromise } from '../../../utils/is'
  import { definePropType } from '../../../utils/vue-utils'

  // 方便添加动画
  import LoadingIcon from './LoadingIcon'

  export default defineComponent({
    name: getComponentNamespace('Button'),
    components: {
      LoadingIcon
    },
    props: {
      disabled: Boolean,
      block: Boolean,
      loading: Boolean,
      loadingFill: {
        type: Boolean,
        default: false
      },
      shape: {
        type: definePropType<'circle' | 'round'>(String),
        default: undefined
      },
      link: {
        type: Boolean,
        default: false
      },
      type: {
        type: definePropType<'primary' | 'success' | 'danger' | 'warning' | 'strong' | 'card'>(
          String
        ),
        default: undefined
      },
      plain: {
        type: Boolean,
        default: false
      },
      size: {
        type: definePropType<'mini' | 'small' | 'large' | 'normal'>(String),
        default: 'normal'
      },
      border: {
        type: Boolean,
        default: true
      }
    },
    emits: ['click'],
    setup(props) {
      const state = reactive({
        clicked: false
      })

      const ns = getNamespace('button')
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
          isLoading.value && `is-loading`
        ]

        return _cls
      })

      const isLoading = computed(() => {
        return props.loading || state.clicked
      })

      const instance = getCurrentInstance()

      const execFn = (fn: Function, event: PointerEvent) => {
        const ret = fn(event)
        if (isPromise(ret)) {
          state.clicked = true
          ret.finally(() => {
            state.clicked = false
          })
        }
      }

      const handleClick = async (event: PointerEvent) => {
        if (isLoading.value) return
        const clickFn = instance?.vnode?.props?.onClick
        // 外部注入事件，此时按钮又绑定事件。那么这里就是一个数组。
        if (isArray(clickFn)) {
          clickFn.forEach((fn) => execFn(fn, event))
        } else if (isFunction(clickFn)) {
          execFn(clickFn, event)
        }
      }
      return {
        ns,
        cls,
        handleClick,
        isLoading
      }
    }
  })
</script>

<template>
  <button :class="cls" type="button" :disabled="disabled" :hover="!disabled" @click="handleClick">
    <slot></slot>
    <LoadingIcon :loading="isLoading" :ns="ns" />
  </button>
</template>
