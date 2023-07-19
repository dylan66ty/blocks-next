<script lang="ts" setup>
import { ref } from 'vue';


  const command = ref('mobile')
  const commandData = ref<any[]>([])
  setTimeout(() => {
      commandData.value = [
    {
      label:'客户名称',
      value:'name'
    },
    {
      label:'手机号码',
      value:'mobile'
    },
    {
      label:'创建时间',
      value:'create'
    },
    {
      label:'负责人',
      value:'owner',
      disabled: true,
    },
    {
      label:'客户阶段',
      value:'customer'
    },
    {
      label:'高级筛选',
      value:'filter',
      divided: true
    }
  ]
  }, 0);
</script>

<template>
  <div class="card-demo-area">
    <bn-dropdown v-model:command="command">
      <template #trigger="{ show, data}" >
        <div style="width:128px">
          <bn-input card readonly :model-value="data.label">
            <template #suffix-icon>
              <bn-icon-caret style="transition: all 0.3s;" :rotate="show ? 180 : 0" />
            </template>
          </bn-input>
        </div>
      </template>
      <template #dropdown>
        <bn-dropdown-item
           v-for="item in commandData" 
           :key="item.value" 
           :command="item.value" 
           :divided="item.divided"
           :label="item.label"
           :disabled="item.disabled"
        >{{ item.label }}</bn-dropdown-item>
      </template>
    </bn-dropdown>
  </div>
</template>

<style lang="scss"></style>