<script setup lang="ts">
  const func = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, time)
    })
  }

  const handleClick = async (e) => {
    console.log(e)
    await func(1000)
  }
</script>

<template>
  <bn-space direction="vertical" size="small">
    <bn-space>
      <bn-button type="danger" size="small" loading>危险，数据删除中</bn-button>
      <bn-button type="primary" size="small" loading-fill loading>Loading 居中铺满 3s</bn-button>
      <bn-button type="strong" shape="round" size="small" @click="handleClick"
        >点击触发Loading</bn-button
      >
    </bn-space>
  </bn-space>
</template>
