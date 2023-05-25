<script lang="ts" setup>
import { ref } from 'vue';

const form = ref({
  rate: "",
  day1: "",
  day2: ""
});

const rules = {
  rate: [
    {
      min: 1,
      max: 3,
      message: '1-3字符',
      trigger: ['change']
    }
  ],
  day1: [
    {
      min: 1,
      max: 3,
      message: '1-3字符',
      trigger: ['change']
    }
  ],
  day2: [
    {
      min: 1,
      max: 3,
      message: '1-3字符',
      trigger: ['change']
    }
  ]

}

const formRef = ref();

const submitForm = async () => {
    const isValid = await formRef.value.validate();
    if (isValid) {
      console.log('submit');
      return;
    }
  };

</script>

<template>
  <div>
    <bn-form ref="formRef" :model="form" label-width="80px" :rules="rules">
      <bn-form-item prop="rate" label="B路接通率大于" label-width="120px" required>
        <bn-input v-model="form.rate"></bn-input>
      </bn-form-item>

      <bn-form-item label-width="40px" required label="近">
        <bn-space :size="5">
          <bn-form-item prop="day1" required>
            <bn-input style="width:100px" v-model="form.day1"></bn-input>
          </bn-form-item>
          <span style="font-size:14px">天呼叫次数低于</span>
          <bn-form-item prop="day2" required>
            <bn-input v-model="form.day2"></bn-input>
          </bn-form-item>
        </bn-space>
      </bn-form-item>

      <bn-form-item>
        <bn-space>
          <bn-button type="primary" size="small" @click="submitForm">提交</bn-button>
          <bn-button size="small">取消</bn-button>
        </bn-space>
      </bn-form-item>
    </bn-form>
  </div>
</template>
