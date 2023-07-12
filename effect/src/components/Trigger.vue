<script lang="ts" setup>
  import { ref } from 'vue'

  const popupVisible = ref(false)
</script>

<template>
  <div>
    <bn-trigger
      v-model:popupVisible="popupVisible"
      position="bl"
      trigger="click"
      :unmount-on-close="false"
      animation-name="bn-slide-dynamic-origin"
      auto-fit-popup-min-width
    >
      <div style="width: 200px">
        <bn-input>
          <template #suffix-icon>
            <bn-icon-caret :class="[{ 'is-rotate': popupVisible }, 'icon-caret']" />
          </template>
        </bn-input>
      </div>

      <template #content>
        <div class="content" @click="popupVisible = false"> </div>
      </template>
    </bn-trigger>
    <div style="height: 100vh"></div>
  </div>
</template>

<style lang="scss">
  .content {
    width: 100%;
    height: 100px;
    // background-color: #ccc;
    border: 1px solid #ddd;
  }

  // .click-area {
  //   width: 200px;
  //   height: 200px;
  //   border: 1px solid #ddd;
  // }
  .icon-caret {
    transform: rotate(0);
    transition: transform 0.3s ease;
  }

  .icon-caret.is-rotate {
    transform: rotate(-180deg);
  }
</style>
