<script lang="ts">
  import { computed, defineComponent, nextTick, onMounted, ref, watch } from 'vue'
  import type { CSSProperties, StyleValue } from 'vue'
  import { addUnit, NOOP } from '../../../shared/utils'
  import Loading from '../../icon/src/base/loading.vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
  import { isBoolean, isPromise } from '../../../utils/is'

  import { useFormItem } from '../../form/src/hooks/use-form-item'
  import { switchProps } from './props'

  export default defineComponent({
    name: getComponentNamespace('Switch'),
    components: {
      Loading
    },
    props: switchProps,
    emits: ['update:modelValue', 'input', 'change'],
    setup(props, { emit }) {
      const ns = getNamespace('switch')
      const inputRef = ref<HTMLInputElement>()
      const { formItem } = useFormItem()
      const isLoading = ref(false)

      const cls = computed(() => [
        ns,
        checked.value && 'is-checked',
        mergeDisabled.value && 'is-disabled'
      ])

      const coreCls = computed(() => [`${ns}__core`, `${ns}__core-${props.type}`])

      const blockCls = computed(() => [`${ns}__block`, `${ns}__block-${props.type}`])

      // moduleValue value 控制模式
      const isControlled = ref(props.modelValue !== false)
      // TODO: 后期和form表单关联
      const mergeDisabled = computed(() => props.disabled)

      // 用这个值控制checkbox状态
      const actualValue = computed(() => {
        return isControlled.value ? props.modelValue : props.value
      })

      // switch状态控制
      const checked = computed(() => actualValue.value === props.trueValue)

      const inlineLabel = computed(() => (checked.value ? props.activeText : props.inactiveText))

      const coreStyle = computed<CSSProperties>(() => {
        const style: StyleValue = {
          width: addUnit(props.width),
          '--bn-switch-inactive-color': props.inactiveColor,
          '--bn-switch-active-color': props.activeColor
        }
        return style
      })

      const switchValue = () => {
        if (mergeDisabled.value) return

        const { beforeChange } = props
        if (!beforeChange) {
          handleChange()
          return
        }
        const beforeChangeRes = beforeChange()

        if (isPromise(beforeChangeRes)) {
          isLoading.value = true
          beforeChangeRes
            .then((value: boolean) => {
              value && handleChange()
            })
            .finally(() => {
              isLoading.value = false
            })
          return
        }
        if (isBoolean(beforeChangeRes)) {
          beforeChangeRes && handleChange()
        }
      }

      const handleChange = () => {
        const val = checked.value ? props.falseValue : props.trueValue
        emit('update:modelValue', val)
        emit('input', val)
        emit('change', val)
        nextTick(() => {
          inputRef.value!.checked = checked.value
        })
      }

      watch(checked, (val) => {
        inputRef.value!.checked = val
        if (props.validateEvent) {
          formItem?.validate?.('change').catch(NOOP)
        }
      })

      watch(
        () => props.modelValue,
        () => {
          isControlled.value = true
        }
      )

      watch(
        () => props.value,
        () => {
          isControlled.value = false
        }
      )

      onMounted(() => {
        if (![props.trueValue, props.falseValue].includes(actualValue.value)) {
          emit('update:modelValue', props.falseValue)
          emit('input', props.falseValue)
          emit('change', props.falseValue)
        }
      })

      return {
        ns,
        cls,
        coreStyle,
        coreCls,
        blockCls,
        mergeDisabled,
        switchValue,
        handleChange,
        checked,
        inputRef,
        isLoading,
        inlineLabel
      }
    }
  })
</script>

<template>
  <div :class="cls" @click.prevent="switchValue">
    <input
      ref="inputRef"
      :class="[`${ns}__input`]"
      type="checkbox"
      role="switch"
      :aria-checked="checked"
      :aria-disabled="mergeDisabled"
      :name="name"
      :true-value="trueValue"
      :false-value="falseValue"
      :disabled="mergeDisabled"
      @change="handleChange"
      @keydown.enter="switchValue"
    />
    <span
      v-if="!inlinePrompt"
      :class="[{ 'is-active': !checked }, `${ns}__label ${ns}__label--left`]"
    >
      {{ inactiveText }}
    </span>
    <span :class="coreCls" :style="coreStyle">
      <span v-if="inlinePrompt && type !== 'line'" :class="[`${ns}__inline`]">
        <slot name="inline" :checked="checked"
          ><span class="is-text">{{ inlineLabel }}</span></slot
        >
      </span>
      <span :class="blockCls">
        <slot v-if="isLoading" name="loading">
          <Loading :size="14" :style="{ color: 'var(--bn-switch-active-color)' }" />
        </slot>
      </span>
    </span>
    <span
      v-if="!inlinePrompt"
      :class="[`${ns}__label ${ns}__label--right`, { 'is-active': checked }]"
    >
      {{ activeText }}
    </span>
  </div>
</template>
