<template>
  <transition name="bn-message-slide-top" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div :class="cls" :style="styles" v-show="visible">
      <slot>
        <span>{{ message }}</span>
        <span :class="[`${ns}__close-icon`]" v-if="showClose" @click="handleClose"></span>
      </slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType , computed, ref, onMounted, onUnmounted, nextTick} from "vue";
import { IMessageType , IMessage} from "./types";
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import usePopupManager from '../../../hooks/use-popup-manager'


export default defineComponent({
  name: getComponentNamespace('Message'),
  props: {
    id: {
      type: String,
      default: "",
    },
    message: {
      type: [String,Number,Object] as PropType<IMessage>,
      default: "",
    },
    type: {
      type: String as PropType<IMessageType>,
      default: "success",
    },
    duration: {
      type: Number,
      default: 1500,
    },
    center: {
      type: Boolean,
      default: false,
    },
    onClose: {
      type: Function as PropType<() => void>,
      default: () => {},
    },
    offset: {
      type: Number,
      default: 20,
    },
    zIndex: {
      type: Number,
      default:0
    },
    showClose: {
      type:Boolean,
      default: false
    }
  },
  emits: ['destroy'],
  setup(props) {
    const ns = getNamespace('message')
    const cls = computed(() => {
      return [
         ns,
        `${ns}--${props.type}`,
        props.center && 'is-center',
        props.showClose && !props.center && `${ns}__show-close`
      ]
    })
    const visible = ref(false)
    let timer = 0


    const startTimer = () => {
     timer = setTimeout(() => {
        visible.value = false
      },props.duration)
    }

    onMounted(() => {
      visible.value = true
      if(props.duration !== 0) {
        startTimer()
      }
    })

    onUnmounted(() => {
      clearTimeout(timer)
    })

    const {zIndex} = usePopupManager('message', {runOnMounted:true})
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
  });
</script>