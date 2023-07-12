import { defineComponent, onUnmounted, ref } from 'vue'
import Trigger from '../../../trigger/src/trigger'
import SettingPopup from './table-setting-popup'

export default defineComponent({
  name: 'SettingIcon',
  setup() {
    const popupVisible = ref(false)

    let popupHideCallback: null | (() => void) = null

    const close = (callback: () => void) => {
      popupVisible.value = false
      popupHideCallback = callback
    }

    const handlePopupVisibleChange = (status: boolean) => {
      popupVisible.value = status
    }

    const onHide = () => {
      popupHideCallback && popupHideCallback()
    }

    onUnmounted(() => {
      popupHideCallback = null
    })

    return () => {
      return (
        <Trigger
          popupVisible={popupVisible.value}
          position="br"
          trigger="click"
          unmount-on-close={false}
          animation-name="bn-slide-dynamic-origin"
          auto-fit-popup-min-width={true}
          popup-offset={0}
          v-slots={{
            content: () => (
              <SettingPopup close={close} popupVisible={popupVisible.value}></SettingPopup>
            )
          }}
          onPopupVisibleChange={handlePopupVisibleChange}
          onHide={onHide}
        >
          <div class={['bn-table__setting']}>
            <div class="bn-table__setting-icon">
              <div class="line line-1"></div>
              <div class="line line-2"></div>
              <div class="line line-3"></div>
            </div>
          </div>
        </Trigger>
      )
    }
  }
})
