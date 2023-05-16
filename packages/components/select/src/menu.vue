<script lang="ts">
  import { computed, defineComponent, inject, ref } from 'vue';
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config';
  import { selectKey } from './constant';

  export default defineComponent({
    name: getComponentNamespace('SelectMenu'),
    setup() {
      const ns = getNamespace('select');
      const selectContext = inject(selectKey)!;

      const popperClass = computed(() => selectContext.props.popperClass);
      const isMultiple = computed(() => selectContext.props.multiple);

      const cls = computed(() => [
        `${ns}-menu`,
        popperClass.value && popperClass.value,
        isMultiple.value && 'is-multiple',
      ]);
      return {
        cls,
      };
    },
  });
</script>

<template>
  <div :class="cls">
    <slot></slot>
  </div>
</template>
