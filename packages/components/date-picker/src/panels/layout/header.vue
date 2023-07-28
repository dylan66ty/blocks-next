<script lang="ts">
  import { defineComponent } from 'vue'
  import { getNamespace } from '../../../../../utils/global-config'
  import {
    BnIconSuperArrowLeft,
    BnIconSuperArrowRight,
    BnIconArrowLeft,
    BnIconArrowRight
  } from '../../../../icon'

  export default defineComponent({
    name: 'PanelHeader',
    components: {
      BnIconSuperArrowLeft,
      BnIconSuperArrowRight,
      BnIconArrowLeft,
      BnIconArrowRight
    },
    setup() {
      const ns = getNamespace('date-picker')

      const handlePrevSuper = () => {
        console.log('handlePrevSuper')
      }
      const handlePrev = () => {
        console.log('handlePrev')
      }
      const handleNextSuper = () => {
        console.log('handleNextSuper')
      }

      const handleNext = () => {
        console.log('handleNext')
      }

      return {
        ns,
        handlePrevSuper,
        handleNextSuper,
        handlePrev,
        handleNext
      }
    }
  })
</script>

<template>
  <div :class="[`${ns}__header`]">
    <div :class="[`${ns}__header-left`]">
      <BnIconSuperArrowLeft @click="handlePrevSuper" />
      <BnIconArrowLeft @click="handlePrev" />
    </div>
    <div :class="[`${ns}__header-content`]"> 2023-07-27 </div>
    <div :class="[`${ns}__header-right`]">
      <BnIconArrowRight @click="handleNext" />
      <BnIconSuperArrowRight @click="handleNextSuper" />
    </div>
  </div>
</template>
