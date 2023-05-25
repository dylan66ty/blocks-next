<script lang="ts" setup>

</script>

<template>
  <bn-scrollbar class="scroll-container">
   <div>
   {{ `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, provident exercitationem ex, numquam nam reiciendis sapiente, 
   illum dignissimos esse magni quasi iure molestiae quas ad quis perspiciatis nihil eveniet dicta.`.repeat(6)}}
   </div>
  </bn-scrollbar>

  <div style="margin-top: 20px;"></div>

  <bn-scrollbar class="scroll-container">
   <div style="white-space: nowrap;">
   {{ `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, provident exercitationem ex, numquam nam reiciendis sapiente, 
   illum dignissimos esse magni quasi iure molestiae quas ad quis perspiciatis nihil eveniet dicta.`}}
   </div>
  </bn-scrollbar>
</template>

<style lang="scss">
.scroll-container {
  height: 200px;
  background-color: rgba(0,0,0,0.8);
  color: #fff;
  padding: 12px;
}

</style>