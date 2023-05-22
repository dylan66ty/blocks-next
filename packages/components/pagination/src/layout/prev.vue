<template>
  <button type="button" :disabled="disabled" :class="cls" @click="prev">
    <PrevIcon :rotate="90"/>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { getNamespace } from '../../../../utils/global-config'
import PrevIcon from '../../../icon/src/base/caret.vue'

export default defineComponent({
  name: 'PaginationPrev',
  components: {
    PrevIcon,
  },
  emits: ['click'],
  props: {
    disabled: Boolean,
    currentPage:Number
  },
  setup(props,{emit}) {
    const ns = getNamespace('pagination-prev')
    const canPrev = computed(() => (props.currentPage!) > 1)
    const cls = computed(() => [
      ns,
      !canPrev.value && 'is-disabled'
    ])

    const prev = (e:Event) => {
      if(!canPrev.value) return
      emit('click', e)
    }

    return {
      cls,
      prev
    }
  }
})
</script>