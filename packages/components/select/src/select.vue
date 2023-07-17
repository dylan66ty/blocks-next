<script lang="ts">
  import { computed, defineComponent, ref, provide, reactive, watch, nextTick } from 'vue'
  import type { VNode, ComponentPublicInstance } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
  import Trigger from '../../trigger/src/trigger'
  import { BnIconLoading } from '../../icon'
  import SelectTrigger from '../../common/select-trigger.vue'
  import Scrollbar from '../../scrollbar/src/scrollbar.vue'
  import type { ScrollbarInstance } from '../../scrollbar'

  // 表单
  import { useFormItem } from '../../form/src/hooks/use-form-item'

  import { NOOP } from '../../../shared/utils'
  import { isArray, isComponentInstance, isFunction } from '../../../utils/is'
  import SelectMenu from './menu.vue'
  import { selectInjectKey } from './context'
  import { selectProps } from './props'

  import OptionsExtract from './options-extract'
  import OptionsRender from './options-render'

  import type { OptVmProxy } from './types'

  export default defineComponent({
    name: getComponentNamespace('Select'),
    components: {
      Trigger,
      SelectMenu,
      Scrollbar,
      BnIconLoading,
      SelectTrigger,
      OptionsExtract,
      OptionsRender
    },
    props: selectProps,
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
      const ns = getNamespace('select')
      // TODO 从表单合并 disabled 属性
      const mergeDisabled = computed(() => props.disabled)
      const mergeSize = computed(() => props.size)

      const cls = computed(() => [ns, mergeDisabled.value && 'is-disabled'])

      const optionsVns = ref<VNode[]>([])
      const popupVisible = ref(false)
      const singleSelectedLabel = ref('')
      const multipleTags = ref<{ label: string; key: string }[]>([])
      const currentSelected = ref<OptVmProxy | OptVmProxy[]>(props.multiple ? [] : ({} as any))
      const cachedOptionsVmProxies = ref(new Map())

      const scrollbarRef = ref<ScrollbarInstance>()
      const popupRef = ref()

      const emptyText = computed(() => {
        if (props.loading) {
          return props.loadingText
        } else {
          if (cachedOptionsVmProxies.value.size === 0) {
            return props.noDataText
          }
        }
        return null
      })

      // 缓存的cachedOptionsVmProxies to Array
      const cachedOptionsVmProxiesToArray = computed(() =>
        Array.from<OptVmProxy>(cachedOptionsVmProxies.value.values())
      )

      const getOptionByValue = (value: any): OptVmProxy | undefined => {
        const option = cachedOptionsVmProxiesToArray.value.find((opt) => opt.currentValue === value)
        return option
      }

      const handleClear = () => {
        const value = props.multiple ? [] : ''
        emit('update:modelValue', value)
        emit('change', value)
      }

      const emitKey = () => {
        if (props.multiple) {
          const values = (currentSelected.value as OptVmProxy[]).map((opt) => opt.currentValue)

          emit('update:modelValue', values)
          emit('change', values)
          return
        }
        const value = (currentSelected.value as OptVmProxy).currentValue
        emit('update:modelValue', value)
        emit('change', value)
        handleCloseTrigger()
      }

      // 关闭Trigger
      const handleCloseTrigger = () => {
        popupVisible.value = false
      }

      const optionItemCreate = (optVmProxy: any) => {
        cachedOptionsVmProxies.value.set(optVmProxy.value, optVmProxy)
      }

      const optionItemDestroy = (optVmProxy: OptVmProxy) => {
        const key = optVmProxy.currentValue
        if (cachedOptionsVmProxies.value.get(key)) {
          cachedOptionsVmProxies.value.delete(key)
        }
      }

      const optionItemSelect = (optVmProxy: OptVmProxy) => {
        if (!props.multiple) {
          if (currentSelected.value !== optVmProxy) {
            currentSelected.value = optVmProxy
            emitKey()
          } else {
            handleCloseTrigger()
          }
          return
        }
        const origin = (currentSelected.value as OptVmProxy[]).slice()
        const index = origin.findIndex((opt) => opt === optVmProxy)
        if (index > -1) {
          // 删除
          origin.splice(index, 1)
        } else {
          // 新增
          origin.push(optVmProxy)
        }
        currentSelected.value = origin
        emitKey()
      }

      const optionItemHoverChange = (optProxy: OptVmProxy) => {
        cachedOptionsVmProxiesToArray.value.forEach((opt) => {
          opt.isHover = opt === optProxy
        })
      }

      // 维护内部当前选中的item状态
      watch(
        () => currentSelected.value,
        (selected: OptVmProxy | OptVmProxy[]) => {
          cachedOptionsVmProxiesToArray.value.forEach((opt) => {
            opt.isSelected = false
          })
          if (props.multiple && isArray(selected)) {
            const _selected = selected as OptVmProxy[]
            multipleTags.value = _selected.map((opt) => {
              opt.isSelected = true
              return {
                key: opt.currentValue as string,
                label: opt.currentLabel
              }
            })
          } else {
            const _selected = selected as OptVmProxy
            if (isComponentInstance(_selected)) {
              _selected.isSelected = true
            }
            // 清空选项重置选中的label
            singleSelectedLabel.value = _selected.currentLabel ?? ''
          }
        }
      )
      // 多选 删除标签
      const handleTagClose = (tag: { label: string; key: string }) => {
        const key = tag.key
        const origin = (currentSelected.value as OptVmProxy[]).slice()
        const index = origin.findIndex((opt) => opt.currentValue === key)
        if (index > -1) {
          origin.splice(index, 1)
        }
        currentSelected.value = origin
      }

      // 当插槽发生变化时，重新更新
      const onUpdateOptionsVns = (vns: VNode[]) => {
        optionsVns.value = vns
      }

      const setSelected = () => {
        if (!props.multiple) {
          const option = getOptionByValue(props.modelValue)
          if (!option) {
            currentSelected.value = {} as any
            return
          }
          currentSelected.value = option
          return
        }
        const modelValue = isArray(props.modelValue) ? props.modelValue : []
        const optVmProxies = modelValue.map((value) => getOptionByValue(value))
        currentSelected.value = optVmProxies as OptVmProxy[]
      }

      // 搜索过滤
      const handleFilter = (query: string) => {
        cachedOptionsVmProxiesToArray.value.forEach((optVmProxy) => {
          const currentLabel = optVmProxy.currentLabel || ''
          let visible = false
          if (!query) {
            visible = true
          } else if (isFunction(props.filterMethod)) {
            visible = props.filterMethod(optVmProxy, query)
          } else {
            visible = currentLabel.includes(query)
          }
          optVmProxy.visible = visible
        })
      }

      // 让选中的optionItem出现在可视区 多选的话就以第一个为准
      const updateOptionItemToVisible = () => {
        const _currentSelected = currentSelected.value as unknown as ComponentPublicInstance
        const el = (
          isArray(_currentSelected) ? _currentSelected[0]?.$el : _currentSelected.$el
        ) as HTMLElement
        if (!el) return
        const visibleHeight = scrollbarRef.value?.containerRef?.getBoundingClientRect()
          .height as number
        const offsetTop = el.offsetTop
        const elHeight = el.getBoundingClientRect().height
        const top = offsetTop + elHeight - visibleHeight
        if (top > 0) {
          scrollbarRef.value?.scrollTop(top)
        }
      }

      // 表单验证
      const { formItem } = useFormItem()

      // option插槽数据变化
      watch(
        () => optionsVns.value,
        () => {
          nextTick(() => setSelected())
        }
      )

      // 数据发生变化,进行表单验证
      watch(
        () => props.modelValue,
        () => {
          nextTick(() => setSelected())
          // 触发表单验证
          if (props.validateEvent) {
            formItem?.validate('change').catch(NOOP)
          }
        },
        {
          flush: 'post',
          deep: true
        }
      )

      provide(
        selectInjectKey,
        reactive({
          multiple: props.multiple,
          popupClass: props.popupClass,
          optionItemCreate,
          optionItemDestroy,
          optionItemSelect,
          optionItemHoverChange
        })
      )

      return {
        ns,
        cls,
        popupVisible,
        emptyText,
        onUpdateOptionsVns,
        mergeDisabled,
        mergeSize,
        handleCloseTrigger,
        scrollbarRef,
        popupRef,
        handleClear,
        optionsVns,
        singleSelectedLabel,
        multipleTags,
        handleTagClose,
        handleFilter,
        updateOptionItemToVisible
      }
    }
  })
