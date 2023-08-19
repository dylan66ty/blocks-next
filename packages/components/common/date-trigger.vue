<script lang="ts">
  import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
  import type { PropType } from 'vue'
  import { getNamespace } from '../../utils/global-config'
  import { Input } from '../input'
  import type { InputInstance } from '../input'
  import { BnIconCalendar } from '../icon'
  import { isElement } from '../../utils/is'

  export default defineComponent({
    name: 'DateTrigger',
    components: {
      Input,
      BnIconCalendar
    },
    props: {
      inputValue: {
        type: Array as PropType<string[]>,
        default: () => []
      },
      clearable: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      rangeSeparator: {
        type: String,
        default: '~'
      },
      placeholder: {
        type: String,
        required: true
      },
      size: {
        type: String as PropType<'small' | 'default' | 'large'>,
        required: true
      },
      popupRef: {
        type: Object,
        default: undefined
      },
      rangePattern: {
        type: Boolean,
        default: false
      },
      card: {
        type: Boolean,
        default: false
      }
    },
    emits: ['clear'],
    setup(props, { emit }) {
      const ns = getNamespace('date-trigger')
      const inputComponentRef = ref<InputInstance>()
      const selectTriggerDomRef = ref()
      const computedInputValue = computed(() => {
        if (props.rangePattern) {
          if (props.inputValue.length) {
            return ' '
          }
          return ''
        }
        return props.inputValue[0]
      })

      const computedPlaceholder = computed(() => {
        if (props.rangePattern) {
          return ''
        }
        return props.placeholder
      })

      const computedReadonly = computed(() => true)

      const inputRange = ref<{ l: string; r: string }>({ l: '', r: '' })

      watch(
        () => props.inputValue,
        (values) => {
          if (props.rangePattern) {
            inputRange.value.l = values[0]
            inputRange.value.r = values[1]
          }
        },
        {
          immediate: true
        }
      )

      const handleClear = () => {
        emit('clear')
      }

      const clickOutside = (e: MouseEvent) => {
        const el = e.target as HTMLElement
        const deps: HTMLElement[] = [popupTargetElement.value, selectTriggerDomRef.value]
        const inner = deps.some((container) => container.contains(el))
        requestAnimationFrame(() => {
          inputComponentRef.value?.setFocus(inner)
        })
      }

      const popupTargetElement = computed(() => {
        if (isElement(props.popupRef)) return props.popupRef
        if (isElement(props.popupRef?.$el)) return props.popupRef?.$el
        return null
      })

      onMounted(() => {
        document.documentElement.addEventListener('mousedown', clickOutside, true)
      })

      onUnmounted(() => {
        document.documentElement.removeEventListener('mousedown', clickOutside, true)
      })

      return {
        ns,
        inputComponentRef,
        selectTriggerDomRef,
        computedInputValue,
        computedPlaceholder,
        computedReadonly,
        inputRange,
        handleClear
      }
    }
  })
</script>

<template>
  <div ref="selectTriggerDomRef" :class="[ns]">
    <Input
      ref="inputComponentRef"
      :model-value="computedInputValue"
      :validate-event="false"
      :readonly="computedReadonly"
      :placeholder="computedPlaceholder"
      :clearable="clearable"
      :size="size"
      :disabled="disabled"
      :card="card"
      @clear="handleClear"
    >
      <template #suffix-icon>
        <BnIconCalendar />
      </template>
    </Input>

    <div v-if="rangePattern" :class="[`${ns}__range`, disabled && 'is-disabled']">
      <input
        v-model="inputRange.l"
        :class="[`${ns}__range-input`]"
        type="text"
        :disabled="disabled"
        placeholder="开始时间"
      />
      <span :class="[`${ns}__range-separator`]">{{ rangeSeparator }}</span>
      <input
        v-model="inputRange.r"
        :class="[`${ns}__range-input`]"
        type="text"
        :disabled="disabled"
        placeholder="结束时间"
      />
    </div>
  </div>
</template>
