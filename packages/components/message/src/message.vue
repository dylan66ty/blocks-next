<script lang="ts">
  import type { PropType } from 'vue'
  import { defineComponent, computed, ref, onMounted, onUnmounted } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
  import usePopupManager from '../../../hooks/use-popup-manager'
  import type { IMessageType, IMessage } from './types'

  export default defineComponent({
    name: getComponentNamespace('Message'),
    props: {
      id: {
        type: String,
        default: ''
      },
      message: {
        type: [String, Number, Object] as PropType<IMessage>,
        default: ''
      },
      type: {
        type: String as PropType<IMessageType>,
        default: 'success'
      },
      duration: {
        type: Number,
        default: 1500
      },
      center: {
        type: Boolean,
        default: false
      },
      onClose: {
        type: Function as PropType<() => void>,
        default: () => {}
      },
      offset: {
        type: Number,
        default: 20
      },
      zIndex: {
        type: Number,
        default: 0
      },
      showClose: {
        type: Boolean,
        default: false
      },
      useHTML: Boolean
    },
    emits: ['destroy'],
    setup(props) {
      const ns = getNamespace('message')
      const cls = computed(() => {
        return [ns, `${ns}--${props.type}`, props.center && 'is-center', props.showClose && !props.center && `${ns}__show-close`]
      })
      const visible = ref(false)
      let timer = 0

      const startTimer = () => {
        timer = setTimeout(() => {
          visible.value = false
        }, props.duration)
      }

      onMounted(() => {
        visible.value = true
        if (props.duration !== 0) {
          startTimer()
        }
      })

      onUnmounted(() => {
        clearTimeout(timer)
      })

      const { zIndex } = usePopupManager('message', { runOnMounted: true })

      const styles = computed(() => {
        return {
          top: `${props.offset}px`,
          zIndex: zIndex.value
        }
      })

      const handleClose = () => {
        visible.value = false
      }

      return {
        ns,
        cls,
        styles,
        visible,
        handleClose
      }
    }
  })
</script>

<template>
  <transition name="bn-message-slide-top" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div v-show="visible" :class="cls" :style="styles">
      <slot>
        <span v-if="useHTML" v-html="message"></span>
        <span v-else>{{ message }}</span>
        <span v-if="showClose" :class="[`${ns}__close-icon`]" @click="handleClose"></span>
      </slot>
    </div>
  </transition>
</template>
