<script lang="ts" setup>
import { ref } from 'vue'
const visible = ref(false)

const openDialog = () => {
  visible.value = true
}

const top = ref<number | string>(10)

const tops = [10, '40px', '15vh']

</script>

<template>
  <div>
    <bn-button fill-mode="outline" @click="openDialog">click open the dialog</bn-button>

    <bn-dialog 
       v-model="visible"
       :top="top"
       title="距离产生美"
     >
      

      <bn-radio-group v-model="top">
        <bn-radio :label="t" v-for="t in tops"></bn-radio>
      </bn-radio-group>
      <template #footer>
        <bn-space>
          <bn-button fill-mode="outline" @click="visible = false">取消</bn-button>
          <bn-button type="primary" @click="visible = false">确认</bn-button>
        </bn-space>
      </template>
    </bn-dialog>
  </div>
</template>

<style lang="scss"></style>