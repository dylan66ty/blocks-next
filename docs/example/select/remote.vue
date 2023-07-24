<script lang="ts" setup>
  import { ref, watch } from 'vue'
  const multiple = ref([])
  const single = ref('')
  const options1 = ref<any[]>([])
  const loading1 = ref(false)

  const options2 = ref<any[]>([])
  const loading2 = ref(false)

  watch(single, (val) => {
    console.log('single', val)
  })

  watch(multiple, (val) => {
    console.log('multiple', val)
  })

  // 这里仅仅是模拟后端接口
  const getOptions = (query) =>
    new Promise((resolve) => {
      setTimeout(() => {
        if (query)
          resolve(
            Array.from({ length: 100 }, (_, i) => ({
              value: `option_${query}_${i + 1}`,
              label: `Option_${query}_${i + 1}`
            }))
          )
        else resolve([])
      }, 200)
    })

  const query1 = async (query) => {
    loading1.value = true
    options1.value = (await getOptions(query)) as []
    loading1.value = false
  }

  const query2 = async (query) => {
    loading2.value = true
    options2.value = (await getOptions(query)) as []
    loading2.value = false
  }
</script>

<template>
  <div class="flex gap-x-5">
    <div class="flex flex-col">
      <span class="mb-2">Remote[Single selection]</span>
      <bn-select
        v-model="single"
        placeholder="请搜索"
        clearable
        filterable
        remote
        :remote-method="query1"
        :filter-debounce="400"
        :loading="loading1"
      >
        <bn-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></bn-option>
      </bn-select>
    </div>
    <div class="flex flex-col">
      <span class="mb-2">Remote[Multiple selection]</span>
      <bn-select
        v-model="multiple"
        multiple
        placeholder="请搜索"
        clearable
        filterable
        remote
        :remote-method="query2"
        :filter-debounce="400"
        :loading="loading2"
      >
        <bn-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></bn-option>
      </bn-select>
    </div>
  </div>
</template>

<style lang="scss"></style>
