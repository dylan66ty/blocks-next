import type { PropType, ExtractPropTypes } from 'vue'
import type { PageConfig } from './types'

export const paginationProps = {
  pageConfig: {
    type: Object as PropType<PageConfig>,
    default: () => ({})
  },
  pageSizes: {
    type: Array as PropType<Array<number>>,
    default: () => [10, 20, 30]
  },
  layout: {
    type: String,
    default: 'prev, pager, next'
  },
  disabled: {
    type: Boolean,
    default: false
  }
}

export type PaginationProps = ExtractPropTypes<typeof paginationProps>
