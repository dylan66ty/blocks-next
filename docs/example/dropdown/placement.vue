<script lang="ts" setup>
</script>

<template>
  <bn-space>
    <bn-dropdown placement="bl">
      <template #trigger>
        <bn-button size="small">Bottom Left</bn-button>
      </template>
      <template #dropdown>
        <bn-dropdown-item command="action1">Action1</bn-dropdown-item>
        <bn-dropdown-item command="action2">Action2</bn-dropdown-item>
        <bn-dropdown-item command="action3">Action3</bn-dropdown-item>
      </template>
    </bn-dropdown>
    <bn-dropdown placement="br">
    <template #trigger>
      <bn-button size="small">Bottom Right</bn-button>
    </template>
    <template #dropdown>
      <bn-dropdown-item command="action1">Action1</bn-dropdown-item>
      <bn-dropdown-item command="action2">Action2</bn-dropdown-item>
      <bn-dropdown-item command="action3">Action3</bn-dropdown-item>
    </template>
  </bn-dropdown>
  <bn-dropdown placement="bottom">
    <template #trigger>
      <bn-button size="small">Bottom center</bn-button>
    </template>
    <template #dropdown>
      <bn-dropdown-item command="action1">Action1</bn-dropdown-item>
      <bn-dropdown-item command="action2">Action2</bn-dropdown-item>
      <bn-dropdown-item command="action3">Action3</bn-dropdown-item>
    </template>
  </bn-dropdown>
  <bn-dropdown placement="tl">
    <template #trigger>
      <bn-button size="small">top Left</bn-button>
    </template>
    <template #dropdown>
      <bn-dropdown-item command="action1">Action1</bn-dropdown-item>
      <bn-dropdown-item command="action2">Action2</bn-dropdown-item>
      <bn-dropdown-item command="action3">Action3</bn-dropdown-item>
    </template>
  </bn-dropdown>
  <bn-dropdown placement="tr">
    <template #trigger>
      <bn-button size="small">top right</bn-button>
    </template>
    <template #dropdown>
      <bn-dropdown-item command="action1">Action1</bn-dropdown-item>
      <bn-dropdown-item command="action2">Action2</bn-dropdown-item>
      <bn-dropdown-item command="action3">Action3</bn-dropdown-item>
    </template>
  </bn-dropdown>
  <bn-dropdown placement="top">
    <template #trigger>
      <bn-button size="small">top center</bn-button>
    </template>
    <template #dropdown>
      <bn-dropdown-item command="action1">Action1</bn-dropdown-item>
      <bn-dropdown-item command="action2">Action2</bn-dropdown-item>
      <bn-dropdown-item command="action3">Action3</bn-dropdown-item>
    </template>
  </bn-dropdown>
  </bn-space>

</template>

<style lang="scss">

</style> 