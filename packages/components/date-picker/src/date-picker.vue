<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
  import Trigger from '../../trigger/src/trigger'
  import DateTrigger from '../../common/date-trigger.vue'
  import { datePickerProps } from './props'

  import DatePanel from './panels/date-panel.vue'

  export default defineComponent({
    name: getComponentNamespace('DatePicker'),
    components: {
      Trigger,
      DateTrigger,
      DatePanel
    },
    props: datePickerProps,
    setup(props) {
      const ns = getNamespace('date-picker')
      const popupVisible = ref(false)
      const mergeDisabled = computed(() => props.disabled)
      const popupRef = ref()

      return {
        ns,
        popupVisible,
        mergeDisabled,
        popupRef
      }
    }
  })
</script>

<template>
  <div :class="[ns]">
    <Trigger
      v-model:popupVisible="popupVisible"
      position="bl"
      trigger="click"
      :unmount-on-close="false"
      animation-name="bn-slide-dynamic-origin"
      :popup-offset="8"
      :disabled="mergeDisabled"
    >
      <template #default>
        <DateTrigger
          :clearable="clearable"
          :placeholder="placeholder"
          :disabled="mergeDisabled"
          :popup-ref="popupRef"
          :size="size"
        />
      </template>
      <template #content>
        <div ref="popupRef" :class="[`${ns}__panel`, `is-${type}`]">
          <DatePanel />
        </div>
      </template>
    </Trigger>
  </div>
</template>
