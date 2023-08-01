import type { VNode } from 'vue'
import { computed, defineComponent, ref, watch } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import Trigger from '../../trigger/src/trigger'
import DateTrigger from '../../common/date-trigger.vue'
import { isArray } from '../../../utils/is'
import { datePickerProps } from './props'

import DatePanel from './panels/date-panel.vue'
import DateRangePanel from './panels/date-range-panel.vue'
import MonthPanel from './panels/month-panel.vue'
import MonthRangePanel from './panels/month-range-panel.vue'
import WeekPanel from './panels/week-panel.vue'

import { dateFormat } from './utils'
import type { DateType } from './types'

export default defineComponent({
  name: getComponentNamespace('DatePicker'),
  props: datePickerProps,
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const ns = getNamespace('date-picker')
    const popupVisible = ref(false)
    const mergeDisabled = computed(() => props.disabled)
    const popupRef = ref()
    const pickerVisible = ref(false)

    const handlePopupVisibleChange = (visible: boolean) => {
      popupVisible.value = visible
    }

    const isRange = computed(() => props.type.includes('range'))

    const transDateValue = (date: any): any => {
      if (isRange.value) {
        if (isArray(date)) {
          return date.map((d) => (d ? new Date(d) : undefined))
        }
        return []
      }
      if (!date) return
      return new Date(date)
    }

    const formatModelValue = (date: Date | Date[]) => {
      let ret: any = date
      if (isRange.value && isArray(date)) {
        const _date = date.slice().sort((a, b) => a.getTime() - b.getTime())
        if (props.modelValueFormat) {
          ret = _date.map((d) => dateFormat(d, props.modelValueFormat))
        } else {
          ret = _date
        }
      } else {
        if (props.modelValueFormat) {
          ret = dateFormat(date, props.modelValueFormat)
        }
      }
      return ret
    }

    const dateModel = computed({
      get() {
        return transDateValue(props.modelValue)
      },
      set(date: Date | Date[]) {
        emit('update:modelValue', formatModelValue(date))
        handlePopupVisibleChange(false)
      }
    })

    const onPopupHide = () => {
      // 在popup关闭的时候同步状态给picker
      pickerVisible.value = false
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

    const inputValue = computed(() => {
      if (isArray(dateModel.value)) {
        return dateModel.value.map((d) => dateFormat(d, props.inputLabelFormat))
      }
      return [dateFormat(dateModel.value, props.inputLabelFormat)]
    })

    const handleClear = () => {
      let reset: any = ''
      if (isRange.value) {
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
            v-slots={{
              default: () => (
                <DateTrigger
                  popup-ref={popupRef.value}
                  input-value={inputValue.value}
                  clearable={props.clearable}
                  placeholder={props.placeholder}
                  disabled={mergeDisabled.value}
                  size={props.size}
                  isRange={isRange.value}
                  onClear={handleClear}
                />
              ),
              content: () => (
                <div ref={popupRef} class={[`${ns}__panel`]}>
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
