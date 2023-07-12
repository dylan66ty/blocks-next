<script lang="ts" setup>
  import { ref } from 'vue'

  const value = ref('8')
  const loading = ref(false)

  const options = ref<any>([])

  const handleChange = (val) => {
    console.log(val)
  }

  options.value = []
  loading.value = true
  setTimeout(() => {
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
    loading.value = false
  }, 2000)
</script>

<template>
  <div style="width: 200px">
    <bn-select
      v-model="value"
      placeholder="请选择"
      popper-class="custom-popover"
      :loading="loading"
      @change="handleChange"
    >
      <bn-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.value == 2"
      />
    </bn-select>
  </div>
</template>
