<script lang="ts" setup></script>

<template>
  <bn-space>
    <bn-dropdown trigger="click" size="small">
      <template #trigger>
        <bn-button size="small"> small </bn-button>
      </template>
      <template #dropdown>
        <bn-dropdown-item command="action1">Action1</bn-dropdown-item>
        <bn-dropdown-item command="action2">Action2</bn-dropdown-item>
        <bn-dropdown-item command="action3">Action3</bn-dropdown-item>
      </template>
    </bn-dropdown>

    <bn-dropdown trigger="click">
      <template #trigger>
        <bn-button size="small"> default </bn-button>
      </template>
      <template #dropdown>
        <bn-dropdown-item command="action1">Action1</bn-dropdown-item>
        <bn-dropdown-item command="action2">Action2</bn-dropdown-item>
        <bn-dropdown-item command="action3">Action3</bn-dropdown-item>
      </template>
    </bn-dropdown>
  </bn-space>
</template>
