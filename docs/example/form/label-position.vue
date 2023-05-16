<script lang="ts" setup>
  import { ref } from 'vue';

  const form = ref({
    name: '',
    age: '',
    email: '',
  });

  const labelPosition = ref('right');
</script>

<template>
  <div>
    <div style="margin-bottom: 20px">
      <bn-radio-group v-model="labelPosition">
        <bn-radio label="right"></bn-radio>
        <bn-radio label="left"></bn-radio>
        <bn-radio label="top"></bn-radio>
      </bn-radio-group>
    </div>

    <bn-form ref="formRef" :model="form" label-width="60" :label-position="labelPosition">
      <bn-form-item label="姓名" prop="name">
        <bn-input v-model="form.name"></bn-input>
      </bn-form-item>
      <bn-form-item label="年龄" prop="name">
        <bn-input v-model="form.age"></bn-input>
      </bn-form-item>
      <bn-form-item label="邮箱" prop="email">
        <bn-input v-model="form.email"></bn-input>
      </bn-form-item>
    </bn-form>
  </div>
</template>

<style lang="scss"></style>
