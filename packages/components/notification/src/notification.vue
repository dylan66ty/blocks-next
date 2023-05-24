<template>
  <transition :name="animationClsName" @before-leave="$emit('close')" @after-leave="$emit('destroy')">
    <div :class="cls" :style="positionStyle" v-show="visible">
      <div :class="[`${ns}__header`]">
        <component :is="currentIcon" :class="[`${ns}__icon`,`is-${type}`]" :size="18"></component>
        <div>
          <div :class="[`${ns}__title`]">
            {{ title }}
          </div>
          <div :class="[`${ns}__message`]">
            <slot>{{ message }}</slot>
          </div>
        </div>

      </div>

      <span :class="[`${ns}__close-icon`]" v-if="showClose" @click.self="handleClose"></span>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref , onUnmounted } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import { notificationProps } from './props'

import PromptIcon from '../../icon/src/base/prompt.vue'
import WarningIcon from '../../icon/src/base/warning.vue'
import SuccessIcon from '../../icon/src/base/success.vue'
import ErrorIcon from '../../icon/src/base/close-fill.vue'

import usePopupManager from '../../../hooks/use-popup-manager'

import type { StyleValue } from 'vue'

export default defineComponent({
  name: getComponentNamespace('Notification'),
  props: notificationProps,
  emits: ['close','destroy'],
  setup(props) {
    const ns = getNamespace('notification')
    const cls = computed(() => [
      ns,
      `is-${positionPropMap.value.ver}`
    ])

    const { zIndex } = usePopupManager('message', { runOnMounted: true })

    const positionPropMap = computed(() =>  {
      const keys = props.position.split('-')
      return {
        hor: keys[1],
        ver: keys[0]
      }
    })

    const animationClsName = computed(() => `bn-notification-slide-${positionPropMap.value.hor}`)

    const positionStyle = computed(() => {
      const style: StyleValue = {}
      style.position = props.renderToBody ? 'fixed' : 'absolute'
      style.zIndex = zIndex.value

      style[positionPropMap.value.hor as ('left' | 'right')] = '20px'
      style[positionPropMap.value.ver as ('top' | 'bottom')]= `${props.offset}px`

      if (props.position.includes(''))

        return style
    })

    const visible = ref(false)

    let timer = 0

    const startTimer = () => {
      timer = setTimeout(() => {
        visible.value = false
      }, props.duration)
    }

    const currentIcon = computed(() => {
      if(props.type === 'info') return PromptIcon
      if(props.type === 'warning') return WarningIcon
      if(props.type === 'strong') return WarningIcon
      if(props.type === 'success') return SuccessIcon
      if(props.type === 'error') return ErrorIcon
      return ''
    })

    const handleClose = () => {
      visible.value = false
    }


    onMounted(() => {
      if (props.duration !== 0) {
        startTimer()
      }
      visible.value = true
    })


    onUnmounted(() => {
      clearTimeout(timer)
    })

    return {
      ns,
      cls,
      animationClsName,
      positionStyle,
      visible,
      positionPropMap,
      currentIcon,
      handleClose
    }
  }
})
</script>