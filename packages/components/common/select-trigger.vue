<script lang="ts">
  import type { PropType } from 'vue'
  import { defineComponent, ref, watch, computed, onUnmounted, onMounted } from 'vue'
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
    emits: ['show', 'clear', 'tagClose', 'filter'],
    setup(props, { emit }) {
      const ns = getNamespace('select-trigger')

      const selectTriggerDomRef = ref<HTMLElement>()
      const inputComponentRef = ref<InputInstance>()
      const multipleInputRef = ref<HTMLElement>()

      const readonly = computed(() => !props.filterable || props.multiple || !props.popupVisible)
      const multipleInputReadonly = computed(() => props.filterable && !props.popupVisible)
      const query = ref('')
      const multipleQuery = ref('')
      const placeholder = ref<string | undefined>()

      const setLayoutInputHeight = () => {
        const height = multipleTagsRef.value?.clientHeight + 'px'
        const inputElement = inputComponentRef.value?.inputRef
        if (inputElement) {
          inputElement.style.transition = 'height 0.15s'
          if (props.multipleTags.length) {
            inputElement.style.height = height
          } else {
            inputElement.style.height = ''
          }
        }
      }

      const multipleTagsRef = ref<HTMLElement>()

      const addMultipleTag = () => {
        setLayoutInputHeight()
      }
      const removeMultipleTag = () => {
        setLayoutInputHeight()
      }

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
          if (multipleQuery.value.length) return ''
          if (props.multipleTags.length === 0) return props.placeholder
          return ''
        }
        if (props.filterable) return placeholder.value || props.placeholder
        return props.placeholder
      })

      const handleSelectTrigger = () => {
        if (!props.filterable) return
        if (props.multiple) {
          multipleQuery.value = ''
          multipleInputRef.value?.focus()
          inputComponentRef.value?.setFocus(true)
        } else {
          query.value = ''
          placeholder.value = props.inputValue || props.placeholder
        }
        if (!props.popupVisible) {
          emit('filter', '')
        } else {
          resetQuery()
        }
      }

      const resetQuery = () => {
        if (!props.filterable) return
        if (props.multiple) {
          multipleQuery.value = ''
        } else {
          query.value = props.inputValue
        }
      }

      const handleClear = () => {
        if (props.multiple) {
          multipleQuery.value = ''
        } else {
          query.value = ''
          placeholder.value = props.placeholder
        }
        emit('clear')
        emit('filter', '')
      }

      const onInputEvent = () => {
        if (!props.filterable) return
        if (props.multiple) {
          emit('filter', multipleQuery.value)
        } else {
          emit('filter', query.value)
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

      const popupTargetElement = computed(() => {
        if (isElement(props.popupRef)) return props.popupRef
        if (isElement(props.popupRef?.$el)) return props.popupRef?.$el
        return null
      })

      const clickOutside = (e: MouseEvent) => {
        const el = e.target as HTMLElement
        const deps: HTMLElement[] = [popupTargetElement.value, selectTriggerDomRef.value]
        const inner = deps.some((container) => container.contains(el))
        inputComponentRef.value?.setFocus(inner)
        !inner && resetQuery()
      }

      const handleMultipleInput = () => {
        resetQuery()
        emit('filter', '')
        if (!props.popupVisible) {
          emit('show')
        }
      }

      onMounted(() => {
        document.body.addEventListener('click', clickOutside, true)
      })

      onUnmounted(() => {
        document.body.removeEventListener('click', clickOutside, true)
      })

      return {
        ns,
        inputComponentRef,
        multipleTagsRef,
        readonly,
        multipleInputReadonly,
        computedPlaceholder,
        computedInputValue,
        handleSelectTrigger,
        handleClear,
        onInputEvent,
        multipleQuery,
        selectTriggerDomRef,
        addMultipleTag,
        removeMultipleTag,
        multipleInputRef,
        resetQuery,
        handleMultipleInput
      }
    }
  })
</script>

<template>
  <div ref="selectTriggerDomRef" :class="[ns]" @click.stop="handleSelectTrigger">
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
      @input="onInputEvent"
    >
      <template #suffix-icon>
        <BnIconCaret :class="[{ 'is-rotate': popupVisible }, `${ns}__icon-caret`]" />
      </template>
    </BnInput>
    <div v-if="multiple" ref="multipleTagsRef" :class="[`${ns}__multiple`, `is-${size}`]">
      <transition-group
        name="bn-zoom-in"
        appear
        @enter="addMultipleTag"
        @after-leave="removeMultipleTag"
      >
        <div v-for="tag in multipleTags" :key="`${tag.key}`" :class="[`${ns}__tag`, `is-${size}`]">
          <span :class="[`${ns}__tag-text`]">{{ tag.label }}</span>
          <BnIconClose @click.stop="$emit('tagClose', tag)" />
        </div>
      </transition-group>

      <input
        v-if="multiple && filterable"
        ref="multipleInputRef"
        v-model="multipleQuery"
        :readonly="multipleInputReadonly"
        :class="[`${ns}__input`, `is-${size}`]"
        autocomplete="false"
        type="text"
        @input="onInputEvent"
        @click.stop="handleMultipleInput"
      />
    </div>
  </div>
</template>
