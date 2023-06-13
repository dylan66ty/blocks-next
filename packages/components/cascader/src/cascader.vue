<template>
  <div>cascader</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config';
export default defineComponent({
  name: getComponentNamespace('Cascader'),
  setup() {
    const ns = getNamespace('cascader')
  }

})
</script>