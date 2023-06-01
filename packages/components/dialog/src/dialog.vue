<template>
  <teleport :to="teleportContainer" :disabled="teleportDisabled">
    <div :class="cls" :style="dialogStyle" v-show="outerVisible" v-if="!destroyOnClosed || outerVisible">
      <transition name="bn-fade-in-standard" appear>
        <div :class="[`${ns}__mask`]" v-if="mask" v-show="innerVisible"></div>
      </transition>
      <div :class="[`${ns}__wrapper`, { 'is-center': center }]" @click.self="handleMaskClick">
        <transition name="bn-zoom-in" appear @after-enter="afterEnter" @after-leave="afterLeave">
          <div :class="[`${ns}__container`, { 'is-fullscreen': fullscreen }]" :style="containerStyle"
            v-show="innerVisible">
            <div :class="[`${messageBox ? messageBoxNs : ns}__header`]">
              <div :class="[`${ns}__header-title`]" v-if="!$slots['title']">
                {{ title }}
              </div>
              <slot name="title" v-else></slot>
            </div>
            <div :class="[`${messageBox ? messageBoxNs : ns}__body`]">
              <slot></slot>
            </div>
            <div :class="[`${messageBox ? messageBoxNs : ns}__footer`]">
              <slot name="footer" :cancel="handleCancel" :ok="handleOk" :loadingObj="loadingObj"></slot>
            </div>

            <span :class="[`${ns}__close-icon`]" @click="interceptClose('cancel')"></span>
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, reactive, ref, toRef, watch } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import { dialogProps } from './dialog'
import type { StyleValue } from 'vue'
import { addUnit } from '../../../shared/utils'
import { isFunction, isNumber, isPromise } from '../../../utils/is'
import usePopupManager from '../../../hooks/use-popup-manager'
import { useOverflow } from '../../../hooks/use-overflow'
import { KEYBOARD_KEY } from '../../../utils/keyboard'
import { getElement, off, on } from '../../../utils/dom'

const styleProps = ['width', 'minWidth', 'height', 'minHeight'] as const
type StyleProps = (typeof styleProps)[number]


export default defineComponent({
  name: getComponentNamespace('Dialog'),
  props: dialogProps,
  inheritAttrs: false,
  emits: ['closed', 'close', 'open', 'opened', 'update:modelValue'],
  setup(props, { emit }) {
    const ns = getNamespace('dialog')
    const messageBoxNs = getNamespace('message-box')
    const cls = computed(() => [
      ns,
      props.messageBox && 'is-message-box',
      props.popupClass && props.popupClass
    ])

    const teleportContainer = ref<HTMLElement>()
    const teleportDisabled = computed(() => props.disabled || !teleportContainer.value)

    watch(() => props.renderTo, async (newRenderTo) => {
      await nextTick()
      teleportContainer.value = getElement(newRenderTo)
    }, { immediate: true })


    const dialogStyle = computed(() => {
      const style: StyleValue = {}
      if (!teleportContainer.value) return style
      if (teleportContainer.value !== document.body && !props.messageBox) {
        teleportContainer.value!.style.position = 'relative'
        style.position = 'absolute'
      }
      style.zIndex = zIndex.value
      return style
    })

    const containerStyle = computed(() => {
      const style: StyleValue = {}
      if (props.fullscreen) {
        return style
      }
      if (!props.center && props.top) {
        style.top = addUnit(props.top)
      }
      styleProps.forEach((key: StyleProps) => {
        if (props[key]) {
          style[key] = addUnit(props[key])
        }
      })
      return style
    })


    const innerVisible = computed(() => props.modelValue);
    const outerVisible = computed(() => innerVisible.value || animation.value)
    const animation = ref(innerVisible.value)




    const { zIndex, isLastDialog } = usePopupManager('dialog', {
      visible: innerVisible,
    });

    const { setOverflowHidden, resetOverflow } = useOverflow(teleportContainer);


    const emitToClose = (action: 'cancel' | 'ok', e?: Event) => {
      emit('update:modelValue', false)
      emit('close',
        props.messageBox ? action : undefined,
        props.messageBox ? e : undefined
      )
    }


    // 动画执行完后触发关闭
    const afterLeave = () => {
      animation.value = false
      resetOverflow()
      emit('closed')
    }

    // 动画加载后触发打开
    const afterEnter = () => {
      // 隐藏滚动条
      setOverflowHidden()
      emit('opened')
    }

    const loadingObj = reactive({
      ok: false,
      cancel: false
    })

    // 关闭拦截
    const interceptClose = (action: 'cancel' | 'ok', e?: Event) => {
      let result = true;
      loadingObj[action] = true
      if (isFunction(props.onBeforeCancel)) {
        result = props.onBeforeCancel(action) ?? false;
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

    };

    // 点击遮罩层
    const handleMaskClick = () => {
      if (!props.maskToClose) return
      if (!props.mask) return
      interceptClose('cancel')
    }

    // footer按钮内部控制
    const handleCancel = (e: Event) => {
      interceptClose('cancel', e)
    }
    const handleOk = (e: Event) => {
      interceptClose('ok', e)
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
        addGlobalKeyDownListener();
      } else {
        removeGlobalKeyDownListener()
      }
    })


    return {
      cls,
      ns,
      messageBoxNs,
      containerStyle,
      dialogStyle,
      teleportContainer,
      teleportDisabled,
      innerVisible,
      outerVisible,
      interceptClose,
      afterLeave,
      afterEnter,
      handleMaskClick,
      handleCancel,
      handleOk,
      loadingObj,

    }

  }
})
</script>