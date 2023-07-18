<script lang="ts">
  import { computed, defineComponent, onMounted, ref, onUnmounted } from 'vue'
  import type { StyleValue } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'

  import { BnIconPrompt, BnIconWarningFill, BnIconCheckFill, BnIconCloseFill } from '../../icon'

  import usePopupManager from '../../../hooks/use-popup-manager'
  import { notificationProps } from './props'

  export default defineComponent({
    name: getComponentNamespace('Notification'),
    props: notificationProps,
    emits: ['close', 'destroy'],
    setup(props) {
      const ns = getNamespace('notification')
      const cls = computed(() => [ns, `is-${positionPropMap.value.ver}`])

      const { zIndex } = usePopupManager('message', { runOnMounted: true })

      const positionPropMap = computed(() => {
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
        style[positionPropMap.value.hor as 'left' | 'right'] = '20px'
        style[positionPropMap.value.ver as 'top' | 'bottom'] = `${props.offset}px`
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
        if (props.type === 'info') return BnIconPrompt
        if (props.type === 'warning') return BnIconWarningFill
        if (props.type === 'strong') return BnIconWarningFill
        if (props.type === 'success') return BnIconCheckFill
        if (props.type === 'error') return BnIconCloseFill
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

<template>
  <transition
    :name="animationClsName"
    @before-leave="$emit('close')"
    @after-leave="$emit('destroy')"
  >
    <div v-show="visible" :class="cls" :style="positionStyle">
      <div :class="[`${ns}__header`]">
        <component :is="currentIcon" :class="[`${ns}__icon`, `is-${type}`]" :size="18"></component>
        <div>
          <div :class="[`${ns}__title`]">
            {{ title }}
          </div>
          <div :class="[`${ns}__message`]">
            <slot>{{ message }}</slot>
          </div>
        </div>
      </div>

      <span v-if="showClose" :class="[`${ns}__close-icon`]" @click.self="handleClose"></span>
    </div>
  </transition>
</template>
