<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps({
    source: {
      type: String,
      required: true,
    },
  });

  const decoded = computed(() => {
    return decodeURIComponent(props.source);
  });
</script>

<template>
  <div class="example-source-wrapper">
    <div class="example-source language-vue" v-html="decoded" language="vue" />
  </div>
</template>

