<script lang="ts" setup>

  const onShow = () => {
    console.log('show');
  }
  const onHide = () => {
    console.log('hide');
  }

</script>

<template>
  <div>
    <bn-dropdown @show="onShow" @hide="onHide">
      <template #trigger>
        <bn-button>open</bn-button>
      </template>
      <template #dropdown>
        <bn-dropdown-item>客户名称</bn-dropdown-item>
        <bn-dropdown-item>手机号码</bn-dropdown-item>
        <bn-dropdown-item>创建时间</bn-dropdown-item>
        <bn-dropdown-item>负责人</bn-dropdown-item>
        <bn-dropdown-item>客户阶段</bn-dropdown-item>
        <bn-dropdown-item>高级组合筛选</bn-dropdown-item>
      </template>
    </bn-dropdown>

  </div>
</template>

<style lang="scss"></style>