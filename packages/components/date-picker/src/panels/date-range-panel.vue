<script lang="ts">
  import type { PropType } from 'vue'
  import { computed, defineComponent, ref, toRefs, watch } from 'vue'
  import { getNamespace } from '../../../../utils/global-config'
  import { diffOfMonth, dateFormat, diffOfYear, getYMD, compareMonth, isSameMonth } from '../utils'
  import type { DateCell } from '../types'
  import { useDateRows } from '../hooks/use-date-rows'
  import PanelBody from './layout/body.vue'
  import PanelHeader from './layout/header.vue'
  import PanelWeek from './layout/week.vue'

  export default defineComponent({
    name: 'DateRangePanel',
    components: {
      PanelHeader,
      PanelBody,
      PanelWeek
    },
    props: {
      dayStartOfWeek: {
        type: Number,
        default: 0
      },
      modelValue: {
        type: Array as PropType<Date[]>,
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

      const { dayStartOfWeek } = toRefs(props)
      const leftDate = ref<Date>()
      const rightDate = ref<Date>()
      const dateRange = ref<Date[]>([])
      const dateModel = ref<Date[]>([])
      const { disabledDate } = toRefs(props)

      const { rows: leftRows, weeks: leftWeeks } = useDateRows({
        date: leftDate,
        dayStartOfWeek,
        dateModel,
        dateRange,
        disabledDate
      })

      const { rows: rightRows, weeks: rightWeeks } = useDateRows({
        date: rightDate,
        dayStartOfWeek,
        dateModel,
        dateRange,
        disabledDate
      })

      const headerContent = computed(() => {
        return {
          left: dateFormat(leftDate.value, 'yyyy 年 M 月'),
          right: dateFormat(rightDate.value, 'yyyy 年 M 月')
        }
      })

      const actions = computed(() => {
        const [ly, lm] = getYMD(leftDate.value)
        const [ry, rm] = getYMD(rightDate.value)
        const left: string[] = []
        const right: string[] = []
        if (ly === ry && lm === rm - 1) {
          left.push('prev', 'prevSuper')
          right.push('next', 'nextSuper')
        } else if ((ly === ry && lm < rm - 1) || (ly === ry - 1 && lm >= rm)) {
          left.push('prev', 'prevSuper', 'next')
          right.push('prev', 'next', 'nextSuper')
        } else {
          left.push('prev', 'prevSuper', 'next', 'nextSuper')
          right.push('prev', 'prevSuper', 'next', 'nextSuper')
        }
        return {
          left,
          right
        }
      })

      const leftDateOps = {
        handleYearChange(count: number) {
          leftDate.value = diffOfYear(leftDate.value!, count)
        },
        handleMonthChange(count: number) {
          leftDate.value = diffOfMonth(leftDate.value!, count)
          console.log(leftDate.value)
        }
      }

      const rightDateOps = {
        handleYearChange(count: number) {
          rightDate.value = diffOfYear(rightDate.value!, count)
        },
        handleMonthChange(count: number) {
          rightDate.value = diffOfMonth(rightDate.value!, count)
        }
      }

      const handleCellClick = (cell: DateCell) => {
        if (dateModel.value.length < 2) {
          dateRange.value.push(cell.date)
          dateModel.value.push(cell.date)
        } else {
          dateRange.value = [cell.date]
          dateModel.value = [cell.date]
        }

        if (dateModel.value.length === 2) {
          emit('update:modelValue', dateModel.value)
        }
      }

      const handleCellMouseenter = (cell: DateCell) => {
        if (dateModel.value.length === 1) {
          const origin = dateRange.value.slice(0, 1)
          origin.push(cell.date)
          dateRange.value = origin
        }
      }

      watch(
        () => props.modelValue,
        (newDate) => {
          const [l = new Date(), r = diffOfMonth(l, 1)] = newDate ?? []
          const leftRet = compareMonth(l, leftDate.value)
          if (leftRet) {
            leftDate.value = leftRet
          }
          const rightRet = compareMonth(r, rightDate.value)
          if (isSameMonth(l, r)) {
            rightDate.value = diffOfMonth(l, 1)
          } else if (rightRet) {
            rightDate.value = rightRet
          }
          dateRange.value = newDate.slice()
          dateModel.value = newDate.slice()
        },
        {
          immediate: true
        }
      )

      return {
        ns,
        leftRows,
        leftWeeks,
        rightRows,
        rightWeeks,
        headerContent,
        handleCellClick,
        handleCellMouseenter,
        leftDateOps,
        rightDateOps,
        actions
      }
    }
  })
</script>

<template>
  <div :class="[`${ns}__range`]">
    <div :class="[`${ns}__range-left`]">
      <PanelHeader
        :content="headerContent.left"
        :actions="actions.left"
        @prev-super="leftDateOps.handleYearChange(-1)"
        @prev="leftDateOps.handleMonthChange(-1)"
        @next="leftDateOps.handleMonthChange(1)"
        @next-super="leftDateOps.handleYearChange(1)"
      />
      <PanelWeek :weeks="leftWeeks" />
      <PanelBody
        :rows="leftRows"
        @on-cell-click="handleCellClick"
        @on-cell-mouseenter="handleCellMouseenter"
      >
        <template #cell="scoped">
          <slot name="cell" v-bind="scoped"></slot>
        </template>
      </PanelBody>
    </div>
    <div :class="[`${ns}__panel-right`]">
      <PanelHeader
        :content="headerContent.right"
        :actions="actions.right"
        @prev-super="rightDateOps.handleYearChange(-1)"
        @prev="rightDateOps.handleMonthChange(-1)"
        @next="rightDateOps.handleMonthChange(1)"
        @next-super="rightDateOps.handleYearChange(1)"
      />
      <PanelWeek :weeks="rightWeeks" />
      <PanelBody
        :rows="rightRows"
        @on-cell-click="handleCellClick"
        @on-cell-mouseenter="handleCellMouseenter"
      >
        <template #cell="scoped">
          <slot name="cell" v-bind="scoped"></slot>
        </template>
      </PanelBody>
    </div>
  </div>
</template>
