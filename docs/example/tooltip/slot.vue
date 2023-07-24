<script lang="ts" setup></script>

<template>
  <bn-space>
    <bn-tooltip content="This is tooltip content">
      <bn-button size="small">鼠标移入显示(插槽)</bn-button>
      <template #content>
        <div>This is slot render content1</div>
        <div>This is slot render content2</div>
        <div>This is slot render content3</div>
      </template>
    </bn-tooltip>
  </bn-space>
</template>

<style lang="scss"></style>
