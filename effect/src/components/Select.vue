<script lang="ts" setup>
  import { ref } from 'vue'

  const value = ref('10')
  const loading = ref(false)

  const options = ref<any>([])

  const handleChange = (val) => {
    console.log(val, 'change')
  }

  loading.value = true

  setTimeout(() => {
    loading.value = false
    options.value = [
      {
        value: '1',
        label: 'Option1'
      },
      {
        value: '2',
        label: 'Option2'
      },
      {
        value: '3',
        label: 'Option3'
      },
      {
        value: '4',
        label: 'Option4'
      },
      {
        value: '5',
        label: 'Option5'
      },
      {
        value: '6',
        label: 'Option6'
      },
      {
        value: '7',
        label: 'Option7'
      },
      {
        value: '8',
        label: 'Option8'
      },
      {
        value: '9',
        label: 'Option9'
      },
      {
        value: '10',
        label: 'Option10'
      }
    ]
  }, 100)
</script>

<template>
      <!-- multiple -->
      
  <!-- filterable -->
    <bn-select
      v-model="value"
      placeholder="请选择"
      popup-class="custom-popover"
      @change="handleChange"
      :loading="loading"
      clearable
      multiple
    >
    <bn-option :label="item.label" :value="item.value" v-for="item in options" :key="item.value" />

    </bn-select>
</template>
