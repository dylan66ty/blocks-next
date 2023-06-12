<script lang="ts" setup>
import { computed} from 'vue';
import VDoc from './v-doc.vue'
import VNotFound from './v-not-found.vue'
import { useData , useRoute} from 'vitepress'
import { useSidebar } from '../hooks/useSidebar'

const { frontmatter } = useData()
const { hasSidebar  } = useSidebar()
const route = useRoute()

const isPage = computed(() => frontmatter.value.page)
const isNotFound = computed(() => route.component === VNotFound)


</script>

<template>
  <main :class="['main-wrapper',{'has-sidebar': hasSidebar}]">
    <template v-if="isNotFound">
      <Content></Content>
    </template>
    <template v-else-if="isPage">
      <Content />
    </template>
    <template v-else>
      <VDoc />
    </template>
  </main>
</template>
