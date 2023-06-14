<script lang="ts" setup>
import { ref } from 'vue';

const langs = ['Vue', 'React', 'Angular', 'Java', 'Python', 'JavaScript', 'Golang'];

const model = ref('Vue');

const handleChange = (val) => {
  console.log(val);
}
</script>

<template>
  <bn-select v-model="model" placeholder="请选择" @change="handleChange">
    <bn-option v-for="lang in langs" :key="lang" :label="lang" :value="lang"> </bn-option>
  </bn-select>
</template>

<style lang="scss"></style>
