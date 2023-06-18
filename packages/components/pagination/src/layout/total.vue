<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { getNamespace } from '../../../../utils/global-config'

  export default defineComponent({
    name: 'PaginationTotal',
    props: {
      total: {
        type: Number,
        default: 0
      },
      disabled: Boolean
    },
    setup() {
      const ns = getNamespace('pagination-total')
      const cls = computed(() => [ns])
      return {
        cls
      }
    }
  })
</script>

<template>
  <span :class="cls"> 共 {{ total }} 条 </span>
</template>
