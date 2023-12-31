<script lang="ts" setup>
  import { computed, ref, watch } from 'vue'
  import { useRoute , useData} from 'vitepress'
  import type { Link } from '../types'

  const props = defineProps<{
    item: Link
  }>()

  defineEmits(['close'])

  const sidebarItem = ref<HTMLElement>()

  const route = useRoute()
  const { site } = useData()
  const activeLink = computed<boolean>(() => {
    const link = route.path.split('.html')
    return link[0] === site.value.base + props.item.link
  })

  watch([activeLink, sidebarItem], ([active, el]) => {
    if (active && el) {
      el.scrollIntoView?.({ block: 'nearest' })
    }
  })
</script>

<template>
  <a
    ref="sidebarItem"
    :class="{
      link: true,
      active: activeLink,
      'is-promotion': item.promotion
    }"
    :href="site.base + item.link"
    @click="$emit('close')"
  >
    <p class="link-text">{{ item.text }}</p>
    <span class="vp-tag" v-if="item.promotion">
      {{ item.promotion }}
    </span>
  </a>
</template>

<style scoped lang="scss">
  .link:not(.flex) {
    display: block;
  }

  .link {
    padding: 10px 16px;
    line-height: 1.5;
    font-size: 0.9rem;
    border-radius: 8px;

    &.is-promotion {
      display: flex;
      align-items: center;
    }

    .link-text {
      margin: 0;
    }

    > .vp-tag {
      margin-left: 8px;
    }
  }

  .link:hover .link-text {
    color: var(--brand-color);
    transition: color 0.25s;
  }

  .link.active {
    background-color: var(--link-active-bg-color);

    .link-text {
      font-weight: 600;
      color: var(--brand-color);
      transition: color 0.25s;
    }
  }

  .link-text {
    line-height: 20px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-color-light);
    transition: color 0.5s;
  }
</style>
