<script lang="ts">
  import type { PropType } from 'vue'
  import { defineComponent, computed, inject } from 'vue'
  import { getNamespace } from '../../../../utils/global-config'
  import type { TreeNode } from '../type'
  import { treeInjectKey } from '../context'
  import { BnIconArrowRight, BnIconDocument } from '../../../icon'

  export default defineComponent({
    name: 'TreeNode',
    components: {
      BnIconArrowRight,
      BnIconDocument
    },
    props: {
      node: {
        type: Object as PropType<TreeNode>,
        default: () => ({})
      }
    },
    setup(props) {
      const ns = getNamespace('tree')
      const treeContext = inject(treeInjectKey)
      const cls = computed(() => [
        `${ns}__node`,
        props.node.isLeaf && 'is-leaf',
        isSelected.value && 'is-selected'
      ])

      const showLine = computed(() => treeContext?.showLine)
      const isSelected = computed(() => treeContext?.selectedValues.includes(props.node.value))
      const blockNode = computed(() => treeContext?.blockNode)

      const handleItem = (node: TreeNode) => {
        treeContext?.toggleNodeExpand(node)
        treeContext?.handleNodeSelected(node)
      }
      const hasIndentVerticalLine = (indent: number) => {
        return showLine.value && indent
      }

      const hasPlaceholderBottomVerticalLine = () => {
        return showLine.value && !props.node.hasChildren && !props.node.lasted
      }

      return {
        ns,
        cls,
        showLine,
        blockNode,
        handleItem,
        hasIndentVerticalLine,
        hasPlaceholderBottomVerticalLine
      }
    }
  })
</script>

<template>
  <div :class="[cls]" :date-key="node.key" @click="handleItem(node)">
    <div :class="`${ns}__indent`">
      <span
        v-for="(indent, indentIndex) in node.indents"
        :key="indentIndex"
        :class="[`${ns}__indent-block`, { 'is-line': hasIndentVerticalLine(indent) }]"
      ></span>
    </div>
    <div :class="[`${ns}__placeholder`, { 'is-bottom-line': hasPlaceholderBottomVerticalLine() }]">
      <BnIconArrowRight v-if="node.hasChildren" :rotate="!node.unfold ? 0 : 90" />
      <BnIconDocument v-if="!node.hasChildren && showLine" />
    </div>
    <div :class="[`${ns}__node-label`, blockNode && 'is-block']"
      >{{ node.label }} 【{{ node.value }}】</div
    >
  </div>
</template>
