<script lang="ts">
  import { defineComponent } from 'vue'
  import type { PropType } from 'vue'
  import { getNamespace } from '../../../../../utils/global-config'
  import type { DateCell } from '../../types'
  export default defineComponent({
    name: 'PanelBody',
    props: {
      rows: {
        type: Array as PropType<DateCell[][]>,
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
  <div :class="[`${ns}__body`]">
    <div v-for="(row, rowIndex) in rows" :key="rowIndex" :class="[`${ns}__cell-row`]">
      <div v-for="cell in row" :key="cell.value" :class="[`${ns}__cell`]">{{ cell.label }}</div>
    </div>
  </div>
</template>
