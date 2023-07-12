<script lang="ts">
  import { computed, defineComponent, reactive, ref, watch, provide, nextTick, toRefs } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'

  import Trigger from '../../trigger/src/trigger'
  import type { InputInstance } from '../../input'
  import BnInput from '../../input'
  import CaretIcon from '../../icon/src/base/caret.vue'
  import CloseIcon from '../../icon/src/base/close.vue'

  import { useFormItem } from '../../form/src/hooks/use-form-item'
  import { NOOP } from '../../../shared/utils'
  import BasePanel from './base-panel'

  import { cascaderProps } from './props'
  import { transData, formatModelValue, getLeafNodes, getLeafNodeKeys, getNodeKey } from './utils'

  import type { CascaderData, CascaderNode } from './type'
  import { useSelectedPath } from './use-selected-path'
  import { cascaderInjectionKey } from './context'

  export default defineComponent({
    name: getComponentNamespace('Cascader'),
    components: {
      Trigger,
      BnInput,
      CaretIcon,
      CloseIcon,
      BasePanel
    },
    props: cascaderProps,
    emits: ['update:modelValue', 'change'],
    setup(props, { slots, emit }) {
      const ns = getNamespace('cascader')

      const { formItem } = useFormItem()

      const states = reactive({
        popupVisible: false
      })

      const totalLevel = ref(1)

      // TODO 从表单合并 disabled 属性
      const mergeDisabled = computed(() => props.disabled)
      const mergeSize = computed(() => props.size)

      const mergePlaceholder = computed(() => {
        if (props.multiple) {
          if (pathValueToNodeKeys.value.length === 0) return props.placeholder
          return ''
        }
        return props.placeholder
      })

      const inputReadonly = computed(() => true)
      const inputRef = ref<InputInstance>()

      const dataTree = ref<CascaderNode[]>([])
      const dataMap = reactive(new Map<string, CascaderNode>())

      const selfModel = ref<string[] | string[][]>([])

      const computedModelValue = computed(() => {
        return props.modelValue || selfModel.value
      })

      const pathValueToNodeKeys = computed(() => {
        // 多选时 二维数据处理 [[1,2,3],[4,5,6]] => ['1-2-3','4-5-6']
        // 单选 [1,2,3] => ['1-2-3']
        const values = formatModelValue(computedModelValue.value, {
          multiple: props.multiple
        })

        return values
      })

      const { expandChild } = toRefs(props)
      const { renderColumns, selectedPath, setSelectedPath, activeKey, setActiveKey } =
        useSelectedPath(dataTree, { dataMap, expandChild })

      const computedInputLabel = computed(() => {
        if (!props.multiple && pathValueToNodeKeys.value.length) {
          const node = dataMap.get(pathValueToNodeKeys.value[0])
          let label = node?.pathLabel?.join(props.separator)
          if (props.inputLabelFormat && node?.pathLabel) {
            label = props.inputLabelFormat(node?.pathLabel)
          }
          return label
        }

        //  仅仅为了input的占位符 显示close图标
        if (props.multiple && pathValueToNodeKeys.value.length) {
          return ' '
        }

        return ''
      })

      const multipleTags = computed(() => {
        const tagLabels = pathValueToNodeKeys.value.map((nodeKey) => {
          const node = dataMap.get(nodeKey)
          return {
            label: node?.pathLabel?.join(props.separator),
            key: node?.key
          }
        })
        return tagLabels
      })

      const inputHeight = ref<string>('')
      const multipleTagsRef = ref<HTMLElement>()

      watch(
        pathValueToNodeKeys,
        (nodeKeys) => {
          nextTick(() => {
            if (nodeKeys.length <= 1) {
              inputHeight.value = ''
              return
            }
            inputHeight.value = multipleTagsRef.value?.clientHeight + 'px'
          })
        },
        { immediate: true }
      )

      watch(
        () => states.popupVisible,
        (value) => {
          if (value) {
            const nodeKeys = pathValueToNodeKeys.value
            if (nodeKeys.length > 0) {
              // 默认选中最后一个nodeKey
              const lastNodeKey = nodeKeys[nodeKeys.length - 1]
              setSelectedPath(lastNodeKey)
              setActiveKey(lastNodeKey)
            }

            nextTick(() => manualFocusInput())
          }
        }
      )

      watch(
        () => props.data,
        (newData: CascaderData[]) => {
          dataTree.value = transData(newData, { dataMap, totalLevel })
        },
        { immediate: true, deep: true }
      )

      const handlePopupVisibleChange = (visible: boolean) => {
        states.popupVisible = visible
      }

      const updatePathValue = (pathValue: string[] | string[][]) => {
        emit('update:modelValue', pathValue)
        emit('change', pathValue)
        selfModel.value = pathValue

        // 表单验证
        if (props.validateEvent) {
          formItem?.validate?.('change').catch(NOOP)
        }
      }

      // 清空事件
      const handleClear = () => {
        updatePathValue([])
        setActiveKey()
        setSelectedPath()
      }

      // 删除多选时的标签
      const handleTagClose = (tag: Record<string, any>) => {
        const originPathValue = computedModelValue.value.map((m) => m.slice(0)) as string[][]
        const index = originPathValue.findIndex((val) => getNodeKey(val) === tag.key && tag.key)
        if (index < 0) return
        originPathValue.splice(index, 1)
        updatePathValue(originPathValue)
      }

      const selectSingle = (node: CascaderNode) => {
        const pathValue: string[] = node.pathValue!.slice(0)
        handlePopupVisibleChange(false)
        // 当前node已被选中 就不会出发更新行为
        if (pathValueToNodeKeys.value.includes(node.key)) {
          return
        }
        setActiveKey(node.key)
        updatePathValue(pathValue)
      }

      const selectMultiple = (node: CascaderNode, checked: boolean) => {
        const originPathValue = computedModelValue.value.map((m) => m.slice(0)) as string[][]
        if (checked) {
          const pathValues: string[][] = [...originPathValue]
          if (node.isLeaf) {
            pathValues.push(node.pathValue?.slice(0) ?? [])
          }
          const leafsNodes = getLeafNodes(node)
          leafsNodes.map((n) => pathValues.push(n.pathValue?.slice(0) ?? []))

          updatePathValue(pathValues)
        } else {
          const leafsNodeKeys = getLeafNodeKeys(node)
          const pathValues: string[][] = []
          if (node.isLeaf) {
            leafsNodeKeys.push(node.key)
          }
          originPathValue.forEach((value) => {
            if (!leafsNodeKeys.includes(value.join('-'))) {
              pathValues.push(value)
            }
          })
          updatePathValue(pathValues)
        }
      }

      const manualFocusInput = () => {
        nextTick(() => inputRef.value?.inputRef?.focus())
      }

      const footerOps = {
        handleCancel() {
          handleClear()
          handlePopupVisibleChange(false)
        },
        handleOk() {
          handlePopupVisibleChange(false)
        }
      }

      const emitPath = (node: CascaderNode, checked?: boolean) => {
        if (!props.multiple) {
          selectSingle(node)
        } else {
          selectMultiple(node, checked ?? true)
        }

        manualFocusInput()
      }

      provide(
        cascaderInjectionKey,
        reactive({
          slots,
          setSelectedPath,
          emitPath,
          setActiveKey,
          nodeKeys: pathValueToNodeKeys,
          footer: footerOps
        })
      )

      return {
        ns,
        states,
        mergeDisabled,
        mergeSize,
        mergePlaceholder,
        inputReadonly,
        inputRef,
        handleClear,
        computedInputLabel,
        renderColumns,
        selectedPath,
        activeKey,
        multipleTags,
        multipleTagsRef,
        inputHeight,
        handleTagClose,
        totalLevel
      }
    }
  })
