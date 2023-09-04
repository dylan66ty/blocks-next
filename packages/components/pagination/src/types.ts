export interface PageConfig {
  page?: number
  pageSize?: number
  total?: number
}

export type LayoutKey = 'total' | 'sizes' | 'prev' | 'pager' | 'next' | 'jumper'
