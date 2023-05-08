<script lang="tsx">
import { PropType, defineComponent,computed, CSSProperties, Fragment , Comment} from 'vue'
import { isNumber } from '../../../utils/is'
import {getComponentPrefix} from '../../../utils/global-config'

type SpaceSize = number | 'mini' | 'small' | 'medium' | 'large';

export default defineComponent({
  name: 'Space',
  props: {
    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal'
    },
    size: {
      type: [Number,String] as PropType<number | 'mini' | 'small' | 'medium' | 'large'>,
      default: 'mini'
    }
  },
  setup(props, { slots }) {
    const prefixCls = getComponentPrefix()

    const cls = computed(() => [
      `${prefixCls}-space-${props.direction}`
    ]);

    function getMargin(size: SpaceSize) {
      if (isNumber(size)) {
        return size;
      }
      switch (size) {
        case 'mini':
          return 4;
        case 'small':
          return 8;
        case 'medium':
          return 16;
        case 'large':
          return 24;
        default:
          return 8;
      }
    }

    const getMarginStyle = (isLast: boolean): CSSProperties => {
      const style: CSSProperties = {};
      if(isLast) return style
      const marginRight = `${getMargin(props.size)}px`;
      const marginBottom = `${getMargin(props.size)}px`;


      if (props.direction === 'horizontal') {
        style.marginRight = marginRight;
      }
      if (props.direction === 'vertical') {
        style.marginBottom = marginBottom;
      }

      return style;
    };

    console.log(slots.default?.());

    return () => {
      const children = slots.default?.().filter(
        (item) => item.type !== Comment
      )  as []

      return (
        <div class={cls.value}>
          {children.map((child, index) => {
            const shouldRenderSplit = slots.split && index > 0;
            return (
              <Fragment key={`space-item-${index}`}>
                {shouldRenderSplit && (
                  <div
                    class={`${prefixCls}-space-item-split`}
                    style={getMarginStyle(false)}
                  >
                    {slots.split?.()}
                  </div>
                )}
                <div
                  class={`${prefixCls}-space-item`}
                  style={getMarginStyle(index === children.length - 1)}
                >
                  {child}
                </div>
              </Fragment>
            );
          })}
        </div>
      )
    };
  },
})
</script>