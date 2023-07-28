<script lang="ts">
  import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
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
      label: {
        type: Array,
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
        type: String,
        required: true
      },
      popupRef: {
        type: Object,
        default: undefined
      }
    },
    setup(props) {
      const ns = getNamespace('date-trigger')

      const inputComponentRef = ref<InputInstance>()
      const selectTriggerDomRef = ref()

      const inputValue = computed(() => {
        return props.label.join(props.rangeSeparator)
      })

      const readonly = computed(() => true)

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
        readonly,
        inputValue,
        inputComponentRef,
        selectTriggerDomRef
      }
    }
  })
</script>

<template>
  <div ref="selectTriggerDomRef" :class="[ns]">
    <Input
      ref="inputComponentRef"
      :model-value="inputValue"
      :validate-event="false"
      :readonly="readonly"
      :placeholder="placeholder"
      :clearable="clearable"
      :size="size"
      :disabled="disabled"
    >
      <template #suffix-icon>
        <BnIconCalendar />
      </template>
    </Input>
  </div>
</template>
