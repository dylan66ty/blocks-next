<script lang="ts" setup>
  import { useData } from "vitepress";
  const { site } = useData()

</script>

<template>
  <a class="navbar-logo" :href="site.base" >
    <img src="/blocks-next-logo.svg" alt="" />
  </a>
</template>

<style lang="scss">
  .navbar-logo {
    flex-shrink: 0;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;

    > span {
      background-image: linear-gradient(to right, var(--brand-color), var(--brand-color));
      background-clip: text;
      color: transparent;
      font-size: 24px;
      font-weight: 700;
    }
  }
</style>
