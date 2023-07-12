<script lang="ts">
  import { computed, defineComponent, onBeforeUnmount, reactive, ref, watch } from 'vue'
  import type { StyleValue } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'
  import { isFunction, isPromise } from '../../../utils/is'
  import usePopupManager from '../../../hooks/use-popup-manager'
  import { useOverflow } from '../../../hooks/use-overflow'
  import { KEYBOARD_KEY } from '../../../utils/keyboard'
  import { getElement, off, on } from '../../../utils/dom'
  import { dialogProps } from './props'

  const styleProps = ['width', 'minWidth', 'height', 'minHeight'] as const
  type StyleProps = (typeof styleProps)[number]

  export default defineComponent({
    name: getComponentNamespace('Dialog'),
    inheritAttrs: false,
    props: dialogProps,
    emits: ['closed', 'close', 'open', 'opened', 'update:modelValue'],
    setup(props, { emit }) {
      const ns = getNamespace('dialog')
      const messageBoxNs = getNamespace('message-box')
      const cls = computed(() => [
        ns,
        props.messageBox && 'is-message-box',
        props.popupClass && props.popupClass
      ])

      const teleportContainer = computed(() => getElement(props.renderTo))
      const dialogRef = ref<HTMLElement>()
      const teleportDisabled = computed(() => props.disabled || !teleportContainer.value)

      const dialogStyle = computed(() => {
        const style: StyleValue = {
          zIndex: zIndex.value
        }
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

      const animation = ref(false)
      const modelVisible = computed(() => props.modelValue)
      const mergeVisible = computed(() => modelVisible.value || animation.value)

      const { zIndex, isLastDialog } = usePopupManager('dialog', {
        visible: modelVisible
      })

      const { setOverflowHidden, resetOverflow } = useOverflow(teleportContainer, dialogRef)

      const emitToClose = (action: 'cancel' | 'ok', e?: Event) => {
        emit('update:modelValue', false)
        emit('close', props.messageBox ? action : undefined, props.messageBox ? e : undefined)
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
        emit('opened')
      }

      const loadingObj = reactive({
        ok: false,
        cancel: false
      })

      // 关闭拦截
      const interceptClose = (action: 'cancel' | 'ok', e?: Event) => {
        let result = true
        loadingObj[action] = true
        if (isFunction(props.onBeforeCancel)) {
          result = props.onBeforeCancel(action) ?? false
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
            addGlobalKeyDownListener()
          } else {
            removeGlobalKeyDownListener()
          }
        },
        { immediate: true }
      )

      return {
        cls,
        ns,
        messageBoxNs,
        containerStyle,
        dialogStyle,
        dialogRef,
        teleportContainer,
        teleportDisabled,
        modelVisible,
        mergeVisible,
        interceptClose,
        afterLeave,
        afterEnter,
        handleMaskClick,
        handleCancel,
        handleOk,
        loadingObj
      }
    }
  })
</script>

<template>
  <teleport :to="teleportContainer" :disabled="teleportDisabled">
    <div
      v-show="mergeVisible"
      v-if="!destroyOnClosed || mergeVisible"
      ref="dialogRef"
      :class="cls"
      :style="dialogStyle"
    >
      <transition name="bn-fade-in-standard" appear>
        <div v-if="mask" v-show="modelVisible" :class="[`${ns}__mask`]"></div>
      </transition>
      <div :class="[`${ns}__wrapper`, { 'is-center': center }]" @click.self="handleMaskClick">
        <transition name="bn-zoom-in" appear @after-enter="afterEnter" @after-leave="afterLeave">
          <div
            v-show="modelVisible"
            :class="[`${ns}__container`, { 'is-fullscreen': fullscreen }]"
            :style="containerStyle"
          >
            <div :class="[`${messageBox ? messageBoxNs : ns}__header`]">
              <div v-if="!$slots['title']" :class="[`${ns}__header-title`]">
                {{ title }}
              </div>
              <slot v-else name="title"></slot>
            </div>
            <div :class="[`${messageBox ? messageBoxNs : ns}__body`]">
              <slot></slot>
            </div>
            <div :class="[`${messageBox ? messageBoxNs : ns}__footer`]">
              <slot
                name="footer"
                :cancel="handleCancel"
                :ok="handleOk"
                :loading-obj="loadingObj"
              ></slot>
            </div>

            <span
              v-if="showClose"
              :class="[`${ns}__close-icon`]"
              @click="interceptClose('cancel')"
            ></span>
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>
