import type { VNode } from 'vue'
import { computed, defineComponent, ref, toRef, watch } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import Trigger from '../../trigger/src/trigger'
import DateTrigger from '../../common/date-trigger.vue'
import { isArray, isString } from '../../../utils/is'
import { useFormItem } from '../../form/src/hooks/use-form-item'
import { NOOP } from '../../../shared/utils'
import { datePickerProps } from './props'

import { useDateRows } from './hooks/use-date-rows'

import DatePanel from './panels/date-panel.vue'
import DateRangePanel from './panels/date-range-panel.vue'
import MonthPanel from './panels/month-panel.vue'
import MonthRangePanel from './panels/month-range-panel.vue'
import WeekPanel from './panels/week-panel.vue'

import { dateFormat, parseWeek2DateRange, weekOfYear } from './utils'
import type { DateType } from './types'

export default defineComponent({
  name: getComponentNamespace('DatePicker'),
  props: datePickerProps,
  emits: ['update:modelValue', 'change', 'show', 'hide'],
  setup(props, { emit, slots }) {
    const ns = getNamespace('date-picker')
    const { formItem } = useFormItem()
    const popupVisible = ref(false)
    const mergeDisabled = computed(() => props.disabled)
    const popupRef = ref()
    const pickerVisible = ref(false)
    const rangePattern = computed(() => props.type.endsWith('range'))

    const { weeks } = useDateRows({ dayStartOfWeek: toRef(props, 'dayStartOfWeek') })

    const handlePopupVisibleChange = (visible: boolean) => {
      popupVisible.value = visible
    }

    const transDateValue = (date: any): any => {
      let ret
      switch (props.type) {
        case 'date':
        case 'month':
          if (date) {
            ret = new Date(date)
          }
          break
        case 'daterange':
        case 'monthrange':
          if (isArray(date)) {
            ret = date.map((d) => (d ? new Date(d) : undefined))
          }
          if (!date) {
            ret = []
          }
          break
        case 'week':
          if (isArray(date)) {
            ret = date.map((d) => (d ? new Date(d) : undefined))
          }

          if (isString(date) && date) {
            const matcher = date.match(/(\d+)(?:年|[yY]ear|\s*)[\/-]*(?:\s*)(\d+)(?:周|[wW]eek)/)
            if (matcher) {
              ret = parseWeek2DateRange(+matcher[1], +matcher[2], weeks.value)
            } else {
              throw new Error('week模式下v-model格式错误，请查阅文档')
            }
          }
          if (!date) {
            ret = []
          }
          break
      }
      return ret
    }

    const dateFormatEnhanced = (date: Date, formatter?: string) => {
      if (formatter === 'timestamp') {
        return date.getTime()
      }
      return dateFormat(date, formatter)
    }

    const formatModelValue = (date: Date | Date[]) => {
      let ret: any = date
      if (isArray(date)) {
        // 从小到大排序下
        const _date = date.slice().sort((a, b) => a.getTime() - b.getTime())
        ret = _date.map((d) => dateFormatEnhanced(d, props.modelValueFormat))
      } else {
        ret = dateFormatEnhanced(date, props.modelValueFormat)
      }
      return ret
    }

    const dateModel = computed({
      get() {
        return transDateValue(props.modelValue)
      },
      set(date: Date | Date[]) {
        emit('update:modelValue', formatModelValue(date))
        emit('change', date)
        handlePopupVisibleChange(false)
      }
    })

    // 表单验证
    watch(
      () => props.modelValue,
      () => {
        // 表单验证
        if (props.validateEvent) {
          formItem?.validate?.('change').catch(NOOP)
        }
      }
    )

    const onPopupHide = () => {
      // 在popup关闭的时候同步状态给picker
      pickerVisible.value = false
      emit('hide')
    }

    const onPopupShow = () => {
      emit('show')
    }

    watch(
      () => popupVisible.value,
      (visible) => {
        //  同步状态给picker
        if (visible) {
          pickerVisible.value = visible
        }
      },
      { immediate: true }
    )

    const defaultFormat = (formatter: string) => {
      return props.inputLabelFormat ? props.inputLabelFormat : formatter
    }
    const inputValue = computed(() => {
      const date = dateModel.value
      let ret: string[] = []
      switch (props.type) {
        case 'date': {
          ret = [dateFormat(date, defaultFormat('yyyy-MM-dd'))]
          break
        }
        case 'daterange': {
          ret = date.map((d: Date) => dateFormat(d, defaultFormat('yyyy-MM-dd')))
          break
        }
        case 'month': {
          ret = [dateFormat(date, defaultFormat('yyyy-MM'))]
          break
        }
        case 'monthrange': {
          ret = date.map((d: Date) => dateFormat(d, defaultFormat('yyyy-MM')))
          break
        }
        case 'week': {
          const stdDate = date[0]
          if (stdDate) {
            const { year, week } = weekOfYear(stdDate, weeks.value)
            const formatter = props.inputLabelFormat || 'yyyy年-ww周'
            const label = formatter.replace(/([yw])+/g, (all: any, t: any) => {
              if (t === 'w') return String(week).slice(2 - all.length)
              if (t === 'y') return String(year).slice(4 - all.length)
              return all
            })
            ret = [label]
          } else {
            ret = []
          }
          break
        }
      }
      return ret
    })

    const handleClear = () => {
      let reset: any = ''
      if (['week', 'range'].some((s) => props.type.includes(s))) {
        reset = []
      }
      emit('update:modelValue', reset)
      handlePopupVisibleChange(false)
    }

    const renderMap: Record<DateType, () => VNode> = {
      date() {
        return (
          <DatePanel
            v-model={dateModel.value}
            day-start-of-week={props.dayStartOfWeek}
            disabledDate={props.disabledDate}
            v-slots={{
              cell: (scoped: any) => slots.cell?.(scoped)
            }}
          />
        )
      },
      daterange() {
        return (
          <DateRangePanel
            v-model={dateModel.value}
            day-start-of-week={props.dayStartOfWeek}
            disabledDate={props.disabledDate}
            v-slots={{
              cell: (scoped: any) => slots.cell?.(scoped)
            }}
          />
        )
      },
      month() {
        return (
          <MonthPanel
            v-model={dateModel.value}
            disabledDate={props.disabledDate}
            v-slots={{
              cell: (scoped: any) => slots.cell?.(scoped)
            }}
          />
        )
      },
      monthrange() {
        return (
          <MonthRangePanel
            v-model={dateModel.value}
            disabledDate={props.disabledDate}
            v-slots={{
              cell: (scoped: any) => slots.cell?.(scoped)
            }}
          />
        )
      },
      week() {
        return (
          <WeekPanel
            v-model={dateModel.value}
            day-start-of-week={props.dayStartOfWeek}
            disabledDate={props.disabledDate}
            v-slots={{
              cell: (scoped: any) => slots.cell?.(scoped)
            }}
          ></WeekPanel>
        )
      }
    }

    const renderContent = () => {
      try {
        return renderMap[props.type]()
      } catch (error) {
        console.log('无效的type属性')
      }
    }

    return () => {
      return (
        <div class={ns}>
          <Trigger
            v-model:popupVisible={popupVisible.value}
            position="bl"
            trigger="click"
            unmount-on-close={false}
            animation-name="bn-slide-dynamic-origin"
            popup-offset={8}
            disabled={mergeDisabled.value}
            onHide={onPopupHide}
            onShow={onPopupShow}
            v-slots={{
              default: () => (
                <DateTrigger
                  popup-ref={popupRef.value}
                  input-value={inputValue.value}
                  clearable={props.clearable}
                  placeholder={props.placeholder}
                  disabled={mergeDisabled.value}
                  size={props.size}
                  rangePattern={rangePattern.value}
                  onClear={handleClear}
                  card={props.card}
                />
              ),
              content: () => (
                <div ref={popupRef} class={[`${ns}__panel`, `is-${props.type}`, props.popupClass]}>
                  {renderContent()}
                </div>
              )
            }}
          ></Trigger>
        </div>
      )
    }
  }
})
