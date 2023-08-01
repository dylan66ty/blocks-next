<script lang="ts">
  import { defineComponent } from 'vue'
  import type { PropType } from 'vue'
  import { getNamespace } from '../../../../../utils/global-config'
  export default defineComponent({
    name: 'PanelWeek',
    props: {
      weeks: {
        type: Array as PropType<{ label: string; value: number }[]>,
        default: () => []
      }
    },
    setup() {
      const ns = getNamespace('date-picker')
      return {
        ns
      }
    }
  })
</script>

<template>
  <div :class="[`${ns}__week`]">
    <div v-for="week in weeks" :key="week.value" :class="[`${ns}__week-cell`]">{{
      week.label
    }}</div>
  </div>
</template>
