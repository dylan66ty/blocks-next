import { defineComponent, provide, reactive, ref, toRefs, watch } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import { treeProps } from './props'
import TreeNodeComp from './layout/node.vue'
import { transDataToNodes } from './utils'
import type { TreeNode } from './type'
import { useRenderFlattenNodes } from './hooks/use-render-flatten-nodes'
import { useSelected } from './hooks/use-selected'
import { treeInjectKey } from './context'

export default defineComponent({
  name: getComponentNamespace('Tree'),
  props: treeProps,
  emits: ['update:selected'],
  setup(props, { slots }) {
    const { selected, showLine, defaultExpandAll, multiple, blockNode } = toRefs(props)
    const ns = getNamespace('tree')
    const nodes = ref<TreeNode[]>([])
    const nodesMap = reactive(new Map<string, TreeNode>())

    const { renderFlattenNodes, toggleNodeExpand } = useRenderFlattenNodes({
      nodes,
      defaultExpandAll
    })

    const { handleNodeSelected, selectedValues } = useSelected({ selected, multiple, nodesMap })

    provide(
      treeInjectKey,
      reactive({
        showLine,
        blockNode,
        selectedValues,
        toggleNodeExpand,
        handleNodeSelected,
        rootSlots: slots
      })
    )

    watch(
      () => props.data,
      (newData) => {
        nodes.value = transDataToNodes(newData, { nodesMap })
      },
      { immediate: true }
    )

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
