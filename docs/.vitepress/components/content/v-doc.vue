<script lang="ts" setup>
import VLastUpdatedAt from './v-last-updated-at.vue';
import VToc from './v-toc.vue'

</script>

<template>
  <div class="doc-wrapper">
    <div class="doc-content">
      <Content />
      <VLastUpdatedAt />
    </div>
    <VToc />
  </div>
</template>

<style lang="scss"></style>