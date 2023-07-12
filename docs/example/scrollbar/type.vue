<script lang="ts" setup>
  import { ref } from 'vue'

  const content =
    ref(`Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, provident exercitationem ex, numquam nam reiciendis sapiente, 
   illum dignissimos esse magni quasi iure molestiae quas ad quis perspiciatis nihil eveniet dicta.`)
</script>

<template>
  <bn-scrollbar class="scroll-container" type="track">
    {{ content.repeat(6) }}
  </bn-scrollbar>
</template>

<style lang="scss">
  .scroll-container {
    max-height: 200px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 12px;
  }
</style>
