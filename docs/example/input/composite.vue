<script lang="ts" setup>
  import { ref } from 'vue'

  const select = ref('select1')
</script>

<template>
  <div>
    <bn-input clearable>
      <template #append>
        <bn-button>
          <bn-icon-search></bn-icon-search>
        </bn-button>
      </template>
    </bn-input>
  </div>
  <div class="mt-2">
    <bn-input clearable>
      <template #prepend>
        <bn-select v-model="select" style="width: 100px">
          <bn-option value="select1" label="Select1"></bn-option>
          <bn-option value="select2" label="Select2"></bn-option>
          <bn-option value="select3" label="Select3"></bn-option>
        </bn-select>
      </template>
    </bn-input>
  </div>
  <div class="mt-2">
    <bn-input>
      <template #prepend>
        <bn-select v-model="select" style="width: 100px">
          <bn-option value="select1" label="Select1"></bn-option>
          <bn-option value="select2" label="Select2"></bn-option>
          <bn-option value="select3" label="Select3"></bn-option>
        </bn-select>
      </template>
      <template #append>
        <bn-button>
          <bn-icon-search></bn-icon-search>
        </bn-button>
      </template>
    </bn-input>
  </div>
  <div class="mt-2">
    <bn-input>
      <template #prepend>
        <bn-button>
          <bn-icon-search></bn-icon-search>
        </bn-button>
      </template>
      <template #append>
        <bn-select v-model="select" style="width: 100px">
          <bn-option value="select1" label="Select1"></bn-option>
          <bn-option value="select2" label="Select2"></bn-option>
          <bn-option value="select3" label="Select3"></bn-option>
        </bn-select>
      </template>
    </bn-input>
  </div>
</template>
