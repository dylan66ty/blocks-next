<script lang="ts">
  import { defineComponent, computed, ref, onUnmounted } from 'vue'
  import type { StyleValue } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import Scrollbar from '../../scrollbar/src/scrollbar.vue'

  export default defineComponent({
    name: 'TooltipPopup',
    components: {
      Scrollbar
    },
    // eslint-disable-next-line vue/require-prop-types
    props: ['content', 'effect', 'backgroundColor', 'position', 'popupClass', 'size'],
    emits: ['close', 'destroy'],
    setup(props) {
      const ns = getNamespace('tooltip')
      const contentCls = computed(() => [
        ns,
        `is-${props.effect.value}`,
        props.size.value && `${ns}--${props.size.value}`,
        getNamespace('trigger-popup'),
        props.popupClass.value && props.popupClass.value
      ])
      const arrowStyle = computed(() => {
        const style: StyleValue = {}
        if (props.backgroundColor.value) {
          style['--bn-trigger-arrow-background-color'] = props.backgroundColor.value
        } else {
          if (props.effect.value === 'dark') {
            style['--bn-trigger-arrow-background-color'] = 'rgba(0,0,0,.8)'
          }
          if (props.effect.value === 'light') {
            style['--bn-trigger-arrow-background-color'] = '#fff'
          }
        }
        return style
      })
      const contentStyle = computed(() => {
        const style: StyleValue = {}
        if (props.backgroundColor.value) {
          style.backgroundColor = props.backgroundColor.value
        } else {
          if (props.effect.value === 'dark') {
            style.color = '#fff'
            style['background-color'] = 'rgba(0,0,0,.8)'
          }
          if (props.effect.value === 'light') {
            style.color = '#000'
            style['background-color'] = '#fff'
            style['box-shadow'] = '0px 8px 40px 0px rgba(100,107,122,0.15)'
          }
        }
        return style
      })

      const visible = ref(true)

      const changeVisible = (value: boolean) => {
        visible.value = value
      }

      onUnmounted(() => {
        visible.value = false
      })

      return {
        ns,
        contentStyle,
        contentCls,
        arrowStyle,
        visible,
        changeVisible
      }
    }
  })
</script>

<template>
  <transition name="bn-fade-in-standard" appear @before-leave="$emit('close')" @after-leave="$emit('destroy')">
    <div v-show="visible" :class="contentCls" :style="contentStyle">
      <Scrollbar style="max-height: 140px" :class="[`${ns}__content`]">
        <slot name="content">
          <slot name="content">{{ content.value }}</slot>
        </slot>
      </Scrollbar>

      <div class="arrow" :style="arrowStyle"></div>
    </div>
  </transition>
</template>
