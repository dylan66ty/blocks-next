<script lang="ts" setup></script>

<template>
  <div :style="{ position: 'relative', width: '440px', height: '280px' }">
    <bn-tooltip content="This is a Tooltip" position="tl">
      <bn-button class="button" :style="{ position: 'absolute', top: '0', left: '70px' }"
        >TL</bn-button
      >
    </bn-tooltip>
    <bn-tooltip content="This is a Tooltip" position="top">
      <bn-button class="button" :style="{ position: 'absolute', top: '0', left: '180px' }"
        >TOP</bn-button
      >
    </bn-tooltip>
    <bn-tooltip content="This is a Tooltip" position="tr">
      <bn-button class="button" :style="{ position: 'absolute', top: '0', left: '290px' }"
        >TR</bn-button
      >
    </bn-tooltip>
    <bn-tooltip content="This is a Tooltip" position="bl">
      <bn-button class="button" :style="{ position: 'absolute', top: '240px', left: '70px' }"
        >BL</bn-button
      >
    </bn-tooltip>
    <bn-tooltip content="This is a Tooltip" position="bottom">
      <bn-button class="button" :style="{ position: 'absolute', top: '240px', left: '180px' }"
        >BOTTOM</bn-button
      >
    </bn-tooltip>
    <bn-tooltip content="This is a Tooltip" position="br">
      <bn-button class="button" :style="{ position: 'absolute', top: '240px', left: '290px' }"
        >BR</bn-button
      >
    </bn-tooltip>
    <bn-tooltip content="This is a Tooltip" position="lt">
      <bn-button class="button" :style="{ position: 'absolute', top: '60px', left: '10px' }"
        >LT</bn-button
      >
    </bn-tooltip>
    <bn-tooltip content="This is a Tooltip" position="left">
      <bn-button class="button" :style="{ position: 'absolute', top: '120px', left: '10px' }"
        >LEFT</bn-button
      >
    </bn-tooltip>
    <bn-tooltip content="This is a Tooltip" position="lb">
      <bn-button class="button" :style="{ position: 'absolute', top: '180px', left: '10px' }"
        >LB</bn-button
      >
    </bn-tooltip>
    <bn-tooltip content="This is a Tooltip" position="rt">
      <bn-button class="button" :style="{ position: 'absolute', top: '60px', left: '350px' }"
        >RT</bn-button
      >
    </bn-tooltip>
    <bn-tooltip content="This is a Tooltip" position="right">
      <bn-button class="button" :style="{ position: 'absolute', top: '120px', left: '350px' }"
        >RIGHT</bn-button
      >
    </bn-tooltip>
    <bn-tooltip content="This is a Tooltip" position="rb">
      <bn-button class="button" :style="{ position: 'absolute', top: '180px', left: '350px' }"
        >RB</bn-button
      >
    </bn-tooltip>
  </div>
</template>

<style lang="scss">
  .button {
    width: 100px;
  }
</style>
