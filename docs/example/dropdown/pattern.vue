<script lang="ts" setup>
import { ref } from 'vue';

const command = ref()
</script>

<template>
  <div style="display: flex;gap: 20px;">
    <bn-dropdown :hide-on-click="false" v-model:command="command" trigger="click">
      <template #trigger>
       <bn-button type="primary" size="small">
        <bn-space>
          <span>click to trigger</span>
          <bn-icon-caret />
        </bn-space>
      </bn-button>
      </template>
      <template #dropdown>
        <bn-dropdown-item command="action1">Action1</bn-dropdown-item>
        <bn-dropdown-item command="action2">Action2</bn-dropdown-item>
        <bn-dropdown-item command="action3">Action3</bn-dropdown-item>
      </template>
    </bn-dropdown>

    <bn-dropdown :hide-on-click="false" v-model:command="command" trigger="hover">
      <template #trigger>
        <bn-button type="primary" size="small">
          <bn-space>
          <span>hover to trigger</span>
          <bn-icon-caret />
        </bn-space>
        </bn-button>
      </template>
      <template #dropdown>
        <bn-dropdown-item command="action1">Action1</bn-dropdown-item>
        <bn-dropdown-item command="action2">Action2</bn-dropdown-item>
        <bn-dropdown-item command="action3">Action3</bn-dropdown-item>
      </template>
    </bn-dropdown>
  </div>
</template>

