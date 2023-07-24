<script lang="ts">
  import {
    computed,
    defineComponent,
    ref,
    provide,
    reactive,
    watch,
    nextTick,
    onUnmounted
  } from 'vue'
  import type { VNode, ComponentPublicInstance } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
  import Trigger from '../../trigger/src/trigger'
  import { BnIconLoading, BnIconEmpty } from '../../icon'
  import SelectTrigger from '../../common/select-trigger.vue'
  import Scrollbar from '../../scrollbar/src/scrollbar.vue'
  import type { ScrollbarInstance } from '../../scrollbar'

  // 表单
  import { useFormItem } from '../../form/src/hooks/use-form-item'

  import { NOOP } from '../../../shared/utils'
  import { isArray, isComponentInstance, isFunction } from '../../../utils/is'
  import { debounce } from '../../../utils/throttle-debounce'
  import { Empty } from '../../empty'
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
      OptionsRender,
      Empty,
      BnIconEmpty
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
      const optionValues = computed(() => optionsVns.value.map((opt) => opt.props?.value))
      const popupVisible = ref(false)
      const selectedLabelOnlySingle = ref('')
      const multipleTags = ref<{ label: string; key: string }[]>([])
      const currentSelected = ref<OptVmProxy | OptVmProxy[]>(props.multiple ? [] : ({} as any))
      const cachedOptionsVmProxies = ref(new Map())
      const selectTriggerRef = ref()
      const scrollbarRef = ref<ScrollbarInstance>()
      const popupRef = ref()

      // 缓存的cachedOptionsVmProxies  Array
      const cachedOptionsVmProxiesToArray = computed(() =>
        Array.from<OptVmProxy>(cachedOptionsVmProxies.value.values())
      )

      const isEmpty = computed(() => {
        const renderOptions = cachedOptionsVmProxiesToArray.value.filter((opt) =>
          optionValues.value.includes(opt.value)
        )
        return !renderOptions.some((s) => s.visible)
      })

      const getOptionByValue = (value: any): OptVmProxy | undefined => {
        const option = cachedOptionsVmProxiesToArray.value.find((opt) => opt.currentValue === value)
        return option
      }
      const handleClear = () => {
        const value = props.multiple ? [] : ''
        emit('update:modelValue', value)
        emit('change', value)

        if (!props.multiple && props.remote) {
          selectedLabelOnlySingle.value = ''
        }

        if (props.multiple && props.remote) {
          multipleTags.value = []
        }

        handleClosePopup()
      }

      const emitSelectValue = (selected: OptVmProxy | OptVmProxy[]) => {
        if (props.multiple) {
          const values = (selected as OptVmProxy[]).map((opt) => opt.currentValue)
          emit('update:modelValue', values)
          emit('change', values)
          return
        }
        const value = (selected as OptVmProxy).currentValue
        emit('update:modelValue', value)
        emit('change', value)
        handleClosePopup()
      }

      const handleClosePopup = () => {
        popupVisible.value = false
      }

      const handleShowPopup = () => {
        popupVisible.value = true
      }

      const optionItemCreate = (optVmProxy: any) => {
        cachedOptionsVmProxies.value.set(optVmProxy.value, optVmProxy)
      }

      const optionItemDestroy = (optVmProxy: OptVmProxy) => {
        // 当前为远程多选搜索模式时，缓存的optVmProxy不要清除，为了后面状态同步。
        if (props.remote && props.multiple) return
        const key = optVmProxy.currentValue
        if (cachedOptionsVmProxies.value.get(key)) {
          cachedOptionsVmProxies.value.delete(key)
        }
      }

      const optionItemSelect = (optVmProxy: OptVmProxy) => {
        if (!props.multiple) {
          if (currentSelected.value !== optVmProxy) {
            emitSelectValue(optVmProxy)
            if (props.remote) {
              selectedLabelOnlySingle.value = optVmProxy.currentLabel ?? ''
            }
          } else {
            handleClosePopup()
            if (props.filterable) {
              selectTriggerRef.value?.resetQuery()
            }
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
        emitSelectValue(origin)
      }

      const optionItemHoverChange = (optProxy: OptVmProxy) => {
        cachedOptionsVmProxiesToArray.value.forEach((opt) => {
          opt.isHover = opt === optProxy
        })
      }
      const getMultipleTags = (selected: OptVmProxy[]) => {
        return selected.map((opt) => {
          opt.isSelected = true
          return {
            key: opt.currentValue as string,
            label: opt.currentLabel
          }
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
            multipleTags.value = getMultipleTags(selected as OptVmProxy[])
          } else {
            const _selected = selected as OptVmProxy
            if (isComponentInstance(_selected)) {
              _selected.isSelected = true
            }
            if (!props.remote) {
              // 重置选中的label
              selectedLabelOnlySingle.value = _selected.currentLabel ?? ''
            }
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
        emitSelectValue(origin)
      }

      // 当插槽发生变化时，重新更新
      const onUpdateOptionsVns = (vns: VNode[]) => {
        optionsVns.value = vns
      }

      const whetherResetOptionVns = () => {
        if (props.remote) {
          onUpdateOptionsVns([])
        }
      }

      const setSelected = async () => {
        await nextTick()
        if (!props.multiple) {
          const option = getOptionByValue(props.modelValue)
          if (!option) {
            currentSelected.value = {} as any
            return
          }
          currentSelected.value = option
          return
        }
        const modelValue = isArray(props.modelValue) ? props.modelValue : [props.modelValue]
        const optVmProxies = modelValue.map((value) => getOptionByValue(value))
        currentSelected.value = (optVmProxies as OptVmProxy[]).filter(Boolean)
      }

      // 搜索过滤
      const handleFilter = debounce(
        (query: string) => {
          if (props.remote) {
            onUpdateOptionsVns([])
            nextTick(() => {
              if (isFunction(props.remoteMethod)) {
                props.remoteMethod(query)
              }
            })
          } else {
            cachedOptionsVmProxiesToArray.value.forEach((optVmProxy) => {
              let visible = false
              if (!query) {
                visible = true
              } else if (isFunction(props.filterMethod)) {
                visible = props.filterMethod(optVmProxy, query)
              } else {
                visible = new RegExp(`${query}`, 'i').test(optVmProxy.currentLabel)
              }
              optVmProxy.visible = visible
            })
          }
        },
        props.remote ? props.filterDebounce : 0,
        true
      )

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
        (vns) => {
          if (vns.length === 0) return
          setSelected()
        }
      )

      // 数据发生变化,进行表单验证
      watch(
        () => props.modelValue,
        () => {
          setSelected()
          // 触发表单验证
          if (props.validateEvent) {
            formItem?.validate('change').catch(NOOP)
          }
        },
        {
          deep: true
        }
      )

      onUnmounted(() => {
        cachedOptionsVmProxies.value.clear()
      })

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
        isEmpty,
        onUpdateOptionsVns,
        mergeDisabled,
        mergeSize,
        handleClosePopup,
        scrollbarRef,
        popupRef,
        handleClear,
        optionsVns,
        selectedLabelOnlySingle,
        multipleTags,
        handleTagClose,
        handleFilter,
        updateOptionItemToVisible,
        handleShowPopup,
        whetherResetOptionVns,
        selectTriggerRef
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
      @hide="whetherResetOptionVns"
    >
      <template #default>
        <SelectTrigger
          ref="selectTriggerRef"
          :input-value="selectedLabelOnlySingle"
          :disabled="mergeDisabled"
          :size="mergeSize"
          :placeholder="placeholder"
          :clearable="clearable"
          :popup-visible="popupVisible"
          :multiple="multiple"
          :multiple-tags="multipleTags"
          :filterable="filterable"
          :popup-ref="popupRef"
          @clear="handleClear"
          @tag-close="handleTagClose"
          @filter="handleFilter"
          @show="handleShowPopup"
        />
      </template>

      <template #content>
        <SelectMenu ref="popupRef">
          <Scrollbar ref="scrollbarRef" style="max-height: 200px">
            <OptionsRender :options-vns="optionsVns" />

            <template v-if="isEmpty && !loading">
              <p :class="[`${ns}__empty`]" @click="handleClosePopup">
                <slot name="empty">
                  <Empty :description="noDataText">
                    <template #image>
                      <BnIconEmpty size="38" />
                    </template>
                  </Empty>
                </slot>
              </p>
            </template>
            <template v-if="isEmpty && loading">
              <p :class="[`${ns}__empty`]" @click="handleClosePopup">
                <BnIconLoading />
                <span style="margin-left: 4px">{{ loadingText }}</span>
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
