<script lang="ts">
  import type { WritableComputedRef } from 'vue'
  import { computed, defineComponent, nextTick, ref, watch } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
  import Trigger from '../../trigger/src/trigger'
  import SelectTrigger from '../../common/select-trigger.vue'
  import { Scrollbar } from '../../scrollbar'
  import type { TreeData, TreeInstance } from '../../tree'
  import { Tree } from '../../tree'
  import { Empty } from '../../empty'
  import { BnIconEmpty } from '../../icon'
  import { debounce } from '../../../utils/throttle-debounce'

  // 表单
  import { useFormItem } from '../../form/src/hooks/use-form-item'
  import { NOOP } from '../../../shared/utils'
  import { treeSelectProps } from './props'

  export default defineComponent({
    name: getComponentNamespace('TreeSelect'),
    components: {
      Trigger,
      SelectTrigger,
      Scrollbar,
      Tree,
      Empty,
      BnIconEmpty
    },
    props: treeSelectProps,
    emits: ['update:modelValue', 'show', 'hide', 'change', 'clear'],
    setup(props, { emit }) {
      const ns = getNamespace('tree-select')

      const popupVisible = ref(false)

      const mergeDisabled = computed(() => props.disabled)
      const mergeSize = computed(() => props.size)
      const placeholder = computed(() => props.placeholder)

      const changePopupVisible = (visible: boolean) => {
        popupVisible.value = visible
      }

      const popupRef = ref<HTMLElement>()
      const inputValue = ref('')
      const multipleTags = ref<
        {
          key: string
          label: string
        }[]
      >([])

      const isEmpty = computed(() => props.data.length === 0)

      // tree
      const treeRef = ref<TreeInstance>()
      const modelType = computed(() => (props.multiple ? 'checked' : 'selected'))
      const selected: WritableComputedRef<(number | string)[]> = computed({
        get() {
          return props.modelValue
        },
        set(val) {
          emit('update:modelValue', val)
        }
      })
      const treeDataCache = ref<TreeData[]>([])
      const treeRenderData = ref<TreeData[]>([])

      const onChangeChecked = (values: (number | string)[]) => {
        selected.value = values
        emit('change', values)
      }

      const onChangeSelected = (values: (number | string)[]) => {
        selected.value = values
        emit('change', values)
        changePopupVisible(false)
      }
      const treeBindEvents = computed(() => {
        const events: Record<string, (values: (number | string)[]) => void> = {}
        if (props.multiple) {
          events.changeChecked = onChangeChecked
        } else {
          events.changeSelected = onChangeSelected
        }
        return events
      })
      // 表单验证
      const { formItem } = useFormItem()

      watch(
        () => selected.value,
        async (values) => {
          await nextTick()
          const nodes = treeRef.value?.getNodesByValues(values)
          if (!props.multiple) {
            inputValue.value = nodes?.[0]?.label as string
          } else {
            multipleTags.value = nodes?.map((node) => {
              return {
                key: node.value,
                label: node.label
              }
            }) as {
              key: string
              label: string
            }[]
          }
        },
        { immediate: true }
      )

      watch(
        () => props.data,
        (newData) => {
          treeDataCache.value = newData.slice()
          treeRenderData.value = newData.slice()
        },
        { immediate: true }
      )

      const onShow = () => {
        emit('show')
      }
      const onHide = () => {
        emit('hide')
      }
      const handleClear = () => {
        emit('update:modelValue', [])
        emit('clear')
      }
      const handleTagClose = (tag: { key: string; label: string }) => {
        const tags = multipleTags.value.slice()
        const originSelectedValues = selected.value.slice()
        const key = tag.key
        const index = tags.findIndex((tag) => tag.key === key)
        if (~index) {
          tags.splice(index, 1)
          originSelectedValues.splice(index, 1)
          multipleTags.value = tags

          emit('update:modelValue', originSelectedValues)
        }
      }

      const handleFilter = debounce(
        (query: string) => {
          const stack = treeDataCache.value.slice()
          if (!query) {
            treeRenderData.value = stack
            return
          }

          const matcher: TreeData[] = []
          const filterMethod = props.filterMethod

          while (stack.length) {
            const item = stack.shift() as TreeData
            const RE = new RegExp(`${query}`, 'ig')
            let existing = true

            if (filterMethod) {
              existing = filterMethod(treeRef.value?.getNodesByValues([item.value])[0], query)
            } else {
              existing = RE.test(item.label as string)
            }

            if (existing) {
              matcher.push(item)
            } else {
              const children = item?.children
              if (children) {
                for (let i = 0; i < children.length; i++) {
                  stack.push(children[i])
                }
              }
            }
          }
          treeRenderData.value = matcher

          nextTick(() => {
            treeRef.value?.unfoldNodes()
          })
        },
        0,
        true
      )

      const handleShowPopup = () => {
        changePopupVisible(true)
      }

      // 表单验证
      watch(
        () => selected.value,
        () => {
          if (props.validateEvent) {
            formItem?.validate('change').catch(NOOP)
          }
        }
      )

      return {
        ns,
        popupVisible,
        mergeDisabled,
        mergeSize,
        placeholder,
        popupRef,
        isEmpty,

        multipleTags,
        inputValue,

        treeRef,
        selected,
        modelType,
        treeRenderData,
        treeBindEvents,

        onShow,
        onHide,
        handleClear,
        handleTagClose,
        handleFilter,
        handleShowPopup
      }
    }
  })
