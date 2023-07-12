<script lang="ts" setup>
  import { onMounted, ref } from 'vue'

  const ruleForm = ref({
    name: 'Name',
    age: 'Age',
    textarea: '1313',
    hobby: ['Vue']
  })

  onMounted(() => {
    // console.log(formRef.value);
  })

  const rules = {
    name: [{ message: 'name error', min: 3, max: 10, trigger: 'change' }],
    age: [{ required: true, message: 'age is required', trigger: 'change' }],
    hobby: [
      {
        required: true,
        type: 'array',
        message: 'checkbox 验证',
        trigger: 'change'
      }
    ],
    textarea: []
  }

  const labelPosition = ref('top')

  const formItemRules = [
    { required: true, min: 3, max: 5, message: 'textarea 长度在 3 到 5 个字符', trigger: 'change' }
  ]

  const formRef = ref(null)

  onMounted(() => {})

  const submitForm = () => {
    formRef.value?.validate((valid: boolean) => {
      console.log(valid)
    })
  }
</script>

<template>
  <div style="width: 400px">
    <bn-form
      ref="formRef"
      :label-position="labelPosition"
      label-width="80"
      :model="ruleForm"
      :rules="rules"
    >
      <bn-form-item prop="name">
        <template #label> Name </template>
        <bn-input v-model="ruleForm.name"></bn-input>
      </bn-form-item>
      <bn-form-item prop="textarea" label="textarea" :rules="formItemRules" :required="false">
        <bn-input v-model="ruleForm.textarea" type="textarea"></bn-input>
      </bn-form-item>
      <!-- <bn-form-item label="年龄" prop="age">
        <bn-input v-model="ruleForm.age"></bn-input>
      </bn-form-item>
      <bn-form-item label="爱好" prop="hobby">
        <bn-checkbox-group v-model="ruleForm.hobby">
          <bn-checkbox label="Vue" ></bn-checkbox>
          <bn-checkbox label="React" ></bn-checkbox>
          <bn-checkbox label="Node" ></bn-checkbox>
        </bn-checkbox-group>
      </bn-form-item> -->
    </bn-form>

    <bn-button type="primary" @click="submitForm">验证</bn-button>

    <bn-radio-group v-model="labelPosition">
      <bn-radio label="left"></bn-radio>
      <bn-radio label="right"></bn-radio>
      <bn-radio label="top"></bn-radio>
    </bn-radio-group>
  </div>
</template>

<style lang="scss"></style>
