<script lang="ts" setup>
  import { ref } from 'vue'

  const langs = ref<string[]>([])
  const model = ref('')
  const loading = ref(false)

  const getLangs = (hasValue) => {
    loading.value = true
    setTimeout(() => {
      if (hasValue) {
        langs.value = ['Vue', 'React', 'Angular', 'Java', 'Python', 'JavaScript', 'Golang']
      } else {
        langs.value = []
      }

      loading.value = false
    }, 3000)
  }
</script>

<template>
  <div style="display: flex">
    <bn-select
      v-model="model"
      style="width: 200px; margin-right: 20px"
      placeholder="请选择"
      :loading="loading"
    >
      <bn-option v-for="lang in langs" :key="lang" :label="lang" :value="lang"></bn-option>
    </bn-select>
    <bn-space>
      <bn-button type="success" @click="getLangs(true)">3s获取数据(有值)</bn-button>
      <bn-button type="warning" @click="getLangs(false)">3s获取数据(空值)</bn-button>
    </bn-space>
  </div>
</template>

<style lang="scss"></style>
