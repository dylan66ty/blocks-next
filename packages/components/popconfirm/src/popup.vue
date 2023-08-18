<script lang="ts">
  import type { StyleValue } from 'vue'
  import { reactive, computed, defineComponent, onUnmounted, ref } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import BnSpace from '../../space/src/space.vue'
  import BnButton from '../../button/src/button.vue'
  import { addUnit } from '../../../shared/utils'
  import { BnIconPrompt } from '../../icon'
  import { isFunction, isPromise } from '../../../utils/is'

  export default defineComponent({
    name: 'PopconfirmPopup',
    components: {
      BnSpace,
      BnButton,
      BnIconPrompt
    },
    props: {
      width: {
        type: [String, Number],
        default: ''
      },
      content: {
        type: Object,
        default: () => ({})
      },
      okText: {
        type: String,
        default: 'String'
      },
      cancelText: {
        type: String,
        default: ''
      },
      popupClass: {
        type: String,
        default: undefined
      },
      onBeforeCancel: {
        type: Function,
        default: undefined
      },
      onBeforeOk: {
        type: Function,
        default: undefined
      },
      type: {
        type: String,
        default: undefined
      }
    },
    emits: ['ok', 'cancel', 'close', 'destroy'],
    setup(props, { emit }) {
      const ns = getNamespace('popconfirm')
      const visible = ref(true)

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

      const loadingObj = reactive({
        ok: false,
        cancel: false
      })

      const changeVisible = (value: boolean) => {
        visible.value = value
      }

      const handleOk = (e: Event) => {
        const beforeOk = props.onBeforeOk
        let ret = true
        if (isFunction(beforeOk)) {
          ret = beforeOk()
          if (isPromise(ret)) {
            loadingObj.ok = true
            ret.then((valid) => {
              loadingObj.ok = false
              if (valid) {
                emit('ok', e)
              }
            })
            return
          }
        }
        if (ret) {
          emit('ok', e)
        }
      }

      const handleCancel = (e: Event) => {
        const beforeCancel = props.onBeforeCancel
        let ret = true
        if (isFunction(beforeCancel)) {
          ret = beforeCancel()
          if (isPromise(ret)) {
            loadingObj.cancel = true
            ret.then((valid) => {
              loadingObj.cancel = false
              if (valid) {
                emit('cancel', e)
              }
            })
            return
          }
        }
        if (ret) {
          emit('cancel', e)
        }
      }

      const beforeLeave = () => {
        emit('close')
      }

      const afterLeave = () => {
        emit('destroy')
      }

      onUnmounted(() => {
        visible.value = false
      })

      return {
        ns,
        visible,
        popupCls,
        popupStyle,
        loadingObj,
        changeVisible,
        handleOk,
        handleCancel,
        beforeLeave,
        afterLeave
      }
    }
  })
</script>

<template>
  <transition
    name="bn-fade-in-standard"
    appear
    @before-leave="beforeLeave"
    @after-leave="afterLeave"
  >
    <div v-show="visible" :class="popupCls" :style="popupStyle">
      <div :class="[`${ns}__content`]">
        <slot name="content">
          <BnIconPrompt :class="[`${ns}__icon`]" :size="16" />
          <div :class="[`${ns}__title`]">{{ content?.value }}</div>
        </slot>
      </div>
      <div :class="[`${ns}__footer`]">
        <BnSpace :size="12">
          <BnButton size="small" :loading="loadingObj.cancel" @click="handleCancel">{{
            cancelText
          }}</BnButton>
          <BnButton size="small" type="primary" :loading="loadingObj.ok" @click="handleOk">{{
            okText
          }}</BnButton>
        </BnSpace>
      </div>
      <div class="arrow"></div>
    </div>
  </transition>
</template>
