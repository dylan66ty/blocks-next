<script lang="ts" setup>
  import { useData, useRoute } from 'vitepress'
  import type { Link } from '../types'

  defineProps<{
    item: Link
  }>()

  const route = useRoute()
  const { site } = useData()

  const isActiveLink = (item: Link) => {
    return route.path?.includes(item.link)
  }
</script>

<template>
  <component
    :is="item.link ? 'a' : 'span'"
    :href="site.base + item.link"
    :class="{
      'is-menu-link': true,
      active: isActiveLink(item)
    }"
  >
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
      color: var(--brand-color);
    }

    &:hover {
      color: var(--brand-color);
    }
  }
</style>
