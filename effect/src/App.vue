<script setup lang="ts">
import Comp from './Comp.vue'
</script>

<template>
  <div>
    <Comp />
    <bn-icon-eye-open style="font-size: 30px;color:green"></bn-icon-eye-open>
    <bn-icon-eye-close style="font-size: 30px;color:red"></bn-icon-eye-close>
    <bn-icon-minus></bn-icon-minus>


    <div>
      <bn-button type="primary" leftIcon="search">1</bn-button>
      <bn-button type="danger">2</bn-button>
      <bn-button type="warning">3</bn-button>
      <bn-button type="success">4</bn-button>
      <bn-button type="strong" shape="circle">5</bn-button>



    </div>

    <div>
      <bn-space size="10">
        <bn-button type="primary" leftIcon="search">1</bn-button>
        <bn-button type="danger">2</bn-button>
        <bn-button type="warning">3</bn-button>
        <bn-button type="success">4</bn-button>
      </bn-space>

    </div>

  </div>
</template>

<style>
#app {
  margin-top: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
