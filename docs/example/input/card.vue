<script lang="ts" setup></script>

<template>
  <div class="card-demo-area">
    <div class="flex gap-x-5">
      <bn-input
        style="width: 260px"
        card
        placeholder="input"
        suffix-icon="bn-icon-search"
      ></bn-input>

      <bn-input
        style="width: 260px"
        card
        size="large"
        placeholder="input large"
        suffix-icon="bn-icon-search"
      ></bn-input>
    </div>

    <div class="mt-5 flex gap-x-5">
      <bn-select card placeholder="input large"></bn-select>
      <bn-select card size="large" placeholder="input large"></bn-select>
    </div>

    <div class="mt-5 flex gap-x-5">
      <bn-cascader card placeholder="cascader large"></bn-cascader>
      <bn-cascader card size="large" placeholder="cascader large"></bn-cascader>
    </div>

    <div class="mt-5 flex gap-x-5">
      <bn-date-picker card style="width: 260px" placeholder="datePicker large"></bn-date-picker>
      <bn-date-picker
        card
        style="width: 260px"
        size="large"
        placeholder="datePicker large"
      ></bn-date-picker>
    </div>

    <div class="mt-5 flex gap-x-5">
      <bn-tree-select card placeholder="treeSelect"></bn-tree-select>
      <bn-tree-select card size="large" placeholder="treeSelect large"></bn-tree-select>
    </div>
  </div>
</template>

<style lang="scss"></style>
