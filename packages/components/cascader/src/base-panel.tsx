import { PropType, defineComponent } from 'vue'
import { getNamespace } from '../../../utils/global-config'
import BnSpace from '../../space/src/space.vue'
import BnButton from '../../button/src/button.vue'
import { CascaderNode } from './type'
import BnScrollbar from '../../scrollbar/src/scrollbar.vue'


export default defineComponent({
  name: 'CascaderPanel',
  props: {
    renderColumns: Array as PropType<CascaderNode[][]>,
    showFooter: Boolean
  },
  setup(props) {
    const ns = getNamespace('cascader-panel')


    const renderColumn = (column: CascaderNode[], level: number) => {
      return (<div class={[`${ns}__column`]}>
        <BnScrollbar>
          {
            column.length === 0 ? 'empty' : (
              <ul class={[`${ns}__list`]} role="menu">


              </ul>
            )

          }

        </BnScrollbar>
      </div>)
    }

    const renderContent = () => {
      return (
        <>
          {
            props.renderColumns!.map((column, level) => renderColumn(column, level))
          }
        </>
      )
    }

    const renderFooter = () => {
      return (
        <BnSpace>
          <BnButton size="small">取消</BnButton>
          <BnButton type="primary" size="small">确定</BnButton>
        </BnSpace>
      )
    }

    return () => {
      return (<div class={[`${ns}`]}>
        <div class={[`${ns}__content`]}>
          {renderContent()}
        </div>
        {
          props.showFooter && (<div class={[`${ns}__footer`]}>
            {renderFooter()}
          </div>)
        }
      </div>)
    }
  }

})