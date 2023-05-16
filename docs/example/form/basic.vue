<script lang="ts" setup>
  import { ref } from 'vue';

  const form = ref({
    name: '',
    email: '',
    hobby: ['Coding'],
    contact: 'qq',
    suggest: '',
  });
</script>

<template>
  <div>
    <bn-form ref="formRef" :model="form" label-width="80px">
      <bn-form-item label="姓名" prop="name">
        <bn-input v-model="form.name"></bn-input>
      </bn-form-item>
      <bn-form-item label="邮箱" prop="email">
        <bn-input v-model="form.email"></bn-input>
      </bn-form-item>
      <bn-form-item label="爱好" prop="hobby">
        <bn-checkbox-group v-model="form.hobby">
          <bn-checkbox label="Coding"></bn-checkbox>
          <bn-checkbox label="旅游"></bn-checkbox>
          <bn-checkbox label="动漫"></bn-checkbox>
        </bn-checkbox-group>
      </bn-form-item>
      <bn-form-item label="联系方式" prop="contact">
        <bn-radio-group v-model="form.contact">
          <bn-radio label="qq">QQ</bn-radio>
          <bn-radio label="wx">微信</bn-radio>
        </bn-radio-group>
      </bn-form-item>
      <bn-form-item prop="suggest" label="意见">
        <bn-input v-model="form.suggest" type="textarea"></bn-input>
      </bn-form-item>

      <bn-form-item>
        <bn-space>
          <bn-button type="primary" size="small">提交</bn-button>
          <bn-button size="small">取消</bn-button>
        </bn-space>
      </bn-form-item>
    </bn-form>
  </div>
</template>

<style lang="scss"></style>
