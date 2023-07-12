<script lang="ts" setup>
  const goHome = () => {
    location.href = '/'
  }
</script>

<template>
  <div class="navbar-logo" @click="goHome">
    <img src="/blocks-next-logo.svg" alt="" />
  </div>
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
