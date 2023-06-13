<script lang="ts" setup>
import { ref } from 'vue';

const form = ref({
  mobile: '',
  email: '',
  url: '',
});

// validator支持 string =>  (email ｜ url | mobile | chinese | number)
// 也可以是function =>  (rule,value,callback) => {}
// 验证细节参考 async-validator
const rules = {
  mobile: [
    {
      validator: 'mobile',
      required: true,
      message: 'mobile error',
      trigger: 'change',
    },
  ],
  email: [
    {
      validator: 'email',
      required: true,
      message: 'email error',
      trigger: 'change',
    },
  ],
  url: [
    {
      validator: 'url',
      required: true,
      message: 'url error',
      trigger: 'change',
    },
  ],
};

const formRef = ref();

const submitForm = () => {
  formRef.value.validate(valid => {
    if (valid) {
      console.log('submit');
      return;
    }
  })
};

const resetForm = () => {
  formRef.value.resetFields();
};
</script>

<template>
  <div>
    <bn-form ref="formRef" :model="form" :rules="rules" label-width="90px">
      <bn-form-item label="手机号" prop="mobile">
        <bn-input v-model="form.mobile"></bn-input>
      </bn-form-item>
      <bn-form-item label="邮箱" prop="email">
        <bn-input v-model="form.email"></bn-input>
      </bn-form-item>
      <bn-form-item label="URL" prop="url">
        <bn-input v-model="form.url"></bn-input>
      </bn-form-item>
      <bn-form-item>
        <bn-space>
          <bn-button type="primary" size="small" @click="submitForm">提交</bn-button>
          <bn-button size="small" @click="resetForm">重置</bn-button>
        </bn-space>
      </bn-form-item>
    </bn-form>
  </div>
</template>

<style lang="scss"></style>
