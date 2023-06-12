<script setup lang="ts">
  import { computed } from 'vue'
  const props = defineProps({
    file: {
      type: String,
      required: true,
    },
    demo: {
      type: Object,
      required: true,
    },
  });
  const hideWrapper = computed(() => props.file.includes('hide-code'))

</script>

<template>
  <div :class="{
    'example-wrapper': !hideWrapper
  }">
    <ClientOnly>
      <component :is="demo" v-if="demo" v-bind="$attrs" />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
  .example-wrapper {
    margin-top: 24px;
    padding:36px;
    background-color: var(--vp-c-bg);
    border: 1px solid rgb(229,230,235);

  }
</style>
