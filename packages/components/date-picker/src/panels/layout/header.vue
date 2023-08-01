<script lang="ts">
  import type { PropType } from 'vue'
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
    props: {
      content: {
        type: String,
        default: ''
      },
      actions: {
        type: Array as PropType<string[]>,
        default: () => ['prevSuper', 'prev', 'next', 'nextSuper']
      }
    },
    emits: ['prevSuper', 'prev', 'next', 'nextSuper'],
    setup(_props, { emit }) {
      const ns = getNamespace('date-picker')

      const handlePrevSuper = () => {
        emit('prevSuper')
      }
      const handlePrev = () => {
        emit('prev')
      }
      const handleNextSuper = () => {
        emit('nextSuper')
      }

      const handleNext = () => {
        emit('next')
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
      <div :class="[`${ns}__header-icon`]">
        <BnIconSuperArrowLeft v-if="actions.includes('prevSuper')" @click="handlePrevSuper" />
      </div>
      <div :class="[`${ns}__header-icon`]">
        <BnIconArrowLeft v-if="actions.includes('prev')" @click="handlePrev" />
      </div>
    </div>
    <div :class="[`${ns}__header-content`]">{{ content }}</div>
    <div :class="[`${ns}__header-right`]">
      <div :class="[`${ns}__header-icon`]">
        <BnIconArrowRight v-if="actions.includes('next')" @click="handleNext" />
      </div>
      <div :class="[`${ns}__header-icon`]">
        <BnIconSuperArrowRight v-if="actions.includes('nextSuper')" @click="handleNextSuper" />
      </div>
    </div>
  </div>
</template>
