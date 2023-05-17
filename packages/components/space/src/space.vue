<script lang="tsx">
  import type { PropType, CSSProperties } from 'vue';
  import { defineComponent, computed, Fragment, Comment } from 'vue';
  import { isNumber } from '../../../utils/is';
  import { getNamespace, getComponentNamespace } from '../../../utils/global-config';
  import { getAllElements } from '../../../utils/vue-utils';

  type SpaceSize = number | 'mini' | 'small' | 'medium' | 'large';

  export default defineComponent({
    name: getComponentNamespace('Space'),
    props: {
      direction: {
        type: String as PropType<'horizontal' | 'vertical'>,
        default: 'horizontal',
      },
      size: {
        type: [Number, String] as PropType<number | 'mini' | 'small' | 'medium' | 'large'>,
        default: 'small',
      },
      align: {
        type: String as PropType<'start' | 'end' | 'center' | 'baseline'>,
        default: 'center'
      },
      fill: {
        type:Boolean,
        default:false
      }
    },
    setup(props, { slots }) {
      const ns = getNamespace('space');

      const cls = computed(() => [
        ns,
        `${ns}__${props.direction}`,
        props.fill && `is-fill`,
        `${ns}__${props.direction}-${props.align}`,
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
        if (isLast) return style;
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

      return () => {
        const children = getAllElements(
          slots.default?.().filter((item) => item.type !== Comment) as [],
        );

        return (
          <div class={cls.value}>
            {children.map((child, index) => {
              const shouldRenderSplit = slots.split && index > 0;
              return (
                <Fragment key={`space-item-${index}`}>
                  {shouldRenderSplit && (
                    <div class={`${ns}__split`} style={getMarginStyle(false)}>
                      {slots.split?.()}
                    </div>
                  )}
                  <div class={`${ns}__item`} style={getMarginStyle(index === children.length - 1)}>
                    {child}
                  </div>
                </Fragment>
              );
            })}
          </div>
        );
      };
    },
  });
</script>
