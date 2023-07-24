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
        <a class="
                text-sm p-3 
                cursor-pointer 
                flex 
                items-center 
                gap-x-1
                text-orange-500
                "
          href="https://doc.weixin.qq.com/sheet/e3_AUwAMAYPAK40EvKxeDATpq60HWarY?scode=ACQAmAdnABAzOwxLA2AUwAMAYPAK4&tab=BB08J2"
          target="_blank">
          反馈
          <svg style="--animate-duration:1s" class="animate__animated animate__swing animate__infinite"
            xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
              d="M10.5 43.5h27a2 2 0 0 0 2-2v-35a2 2 0 0 0-2-2h-27a2 2 0 0 0-2 2v35a2 2 0 0 0 2 2Z" />
            <circle cx="24" cy="34.66" r=".75" fill="currentColor" />
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
              d="M17.23 19.71a6.77 6.77 0 1 1 13.54 0a6.08 6.08 0 0 1-2 4.79c-1.4 1.12-4.81 3-4.81 5.83v.81" />
          </svg>
        </a>
      </div>
    </div>
  </header></template>

