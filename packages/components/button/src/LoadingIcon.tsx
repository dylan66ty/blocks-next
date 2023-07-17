import { defineComponent, nextTick, Transition } from 'vue'
import { BnIconLoading } from '../../icon'

const getCollapsedWidth = (node: HTMLSpanElement) => {
  if (node) {
    node.style.width = '0px'
    node.style.opacity = '0'
    node.style.transform = 'scale(0)'
  }
}
const getRealWidth = (node: HTMLSpanElement) => {
  nextTick(() => {
    if (node) {
      node.style.width = `${node.scrollWidth}px`
      node.style.opacity = '1'
      node.style.transform = 'scale(1)'
    }
  })
}
const resetStyle = (node: HTMLSpanElement) => {
  if (node && node.style) {
    node.style.width = ''
    node.style.opacity = ''
    node.style.transform = ''
  }
}
export default defineComponent({
  name: 'LoadingIcon',
  props: {
    loading: Boolean,
    // eslint-disable-next-line vue/require-default-prop
    ns: String
  },
  setup(props) {
    return () => {
      return (
        <Transition
          onBeforeEnter={getCollapsedWidth}
          onEnter={getRealWidth}
          onBeforeLeave={getRealWidth}
          onAfterEnter={resetStyle}
          onLeave={(node: HTMLSpanElement) => {
            setTimeout(() => {
              getCollapsedWidth(node)
            }, 16)
          }}
          onAfterLeave={resetStyle}
        >
          {props.loading ? (
            <span class={`${props.ns}__loading`}>
              <BnIconLoading />
            </span>
          ) : null}
        </Transition>
      )
    }
  }
})
