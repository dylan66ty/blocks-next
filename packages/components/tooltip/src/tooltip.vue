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
        <Scrollbar style="max-height: 140px" :class="[`${ns}__content`]">
         <slot name="content">{{ content }}</slot>
        </Scrollbar>    
    </template>
  </Trigger>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import Trigger from '../../trigger/src/trigger'
import { tooltipProps } from './props'
import { getPopupTranslateByPosition, getPopupPositionByEmpty } from './utils'
import type { Position } from './types'
import type { StyleValue } from 'vue'
import type { TriggerPopupTranslate} from '../../trigger/src/_trigger'
import { getElement } from '../../../utils/dom'
import Scrollbar from '../../scrollbar/src/scrollbar.vue';

export default defineComponent({
  name: getComponentNamespace('Tooltip'),
  components: {
    Trigger,
    Scrollbar
  },
  props: tooltipProps,
  emits:['update:modelValue', 'change'],
  setup(props, { slots, emit }) {
    const ns = getNamespace('tooltip')
    const contentCls = computed(() => [
      ns,
      `is-${props.effect}`
    ])
    const arrowStyle = computed(() => {
      const style: StyleValue = {}
      if (props.backgroundColor) {
        style['--bn-trigger-arrow-background-color'] = props.backgroundColor
      }else {
        if(props.effect === 'dark') {
          style['--bn-trigger-arrow-background-color'] = 'rgba(0,0,0,.8)'
        }
        if(props.effect === 'light') {
          style['--bn-trigger-arrow-background-color'] = '#fff'
        }

      }
      return style
    })
    const contentStyle = computed(() => {
      const style: StyleValue = {}
      if (props.backgroundColor) {
        style.backgroundColor = props.backgroundColor
      }else {
        if(props.effect === 'dark') {
          style.color = '#fff'
          style['background-color'] = 'rgba(0,0,0,.8)'
        }
        if(props.effect === 'light') {
          style.color = '#000'
          style['background-color'] = '#fff'
          style['box-shadow'] = '0px 8px 40px 0px rgba(100,107,122,0.15)'
        }

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
      ns,
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