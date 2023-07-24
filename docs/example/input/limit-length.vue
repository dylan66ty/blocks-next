<script lang="ts" setup>
  import { ref } from 'vue'

  const more = ref(
    'An approachable, performant and versatile framework for building web user interfaces.'
  )
</script>

<template>
  <bn-input placeholder="请输入" maxlength="10" show-word-limit></bn-input>
  <bn-input
    type="textarea"
    class="mt-5"
    placeholder="请输入"
    maxlength="10"
    show-word-limit
  ></bn-input>
  <bn-input
    v-model="more"
    class="mt-5"
    placeholder="请输入"
    maxlength="10"
    show-word-limit
  ></bn-input>
  <bn-input
    v-model="more"
    class="mt-5"
    type="textarea"
    placeholder="请输入"
    maxlength="10"
    show-word-limit
  ></bn-input>
</template>
