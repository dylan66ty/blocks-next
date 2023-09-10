<script lang="ts" setup>
  import { ref } from 'vue'

  const form = ref({
    field1: '',
    field2: '',
    field3: ''
  })

  const rules = {
    field1: [
      {
        required: true,
        min: 1,
        max: 3,
        message: '1-3字符',
        trigger: ['change']
      }
    ],
    field2: [
      {
        required: true,
        min: 1,
        max: 3,
        message: '1-3字符',
        trigger: ['change']
      }
    ],
    field3: [
      {
        required: true,
        min: 1,
        max: 3,
        message: '1-3字符',
        trigger: ['change']
      }
    ]
  }

  const formRef = ref()
  const submitForm = (props) => {
    formRef.value.validateField(props, (valid) => {
      console.log(valid)
    })
  }
</script>

<template>
  <bn-form ref="formRef" :model="form" :rules="rules" label-width="80px">
    <bn-form-item label="字段1" prop="field1">
      <bn-input v-model="form.field1"></bn-input>
    </bn-form-item>

    <bn-form-item label="字段2" prop="field2">
      <bn-input v-model="form.field2"></bn-input>
    </bn-form-item>

    <bn-form-item label="字段3" prop="field3">
      <bn-input v-model="form.field3"></bn-input>
    </bn-form-item>

    <bn-form-item>
      <bn-space>
        <bn-button type="primary" size="small" @click="submitForm(['field1'])">校验字段1</bn-button>
        <bn-button type="primary" size="small" @click="submitForm(['field2'])">校验字段2</bn-button>
        <bn-button type="primary" size="small" @click="submitForm(['field3'])">校验字段3</bn-button>
      </bn-space>
    </bn-form-item>
  </bn-form>
</template>
