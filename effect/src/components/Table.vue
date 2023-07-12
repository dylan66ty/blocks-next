<script lang="ts" setup>
  import { ref, reactive, watch } from 'vue'

  const columns = [
    {
      type: 'checkbox',
      width: '50',
      align: 'right',
      fixed: 'left'
    },
    {
      title: 'Name',
      prop: 'name',
      slotName: 'name',
      headerSlotName: 'nameHeader',
      sortable: true,
      width: '400'
      // fixed: 'left'

      // hidden: true,
    },
    {
      title: 'Salary',
      prop: 'salary',
      width: '150',
      fixed: 'right'

      // hidden:true,
    },
    {
      title: 'Address',
      prop: 'address',
      width: '120',
      fixed: 'right'
    },
    {
      title: 'Email',
      prop: 'email',
      width: '90',
      fixed: 'right'
    }
  ]
  const data = ref<unknown[]>([])
  const selection = ref<unknown[]>([])

  const pageConfig = ref({ page: 1, pageSize: 10, total: 1000 })

  // watch(() => selection.value, () => {
  //   console.log(selection.value);
  // })

  const onSelectionChange = (selection) => {
    console.log(selection)
  }

  setTimeout(() => {
    data.value = Array.from({ length: 1 }, (_, index) => ({
      name: 'Jane Doe',
      salary: index + 1,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com'
    }))

    selection.value = data.value.slice(0, 3)
  }, 100)
</script>

<template>
  <div>
    <bn-table
      style="width: 600px; margin: 50px auto"
      height="500"
      :columns="columns"
      :data="data"
      v-model:selection="selection"
      @selection-change="onSelectionChange"
    ></bn-table>
  </div>
</template>

<style lang="scss"></style>
