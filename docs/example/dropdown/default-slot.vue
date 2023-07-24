<script lang="ts" setup></script>

<template>
  <bn-space>
    <bn-dropdown trigger="click">
      <template #trigger>
        <bn-button size="small"> Click Me </bn-button>
      </template>
      <template #dropdown>
        <bn-dropdown-item command="action1">
          <bn-space>
            <bn-icon-view />
            <span>Action1</span>
          </bn-space>
        </bn-dropdown-item>
        <bn-dropdown-item command="action2">
          <bn-space>
            <bn-icon-view />
            <span>Action2</span>
          </bn-space>
        </bn-dropdown-item>
        <bn-dropdown-item command="action3">
          <bn-space>
            <bn-icon-view />
            <span>Action3</span>
          </bn-space>
        </bn-dropdown-item>
      </template>
    </bn-dropdown>
  </bn-space>
</template>
