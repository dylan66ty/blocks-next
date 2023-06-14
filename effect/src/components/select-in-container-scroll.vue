<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)

setTimeout(() => {
  show.value = true
}, 3000);
const height = ref(1000)
setInterval(() => {
  height.value += 1
}, 1000)
</script>

<template>
  <div class="box">
    <bn-select>
      <bn-option label="A" value="a"></bn-option>
      <bn-option label="B" value="b"></bn-option>
      <bn-option label="C" value="c"></bn-option>
    </bn-select>
    <div :style="`height: ${height}px;background: pink;`" v-if="show">
    </div>

  </div>
</template>

<style lang="scss">
body {
  height: 200vh;
}

.box {
  width: 400px;
  height: 400px;
  border: 1px solid #ddd;
  overflow: scroll;
  margin: 0 auto;
}
</style>