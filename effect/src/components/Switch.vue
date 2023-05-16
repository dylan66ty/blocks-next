<script lang="ts" setup>
  import { ref } from 'vue';

  const model = ref('0');

  const beforeChange = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 300);
    });
  };

  const handleChange = (val) => {
    console.log(val);
  };
</script>

<template>
  <div style="padding: 20px">
    <bn-switch
      v-model="model"
      true-value="1"
      false-value="0"
      active-text="开"
      inactive-text="关"
      :before-change="beforeChange"
      @change="handleChange"
    ></bn-switch>

    <bn-switch v-model="model" true-value="1" false-value="0" active-color="#2ED4A9"></bn-switch>
  </div>
</template>

<style lang="scss"></style>
