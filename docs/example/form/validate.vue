<script lang="ts" setup>
  import { ref } from 'vue'

  const form = ref({
    name: '',
    age: '',
    section: '',
    province: [],
    options: [],
    date: '',
    radio: 'radio1',
    slider: 5,
    score: 5,
    switch: false,
    multipleSelect: [],
    treeSelect: [],
    multipleTreeSelect: []
  })

  const rules = {
    name: [
      { required: true, message: 'name is required' },
      { min: 5, message: 'must be greater than 5 characters' }
    ],
    section: [{ required: true, message: 'Section is required' }],
    province: [{ required: true, message: 'Province is required' }],
    options: [{ required: true, message: 'Options is required' }],
    date: [{ required: true, message: 'Date is required' }],
    radio: [{ required: true, message: 'Radio is required' }],
    switch: [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (!value) {
            return callback(new Error(rule.message))
          }
          callback()
        },
        message: 'Switch must true'
      }
    ],
    multipleSelect: [{ required: true, message: 'MultipleSelect is required' }],
    treeSelect: [{ required: true, message: 'TreeSelect is required' }],
    multipleTreeSelect: [{ required: true, message: 'MultipleTreeSelect is required' }]
  }

  const formRef = ref()

  const submitForm = () => {
    formRef.value.validate((valid) => {
      if (valid) {
        console.log('submit')
        return
      }
    })
  }

  const resetForm = () => {
    formRef.value.resetFields()
  }

  const regionData = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'chaoyang',
          label: 'ChaoYang',
          children: [
            {
              value: 'datunli',
              label: 'Datunli'
            }
          ]
        },
        {
          value: 'haidian',
          label: 'Haidian'
        },
        {
          value: 'dongcheng',
          label: 'Dongcheng'
        },
        {
          value: 'xicheng',
          label: 'XiCheng'
        }
      ]
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'shanghaishi',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu'
            }
          ]
        }
      ]
    }
  ]

  const treeData = [
    {
      label: '节点A',
      value: 'A',
      children: [
        {
          label: 'leafA-1',
          value: 'A-1'
        },
        {
          label: 'leafA-2',
          value: 'A-2'
        }
      ]
    },
    {
      label: '节点B',
      value: 'B',
      children: [
        {
          label: 'leafB-1',
          value: 'B-1'
        },
        {
          label: 'leafB-2',
          value: 'B-2'
        }
      ]
    }
  ]
</script>

<template>
  <bn-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="120">
    <bn-form-item label="Username" prop="name">
      <bn-input v-model="form.name" clearable></bn-input>
    </bn-form-item>
    <bn-form-item label="Age" prop="age">
      <bn-input v-model="form.age" clearable></bn-input>
    </bn-form-item>
    <bn-form-item label="Section" prop="section">
      <bn-select v-model="form.section" clearable>
        <bn-option value="section1" label="Section1" />
        <bn-option value="section2" label="Section2" />
        <bn-option value="section3" label="Section3" />
      </bn-select>
    </bn-form-item>
    <bn-form-item label="province" prop="province">
      <bn-cascader v-model="form.province" :data="regionData" clearable></bn-cascader>
    </bn-form-item>
    <bn-form-item label="Options" prop="options">
      <bn-checkbox-group v-model="form.options">
        <bn-checkbox label="option1">Option1</bn-checkbox>
        <bn-checkbox label="option2">Option2</bn-checkbox>
        <bn-checkbox label="option3">Option3</bn-checkbox>
        <bn-checkbox label="option4" disabled>Option4</bn-checkbox>
      </bn-checkbox-group>
    </bn-form-item>
    <bn-form-item label="Date" prop="date">
      <bn-date-picker v-model="form.date" clearable model-value-format="yyyy-MM-dd" />
    </bn-form-item>
    <bn-form-item label="Radio" prop="radio">
      <bn-radio-group v-model="form.radio">
        <bn-radio label="radio1">Radio1</bn-radio>
        <bn-radio label="radio2">Radio2</bn-radio>
        <bn-radio label="radio3" disabled>Radio3</bn-radio>
      </bn-radio-group>
    </bn-form-item>
    <bn-form-item label="Switch" prop="switch">
      <bn-switch v-model="form.switch"></bn-switch>
    </bn-form-item>
    <bn-form-item label="MultipleSelect" prop="multipleSelect">
      <bn-select v-model="form.multipleSelect" multiple clearable>
        <bn-option value="section1" label="Section1" />
        <bn-option value="section2" label="Section2" />
        <bn-option value="section3" label="Section3" />
      </bn-select>
    </bn-form-item>
    <bn-form-item label="TreeSelect" prop="treeSelect">
      <bn-tree-select v-model="form.treeSelect" :data="treeData" clearable></bn-tree-select>
    </bn-form-item>
    <bn-form-item label="MultiTreeSelect" prop="multipleTreeSelect">
      <bn-tree-select
        v-model="form.multipleTreeSelect"
        :data="treeData"
        multiple
        clearable
      ></bn-tree-select>
    </bn-form-item>
    <bn-form-item>
      <bn-space>
        <bn-button type="primary" size="small" @click="submitForm">Submit</bn-button>
        <bn-button size="small" @click="resetForm">Reset</bn-button>
      </bn-space>
    </bn-form-item>
  </bn-form>

  <div>form: {{ form }}</div>
</template>

<style lang="scss"></style>
