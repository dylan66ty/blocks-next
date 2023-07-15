import type { PropType } from 'vue'
import { defineComponent, TransitionGroup, inject } from 'vue'
import { getNamespace } from '../../../utils/global-config'
import BnSpace from '../../space/src/space.vue'
import BnButton from '../../button/src/button.vue'

import { Scrollbar } from '../../scrollbar'
import { Empty } from '../../empty'
import EmptyIcon from '../../icon/src/base/empty.vue'
import Option from './option'
import type { CascaderNode } from './type'

import type { CascaderContext } from './context'
import { cascaderInjectionKey } from './context'

export default defineComponent({
  name: 'CascaderPanel',
  props: {
    renderColumns: {
      type: Array as PropType<CascaderNode[][]>,
      required: true
    },
    selectedPath: {
      type: Array as PropType<string[]>,
      required: true
    },
    activeKey: {
      type: String,
      default: ''
    },
    totalLevel: {
      type: Number,
      required: true
    },
    multiple: Boolean,
    checkStrictly: Boolean,
    loading: Boolean,
    showFooter: Boolean
  },
  setup(props) {
    const ns = getNamespace('cascader-panel')

    const cascaderContext = inject<Partial<CascaderContext>>(cascaderInjectionKey, {})

    const renderColumn = (column: CascaderNode[], level: number) => {
      return (
        <div
          class={[`${ns}__column`]}
          key={`column-${level}`}
          style={{ zIndex: props.totalLevel - level }}
        >
          <Scrollbar>
            {column.length === 0 ? (
              <div class={[`${ns}__empty`]}>
                <Empty
                  v-slots={{
                    image: () => <EmptyIcon size={40} />
                  }}
                />
              </div>
            ) : (
              <ul class={[`${ns}__list`]} role="menu">
                {column.map((node) => (
                  <Option
                    key={node.key}
                    node={node}
                    active={props.selectedPath.includes(node.key) || node.key === props.activeKey}
                    multiple={props.multiple}
                    checkStrictly={props.checkStrictly}
                  />
                ))}
              </ul>
            )}
          </Scrollbar>
        </div>
      )
    }

    const renderContent = () => {
      return (
        <TransitionGroup name="cascader-slide">
          {props.renderColumns!.map((column, level) => renderColumn(column, level))}
        </TransitionGroup>
      )
    }

    const renderFooter = () => {
      if (cascaderContext?.slots?.footer) {
        return cascaderContext?.slots?.footer({
          ok: cascaderContext.footer?.handleOk,
          cancel: cascaderContext.footer?.handleCancel
        })
      }

      return (
        <BnSpace>
          <BnButton size="small" onClick={cascaderContext.footer?.handleCancel}>
            取消
          </BnButton>
          <BnButton type="primary" size="small" onClick={cascaderContext.footer?.handleOk}>
            确定
          </BnButton>
        </BnSpace>
      )
    }

    return () => {
      return (
        <div class={[`${ns}`]}>
          <div class={[`${ns}__content`]}>{renderContent()}</div>
          {props.showFooter && props.multiple && (
            <div class={[`${ns}__footer`]}>{renderFooter()}</div>
          )}
        </div>
      )
    }
  }
})
