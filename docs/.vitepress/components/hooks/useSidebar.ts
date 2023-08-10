import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

export const useSidebar = () => {
  const route = useRoute()
  const { site, page } = useData()
  if (!page.value) {
    return {
      sidebars: computed(() => []),
      hasSidebar: computed(() => false)
    }
  }
  const sidebars = computed(() => {
    if (page.value.frontmatter.sidebar === false) return []
    const sidebar = site.value.themeConfig.sidebar
    const path = route.path 
    for (const dir in sidebar) {
      if (path.includes(dir)) {
        return sidebar[dir]
      }
    }
    return []
  })
  console.log(sidebars);
  return {
    sidebars,
    hasSidebar: computed(() => sidebars.value.length > 0)
  }
}
