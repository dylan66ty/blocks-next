<script lang="ts" setup>

</script>

<template>
  <div class="card-demo-area">
    <bn-space direction="vertical">
      <bn-space>
        <div style="width:200px;">
          <bn-input card placeholder="产品名称" suffix-icon="bn-icon-search"></bn-input>
        </div>
        <div style="width:200px;">
          <bn-input card placeholder="产品名称" value="我是名称" suffix-icon="bn-icon-search"></bn-input>
        </div>
      </bn-space>
      <bn-space>
        <div style="width:200px;">
          <bn-input card placeholder="产品名称" size="large" suffix-icon="bn-icon-search"></bn-input>
        </div>
        <div style="width:200px;">
          <bn-input card placeholder="产品名称" size="large" disabled suffix-icon="bn-icon-search"></bn-input>
        </div>
      </bn-space>
    </bn-space>
  </div>
</template>

<style lang="scss"></style>