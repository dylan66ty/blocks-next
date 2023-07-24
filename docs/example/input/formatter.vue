<script lang="ts" setup>
  const toUpperFormatter = (val: string) => {
    return val.toUpperCase()
  }
</script>

<template>
  <bn-input placeholder="小写字母转大写" :formatter="toUpperFormatter"></bn-input>
</template>
