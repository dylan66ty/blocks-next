<script lang="ts" setup>
import { computed} from 'vue';
import VDoc from './v-doc.vue'
import { useData } from 'vitepress'
import { useSidebar } from '../hooks/useSidebar'

const { frontmatter } = useData()
const { hasSidebar  } = useSidebar()

const isPage = computed(() => frontmatter.value.page)


</script>

<template>
  <main :class="['main-wrapper',{'has-sidebar': hasSidebar}]">
    <template v-if="isPage">
      <Content />
    </template>
    <template v-else>
      <VDoc />
    </template>
  </main>
</template>
