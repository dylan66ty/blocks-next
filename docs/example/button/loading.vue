<script setup lang="ts">
  const func = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };
  const awaitFunc = async () => await func(3000);
  const awaitFunc8000 = () => func(8000);
  const awaitFunc60000 = () => func(60000);
</script>

<template>
  <bn-space direction="vertical" size="small">
    <bn-space>
      <bn-button type="danger" size="small" loading>危险，数据删除中</bn-button>
      <bn-button fill-mode="none" type="primary" loading>Loading</bn-button>
      <bn-button type="primary" shape="circle" size="small" loading loading-fill>L</bn-button>
    </bn-space>
    <bn-space>
      <bn-button type="warning" shape="round" size="small" delay="300">Delay 300ms</bn-button>
      <bn-button type="danger" shape="round" size="small" delay="500">Delay 500ms</bn-button>
      <bn-button type="primary" shape="round" size="small" delay="3000">Delay 3000ms</bn-button>
      <bn-button type="strong" size="small" delay="10000">Delay 10s</bn-button>
      <bn-button type="danger" shape="circle" size="small" delay="5000" loading-fill>H</bn-button>
      <bn-button type="success" size="small" delay="10000" loading-fill
        >Loading 居中铺满 10s</bn-button
      >
    </bn-space>
    <bn-space>
      <bn-button type="strong" shape="round" size="small" :await="awaitFunc"
        >Await Loading 3s</bn-button
      >
      <bn-button type="danger" shape="round" size="small" :await="awaitFunc8000"
        >模拟请求时间 8s</bn-button
      >
      <bn-button type="success" shape="round" size="small" :await="awaitFunc60000"
        >模拟请求时间 60s</bn-button
      >
    </bn-space>
  </bn-space>
</template>
