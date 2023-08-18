import { defineComponent, onUnmounted, provide, reactive, ref, toRefs, watch } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import { isArray } from '../../../utils/is'
import { treeProps } from './props'
import TreeNodeComp from './layout/node.vue'
import { transDataToNodes } from './utils'
import type { TreeData, TreeNode } from './type'
import { treeInjectKey } from './context'

import { useRenderFlattenNodes } from './hooks/use-render-flatten-nodes'
import { useSelected } from './hooks/use-selected'
import { useChecked } from './hooks/use-checked'

export default defineComponent({
  name: getComponentNamespace('Tree'),
  props: treeProps,
  emits: [
    'update:selected',
    'change-selected',
    'update:checked',
    'change-checked',
    'click-node',
    'unfold-node',
    'fold-node'
  ],
  setup(props, { slots, expose, emit }) {
    const {
      selected,
      checked,
      checkStrictly,
      showLine,
      defaultUnfoldAll,
      defaultUnfoldValues,
      multiple,
      showCheckbox,
      data,
      accordion,
      unfoldOnClickNode,
      checkedOnClickNode
    } = toRefs(props)
    const ns = getNamespace('tree')
    const nodes = ref<TreeNode[]>([])
    // 以value作为key的map
    const nodeValueMap = reactive(new Map<string, TreeNode>())
    const nodeKeyMap = reactive(new Map<string, TreeNode>())

    expose({})

    const { renderFlattenNodes, toggleNodeUnfoldOrFold } = useRenderFlattenNodes({
      nodes,
      nodeValueMap,
      originData: data,
      defaultUnfoldAll,
      defaultUnfoldValues,
      accordion
    })

    const { handleNodeSelected, selectedValues, focusNodeValues } = useSelected({
      selected,
      multiple,
      nodeValueMap
    })

    const { toggleNodeCheckStatus, checkedNodeKeys } = useChecked({
      checked,
      nodeValueMap,
      nodeKeyMap,
      checkStrictly
    })

    const clickNode = (node: TreeNode) => {
      emit('click-node', node)
    }

    provide(
      treeInjectKey,
      reactive({
        showLine,
        showCheckbox,
        checkStrictly,
        unfoldOnClickNode,
        checkedOnClickNode,
        selectedValues,
        focusNodeValues,
        checkedNodeKeys,
        nodeKeyMap,
        rootSlots: slots,
        toggleNodeUnfoldOrFold,
        handleNodeSelected,
        toggleNodeCheckStatus,
        clickNode
      })
    )

    const updateNodes = () => {
      if (isArray(props.data)) {
        nodes.value = transDataToNodes(props.data, {
          nodeValueMap,
          nodeKeyMap,
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
      nodeKeyMap.clear()
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
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getNodesByValues(values: (string | number)[]): TreeNode[] {
      return []
    },
    getSelectedNodes(): TreeNode[] {
      return []
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    unfoldNodes(values?: (number | string)[]) {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    foldNodes(values?: (number | string)[]) {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    insertNodes(parentValue: number | string, data: TreeData[]) {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeNodes(values: (number | string)[]) {}
  }
})
