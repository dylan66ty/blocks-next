<script lang="ts">
  import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
  import type { StyleValue } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
  import { upperFirstChar, addUnit } from '../../../shared/utils'
  import { isFunction, isPromise } from '../../../utils/is'
  import { useOverflow } from '../../../hooks/use-overflow'
  import BnButton from '../../../components/button/src/button.vue'
  import BnSpace from '../../../components/space/src/space.vue'
  import { KEYBOARD_KEY } from '../../../utils/keyboard'
  import { getElement, off, on } from '../../../utils/dom'
  import usePopupManager from '../../../hooks/use-popup-manager'
  import { drawerProps } from './drawer'

  export default defineComponent({
    name: getComponentNamespace('Drawer'),
    components: {
      BnButton,
      BnSpace
    },
    inheritAttrs: false,
    props: drawerProps,
    emits: ['update:modelValue', 'close', 'closed', 'open', 'opened'],
    setup(props, { emit }) {
      const ns = getNamespace('drawer')

      const containerStyle = computed(() => {
        const style: StyleValue = {}

        if (props.width && ['left', 'right'].includes(props.placement)) {
          style.width = addUnit(props.width)
        }
        if (props.height && ['top', 'bottom'].includes(props.placement)) {
          style.height = addUnit(props.height)
        }
        return style
      })

      const modelVisible = computed(() => props.modelValue)
      const animation = ref(false)
      const mergeVisible = computed(() => modelVisible.value || animation.value)

      const teleportContainer = computed(() => getElement(props.renderTo))
      const drawerRef = ref<HTMLElement>()

      const { zIndex, isLastDialog } = usePopupManager('dialog', {
        visible: modelVisible
      })

      const { setOverflowHidden, resetOverflow } = useOverflow(teleportContainer, drawerRef)

      const drawerStyle = computed(() => {
        const style: StyleValue = {
          zIndex: zIndex.value
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
        const fnKey = `onBefore${upperFirstChar(action)}` as 'onBeforeOk' | 'onBeforeCancel'
        const interceptFn = props[fnKey]
        let result: boolean | Promise<boolean> = true
        loadingObj[action] = true
        if (isFunction(interceptFn)) {
          result = interceptFn(action) ?? false
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
      }

      const addGlobalKeyDownListener = () => {
        if (props.escToClose && !globalKeyDownListener) {
          globalKeyDownListener = true
          on(document.documentElement, 'keydown', handleGlobalKeyDown)
        }
      }

      const removeGlobalKeyDownListener = () => {
        globalKeyDownListener = false
        off(document.documentElement, 'keydown', handleGlobalKeyDown)
      }

      onMounted(() => {
        if (modelVisible.value) {
          props.escToClose && addGlobalKeyDownListener()
        }
      })

      // 页面意外关闭
      onBeforeUnmount(() => {
        resetOverflow()
        removeGlobalKeyDownListener()
      })

      watch(
        () => modelVisible.value,
        (val) => {
          if (val) {
            emit('open')
            setOverflowHidden()
            animation.value = true
            // 监听键盘事件
            addGlobalKeyDownListener()
          } else {
            // 移除键盘事件
            removeGlobalKeyDownListener()
          }
        }
      )

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
        drawerStyle,
        teleportContainer,
        drawerRef,
        modelVisible,
        mergeVisible,
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

<template>
  <teleport :to="teleportContainer" :disabled="disabled || !teleportContainer">
    <div
      v-if="!destroyOnClosed || mergeVisible"
      v-show="mergeVisible"
      ref="drawerRef"
      :class="[`${ns}`, popupClass]"
      :style="drawerStyle"
      v-bind="$attrs"
    >
      <transition name="bn-fade-in-standard" appear>
        <div v-if="mask" v-show="modelVisible" :class="`${ns}__mask`" @click.self="handleMask" />
      </transition>
      <transition :name="`bn-slide-${placement}`" appear @after-enter="afterEnter" @after-leave="afterLeave">
        <div v-show="modelVisible" :class="[`${ns}__container`, `is-${placement}`, !$slots.default && 'is-template']" :style="containerStyle">
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
              <slot name="footer" :ok="handleOk" :cancel="handleCancel" :loading-obj="loadingObj">
                <BnSpace :size="12">
                  <BnButton type="primary" :loading="loadingObj.ok" @click="handleOk">{{ `${okText ? okText : '确认'}` }} </BnButton>
                  <BnButton :loading="loadingObj.cancel" @click="handleCancel">{{ `${cancelText ? cancelText : '取消'}` }}</BnButton>
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
