<script lang="ts" setup>
  import { ref } from 'vue'
  const form = ref({
    username: '',
    password: ''
  })
</script>

<template>
  <div>
    <bn-form ref="formRef" :model="form" label-width="80px">
      <bn-form-item label="用户名" prop="name">
        <bn-input v-model="form.username"></bn-input>
      </bn-form-item>
      <bn-form-item label="密码" prop="password">
        <bn-input v-model="form.password" show-password></bn-input>
      </bn-form-item>
      <bn-form-item>
        <bn-button type="primary" size="small">Login</bn-button>
      </bn-form-item>
    </bn-form>
  </div>
</template>

<style lang="scss"></style>
