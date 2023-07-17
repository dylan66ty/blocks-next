<script lang="ts">
  import {
    computed,
    defineComponent,
    inject,
    getCurrentInstance,
    onBeforeUnmount,
    ref,
    onMounted
  } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
  import CheckIcon from '../../icon/src/base/check.vue'
  import { selectInjectKey } from './context'

  export default defineComponent({
    name: getComponentNamespace('Option'),
    components: {
      CheckIcon
    },
    props: {
      value: {
        required: true,
        type: [String, Number, Boolean, Object]
      },
      label: {
        type: [String, Number],
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      const ns = getNamespace('select-menu')

      const selectContext = inject(selectInjectKey)

      // 是否选中
      const isSelected = ref(false)
      // 是否hover
      const isHover = ref(false)
      // 是否可见（过滤）
      const visible = ref(true)

      const multiple = computed(() => selectContext?.multiple)

      const cls = computed(() => {
        return [
          `${ns}__item`,
          isHover.value && 'is-hover',
          props.disabled && `is-disabled`,
          isSelected.value && 'is-selected'
        ]
      })

      const currentLabel = computed(() => {
        return props.label
      })

      const currentValue = computed(() => {
        return props.value
      })

      const optVmProxy = getCurrentInstance()!.proxy as any

      const optionItemHoverChange = () => {
        if (!props.disabled) {
          selectContext?.optionItemHoverChange(optVmProxy)
        }
      }

      const optionItemSelect = () => {
        if (props.disabled) return
        selectContext?.optionItemSelect(optVmProxy)
      }

      onMounted(() => {
        selectContext?.optionItemCreate(optVmProxy)
      })

      onBeforeUnmount(() => {
        selectContext?.optionItemDestroy(optVmProxy)
      })

      return {
        cls,
        currentLabel,
        currentValue,
        optionItemHoverChange,
        optionItemSelect,
        multiple,

        visible,
        isHover,
        isSelected
      }
    }
  })
</script>

<template>
  <div
    v-show="visible"
    :class="cls"
    @mouseenter.stop="optionItemHoverChange"
    @click.stop="optionItemSelect"
  >
    <slot>
      <span>{{ currentLabel }}</span>
    </slot>

    <CheckIcon v-if="multiple && isSelected" />
  </div>
</template>
