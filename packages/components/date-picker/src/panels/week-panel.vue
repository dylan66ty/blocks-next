<script lang="ts">
  import { computed, defineComponent, ref, toRefs, watch } from 'vue'
  import { getNamespace } from '../../../../utils/global-config'
  import { diffOfMonth, dateFormat, diffOfYear, compareMonth } from '../utils'
  import type { DateCell } from '../types'
  import { useDateRows } from '../hooks/use-date-rows'
  import PanelBody from './layout/body.vue'
  import PanelHeader from './layout/header.vue'
  import PanelWeek from './layout/week.vue'

  export default defineComponent({
    name: 'DatePanel',
    components: {
      PanelHeader,
      PanelBody,
      PanelWeek
    },
    props: {
      dayStartOfWeek: {
        type: Number,
        required: true
      },
      modelValue: {
        type: Array,
        default: () => []
      },
      disabledDate: {
        type: Function,
        default: undefined
      }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const ns = getNamespace('date-picker')

      const date = ref<Date>()
      const { dayStartOfWeek, disabledDate } = toRefs(props)
      const dateModel = ref<Date[]>([])

      const { weeks, rows } = useDateRows({
        dayStartOfWeek,
        date,
        dateModel,
        disabledDate,
        dateRange: dateModel,
        dateRangeOfWeek: dateModel
      })

      const headerContent = computed(() => {
        return dateFormat(date.value, 'yyyy 年 M 月')
      })

      const handleYearChange = (count: number) => {
        date.value = diffOfYear(date.value!, count)
      }

      const handleMonthChange = (count: number) => {
        date.value = diffOfMonth(date.value!, count)
      }

      const handleCellRowClick = (row: DateCell[]) => {
        emit('update:modelValue', [row[0].date, row[row.length - 1].date])
      }

      // 同步选中状态
      watch(
        () => props.modelValue,
        (newDate: Date[]) => {
          const std = newDate[1] ?? new Date()
          const ret = compareMonth(std, date.value)
          if (ret) {
            date.value = ret
          }
          dateModel.value = newDate.slice()
        },
        { immediate: true }
      )

      return {
        ns,
        weeks,
        rows,
        headerContent,
        handleYearChange,
        handleMonthChange,
        handleCellRowClick
      }
    }
  })
</script>

<template>
  <PanelHeader
    :content="headerContent"
    @prev-super="handleYearChange(-1)"
    @next-super="handleYearChange(1)"
    @prev="handleMonthChange(-1)"
    @next="handleMonthChange(1)"
  />
  <PanelWeek :weeks="weeks" />
  <PanelBody :rows="rows" @on-cell-row-click="handleCellRowClick">
    <template #cell="scoped">
      <slot name="cell" v-bind="scoped"></slot>
    </template>
  </PanelBody>
</template>
