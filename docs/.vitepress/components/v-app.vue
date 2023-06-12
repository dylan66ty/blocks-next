<script lang="ts" setup>
import VNav from './nav/v-nav.vue';
import VContent from './content/v-content.vue';
import VSidebar from './sidebar/v-sidebar.vue';
import VSubnav from './subnav/v-subnav.vue';
import { ref } from 'vue';

const showMenu = ref(false)

const toggleMenu = (status) => {
  showMenu.value = status
}

</script>

<template>
  <div class="app">
    <VNav />
    <VSubnav  @toggle-menu="toggleMenu"/>
    <VSidebar @toggle-menu="toggleMenu" :showMenu="showMenu" />
    <VContent />
  </div>
</template>

<style lang="scss"></style>