<template>
  <button type="button" :disabled="disabled" :class="cls" @click="next">
    <NextIcon :rotate="-90" />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { getNamespace } from '../../../../utils/global-config'
import NextIcon from '../../../icon/src/caret.vue'


export default defineComponent({
  name: 'PaginationNext',
  components: {
    NextIcon
  },
  props: {
    disabled: Boolean,
    currentPage:Number,
    pageCount:Number
  },
  emits: ['click'],
  setup(props,{emit}) {
    const ns = getNamespace('pagination-next')
    const canNext = computed(() => (props.currentPage as number) < (props.pageCount as number))
    const cls = computed(() => [
      ns,
      !canNext.value && 'is-disabled'
    ])

    const next = (e:Event) => {
      if(!canNext.value) return
      emit('click', e)
    }

    return {
      cls,
      next
    }
  }
})
</script>