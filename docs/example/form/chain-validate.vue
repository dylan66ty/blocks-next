<script lang="ts" setup>
  import { ref } from 'vue';

  const form = ref({
    data: {
      user: {
        name: '',
        age: '',
      },
    },
  });

  const rules = {
    'data.user.name': [
      {
        required: true,
        message: 'name error 3-5',
        min: 3,
        max: 5,
        trigger: 'change',
      },
    ],
    'data.user.age': [
      {
        required: true,
        message: 'age error',
        trigger: 'change',
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
      <bn-form-item label="用户名" prop="data.user.name">
        <bn-input v-model="form.data.user.name"></bn-input>
      </bn-form-item>
      <bn-form-item label="年龄" prop="data.user.age">
        <bn-input v-model="form.data.user.age"></bn-input>
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
