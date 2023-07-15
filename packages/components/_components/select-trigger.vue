<script lang="ts">
  import type { PropType } from 'vue'
  import { defineComponent, ref, watch, nextTick, computed, onUnmounted } from 'vue'
  import { getNamespace } from '../../utils/global-config'

  import BnInput from '../input'
  import CaretIcon from '../icon/src/base/caret.vue'
  import CloseIcon from '../icon/src/base/close.vue'

  import type { InputInstance } from './input'

  export default defineComponent({
    name: 'SelectTrigger',
    components: {
      BnInput,
      CaretIcon,
      CloseIcon
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
      searchable: {
        type: Boolean,
        default: false
      },
      searchMethod: {
        type: Function,
        default: () => {}
      },
      popupRef: {
        type: Object,
        default: undefined
      }
    },
    emits: ['clear', 'tagClose'],
    setup(props) {
      const ns = getNamespace('select-trigger')
      const inputComponentRef = ref<InputInstance>()

      const readonly = computed(() => !props.searchable)

      const setInputHeight = (height: string) => {
        const inputElement = inputComponentRef.value?.inputRef
        if (inputElement) {
          inputElement.style.height = height
        }
      }

      const multipleTagsRef = ref<HTMLElement>()

      watch(
        () => props.multipleTags,
        (tags) => {
          if (!props.multiple) return
          nextTick(() => {
            if (tags.length <= 1) {
              setInputHeight('')
              return
            }
            setInputHeight(multipleTagsRef.value?.clientHeight + 'px')
          })
        },
        { immediate: true }
      )

      // 点击弹出层为了能保持输入框的激活状态
      const popupTargetElement = (e: PointEvent) => {
        e.preventDefault()
        inputComponentRef.value.manualInputFocus()
      }

      nextTick(() => {
        ;(props.popupRef?.$el as HTMLElement)?.addEventListener('mousedown', popupTargetElement)
      })

      onUnmounted(() => {
        ;(props.popupRef?.$el as HTMLElement)?.removeEventListener('mousedown', popupTargetElement)
      })

      return {
        ns,
        inputComponentRef,
        multipleTagsRef,
        readonly
      }
    }
  })
</script>

<template>
  <div :class="[ns]">
    <BnInput
      ref="inputComponentRef"
      :model-value="inputValue"
      :validate-event="false"
      :disabled="disabled"
      :size="size"
      :readonly="readonly"
      :placeholder="placeholder"
      :clearable="clearable"
      @clear="$emit('clear')"
    >
      <template #suffix-icon>
        <CaretIcon :class="[{ 'is-rotate': popupVisible }, `${ns}__icon-caret`]" />
      </template>
    </BnInput>
    <div v-if="multiple && multipleTags.length" ref="multipleTagsRef" :class="[`${ns}__multiple`]">
      <div
        v-for="(tag, index) in multipleTags"
        :key="`${tag.key}-${index}`"
        :class="[`${ns}__tag`, `is-${size}`]"
      >
        <span :class="[`${ns}__tag-text`]">{{ tag.label }}</span>
        <CloseIcon @click.stop="$emit('tagClose', tag)" />
      </div>
    </div>
  </div>
</template>