</script>

<template>
  <div :class="[ns]">
    <Trigger
      v-model:popupVisible="states.popupVisible"
      position="bl"
      trigger="click"
      :unmount-on-close="false"
      animation-name="bn-slide-dynamic-origin"
      :popup-offset="8"
      :disabled="mergeDisabled"
    >
      <template #default>
        <slot name="trigger">
          <div :class="[`${ns}__trigger`]">
            <BnInput
              ref="inputRef"
              :style="{ height: inputHeight }"
              :validate-event="false"
              :disabled="mergeDisabled"
              :model-value="computedInputLabel"
              :size="mergeSize"
              :readonly="inputReadonly"
              :placeholder="mergePlaceholder"
              :clearable="clearable"
              @clear="handleClear"
            >
              <template #suffix-icon>
                <CaretIcon :class="[{ 'is-rotate': states.popupVisible }, `${ns}__icon-caret`]" />
              </template>
            </BnInput>
            <div
              v-if="multiple && multipleTags.length"
              ref="multipleTagsRef"
              :class="[`${ns}__multiple`]"
            >
              <div
                v-for="(tag, index) in multipleTags"
                :key="`${tag.key}-${index}`"
                :class="[`${ns}__tag`]"
              >
                <span :class="[`${ns}__tag-text`]">{{ tag.label }}</span>
                <CloseIcon @click.stop="handleTagClose(tag)" />
              </div>
            </div>
          </div>
        </slot>
      </template>

      <template #content>
        <BasePanel
          :class="[popupClass]"
          :render-columns="renderColumns"
          :selected-path="selectedPath"
          :active-key="activeKey"
          :multiple="multiple"
          :check-strictly="checkStrictly"
          :total-level="totalLevel"
          :show-footer="showFooter"
        />
      </template>
    </Trigger>
  </div>
</template>
