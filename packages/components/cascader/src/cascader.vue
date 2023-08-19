<script lang="ts">
  import { computed, defineComponent, reactive, ref, watch, provide, toRefs } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'

  import Trigger from '../../trigger/src/trigger'

  import { useFormItem } from '../../form/src/hooks/use-form-item'
  import { NOOP } from '../../../shared/utils'
  import SelectTrigger from '../../common/select-trigger.vue'
  import { isFunction } from '../../../utils/is'
  import BasePanel from './base-panel'

  import { cascaderProps } from './props'
  import {
    transDataToNodes,
    formatModelValue,
    getLeafNodes,
    getLeafNodeKeys,
    getNodeKey,
    getAllLeafNodesByQuery
  } from './utils'

  import type { CascaderData, CascaderNode, QueryData } from './type'
  import { useSelectedPath } from './use-selected-path'
  import { cascaderInjectionKey } from './context'
  import QueryPanel from './query-panel.vue'

  export default defineComponent({
    name: getComponentNamespace('Cascader'),
    components: {
      Trigger,
      BasePanel,
      QueryPanel,
      SelectTrigger
    },
    props: cascaderProps,
    emits: ['update:modelValue', 'change'],
    setup(props, { slots, emit }) {
      const ns = getNamespace('cascader')
      const { formItem } = useFormItem()
      const popupVisible = ref(false)
      const totalLevel = ref(1)
      const popupRef = ref()
      // TODO 从表单合并 disabled 属性
      const mergeDisabled = computed(() => props.disabled)
      const mergeSize = computed(() => props.size)
      const nodesData = ref<CascaderNode[]>([])
      const nodesMap = reactive(new Map<string, CascaderNode>())
      const selfModel = ref<string[] | string[][]>([])
      // filterable
      const queryDataList = ref<QueryData[]>([])
      const isQueryPattern = ref(false)

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
        useSelectedPath(nodesData, { nodesMap, expandChild })

      const currentTagLabel = computed(() => {
        if (!props.multiple && pathValueToNodeKeys.value.length) {
          const node = nodesMap.get(pathValueToNodeKeys.value[0])
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
          const node = nodesMap.get(nodeKey)
          return {
            label: node?.pathLabel?.join(props.separator),
            key: node?.key
          }
        })
        return tagLabels
      })

      watch(
        () => popupVisible.value,
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
          nodesMap.clear()
          nodesData.value = transDataToNodes(newData, { nodesMap, totalLevel })
        },
        { immediate: true, deep: true }
      )

      const handlePopupVisibleChange = (visible: boolean) => {
        popupVisible.value = visible
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
        handlePopupVisibleChange(false)

        if (props.filterable) {
          queryDataList.value = []
          isQueryPattern.value = false
        }
      }

      // 过滤事件
      const handleFilter = (query: string) => {
        isQueryPattern.value = !!query
        if (!isQueryPattern.value) {
          queryDataList.value = []
          return
        }
        const leafNodes = getAllLeafNodesByQuery(nodesData.value, (node) => {
          let ret
          if (isFunction(props.filterMethod)) {
            ret = props.filterMethod(node, query)
          } else {
            ret = node.label && new RegExp(`${query}`, 'i').test(node.label)
          }
          return ret
        })
        // 从root到leaf依次向下查找
        const RE = new RegExp(`(${query})`, 'i')
        queryDataList.value = leafNodes.map((node) => {
          const isSelected = pathValueToNodeKeys.value.includes(node.key)
          return {
            key: node.key,
            label: node.pathLabel
              ?.join('/')
              .replace(RE, `<span style="color:var(--bn-danger)">$1</span>`),
            isSelected,
            node
          }
        }) as QueryData[]
      }

      const handleQueryTag = (queryData: QueryData) => {
        if (props.multiple) {
          queryData.isSelected = !queryData.isSelected
          if (queryData.isSelected) {
            selectMultiple(queryData.node, true)
          } else {
            selectMultiple(queryData.node, false)
          }
          return
        }
        const prevSelectTag = queryDataList.value.find((item) => item.isSelected)
        if (prevSelectTag) {
          prevSelectTag.isSelected = false
        }
        queryData.isSelected = !queryData.isSelected
        selectSingle(queryData.node)
      }

      // 删除多选时的标签
      const handleTagClose = (tag: Record<string, any>) => {
        const originPathValue = computedModelValue.value.map((m) => m.slice(0)) as string[][]
        const index = originPathValue.findIndex((path) => getNodeKey(path) === tag.key && tag.key)
        if (index < 0) return
        originPathValue.splice(index, 1)
        updatePathValue(originPathValue)

        if (props.filterable) {
          const keys = originPathValue.map((path) => getNodeKey(path))
          queryDataList.value.forEach((tag) => {
            tag.isSelected = keys.includes(tag.key)
          })
        }
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

      // check:当前选中还是取消
      const selectMultiple = (node: CascaderNode, checked: boolean) => {
        const originPathValue = computedModelValue.value.map((m) => m.slice(0)) as string[][]
        if (checked) {
          const pathValues: string[][] = [...originPathValue]
          const leafNodes = getLeafNodes(node)
          leafNodes.map((n) => pathValues.push(n.pathValue?.slice(0) ?? []))
          updatePathValue(pathValues)
        } else {
          const leafNodeKeysNodeKeys = getLeafNodeKeys(node)
          const pathValues: string[][] = []
          originPathValue.forEach((value) => {
            if (!leafNodeKeysNodeKeys.includes(value.join('-'))) {
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
        popupVisible,
        mergeDisabled,
        mergeSize,
        currentTagLabel,
        renderColumns,
        selectedPath,
        activeKey,
        multipleTags,
        totalLevel,
        popupRef,
        queryDataList,
        isQueryPattern,
        handleFilter,
        handleClear,
        handleTagClose,
        handleQueryTag,
        handlePopupVisibleChange
      }
    }
  })
</script>

<template>
  <div :class="[ns]">
    <Trigger
      v-model:popupVisible="popupVisible"
      position="bl"
      trigger="click"
      :unmount-on-close="false"
      animation-name="bn-slide-dynamic-origin"
      :popup-offset="8"
      :disabled="mergeDisabled"
    >
      <template #default>
        <slot name="trigger" :show="popupVisible">
          <SelectTrigger
            :input-value="currentTagLabel"
            :disabled="mergeDisabled"
            :size="mergeSize"
            :placeholder="placeholder"
            :clearable="clearable"
            :popup-visible="popupVisible"
            :multiple="multiple"
            :multiple-tags="multipleTags"
            :filterable="filterable"
            :popup-ref="popupRef"
            :card="card"
            @clear="handleClear"
            @filter="handleFilter"
            @tag-close="handleTagClose"
            @show="handlePopupVisibleChange(true)"
          />
        </slot>
      </template>

      <template #content>
        <BasePanel
          v-if="!isQueryPattern"
          ref="popupRef"
          :render-columns="renderColumns"
          :selected-path="selectedPath"
          :active-key="activeKey"
          :multiple="multiple"
          :check-strictly="checkStrictly"
          :total-level="totalLevel"
          :show-footer="showFooter"
        />

        <QueryPanel
          v-if="isQueryPattern"
          ref="popupRef"
          :query-data-list="queryDataList"
          @on-tag="handleQueryTag"
        />
      </template>
    </Trigger>
  </div>
</template>
