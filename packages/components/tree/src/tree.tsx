import { defineComponent, reactive, ref, watch } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import { treeProps } from './props'
import TreeNodeComp from './layout/node.vue'
import { transDataToNodes } from './utils'
import type { TreeNode } from './type'

export default defineComponent({
  name: getComponentNamespace('Tree'),
  props: treeProps,
  emits: ['update:checkedKeys'],
  setup(props) {
    const ns = getNamespace('tree')
    // const innerCheckedKeys = ref([])
    // const computedCheckKeys = computed(() => props.checkedKeys ?? innerCheckedKeys.value)

    const nodes = ref<TreeNode[]>()
    const nodesMap = reactive(new Map<string, TreeNode>())

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
          {nodes.value?.map((node) => (
            <TreeNodeComp node={node} />
          ))}
        </div>
      )
    }
  }
})
