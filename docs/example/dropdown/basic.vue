<script lang="ts" setup>

const onCommand = (cmd) => {
  console.log(cmd);
}


</script>

<template>
  <div class="card-demo-area">
    <bn-dropdown @command="onCommand">
      <template #trigger>
        <div class="trigger">
          <bn-icon-more-fill />
        </div>
      </template>
      <template #dropdown>
        <bn-dropdown-item command="name">客户名称</bn-dropdown-item>
        <bn-dropdown-item command="mobile">手机号码</bn-dropdown-item>
        <bn-dropdown-item command="createTime" disabled>创建时间</bn-dropdown-item>
        <bn-dropdown-item command="owner">负责人</bn-dropdown-item>
        <bn-dropdown-item command="customer">客户阶段</bn-dropdown-item>
        <bn-dropdown-item command="advancedFilter" divided>高级组合筛选</bn-dropdown-item>
      </template>
    </bn-dropdown>
  </div>
</template>

<style lang="scss">
.trigger {
  width: 48px;
  height: 48px;
  background: #FFFFFF;
  box-shadow: 0px 2px 5px 0px rgba(36, 41, 52, 0.06);
  border-radius: 6px;
  cursor: pointer;
  display: grid;
  place-items: center;


}
</style>