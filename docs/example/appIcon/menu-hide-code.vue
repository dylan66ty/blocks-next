<script lang="tsx">
  import { defineComponent, getCurrentInstance, h } from 'vue';

  const formatSvgName = (svgName) => {
    return svgName
      .split('-')
      .map((word) => {
        return word
          .split('')
          .map((v, i) => {
            if (i === 0) return v.toUpperCase();
            return v;
          })
          .join('');
      })
      .join('');
  };

  const icons: Array<Record<string, any>> = [
    'app-home',
    'app-oa',
    'app-customer',
    'app-pie',
    'app-sem',
    'app-building',
    'app-money',
    'app-cleat',
    'app-bi',
    'app-market'
  ].map((svgName) => {
    return {
      n: 'bn-icon-' + svgName,
      c: 'BnIcon' + formatSvgName(svgName),
    };
  });

  export default defineComponent({
    setup() {
      const instance = getCurrentInstance();
      const message = instance?.appContext.config.globalProperties.message;
      const copyStr = instance?.appContext.config.globalProperties.copyStr;
      const component = instance?.appContext.components || {};

      const handleCopy = async (name) => {
        const content = '<' + name + ' />';

        copyStr(content)
          .then(() => {
            message.info('复制成功 ' + content);
          })
          .catch(() => {
            message.error('复制失败');
          });
      };
      return () =>
        h(
          'div',
          { class: 'icon-wrapper' },
          icons.map((icon) =>
            h('div', { class: 'icon-item', onClick: () => handleCopy(icon.n) }, [
              h(component[icon.c] || '', { class: 'icon', style: icon.s }),
              h('div', { class: 'icon-name' }, icon.n),
            ]),
          ),
        );
    },
  });
</script>

<style lang="scss">
  .icon-wrapper {
    display: flex;
    flex-wrap: wrap;

    .icon-item {
      position: relative;
      border: 1px solid #ddd;
      width: 25%;
      height: 140px;
      text-align: center;
      margin-left: -1px;
      margin-top: -1px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background-color: #f2f3f5;

        .icon {
          transform: scale(1.4);
        }
      }

      .icon {
        font-size: 32px;
        transition: all 0.3s ease;
      }

      .icon-name {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        margin: 0;
        padding: 12px;
        overflow: hidden;
        color: var(--color-text-1);
        font-size: 12px;
        white-space: nowrap;
        text-align: center;
        text-overflow: ellipsis;
        line-height: initial;
      }
    }
  }
</style>
