import { computed, defineComponent, ref, inject } from 'vue'
import type { PropType, VNode, VNodeChild } from 'vue'
import { getNamespace } from '../../../utils/global-config'
import { BnIconLoading, BnIconCaret } from '../../icon'
import Checkbox from '../../checkbox/src/checkbox.vue'

import { isFunction } from '../../../utils/is'
import { type CascaderContext, cascaderInjectionKey } from './context'

import { getCheckedStatus } from './utils'
import type { CascaderNode } from './type'

export default defineComponent({
  name: 'CascaderOption',
  props: {
    node: {
      type: Object as PropType<CascaderNode>,
      required: true
    },
    active: Boolean,
    multiple: Boolean,
    checkStrictly: Boolean
  },
  setup(props) {
    const ns = getNamespace('cascader-panel')

    const cls = computed(() => [
      `${ns}__option`,
      props.active && 'is-active',
      props.node.disabled && 'is-disabled'
    ])
    const cascaderContext = inject<Partial<CascaderContext>>(cascaderInjectionKey, {})

    const isLoading = ref(false)

    const events = computed(() => {
      const _events: Record<string, any> = {}
      if (!props.node.disabled) {
        _events.onMouseenter = []
        _events.onMouseleave = []
        _events.onClick = []

        _events.onMouseenter.push(() => {
          cascaderContext.setSelectedPath?.(props.node.key)
        })

        if (!props.multiple) {
          if (!props.checkStrictly && props.node.isLeaf) {
            _events.onClick.push(() => {
              cascaderContext.emitPath?.(props.node)
            })
          }
          if (props.checkStrictly) {
            _events.onClick.push(() => {
              cascaderContext.emitPath?.(props.node)
            })
          }
        }

        if (props.multiple) {
          _events.onClick.push(() => {
            cascaderContext.emitPath?.(props.node, !checkedStatus.value.checked)
          })
        }
      }
      return _events
    })

    const handleCheckedChange = () => {
      cascaderContext.emitPath?.(props.node, !checkedStatus.value.checked)
    }

    const renderContent = () => {
      let render: VNodeChild | VNode | string | undefined = props.node.label

      if (isFunction(props.node.render)) {
        render = props.node.render()
      }

      const defaultSlot = cascaderContext?.slots?.['default']
      if (isFunction(defaultSlot)) {
        render = defaultSlot({ node: props.node, data: props.node.raw })
      }

      return <span>{render}</span>
    }

    const renderContentRightIcon = () => {
      if (isLoading.value) {
        return <BnIconLoading />
      }
      if (!props.node.isLeaf) {
        return <BnIconCaret rotate={-90} />
      }
      return null
    }

    const checkedStatus = computed(() => {
      if (props.checkStrictly) {
        return {
          checked: cascaderContext.nodeKeys?.includes(props.node.key),
          indeterminate: false
        }
      }
      return getCheckedStatus(props.node, cascaderContext.nodeKeys)
    })

    const renderOps = () => {
      if (props.multiple) {
        return (
          <Checkbox
            modelValue={checkedStatus.value.checked}
            indeterminate={checkedStatus.value.indeterminate}
            disabled={props.node.disabled}
            validateEvent={false}
            onChange={handleCheckedChange}
            // @ts-ignore: click
            onClick={(ev: Event) => ev.stopPropagation()}
          />
        )
      }
    }

    return () => {
      return (
        <li class={cls.value} {...events.value}>
          {renderOps()}

          <div class={[`${ns}__option-label`]}>
            {renderContent()}
            {renderContentRightIcon()}
          </div>
        </li>
      )
    }
  }
})
