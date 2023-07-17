const getIconVue = ({ componentName, svgHtml, propsDefaultValue }) => {
  return `<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: '${componentName}',
    props: {
      size: {
        type: [Number, String],
        default: ${propsDefaultValue.size}
      },
      rotate: {
        type: Number,
        default: ${propsDefaultValue.rotate}
      },
      spin: {
        type: Boolean,
        default: ${propsDefaultValue.spin}
      },
      color: {
        type: String,
        default: ${propsDefaultValue.color}
      }
    },
    setup(props) {
      const ns = getNamespace('icon')

      const styles = computed(() => {
        const styles: StyleValue = {}
        if (props.size) {
          styles.fontSize = addUnit(props.size)
        }

        if (props.rotate) {
          styles.transform = \`rotate(\${props.rotate}deg)\`
        }

        if (props.color) {
          styles.color = props.color
        }
        return styles
      })

      const cls = computed(() => [
        ns,
        {
          [\`\${ns}-loading\`]: props.spin
        }
      ])

      return {
        cls,
        styles
      }
    }
  })
</script>

<template>
  <i :class="cls" :style="styles">
    ${svgHtml}
  </i>
</template>`
}

const getIndexTs = ({ imports = [], components = [] }) => {
  return `import type { App } from 'vue'
  ${imports.join('\n')}
  
  const components = [${components.join(',\n')}]
  
  const install = (app: App) => {
    components.forEach((component) => {
      app.component(component.name, component)
    })
  }
  
  export default {
    install
  }

  export {
    ${components.join(',\n')}
  }

  `
}

module.exports = {
  getIconVue,
  getIndexTs
}
