<script lang="ts" setup>
  import { ref } from 'vue'

  const form = ref({
    eat: '',
    sleep: '',
    play: ''
  })

  const rules = {
    eat: [
      {
        required: true,
        min: 1,
        max: 3,
        message: '1-3字符',
        trigger: ['change']
      }
    ],
    sleep: [
      {
        required: true,
        min: 1,
        max: 3,
        message: '1-3字符',
        trigger: ['change']
      }
    ],
    play: [
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
  <div>
    <bn-form ref="formRef" :model="form" :rules="rules">
      <bn-form-item label="吃饭" prop="eat">
        <bn-input v-model="form.eat"></bn-input>
      </bn-form-item>

      <bn-form-item label="睡觉" prop="sleep">
        <bn-input v-model="form.sleep"></bn-input>
      </bn-form-item>

      <bn-form-item label="打豆豆" prop="play">
        <bn-input v-model="form.play"></bn-input>
      </bn-form-item>

      <bn-form-item>
        <bn-space>
          <bn-button type="primary" size="small" @click="submitForm(['eat'])">校验1</bn-button>
          <bn-button type="primary" size="small" @click="submitForm(['sleep'])">校验2</bn-button>
          <bn-button type="primary" size="small" @click="submitForm(['play'])">校验3</bn-button>
        </bn-space>
      </bn-form-item>
    </bn-form>
  </div>
</template>
