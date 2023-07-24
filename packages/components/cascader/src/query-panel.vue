<script lang="ts">
  import type { PropType } from 'vue'
  import { defineComponent } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { Scrollbar } from '../../scrollbar'
  import { BnIconCheck, BnIconEmpty } from '../../icon'
  import { Empty } from '../../empty'
  import type { QueryData } from './type'

  export default defineComponent({
    name: 'CascaderQueryPanel',
    components: {
      Scrollbar,
      BnIconCheck,
      Empty,
      BnIconEmpty
    },
    props: {
      queryDataList: {
        type: Array as PropType<QueryData[]>,
        required: true
      }
    },
    emits: ['onTag'],
    setup() {
      const ns = getNamespace('cascader-query-panel')
      return {
        ns
      }
    }
  })
</script>

<template>
  <div :class="[ns]">
    <Scrollbar v-if="queryDataList.length" style="max-height: 220px">
      <div :class="[`${ns}__list`]">
        <div
          v-for="queryData in queryDataList"
          :key="queryData.key"
          :class="[`${ns}__tag`, { 'is-selected': queryData.isSelected }]"
          @click="$emit('onTag', queryData)"
        >
          <span v-html="queryData.label"></span>
          <BnIconCheck v-if="queryData.isSelected" />
        </div>
      </div>
    </Scrollbar>
    <div v-else :class="[`${ns}__empty`]">
      <Empty description="暂无匹配项">
        <template #image>
          <BnIconEmpty size="38" />
        </template>
      </Empty>
    </div>
  </div>
</template>
