<script lang="ts" setup>
import { ref } from 'vue';

const more = ref('An approachable, performant and versatile framework for building web user interfaces.')




</script>
<template>
  <bn-input placeholder="请输入" maxlength="10" show-word-limit></bn-input>
  <div style="margin-top: 20px;"></div>
  <bn-input type="textarea" placeholder="请输入" maxlength="10" show-word-limit></bn-input>
  <div style="margin-top: 20px;"></div>
  <bn-input placeholder="请输入" maxlength="10" show-word-limit v-model="more" ></bn-input>
  <div style="margin-top: 20px;"></div>
  <bn-input type="textarea" v-model="more"  placeholder="请输入" maxlength="10" show-word-limit></bn-input>
</template>
