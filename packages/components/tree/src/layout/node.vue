<script lang="ts">
  import type { PropType } from 'vue'
  import { defineComponent, computed, toRefs } from 'vue'
  import { getNamespace } from '../../../../utils/global-config'
  import type { TreeNode } from '../type'

  export default defineComponent({
    name: 'TreeNode',
    props: {
      node: {
        type: Object as PropType<TreeNode>,
        default: () => ({})
      }
    },
    setup(props) {
      const ns = getNamespace('tree-node')
      const { node } = toRefs(props)
      const cls = computed(() => [ns, node.value.isLeaf && 'is-leaf'])
      return {
        ns,
        cls
      }
    }
  })
</script>

<template>
  <div :class="[cls]">node</div>
</template>
