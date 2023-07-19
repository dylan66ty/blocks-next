<script lang="ts" setup>
import { ref } from 'vue';

 const command = ref()
</script>

<template>
  <bn-dropdown :hide-on-click="false" v-model:command="command">
    <template #trigger="{show}">
      <span class="dropdown-link">
        Dropdown List  <bn-icon-caret style="transition: all 0.3s;" :rotate="show ? 180 : 0" />
      </span>
    </template>
    <template #dropdown>
      <bn-dropdown-item command="action1">Action1</bn-dropdown-item>
      <bn-dropdown-item command="action2">Action2</bn-dropdown-item>
      <bn-dropdown-item command="action3">Action3</bn-dropdown-item>
    </template>
  </bn-dropdown>
</template>

<style lang="scss">
.dropdown-link {
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  color: var(--bn-primary);
}
</style> 