<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'
  import type { PropType } from 'vue'
  import { getNamespace } from '../../../../utils/global-config'
  import { Select } from '../../../select'
  import { Option } from '../../../select-option'

  export default defineComponent({
    name: 'PaginationSizes',
    components: {
      Select,
      Option
    },
    props: {
      pageSize: {
        type: Number,
        default: 0
      },
      pageSizes: {
        type: Array as PropType<Array<number>>,
        default: () => []
      },
      disabled: Boolean
    },
    emits: ['change'],
    setup(props, { emit }) {
      const ns = getNamespace('pagination-sizes')
      const cls = computed(() => [ns])

      const pageSizeModel = ref(props.pageSize)
      const pageSizesTrans = computed(() => {
        return props.pageSizes.map((size) => {
          return {
            value: size,
            label: `${size}条/页`
          }
        })
      })

      const handleChange = (size: number) => {
        emit('change', size)
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

<template>
  <div :class="cls">
    <Select
      v-model="pageSizeModel"
      :disabled="disabled"
      :validate-event="false"
      size="small"
      @change="handleChange"
    >
      <Option
        v-for="item in pageSizesTrans"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      />
    </Select>
  </div>
</template>
