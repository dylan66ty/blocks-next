<template>
  <transition name="bn-fade-in" @before-leave="$emit('close')" @after-leave="$emit('destroy')">
    <div :class="popupCls" :style="popupStyle" v-show="visible">
      <div :class="[`${ns}__content`]">
        <slot name="content">
          <PromptIcon :class="[`${ns}__icon`]" :size="16" />
          <div :class="[`${ns}__title`]">{{ content }}</div>
        </slot>
      </div>
      <div :class="[`${ns}__footer`]">
        <BnSpace :size="12">
          <BnButton size="small" @click="handleCancel">{{ cancelText }}</BnButton>
          <BnButton size="small" type="primary" @click="handleOk">{{ okText }}</BnButton>
        </BnSpace>
      </div>
      <div :class="[`${ns}__arrow`]"></div>
    </div>
  </transition>
</template>

<script lang="ts">
import { StyleValue, computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { getNamespace } from '../../../utils/global-config'
import BnSpace from '../../space/src/space.vue'
import BnButton from '../../button/src/button.vue'
import { addUnit } from '../../../shared/utils'
import PromptIcon from '../../icon/src/base/prompt.vue'
import { isFunction, isPromise } from '../../../utils/is'



export default defineComponent({
  name: 'PopconfirmPopup',
  components: {
    BnSpace,
    BnButton,
    PromptIcon
  },
  props: {
    width: [String, Number],
    content: [String, Number],
    okText: String,
    cancelText: String,
    popupClass: String,
    onBeforeCancel: Function,
    onBeforeOk: Function,
    type: String,
  },
  emits: ['ok', 'cancel', 'close', 'destroy'],
  setup(props, { emit }) {
    const ns = getNamespace('popconfirm')
    const popupCls = computed(() => [
      ns,
      props.popupClass && props.popupClass,
      props.type && `is-${props.type}`
    ])

    const popupStyle = computed(() => {
      const style: StyleValue = {}
      style['--bn-trigger-arrow-background-color'] = '#fff'
      style.width = addUnit(props.width)
      return style
    })

    const visible = ref(false)


    const changeVisible = (value: boolean) => {
      visible.value = value
    }

    const handleOk = async (e:Event) => {
      const beforeOk = props.onBeforeOk
      let ret = true
      if (isFunction(beforeOk)) {
        ret = beforeOk()
        if (isPromise(ret)) {
          const valid = await ret
          if (valid) {
            emit('ok',e)
          }
          return
        }
      }
      if (ret) {
        emit('ok',e)
      }
    }
    const handleCancel = async (e:Event) => {
      const beforeCancel = props.onBeforeCancel
      let ret = true
      if (isFunction(beforeCancel)) {
        ret = beforeCancel()
        if (isPromise(ret)) {
          const valid = await ret
          if (valid) {
            emit('cancel',e)
          }
          return
        }
      }
      if (ret) {
        emit('cancel',e)
      }
    }

    onMounted(() => {
      visible.value = true
    })

    onUnmounted(() => {
      visible.value = false
    })

    return {
      ns,
      visible,
      popupCls,
      popupStyle,
      changeVisible,
      handleOk,
      handleCancel
    }
  }

})
</script>