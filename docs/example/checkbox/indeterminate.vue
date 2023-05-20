<script lang="ts" setup>
  import { computed, ref } from 'vue';

  const options = ['Vue', 'React', 'Angular'];

  const checked = ref<Array<string>>(['Vue']);

  const checkAll = computed(() => {
    return !!(checked.value.length === options.length && checked.value.length);
  });

  const indeterminate = computed(() => {
    return !!(checked.value.length < options.length && checked.value.length);
  });

  const toggleAll = (val) => {
    checked.value = !val ? [] : options;
  };
</script>

<template>
  <div style="margin-bottom: 10px">
    <bn-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="toggleAll"
      >全选</bn-checkbox
    >
  </div>

  <bn-checkbox-group v-model="checked">
    <bn-checkbox v-for="label in options" :key="label" :label="label"></bn-checkbox>
  </bn-checkbox-group>
</template>

<style lang="scss"></style>
