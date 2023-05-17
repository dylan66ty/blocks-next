<template>
  <div :class="cls">
    <span>前往</span>
    <BnInput v-model="pageModel" size="small" :validate-event="false"  @change="handleChange"/>
    <span>页</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { getNamespace } from '../../../../utils/global-config';
import BnInput from '../../../input/src/input.vue'

export default defineComponent({
  name: 'PaginationJumper',
  props: {
    currentPage: {
      type: Number,
      default: 0
    },
    pageCount: {
      type:Number,
      default:0
    },
    disabled:{
      type:Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 0
    }
  },
  emits:['change'],
  setup(props, {emit}) {
    const ns = getNamespace('pagination-jumper')
    const cls = computed(() => [
      ns,
    ])

    const pageModel = ref(props.currentPage)

    const handleChange = (page:string) => {
      const _page = Number(page)
      if(_page > props.pageCount) {
        pageModel.value = props.pageCount
        return
      }
      emit('change',_page)
    }

    watch(() => props.currentPage, page => {
      pageModel.value = page
    })
    
    watch(() => props.pageSize, () => {
      pageModel.value = props.currentPage
    })

    


    
    return {
      cls,
      pageModel,
      handleChange
    }
  }
})
</script>