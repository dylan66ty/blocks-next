<script lang="ts">
  import type { PropType } from 'vue'
  import { computed, defineComponent, ref, toRefs, watch } from 'vue'
  import { getNamespace } from '../../../../utils/global-config'
  import { dateFormat, diffOfYear, getYMD, compareYear, isSameYear } from '../utils'
  import type { DateCell } from '../types'
  import { useMonthRows } from '../hooks/use-month-rows'

  import PanelBody from './layout/body.vue'
  import PanelHeader from './layout/header.vue'

  export default defineComponent({
    name: 'MonthRangePanel',
    components: {
      PanelHeader,
      PanelBody
    },
    props: {
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

      const leftDate = ref<Date>()
      const rightDate = ref<Date>()
      const dateRange = ref<Date[]>([])
      const dateModel = ref<Date[]>([])
      const { disabledDate } = toRefs(props)

      const { rows: leftRows } = useMonthRows({
        date: leftDate,
        dateModel,
        dateRange,
        disabledDate
      })

      const { rows: rightRows } = useMonthRows({
        date: rightDate,
        dateModel,
        dateRange,
        disabledDate
      })

      const headerContent = computed(() => {
        return {
          left: dateFormat(leftDate.value, 'yyyy 年'),
          right: dateFormat(rightDate.value, 'yyyy 年')
        }
      })

      const actions = computed(() => {
        const [ly] = getYMD(leftDate.value)
        const [ry] = getYMD(rightDate.value)
        const left: string[] = []
        const right: string[] = []
        if (ly === ry - 1) {
          left.push('prevSuper')
          right.push('nextSuper')
        } else {
          left.push('prevSuper', 'nextSuper')
          right.push('prevSuper', 'nextSuper')
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
          leftDate.value = diffOfYear(leftDate.value!, count)
          console.log(leftDate.value)
        }
      }

      const rightDateOps = {
        handleYearChange(count: number) {
          rightDate.value = diffOfYear(rightDate.value!, count)
        },
        handleMonthChange(count: number) {
          rightDate.value = diffOfYear(rightDate.value!, count)
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
          emit('update:modelValue', dateModel.value.slice())
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
          const [l = new Date(), r = diffOfYear(l, 1)] = newDate ?? []
          const leftRet = compareYear(l, leftDate.value)
          if (leftRet) {
            leftDate.value = leftRet
          }
          const rightRet = compareYear(r, rightDate.value)
          if (isSameYear(l, r)) {
            rightDate.value = diffOfYear(l, 1)
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
        rightRows,
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
        :actions="actions.left"
        :content="headerContent.left"
        @prev-super="leftDateOps.handleYearChange(-1)"
        @next-super="leftDateOps.handleYearChange(1)"
      />
      <PanelBody
        :rows="leftRows"
        @on-cell-click="handleCellClick"
        @on-cell-mouseenter="handleCellMouseenter"
      >
        <template #cell="scoped">
          <slot name="cell" v-bind="scoped"> </slot>
        </template>
      </PanelBody>
    </div>
    <div :class="[`${ns}__panel-right`]">
      <PanelHeader
        :actions="actions.right"
        :content="headerContent.right"
        @prev-super="rightDateOps.handleYearChange(-1)"
        @next-super="rightDateOps.handleYearChange(1)"
      />
      <PanelBody
        :rows="rightRows"
        @on-cell-click="handleCellClick"
        @on-cell-mouseenter="handleCellMouseenter"
      >
        <template #cell="scoped">
          <slot name="cell" v-bind="scoped"> </slot>
        </template>
      </PanelBody>
    </div>
  </div>
</template>
