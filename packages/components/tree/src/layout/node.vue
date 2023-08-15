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
        isSelected.value && 'is-selected',
        isFocus.value && 'is-focus'
      ])

      const showLine = computed(() => treeContext?.showLine)
      const isSelected = computed(() => treeContext?.selectedValues.includes(props.node.value))
      const showCheckbox = computed(() => treeContext?.showCheckbox)
      const rootSlots = computed(() => treeContext?.rootSlots)
      const isFocus = computed(() => treeContext?.focusNodeValues.includes(props.node.value))

      const unfoldOnClickNode = computed(() => treeContext?.unfoldOnClickNode)

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

      const handleNodeItem = () => {
        treeContext?.clickNode(props.node)
        if (unfoldOnClickNode.value) {
          toggleNodeUnfoldOrFold()
        }
        handleNodeSelected()
      }

      const hasIndentVerticalLine = (indent: number) => {
        return showLine.value && indent
      }

      const hasPlaceholderBottomVerticalLine = () => {
        return showLine.value && !props.node.hasChildren && !props.node.lasted
      }

      const checkedStatus = computed(() => {
        // 父子节点无关联关系
        if (treeContext?.checkStrictly) {
          return {
            checked: treeContext.checkedNodeKeys.includes(props.node.key),
            indeterminate: false
          }
        }
        // 父子存在关联关系
        return getCheckedStatus(props.node, treeContext?.checkedNodeKeys, treeContext?.nodeKeyMap)
      })

      return {
        ns,
        cls,
        showLine,
        showCheckbox,
        rootSlots,
        checkedStatus,
        handleNodeItem,
        toggleNodeCheckStatus,
        toggleNodeUnfoldOrFold,
        hasIndentVerticalLine,
        hasPlaceholderBottomVerticalLine
      }
    }
  })
</script>

<template>
  <div :class="[cls]" :date-key="node.key" :data-deep="node.deep" @click="handleNodeItem">
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
      @click.stop="toggleNodeUnfoldOrFold"
    >
      <RenderSlotFunction :slot-fn="rootSlots?.['node-icon']" :node="node">
        <BnIconArrowRight v-if="node.hasChildren" :rotate="!node.unfold ? 0 : 90" />
      </RenderSlotFunction>
    </div>
    <div v-if="showCheckbox" :class="[`${ns}__checkbox`]">
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
          'is-disabled': node.disabled
        }
      ]"
    >
      <RenderSlotFunction :slot-fn="rootSlots?.['node-label']" :node="node">
        {{ node.label }}
      </RenderSlotFunction>
    </div>

    <div v-if="rootSlots?.['node-extra']" :class="[`${ns}__node-extra`]" @click.stop>
      <RenderSlotFunction :slot-fn="rootSlots?.['node-extra']" :node="node" />
    </div>
  </div>
</template>
