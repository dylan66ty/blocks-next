<template>
  <span :class="cls">
    共 {{ total }} 条
  </span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { getNamespace } from '../../../../utils/global-config';

export default defineComponent({
  name: 'PaginationTotal',
  props: {
    total: Number,
    disabled:Boolean
  },
  setup(props){
    const ns = getNamespace('pagination-total')
    const cls = computed(() => [
      ns
    ])
      
    return {
      cls
    }
  }
})
</script>
