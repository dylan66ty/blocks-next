<script lang="ts">
  import { computed, defineComponent, inject } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
  import { selectInjectKey } from './context'

  export default defineComponent({
    name: getComponentNamespace('SelectMenu'),
    setup() {
      const ns = getNamespace('select')
      const selectContext = inject(selectInjectKey)

      const cls = computed(() => [
        `${ns}-menu`,
        selectContext?.popupClass,
        selectContext?.multiple && 'is-multiple',
        selectContext?.compact && 'is-compact'
      ])
      return {
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
