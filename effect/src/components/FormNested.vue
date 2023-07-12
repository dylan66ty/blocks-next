<script lang="ts" setup>
  import { ref } from 'vue'

  const form = ref({
    name: '佐助',
    email: '',
    age: '',
    hobby: ['Coding'],
    contact: 'qq',
    suggest: '我是佐助',
    a: {
      b: {
        c: 10
      }
    }
  })

  // validator支持 =>  (email ｜ url | mobile | chinese | number)
  const rules = {
    name: [
      {
        required: true,
        min: 3,
        max: 7,
        message: '3-7字符',
        trigger: 'change'
      }
    ],
    email: [
      {
        // required: true
        message: 'email error',
        validator: 'number',
        trigger: 'change'
      }
    ],
    age: [
      {
        // required: true,
        message: 'age error',
        trigger: 'change'
      }
    ],
    hobby: [
      {
        type: 'array',
        required: true,
        message: '至少选一项'
      }
    ],
    contact: [
      {
        required: true,
        message: '联系方式必填'
      }
    ],
    suggest: [
      {
        required: true,
        min: 1,
        max: 10,
        message: '1-10字符',
        trigger: 'change'
      }
    ],
    'a.b.c': [
      {
        min: 1,
        max: 3,
        required: true,
        message: 'a.b.c'
      }
    ]
  }

  const formRef = ref()

  const submitForm = async () => {
    const isValid = await formRef.value.validate()
    if (isValid) {
      console.log('submit')
      return
    }
  }

  const resetForm = () => {
    formRef.value.resetFields()
  }
</script>

<template>
  <div>
    <bn-form ref="formRef" :model="form" :rules="rules" label-width="90px">
      <!-- <bn-form-item label="姓名" prop="name">
        <bn-input v-model="form.name"></bn-input>
      </bn-form-item> -->
      <!-- 表单嵌套 -->
      <bn-form-item label="邮箱\年龄" required>
        <bn-space>
          <bn-form-item prop="a.b.c">
            <bn-input v-model="form.a.b.c"></bn-input>
          </bn-form-item>
          <bn-form-item prop="age">
            <bn-input v-model="form.age"></bn-input>
          </bn-form-item>
        </bn-space>
      </bn-form-item>
      <bn-form-item>
        <bn-space>
          <bn-button type="primary" size="small" @click="submitForm">提交</bn-button>
          <bn-button size="small" @click="resetForm">重制</bn-button>
        </bn-space>
      </bn-form-item>
    </bn-form>
  </div>
</template>

<style lang="scss"></style>
