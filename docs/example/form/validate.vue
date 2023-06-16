<script lang="ts" setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  birth: '',
  age: '',
  hobby: [],
  contact: '',
  suggest: '',
  isAddFriends: false,
  lang: '',
});

// validator支持 string =>  (email ｜ url | mobile | chinese | number)
// 也可以是function =>  (rule,value,callback) => {}
// 验证细节参考 async-validator
const rules = {
  name: [
    {
      required: false,
      min: 2,
      max: 5,
      message: '姓名2-5汉字',
      trigger: 'change',
    },
  ],
  birth: [
    {
      required: true,
      message: '生日必填项',
      trigger: 'change',
    },
  ],
  age: [
    {
      required: true,
      message: '年龄必填项',
    },
  ],
  hobby: [
    {
      type: 'array',
      required: true,
      message: '爱好至少选一项',
    },
  ],
  contact: [
    {
      required: true,
      message: '联系方式必填项',
    },
  ],
  isAddFriends: [
    {
      required: false,
      message: '勾选允许添加好友',
      validator(rule, value, callback) {
        if (!value) {
          return callback(new Error(rule.message))
        }
        callback()

      }
    },
  ],
  suggest: [
    {
      required: true,
      min: 3,
      max: 20,
      message: '3-20字',
      trigger: 'change',
    },
  ],
  lang: [
    {
      required: true,
      message: '请选择框架',
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
  });

};

const resetForm = () => {
  formRef.value.resetFields();
};
</script>

<template>
  <div>
    <bn-form ref="formRef" :model="form" :rules="rules" label-width="90px">
      <bn-form-item prop="name">
        <bn-input v-model="form.name"></bn-input>
        <template #label>姓名</template>
        <!-- <template #error="{error}">
          <span style="font-size: 12px;color: blue;line-height: 1;">插槽：{{ error }}</span>
        </template> -->
      </bn-form-item>
      <!-- 表单嵌套 -->
      <bn-form-item label="生日/年龄" required>
        <bn-space>
          <bn-form-item prop="birth">
            <bn-input v-model="form.birth"></bn-input>
          </bn-form-item>
          <bn-form-item prop="age">
            <bn-input v-model="form.age"></bn-input>
          </bn-form-item>
        </bn-space>
      </bn-form-item>
      <bn-form-item label="爱好" prop="hobby">
        <bn-checkbox-group v-model="form.hobby">
          <bn-checkbox label="Coding"></bn-checkbox>
          <bn-checkbox label="旅游"></bn-checkbox>
          <bn-checkbox label="动漫"></bn-checkbox>
        </bn-checkbox-group>
      </bn-form-item>
      <bn-form-item label="熟悉框架" prop="lang">
        <bn-select v-model="form.lang" style="width: 200px">
          <bn-option label="Vue" value="vue"></bn-option>
          <bn-option label="React" value="react"></bn-option>
          <bn-option label="Angular" value="angular"></bn-option>
        </bn-select>
      </bn-form-item>
      <bn-form-item label="联系方式" prop="contact">
        <bn-radio-group v-model="form.contact">
          <bn-radio label="qq">QQ</bn-radio>
          <bn-radio label="wx">微信</bn-radio>
        </bn-radio-group>
      </bn-form-item>
      <bn-form-item label="添加好友" prop="isAddFriends">
        <bn-switch v-model="form.isAddFriends" />
      </bn-form-item>
      <bn-form-item prop="suggest" label="意见">
        <bn-input v-model="form.suggest" type="textarea"></bn-input>
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
