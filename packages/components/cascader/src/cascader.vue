<script lang="ts">
  import { computed, defineComponent, reactive, ref, watch, provide, toRefs } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'

  import Trigger from '../../trigger/src/trigger'

  import { useFormItem } from '../../form/src/hooks/use-form-item'
  import { NOOP } from '../../../shared/utils'
  import SelectTrigger from '../../common/select-trigger.vue'
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
      BasePanel,
      SelectTrigger
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

      const popupRef = ref()

      // TODO 从表单合并 disabled 属性
      const mergeDisabled = computed(() => props.disabled)
      const mergeSize = computed(() => props.size)

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

      const currentTagLabel = computed(() => {
        if (!props.multiple && pathValueToNodeKeys.value.length) {
          const node = dataMap.get(pathValueToNodeKeys.value[0])
          let label = node?.pathLabel?.join(props.separator)
          if (!props.showAllLevels) {
            label = node?.pathLabel?.[node!.pathLabel.length - 1]
          }
          if (props.inputLabelFormat && node?.pathLabel) {
            label = props.inputLabelFormat(node?.pathLabel)
          }
          return label
        }
        return ''
      })

      const multipleTags = computed(() => {
        if (!props.multiple) return []
        const tagLabels = pathValueToNodeKeys.value.map((nodeKey) => {
          const node = dataMap.get(nodeKey)
          return {
            label: node?.pathLabel?.join(props.separator),
            key: node?.key
          }
        })
        return tagLabels
      })

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
        handleClear,
        currentTagLabel,
        renderColumns,
        selectedPath,
        activeKey,
        multipleTags,
        handleTagClose,
        totalLevel,
        popupRef
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
          <SelectTrigger
            :input-value="currentTagLabel"
            :disabled="mergeDisabled"
            :size="mergeSize"
            :placeholder="placeholder"
            :clearable="clearable"
            :popup-visible="states.popupVisible"
            :multiple="multiple"
            :multiple-tags="multipleTags"
            :popup-ref="popupRef"
            @clear="handleClear"
            @tag-close="handleTagClose"
          />
        </slot>
      </template>

      <template #content>
        <BasePanel
          ref="popupRef"
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
