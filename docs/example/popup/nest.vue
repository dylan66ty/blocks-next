<script lang="ts" setup></script>

<template>
  <bn-popup placement="bottom" show-arrow>
    <template #trigger>
      <bn-button> Click Trigger </bn-button>
    </template>
    <template #content>
      <bn-popup placement="top" show-arrow>
        <template #trigger>
          <bn-button type="primary" size="small"> inner </bn-button>
        </template>
        <template #content>
          <h4>Title</h4>
          <div style="margin-top: 10px">this is content, this is content, this is content</div>
        </template>
      </bn-popup>
    </template>
  </bn-popup>
</template>

<style lang="scss"></style>
