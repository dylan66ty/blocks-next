import { defineComponent, onUnmounted, provide, reactive, ref, toRefs, watch } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import { isArray } from '../../../utils/is'
import { treeProps } from './props'
import TreeNodeComp from './layout/node.vue'
import { transDataToNodes } from './utils'
import type { TreeNode } from './type'
import { treeInjectKey } from './context'

import { useRenderFlattenNodes } from './hooks/use-render-flatten-nodes'
import { useSelected } from './hooks/use-selected'
import { useChecked } from './hooks/use-checked'

export default defineComponent({
  name: getComponentNamespace('Tree'),
  props: treeProps,
  emits: ['update:selected', 'update:checked'],
  setup(props, { slots, expose }) {
    const {
      selected,
      checked,
      checkStrictly,
      showLine,
      defaultUnfoldAll,
      defaultUnfoldValues,
      multiple,
      blockNode,
      showCheckbox,
      data,
      accordion
    } = toRefs(props)
    const ns = getNamespace('tree')
    const nodes = ref<TreeNode[]>([])
    // 以value作为key的map
    const nodeValueMap = reactive(new Map<string, TreeNode>())
    const nodePathMap = reactive(new Map<string, TreeNode>())

    expose({})

    const { renderFlattenNodes, toggleNodeUnfoldOrFold } = useRenderFlattenNodes({
      nodes,
      nodeValueMap,
      originData: data,
      defaultUnfoldAll,
      defaultUnfoldValues,
      accordion
    })

    const { handleNodeSelected, selectedValues } = useSelected({
      selected,
      multiple,
      nodeValueMap
    })

    const { toggleNodeCheckStatus, checkedNodesPathKeys } = useChecked({
      checked,
      nodeValueMap,
      nodePathMap,
      checkStrictly
    })

    provide(
      treeInjectKey,
      reactive({
        showLine,
        blockNode,
        showCheckbox,
        checkStrictly,
        selectedValues,
        checkedNodesPathKeys,
        nodePathMap,
        rootSlots: slots,
        toggleNodeUnfoldOrFold,
        handleNodeSelected,
        toggleNodeCheckStatus
      })
    )

    const updateNodes = () => {
      if (isArray(props.data)) {
        nodes.value = transDataToNodes(props.data, {
          nodeValueMap,
          nodePathMap,
          checkStrictly: props.checkStrictly
        })
      }
    }

    watch(() => props.data, updateNodes, { immediate: true, deep: true })

    watch(
      () => props.checkStrictly,
      () => {
        updateNodes()
      }
    )

    onUnmounted(() => {
      nodeValueMap.clear()
      nodePathMap.clear()
      nodes.value = []
    })

    return () => {
      return (
        <div class={ns}>
          {renderFlattenNodes.value?.map((node) => (
            <TreeNodeComp node={node} key={node.key} />
          ))}
        </div>
      )
    }
  }
})
