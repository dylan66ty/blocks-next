<template>
  <div :class="cls">
    <bn-select 
      v-model="pageSizeModel" 
      :disabled="disabled" 
      :popper-class="popperClass"
      :validate-event="false" 
      @change="handleChange"
      size="small"   
      >
      <bn-option v-for="item in pageSizesTrans" :key="item.value" :value="item.value" :label="item.label"  />
    </bn-select>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent , ref} from 'vue'
import { getNamespace } from '../../../../utils/global-config'
import BnSelect from '../../../select/src/select.vue'
import BnOption from '../../../select/src/option.vue'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'PaginationSizes',
  components: {
    BnSelect,
    BnOption
  },
  emits: ['change'],
  props: {
    pageSize: {
      type: Number,
      required: true,
    },
    pageSizes: {
      type:Array as PropType<Array<number>>,
      default: () => [],
    },
    popperClass: {
      type: String,
    },
    disabled: Boolean,
  },
  setup(props, {emit}) {
    const ns = getNamespace('pagination-sizes')
    const cls = computed(() => [
      ns
    ])

    const pageSizeModel = ref(props.pageSize)
    const pageSizesTrans = computed(() => {
      return props.pageSizes.map(size => {
        return {
          value: size,
          label: `${size}条/页`
        }
      }) 
    })

    const handleChange = (size:number) => {
      emit('change',size)
    }

    return {
      cls,
      handleChange,
      pageSizeModel,
      pageSizesTrans
    }
  }
})
</script>