</script>

<template>
  <div :class="ns">
    <Trigger
      v-model:popupVisible="popupVisible"
      position="bl"
      trigger="click"
      :unmount-on-close="false"
      animation-name="bn-slide-dynamic-origin"
      auto-fit-popup-min-width
      :popup-offset="8"
      :disabled="mergeDisabled"
      @show="onShow"
      @hide="onHide"
    >
      <template #default>
        <SelectTrigger
          :input-value="inputValue"
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
          @tag-close="handleTagClose"
          @filter="handleFilter"
          @show="handleShowPopup"
        />
      </template>

      <template #content>
        <div ref="popupRef" :class="[`${ns}__menu`, popupClass]">
          <Scrollbar v-if="!isEmpty" style="max-height: 224px">
            <Tree
              ref="treeRef"
              :[modelType]="selected"
              :data="treeRenderData"
              :multiple="multiple"
              :unfold-on-click-node="unfoldOnClickNode"
              :checked-on-click-node="checkedOnClickNode"
              :show-checkbox="modelType === 'checked'"
              :check-strictly="checkStrictly"
              :show-line="showLine"
              :default-unfold-all="defaultUnfoldAll"
              :default-unfold-values="defaultUnfoldValues"
              :accordion="accordion"
              v-on="treeBindEvents"
            >
              <template v-if="$slots['node-icon']" #node-icon="scoped">
                <slot name="node-icon" v-bind="scoped"></slot>
              </template>
              <template v-if="$slots['node-label']" #node-label="scoped">
                <slot name="node-label" v-bind="scoped"></slot>
              </template>
              <template v-if="$slots['node-extra']" #node-extra="scoped">
                <slot name="node-extra" v-bind="scoped"></slot>
              </template>
            </Tree>
          </Scrollbar>
          <div v-if="isEmpty" :class="[`${ns}__empty`]">
            <slot name="empty">
              <Empty :description="noDataText">
                <template #image>
                  <BnIconEmpty size="38" />
                </template>
              </Empty>
            </slot>
          </div>

          <div v-if="!isEmpty && !treeRenderData.length" :class="[`${ns}__empty`, 'is-no-matcher']">
            <slot name="empty">
              <Empty description="暂无匹配项">
                <template #image>
                  <BnIconEmpty size="38" />
                </template>
              </Empty>
            </slot>
          </div>
        </div>
      </template>
    </Trigger>
  </div>
</template>
