<script lang="ts" setup>
  import { ref } from 'vue'

  const langs = ref<any[]>([])

  const model = ref([0,1,2])

  setTimeout(() => {
    langs.value = ['Vue', 'React', 'Angular', 'Java', 'Python', 'JavaScript', 'Golang']
  }, 100);

  const handleChange = (val) => {
    console.log(val,'change')
  }
</script>

<template>
  <bn-select  v-model="model" placeholder="请选择" @change="handleChange" clearable multiple>
    <bn-option v-for="(lang, index) in langs" :key="lang" :label="lang" :value="index"></bn-option>
  </bn-select>
</template>

<style lang="scss"></style>