<script lang="ts" setup>
</script>

<template>
  <bn-space>
    <bn-popup placement="bottom" show-arrow>
      <template #trigger>
        <bn-button>
          Click Trigger
        </bn-button>
      </template>
      <template #content>
        <h4>Title</h4>
        <div style="margin-top: 10px;">this is content, this is content, this is content</div>
      </template>
    </bn-popup>
    <bn-popup placement="top" show-arrow trigger="hover">
      <template #trigger>
        <bn-button>
          Hover Trigger
        </bn-button>
      </template>
      <template #content>
        <h4>Title</h4>
        <div style="margin-top: 10px;">this is content, this is content, this is content</div>
      </template>
    </bn-popup>
  </bn-space>
</template>

<style lang="scss"></style>