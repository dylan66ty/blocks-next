<script lang="ts" setup>
  import { ref } from 'vue'

  const form = ref({
    name: '',
    age: ''
  })
</script>

<template>
  <div>
    <bn-form inline :model="form" label-width="40px">
      <bn-form-item label="姓名" prop="name">
        <bn-input v-model="form.name"></bn-input>
      </bn-form-item>
      <bn-form-item label="年龄" prop="age">
        <bn-input v-model="form.age"></bn-input>
      </bn-form-item>
      <bn-form-item>
        <bn-button type="primary">提交</bn-button>
      </bn-form-item>
    </bn-form>
  </div>
</template>

<style lang="scss"></style>
