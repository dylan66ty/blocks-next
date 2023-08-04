<script lang="ts" setup>
import { ref, watch} from 'vue';

const date = ref('2023-21周')

watch(() => date.value, val => {
  console.log(val);
})



const disabledDate = (date:Date) => {
  return  date.getTime() > Date.now()
}
</script>

<template>
  <div style="padding-left: 30px;">
    <bn-date-picker v-model="date" type="week" placeholder="年/月/日" clearable :disabledDate="disabledDate">
    </bn-date-picker>
  </div>
</template>

<style lang="scss"></style>