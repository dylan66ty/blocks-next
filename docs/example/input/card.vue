<script lang="ts" setup>

</script>

<template>
  <div class="card-demo-area">
    <bn-space direction="vertical">
      <bn-space>
        <div style="width:200px;">
          <bn-input card placeholder="产品名称"></bn-input>
        </div>
        <div style="width:200px;">
          <bn-input card placeholder="产品名称" value="我是名称"></bn-input>
        </div>
      </bn-space>
      <bn-space>
        <div style="width:200px;">
          <bn-input card placeholder="产品名称" size="large"></bn-input>
        </div>
        <div style="width:200px;">
          <bn-input card placeholder="产品名称" size="large" disabled></bn-input>
        </div>
      </bn-space>
    </bn-space>
  </div>
</template>

<style lang="scss"></style>