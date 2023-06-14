<template>
  <div :class="[ns]">
    <Trigger v-model:popupVisible="states.popupVisible" position="bl" trigger="click" :unmount-on-close="false"
      animation-name="bn-slide-dynamic-origin" :popup-offset="8" :disabled="mergeDisabled">
      <template #default>
        <div :class="[`${ns}__trigger`]">
          <Input :disabled="mergeDisabled" :size="mergeSize" :readonly="inputReadonly" :placeholder="placeholder"
            :clearable="clearable" ref="inputRef">
          <template #suffix-icon>
            <CaretIcon :class="[{ 'is-rotate': states.popupVisible }, `${ns}__icon-caret`]" />
          </template>
          </Input>
        </div>
      </template>

      <template #content>
        <BasePanel :renderColumns="renderColumns"/>
      </template>
    </Trigger>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config';

import Scrollbar from '../../scrollbar/src/scrollbar.vue';
import Trigger from '../../trigger/src/trigger';
import Input from '../../input/src/input.vue';
import CaretIcon from '../../icon/src/base/caret.vue';

import BasePanel from './base-panel'

import { cascaderProps } from './props'
import { transData } from './utils'

import type { CascaderData, CascaderNode } from './type'
import { compose } from '../../../shared/utils';

export default defineComponent({
  name: getComponentNamespace('Cascader'),
  components: {
    Scrollbar,
    Trigger,
    Input,
    CaretIcon,
    BasePanel
  },
  props: cascaderProps,
  emits: ['update:modelValue'],
  setup(props, { }) {
    const ns = getNamespace('cascader')

    const states = reactive({
      popupVisible: false
    })

    // TODO 从表单合并 disabled 属性
    const mergeDisabled = computed(() => props.disabled);
    const mergeSize = computed(() => props.size);

    const inputReadonly = computed(() => true)

    
    const dataTree = ref<CascaderNode[]>([])
    // cascader panel 渲染二维数组
    const renderColumns = ref<CascaderData[][]>([])


    const level = ref(1)

    watch(() => props.data, (newData: CascaderData[]) => {
      dataTree.value = transData(newData)

      renderColumns.value = [dataTree.value] 
    }, { immediate: true, deep: true })


    



    return {
      ns,
      states,
      mergeDisabled,
      mergeSize,
      inputReadonly,

      renderColumns
    }
  }

})
</script>