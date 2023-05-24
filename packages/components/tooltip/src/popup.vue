<template>
  <transition  name="bn-fade-in" @before-leave="$emit('close')" @after-leave="$emit('destroy')">
    <div :style="contentStyle" :class="contentCls" v-show="visible">
      <Scrollbar style="max-height: 140px" :class="[`${ns}__content`]">
        <slot name="content">
          <slot name="content">{{ content }}</slot>
        </slot>
      </Scrollbar>

      <div :class="[`${ns}__arrow`]" :style="arrowStyle"></div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, onUnmounted, nextTick} from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import type { StyleValue } from 'vue'
import Scrollbar from '../../scrollbar/src/scrollbar.vue'

export default defineComponent({
  name: getComponentNamespace('TooltipPopup'),
  props: {
    content: String,
    effect: String,
    backgroundColor: String,
    position: String
  },
  components: {
    Scrollbar
  },
  emits:['close', 'destroy'],
  setup(props) {
    const ns = getNamespace('tooltip')
    const contentCls = computed(() => [
      ns,
      `is-${props.effect}`,
      getNamespace('trigger-popup')
    ])
    const arrowStyle = computed(() => {
      const style: StyleValue = {}
      if (props.backgroundColor) {
        style['--bn-trigger-arrow-background-color'] = props.backgroundColor
      } else {
        if (props.effect === 'dark') {
          style['--bn-trigger-arrow-background-color'] = 'rgba(0,0,0,.8)'
        }
        if (props.effect === 'light') {
          style['--bn-trigger-arrow-background-color'] = '#fff'
        }
      }
      return style
    })
    const contentStyle = computed(() => {
      const style: StyleValue = {}
      if (props.backgroundColor) {
        style.backgroundColor = props.backgroundColor
      } else {
        if (props.effect === 'dark') {
          style.color = '#fff'
          style['background-color'] = 'rgba(0,0,0,.8)'
        }
        if (props.effect === 'light') {
          style.color = '#000'
          style['background-color'] = '#fff'
          style['box-shadow'] = '0px 8px 40px 0px rgba(100,107,122,0.15)'
        }

      }
      return style
    })

    const visible = ref(true)

    const changeVisible = (value:boolean) => {
      visible.value = value
    }

    onMounted(() => {
      // 仅仅只是为了动画
      visible.value = false
      nextTick(() => {
        visible.value = true
      })
    })

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