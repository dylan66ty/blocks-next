<script lang="ts" setup>
import { useSidebar } from '../hooks/useSidebar'
import VLink from './v-link.vue'
const { hasSidebar, sidebars } = useSidebar()

defineProps({
  showMenu: Boolean
})
defineEmits(['toggle-menu'])



</script>

<template>
  <div :class="['sidebar-wrapper', { 'open': showMenu }]" v-if="hasSidebar">
    <aside>
      <slot name="top" />
      <div class="sidebar-groups">
        <section v-for="(item, key) of sidebars" :key="key" class="sidebar-group">
          <p class="sidebar-group__title">
            {{ item.text }}
          </p>
          <VLink v-for="(child, childKey) in item.items" :key="childKey" :item="child" @close="$emit('close')" />
        </section>
      </div>
      <slot name="bottom" />
    </aside>
  </div>

  <transition name="bn-fade-in">
    <div class="overlay" v-if="showMenu" @click="$emit('toggle-menu', false)">
    </div>
  </transition>
</template>
