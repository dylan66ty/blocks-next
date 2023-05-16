<script lang="ts" setup>
  import { ref } from 'vue';

  const langs = ['Vue', 'React', 'Angular', 'Java', 'Python', 'JavaScript', 'Golang'];

  const model = ref('Vue');
</script>

<template>
  <div style="width: 200px">
    <bn-select v-model="model" placeholder="请选择">
      <bn-option v-for="lang in langs" :key="lang" :label="lang" :value="lang"> </bn-option>
    </bn-select>
  </div>
</template>

<style lang="scss"></style>
