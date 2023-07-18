<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
  export default defineComponent({
    name: getComponentNamespace('DropdownItem'),
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      command: {
        type: [String, Number],
        default: undefined
      }
    },
    setup(props) {
      const ns = getNamespace('dropdown-item')

      const cls = computed(() => [ns, props.disabled && 'is-disabled'])

      return {
        ns,
        cls
      }
    }
  })
</script>

<template>
  <div :class="cls">
    <slot></slot>
  </div>
</template>
