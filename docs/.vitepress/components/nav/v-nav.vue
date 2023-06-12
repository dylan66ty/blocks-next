<script setup lang="ts">
import VMenu from './v-menu.vue'
import Vlogo from './v-logo.vue'

</script>

<template>
  <header :class="{ 'navbar-wrapper': true, 'has-sidebar': false }">
    <div class="navbar">
      <Vlogo />
      <div class="navbar-content">
        <VMenu />

      </div>
    </div>
  </header>
</template>
