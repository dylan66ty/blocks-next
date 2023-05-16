<script lang="ts" setup>
  import { ref } from 'vue';

  const form = ref({
    password: '',
    password2: '',
  });

  const passwordValidator = (rule, value, callback) => {
    if (/\w+/.test(value)) {
      return callback();
    } else {
      callback(true);
    }
  };

  const confirmValidator = (rule, value, callback) => {
    if (value === form.value.password) {
      callback();
    } else {
      callback(true);
    }
  };

  const rules = {
    password: [
      {
        validator: passwordValidator,
        required: true,
        message: 'password error',
        trigger: 'change',
      },
    ],
    password2: [
      {
        validator: confirmValidator,
        required: true,
        message: '密码不一致',
        trigger: 'blur',
      },
    ],
  };

  const formRef = ref();

  const submitForm = async () => {
    const isValid = await formRef.value.validate();
    if (isValid) {
      console.log('submit');
      return;
    }
  };

  const resetForm = () => {
    formRef.value.resetFields();
  };
</script>

<template>
  <div>
    <bn-form ref="formRef" :model="form" :rules="rules" label-width="90px">
      <bn-form-item label="新密码" prop="password">
        <bn-input v-model="form.password" show-password></bn-input>
      </bn-form-item>
      <bn-form-item label="确认密码" prop="password2">
        <bn-input v-model="form.password2" show-password></bn-input>
      </bn-form-item>
      <bn-form-item>
        <bn-space>
          <bn-button type="primary" size="small" @click="submitForm">确认</bn-button>
          <bn-button size="small" @click="resetForm">重置</bn-button>
        </bn-space>
      </bn-form-item>
    </bn-form>
  </div>
</template>

<style lang="scss"></style>
