<script lang="ts">
  import type { PropType } from 'vue'
  import { defineComponent, ref, watch, nextTick, computed, onUnmounted } from 'vue'
  import { getNamespace } from '../../utils/global-config'
  import { isElement } from '../../utils/is'

  import BnInput from '../input'
  import { BnIconCaret, BnIconClose } from '../icon'

  import type { InputInstance } from '../input'

  export default defineComponent({
    name: 'SelectTrigger',
    components: {
      BnInput,
      BnIconCaret,
      BnIconClose
    },
    props: {
      inputValue: {
        type: String,
        default: ''
      },
      disabled: Boolean,
      size: {
        type: String as PropType<'small' | 'default' | 'large'>,
        default: 'default'
      },
      placeholder: {
        type: String,
        default: undefined
      },
      clearable: Boolean,
      popupVisible: Boolean,
      multiple: Boolean,
      multipleTags: {
        type: Array as PropType<{ label: string; key: string }[]>,
        default: () => []
      },
      filterable: {
        type: Boolean,
        default: false
      },
      popupRef: {
        type: Object,
        default: undefined
      }
    },
    emits: ['clear', 'tagClose', 'filter'],
    setup(props, { emit }) {
      const ns = getNamespace('select-trigger')
      const inputComponentRef = ref<InputInstance>()

      const readonly = computed(() => !props.filterable || props.multiple)
      const query = ref('')
      const multipleQuery = ref('')
      const placeholder = ref<string | undefined>()

      const setInputHeight = (height: string) => {
        const inputElement = inputComponentRef.value?.inputRef
        if (inputElement) {
          inputElement.style.height = height
        }
      }

      const multipleTagsRef = ref<HTMLElement>()

      const computedInputValue = computed({
        get() {
          if (props.multiple) {
            if (props.multipleTags.length) {
              return ' '
            }
          }
          if (props.filterable) return query.value
          return props.inputValue
        },
        set(val) {
          query.value = val
        }
      })

      const computedPlaceholder = computed(() => {
        if (props.multiple) {
          if (props.filterable) return ''
          if (props.multipleTags.length === 0) return props.placeholder
          return ''
        }
        if (props.filterable) return placeholder.value || props.placeholder
        return props.placeholder
      })

      const handleClick = () => {
        if (props.filterable) {
          query.value = ''
          placeholder.value = props.inputValue || props.placeholder
          emit('filter', query.value)
        }
      }

      const handleFocus = () => {
        if (props.filterable) {
          if (props.multiple) {
            inputComponentRef.value?.manualInputFocus()
          }
        }
      }

      const handleBlur = () => {
        if (props.filterable) {
          if (props.multiple) {
            multipleQuery.value = ''
          } else {
            query.value = props.inputValue
          }
        }
      }

      const handleClear = () => {
        if (props.filterable) {
          if (props.multiple) {
            multipleQuery.value = ''
          } else {
            placeholder.value = props.placeholder
          }
        }
        emit('clear')
      }

      const handleInput = () => {
        if (props.filterable) {
          if (props.multiple) {
            emit('filter', multipleQuery.value)
          } else {
            emit('filter', query.value)
          }
        }
      }

      watch(
        () => props.inputValue,
        (val) => {
          query.value = val
        },
        {
          immediate: true
        }
      )

      watch(
        () => props.multipleTags,
        (tags) => {
          if (!props.multiple) return
          nextTick(() => {
            if (tags.length === 0) {
              setInputHeight('')
              return
            }
            setInputHeight(multipleTagsRef.value?.clientHeight + 'px')
          })
        },
        { immediate: true }
      )

      // 点击弹出层为了能保持输入框的激活状态
      const popupTargetElementMousedown = (e: MouseEvent) => {
        e.preventDefault()
        inputComponentRef.value?.manualInputFocus()
      }

      const popupTargetElement = computed(() => {
        if (isElement(props.popupRef)) return props.popupRef
        if (isElement(props.popupRef?.$el)) return props.popupRef?.$el
        return null
      })

      watch(
        () => popupTargetElement.value,
        (el) => {
          if (!el) return
          nextTick(() => {
            el.addEventListener('mousedown', popupTargetElementMousedown)
          })
        }
      )

      onUnmounted(() => {
        popupTargetElement.value?.removeEventListener('mousedown', popupTargetElementMousedown)
      })

      return {
        ns,
        inputComponentRef,
        multipleTagsRef,
        readonly,
        computedPlaceholder,
        computedInputValue,
        handleClick,
        handleClear,
        handleFocus,
        handleBlur,
        handleInput,
        multipleQuery
      }
    }
  })
</script>

<template>
  <div :class="[ns]" @click.stop="handleClick">
    <BnInput
      ref="inputComponentRef"
      v-model="computedInputValue"
      :validate-event="false"
      :disabled="disabled"
      :size="size"
      :readonly="readonly"
      :placeholder="computedPlaceholder"
      :clearable="clearable"
      @clear="handleClear"
      @blur="handleBlur"
      @input="handleInput"
    >
      <template #suffix-icon>
        <BnIconCaret :class="[{ 'is-rotate': popupVisible }, `${ns}__icon-caret`]" />
      </template>
    </BnInput>
    <div v-if="multiple" ref="multipleTagsRef" :class="[`${ns}__multiple`]">
      <div
        v-for="(tag, index) in multipleTags"
        :key="`${tag.key}-${index}`"
        :class="[`${ns}__tag`, `is-${size}`]"
      >
        <span :class="[`${ns}__tag-text`]">{{ tag.label }}</span>
        <BnIconClose @click.stop="$emit('tagClose', tag)" />
      </div>

      <input
        v-if="multiple && filterable"
        v-model="multipleQuery"
        :placeholder="placeholder"
        :class="[`${ns}__input`]"
        type="text"
        @focus="handleFocus"
        @input="handleInput"
        @blur="handleBlur"
      />
    </div>
  </div>
</template>
