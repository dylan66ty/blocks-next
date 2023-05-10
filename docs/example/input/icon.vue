<script lang="ts" setup>
import { ref } from 'vue'
const inpVal = ref('')

</script>

<template>
  <bn-space size="large">
    <div style="width:200px">
      <bn-input v-model="inpVal" placeholder="请输入">
        <template #prefix-icon>
          <bn-icon-plus></bn-icon-plus>
        </template>
      </bn-input>
    </div>
    <div style="width:200px">
      <bn-input v-model="inpVal" placeholder="请输入">
        <template #suffix-icon>
          <bn-icon-search></bn-icon-search>
        </template>
      </bn-input>
    </div>
  </bn-space>
</template>