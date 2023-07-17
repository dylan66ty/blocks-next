<script lang="ts">
  import { computed, defineComponent, inject } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
  import { selectInjectKey } from './context'

  export default defineComponent({
    name: getComponentNamespace('SelectMenu'),
    setup() {
      const ns = getNamespace('select')
      const selectContext = inject(selectInjectKey)

      const popupClass = computed(() => selectContext?.popupClass)
      const isMultiple = computed(() => selectContext?.multiple)

      const cls = computed(() => [
        `${ns}-menu`,
        popupClass.value,
        isMultiple.value && 'is-multiple'
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
