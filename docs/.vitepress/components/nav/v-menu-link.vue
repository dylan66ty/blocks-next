<script lang="ts" setup>
import { useRoute } from 'vitepress'
import type { Link } from '../types'



defineProps<{
  item: Link
}>()

const route = useRoute()


const isActiveLink = (item: Link) => {
  const activeMatch = item.activeMatch
  const currentPath = route.path
  if(!activeMatch) {
    if(currentPath === '/') return true
    if(currentPath.includes('/index')) return true
  }
  return currentPath.includes(activeMatch!)
}


</script>

<template>
  <component :is="item.link ? 'a' : 'span'" :href="item.link" :class="{
    'is-menu-link': true,
    active: isActiveLink(item),
  }">
    {{ item.text }}
  </component>
</template>

<style scoped lang="scss">
.is-menu-link {
  display: block;
  padding: 0 12px;
  line-height: calc(var(--nav-height) - 3px);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
  transition: color 0.3s;
  border-bottom: 2px solid transparent;
  cursor: pointer;

  &.active {
    border-bottom-color: var(--brand-color);
  }

  &:hover {
    color: var(--brand-color);
  }
}
</style>
