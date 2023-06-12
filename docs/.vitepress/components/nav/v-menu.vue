<script setup lang="ts">
import { useNav } from '../hooks/useNav'
import VMenuLink from './v-menu-link.vue'
const navs = useNav()


</script>

<template>
  <nav v-if="navs" class="navbar-menu">
    <VMenuLink v-for="(item, key) in navs" :key="key" :item="item" />
  </nav>
</template>
