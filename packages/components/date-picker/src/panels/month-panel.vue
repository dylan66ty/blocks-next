<script lang="ts">
  import { computed, defineComponent, ref, watch } from 'vue'
  import { useMonthRows } from '../hooks/use-month-rows'

  import type { DateCell } from '../types'
  import { dateFormat, diffOfYear } from '../utils'
  import PanelBody from './layout/body.vue'
  import PanelHeader from './layout/header.vue'

  export default defineComponent({
    name: 'MonthPanel',
    components: {
      PanelBody,
      PanelHeader
    },
    props: {
      modelValue: {
        type: Date,
        default: undefined
      }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const date = ref<Date>()
      const dateModel = computed(() => (props.modelValue ? [props.modelValue] : []))
      const { rows } = useMonthRows({
        date,
        dateModel
      })

      const handleCellClick = (cell: DateCell) => {
        emit('update:modelValue', cell.date)
      }

      const handleYearChange = (count: number) => {
        date.value = diffOfYear(date.value!, count)
      }

      const headerContent = computed(() => {
        return dateFormat(date.value, 'yyyy 年')
      })

      // 同步选中状态
      watch(
        () => props.modelValue,
        (newDate) => {
          const d = newDate || new Date()
          date.value = d
        },
        { immediate: true }
      )

      return {
        headerContent,
        rows,
        handleCellClick,
        handleYearChange
      }
    }
  })
</script>

<template>
  <PanelHeader
    :actions="['prevSuper', 'nextSuper']"
    :content="headerContent"
    @prev-super="handleYearChange(-1)"
    @next-super="handleYearChange(1)"
  />
  <PanelBody :rows="rows" type="month" @on-cell-click="handleCellClick">
    <template #cell="scoped">
      <slot name="cell" v-bind="scoped"> </slot>
    </template>
  </PanelBody>
</template>
