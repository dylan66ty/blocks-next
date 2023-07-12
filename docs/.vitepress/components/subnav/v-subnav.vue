<script lang="ts" setup>
  import { useSidebar } from '../hooks/useSidebar'
  import { useBackTop } from '../hooks/back-top'
  import Menu from '../icons/menu.vue'

  const { hasSidebar } = useSidebar()
  const { shouldShow, scrollToTop } = useBackTop()

  defineEmits(['toggle-menu'])
</script>

<template>
  <div class="subnav-wrapper" v-if="hasSidebar">
    <div class="menu-click" @click.prevent.stop="$emit('toggle-menu', true)">
      <Menu />
      Menu
    </div>

    <div
      :class="[
        'go-back-top',
        {
          show: shouldShow
        }
      ]"
      @click.prevent.stop="scrollToTop"
    >
      Back to top
    </div>
  </div>
</template>
