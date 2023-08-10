<script lang="ts">
  import type { PropType } from 'vue'
  import { defineComponent, computed, inject } from 'vue'
  import { getNamespace } from '../../../../utils/global-config'
  import type { TreeNode } from '../type'
  import { treeInjectKey } from '../context'
  import { BnIconArrowRight } from '../../../icon'
  import { Checkbox } from '../../../checkbox'
  import RenderSlotFunction from '../../../common/render-slot-function'
  import { getCheckedStatus } from '../utils'

  export default defineComponent({
    name: 'TreeNode',
    components: {
      BnIconArrowRight,
      Checkbox,
      RenderSlotFunction
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
      const showCheckbox = computed(() => treeContext?.showCheckbox)
      const rootSlots = computed(() => treeContext?.rootSlots)

      const handleNodeSelected = () => {
        if (props.node.disabled) return
        treeContext?.handleNodeSelected(props.node)
      }

      const toggleNodeUnfoldOrFold = () => {
        treeContext?.toggleNodeUnfoldOrFold(props.node)
      }

      const toggleNodeCheckStatus = (checked: boolean) => {
        treeContext?.toggleNodeCheckStatus(props.node, checked)
      }

      const hasIndentVerticalLine = (indent: number) => {
        return showLine.value && indent
      }

      const hasPlaceholderBottomVerticalLine = () => {
        return showLine.value && !props.node.hasChildren && !props.node.lasted
      }

      const checkedStatus = computed(() => {
        return getCheckedStatus(props.node, treeContext?.checkedNodesPathKeys as string[])
      })

      return {
        ns,
        cls,
        showLine,
        blockNode,
        showCheckbox,
        rootSlots,
        checkedStatus,
        toggleNodeUnfoldOrFold,
        handleNodeSelected,
        toggleNodeCheckStatus,
        hasIndentVerticalLine,
        hasPlaceholderBottomVerticalLine
      }
    }
  })
</script>

<template>
  <div :class="[cls]" :date-key="node.key">
    <div :class="`${ns}__indent`">
      <span
        v-for="(indent, indentIndex) in node.indents"
        :key="indentIndex"
        :class="[`${ns}__indent-block`, { 'is-line': hasIndentVerticalLine(indent) }]"
      ></span>
    </div>
    <div
      :class="[
        `${ns}__placeholder`,
        {
          'is-bottom-line': hasPlaceholderBottomVerticalLine(),
          'is-leaf': !node.hasChildren
        }
      ]"
      @click="toggleNodeUnfoldOrFold"
    >
      <RenderSlotFunction :slot-fn="rootSlots?.['node-icon']" :node="node">
        <BnIconArrowRight v-if="node.hasChildren" :rotate="!node.unfold ? 0 : 90" />
      </RenderSlotFunction>
    </div>
    <div :class="[`${ns}__checkbox`]">
      <Checkbox
        :disabled="node.disabled"
        :model-value="checkedStatus.checked"
        :indeterminate="checkedStatus.indeterminate"
        :validate-event="false"
        @change="toggleNodeCheckStatus"
        @click.stop
      />
    </div>
    <div
      :class="[
        `${ns}__node-label`,
        {
          'is-block': blockNode,
          'is-disabled': node.disabled
        }
      ]"
      @click="handleNodeSelected"
    >
      <RenderSlotFunction :slot-fn="rootSlots?.['node-label']" :node="node">
        {{ node.label }} 【{{ node.value }}】 ({{ node.totalLeafNumber }})
      </RenderSlotFunction>
    </div>

    <div v-if="rootSlots?.['node-extra']" :class="[`${ns}__node-extra`]">
      <RenderSlotFunction :slot-fn="rootSlots?.['node-extra']" :node="node" />
    </div>
  </div>
</template>
