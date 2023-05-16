<script lang="ts" setup>
  import { getCurrentInstance, ref } from 'vue';

  const model = ref(false);
  const model2 = ref(false);

  const instance = getCurrentInstance();

  const message = instance?.appContext.config.globalProperties.message;

  const beforeChangeSuccess = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 800);
    });
  };

  const beforeChangeError = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(true);
        // todo something
        message.error('加载失败');
      }, 800);
    });
  };
</script>

<template>
  <div>
    <bn-switch v-model="model" :before-change="beforeChangeSuccess" />
    <bn-switch v-model="model2" :before-change="beforeChangeError" />
  </div>
</template>

<style lang="scss"></style>