</script>

<template>
  <div :class="cls">
    <Trigger
      v-model:popupVisible="popupVisible"
      position="bl"
      trigger="click"
      :unmount-on-close="false"
      animation-name="bn-slide-dynamic-origin"
      auto-fit-popup-min-width
      :popup-offset="8"
      :disabled="mergeDisabled"
      @show="updateOptionItemToVisible"
    >
      <template #default>
        <SelectTrigger
          :input-value="singleSelectedLabel"
          :disabled="mergeDisabled"
          :size="mergeSize"
          :placeholder="placeholder"
          :clearable="clearable"
          :popup-visible="popupVisible"
          :multiple="multiple"
          :multiple-tags="multipleTags"
          :filterable="filterable"
          :filter-method="filterMethod"
          :remote="remote"
          :remote-method="remoteMethod"
          :popup-ref="popupRef"
          @clear="handleClear"
          @tag-close="handleTagClose"
          @filter="handleFilter"
        />
      </template>

      <template #content>
        <SelectMenu ref="popupRef">
          <Scrollbar ref="scrollbarRef" style="max-height: 200px">
            <OptionsRender v-if="!loading" :options-vns="optionsVns" />
            <template v-if="emptyText">
              <p :class="[`${ns}__empty-text`]" @click="handleCloseTrigger">
                <slot name="empty">
                  {{ emptyText }}
                </slot>
                <BnIconLoading v-if="loading" />
              </p>
            </template>
          </Scrollbar>
        </SelectMenu>
      </template>
    </Trigger>

    <OptionsExtract @update-options="onUpdateOptionsVns">
      <slot></slot>
    </OptionsExtract>
  </div>
</template>
