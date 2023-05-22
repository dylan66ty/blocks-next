<template>
  <Trigger 
    :popup-visible="popupVisible"
    trigger="hover" 
    :position="position" 
    animation-name="bn-fade-in-standard" 
    :content-class="contentCls" 
    :content-style="contentStyle" 
    :arrow-style="arrowStyle"
    :popup-translate="popupTranslate" 
    :popup-container="popupContainer"
    :disabled="disabled"
    auto-fit-transform-origin
    show-arrow 
    @popup-visible-change="onPopupVisibleChange"
    >
    <slot></slot>
    <template #content>
      <slot name="content">{{ content }}</slot>
    </template>
  </Trigger>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import Trigger from '../../trigger/src/trigger'
import { tooltipProps } from './tooltip'
import { getPopupTranslateByPosition, getPopupPositionByEmpty } from './utils'
import type { Position } from './types'
import type { StyleValue } from 'vue'
import type { TriggerPopupTranslate} from '../../trigger/src/_trigger'
import { getElement } from '../../../utils/dom'


export default defineComponent({
  name: getComponentNamespace('Tooltip'),
  components: {
    Trigger
  },
  props: tooltipProps,
  emits:['update:modelValue', 'change'],
  setup(props, { slots, emit }) {
    const ns = getNamespace('tooltip')
    const contentCls = computed(() => [
      ns
    ])
    const arrowStyle = computed(() => {
      const style: StyleValue = {}
      if (props.backgroundColor) {
        style['--bn-trigger-arrow-background-color'] = props.backgroundColor
      }
      return style
    })
    const contentStyle = computed(() => {
      const style: StyleValue = {}
      if (props.backgroundColor) {
        style.backgroundColor = props.backgroundColor
      }
      return style
    })
    const position = computed<Position>(() => {
      if (!slots['content'] && !props.content.trim().length) {
        return getPopupPositionByEmpty(props.position) as Position
      }
      return props.position as Position
    })
    
    const defaultVisible = ref(false)

    const popupVisible = computed(() => {
      return props.modelValue ?? defaultVisible.value
    })


    const popupContainer = ref<HTMLElement>()

    watch(() => props.renderTo, async (newVal) => {
      await nextTick()
      popupContainer.value = getElement(newVal) as HTMLElement
    }, { immediate: true })


    const popupTranslate = computed<TriggerPopupTranslate>(() => {
      return getPopupTranslateByPosition() as TriggerPopupTranslate
    })

    const onPopupVisibleChange = (visible:boolean) => {
      defaultVisible.value = visible
      emit('update:modelValue',visible)
      emit('change', visible)
    } 

    return {
      contentCls,
      contentStyle,
      arrowStyle,
      position,
      popupTranslate,
      popupContainer,
      onPopupVisibleChange,
      popupVisible
    }

  }
})
</script>