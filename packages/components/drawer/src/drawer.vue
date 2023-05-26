<template>
  <teleport :to="teleportContainer" :disabled="disabled || !teleportContainer">
    <div v-if="!destroyOnClosed || outerVisible" v-show="outerVisible" :class="[`${ns}`, popupClass]" :style="drawerStyle"
      v-bind="$attrs">
      <transition name="bn-fade-in-standard" appear>
        <div v-if="mask" v-show="innerVisible" :class="`${ns}__mask`" @click.self="handleMask" />
      </transition>
      <transition :name="`bn-slide-${placement}`" appear @after-enter="afterEnter" @after-leave="afterLeave">
        <div :class="[`${ns}__container`, `is-${placement}`, !$slots.default && 'is-template']" :style="containerStyle"
          v-show="innerVisible">
          <slot>
            <div :class="[`${ns}__header`]">
              <!-- title插槽 -->
              <slot name="title">
                <span :class="[`${ns}__title`]">{{ title }}</span>
              </slot>
            </div>
            <div :class="[`${ns}__body`]">
              <!-- body插槽 -->
              <slot name="body"></slot>
            </div>
            <div :class="[`${ns}__footer`, `is-${placement}`]">
              <!-- footer插槽 -->
              <slot name="footer" :ok="handleOk" :cancel="handleCancel" :loadingObj="loadingObj">
                <BnSpace :size="12">
                  <BnButton type="primary" @click="handleOk" :loading="loadingObj.ok">{{ `${okText ? okText : '确认'}` }}
                  </BnButton>
                  <BnButton fill-mode="outline" @click="handleCancel" :loading="loadingObj.cancel">{{ `${cancelText ?
                    cancelText : '取消'}` }}</BnButton>
                </BnSpace>
              </slot>
            </div>
          </slot>
          <span :class="[`${ns}__close-icon`]" @click="interceptClose('cancel')"></span>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import { drawerProps } from './drawer'
import { upperFirstChar } from '../../../shared/utils'
import { isFunction, isNumber, isPromise } from '../../../utils/is'
import { useOverflow } from '../../../hooks/use-overflow'
import BnButton from '../../../components/button/src/button.vue'
import BnSpace from '../../../components/space/src/space.vue'
import { KEYBOARD_KEY } from '../../../utils/keyboard'
import { getElement, off, on } from '../../../utils/dom'
import usePopupManager from '../../../hooks/use-popup-manager'


import type { StyleValue } from 'vue'
import { addUnit } from '../../../shared/utils'



export default defineComponent({
  name: getComponentNamespace('Drawer'),
  components: {
    BnButton,
    BnSpace
  },
  props: drawerProps,
  inheritAttrs: false,
  emits: ['update:modelValue', 'close', 'closed', 'open', 'opened'],
  setup(props, { slots, emit }) {
    const ns = getNamespace('drawer')

    const containerStyle = computed(() => {
      const style: StyleValue = {}

      if (props.width && ['left', 'right'].includes(props.placement)) {
        style.width = isNumber(props.width) ? addUnit(props.width) : props.width
      }
      if (props.height && ['top', 'bottom'].includes(props.placement)) {
        style.height = isNumber(props.height) ? addUnit(props.height) : props.height
      }
      return style
    })

    const innerVisible = computed(() => props.modelValue)
    const outerVisible = computed(() => innerVisible.value || animation.value)
    const animation = ref(innerVisible.value)

    const teleportContainer = ref<HTMLElement>()


    const { zIndex, isLastDialog } = usePopupManager('dialog', {
      visible: innerVisible
    })


    // 隐藏滚动条
    const { setOverflowHidden, resetOverflow } = useOverflow(teleportContainer)

    const isRenderToBody = computed(() => teleportContainer.value === document.body)

    const drawerStyle = computed(() => {
      const style: StyleValue = {
        zIndex: zIndex.value
      }
      if (!isRenderToBody.value) {
        style.position = 'absolute'
        teleportContainer.value!.style.position = 'relative'
      }
      return style
    })

    const emitToClose = (action: 'cancel' | 'ok', e?: Event) => {
      emit('update:modelValue', false)
      emit('close', action, e)
    }

    const loadingObj = reactive({
      ok: false,
      cancel: false
    })

    const interceptClose = (action: 'ok' | 'cancel', e?: Event) => {
      // @ts-ignore
      const interceptFn = props[`onBefore${upperFirstChar(action)}`]
      let result = true;
      loadingObj[action] = true
      if (isFunction(interceptFn)) {
        result = interceptFn(action) ?? false;
      }
      if (isPromise(result)) {
        result.then((res) => {
          loadingObj[action] = false
          res && emitToClose(action, e)
        })
        return
      }
      loadingObj[action] = false
      result && emitToClose(action, e)

    }

    const handleMask = () => {
      if (!props.maskToClose) return
      if (!props.mask) return
      interceptClose('cancel')

    }

    const afterEnter = () => {
      // 隐藏滚动条
      setOverflowHidden()
      emit('opened')
    }

    // 动画结束
    const afterLeave = () => {
      animation.value = false
      resetOverflow()
      emit('closed')
    }


    let globalKeyDownListener = false

    const handleGlobalKeyDown = (ev: KeyboardEvent) => {
      if (props.escToClose && ev.key === KEYBOARD_KEY.ESC && isLastDialog()) {
        interceptClose('cancel')
      }
    };

    const addGlobalKeyDownListener = () => {
      if (props.escToClose && !globalKeyDownListener) {
        globalKeyDownListener = true;
        on(document.documentElement, 'keydown', handleGlobalKeyDown);
      }
    };

    const removeGlobalKeyDownListener = () => {
      globalKeyDownListener = false;
      off(document.documentElement, 'keydown', handleGlobalKeyDown);
    };



    onMounted(() => {
      if (innerVisible.value) {
        setOverflowHidden()
        props.escToClose && addGlobalKeyDownListener();
      }
    })


    // 页面意外关闭
    onBeforeUnmount(() => {
      resetOverflow();
      removeGlobalKeyDownListener();
    });

    watch(() => innerVisible.value, (val) => {
      if (val) {
        emit('open')
        animation.value = true
        // 监听键盘事件
        addGlobalKeyDownListener();

        if(!isRenderToBody.value) {
          setOverflowHidden()
        }

      } else {
        // 移除键盘事件
        removeGlobalKeyDownListener()
      }
    })


    watch(() => props.renderTo, async (newRenderTo) => {
      await nextTick()
      teleportContainer.value = getElement(newRenderTo)
    }, { immediate: true })


    // footer按钮内部控制
    const handleCancel = (e: Event) => {
      interceptClose('cancel', e)
    }
    const handleOk = (e: Event) => {
      interceptClose('ok', e)
    }

    return {
      ns,
      containerStyle,
      animation,
      drawerStyle,
      teleportContainer,
      innerVisible,
      outerVisible,
      handleMask,
      afterEnter,
      afterLeave,
      interceptClose,
      handleCancel,
      handleOk,
      loadingObj
    }

  }

})
</script>