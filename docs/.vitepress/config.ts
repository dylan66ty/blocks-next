import type { UserConfig } from 'vitepress'

import { mdPlugin } from './config/plugins'
import { sidebar } from './config/navigation'

import nav from './navigation/nav.json'

const config: UserConfig = {
  lang: 'zh-CN',
  title: 'Blocks Next',
  description: 'Just playing around.',
  lastUpdated: true,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: './blocks-next-logo-small.svg',
        type: 'image/svg+xm'
      }
    ]
  ],
  themeConfig: {
    logo: '',
    // 展示搜索框
    // algolia: {
    //   appKey: '',
    //   indexName: '',
    //   searchParameters: {
    //     faeFilters: ['tags:guide,api'],
    //   },
    // },
    // 顶部标题栏
    nav,
    // 侧边栏
    sidebar
  },
  markdown: {
    config: (md: markdownit) => mdPlugin(md)
  }
}

export default config
