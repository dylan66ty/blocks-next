<script lang="ts" setup>
  const handler = async (e) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(1)
      }, 1000);
    })
  }
</script>

<template>
  <bn-button @click="handler" type="primary">click loading</bn-button>
</template>

<style lang="scss"></style>