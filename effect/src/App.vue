<script setup lang="ts">
import { ref } from 'vue'

const radios = ref(2)
const textarea = ref('')

const handleChange = (val) => {
  console.log(val);
}

const handleBlur = (e) => {
  console.log(e, 'blur');
}

const handleFocus = (e) => {
  console.log(e,'focus');
}

</script>

<template>
  <div style="width:200px">
    <bn-input  v-model="textarea" type="textarea" :autosize="{minRows:6,maxRows:8}" @change="handleChange" @blur="handleBlur" @focus="handleFocus"></bn-input>
  </div>

  <!-- <div style="width:200px">
    <bn-input  @change="handleChange" @blur="handleBlur" @focus="handleFocus"></bn-input>
  </div> -->
</template>

<style>

</style>
