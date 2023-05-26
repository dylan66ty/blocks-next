import { computed, defineComponent, h } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import { paginationProps } from './_pagination'

import LayoutComponentTotal from './layout/total.vue'
import LayoutComponentPager from './layout/pager.vue'
import LayoutComponentNext from './layout/next.vue'
import LayoutComponentPrev from './layout/prev.vue'
import LayoutComponentSizes from './layout/sizes.vue'
import LayoutComponentJumper from './layout/jumper.vue'

import type { VNode } from 'vue'
import type { LayoutKey } from './types'

export default defineComponent({
  name: getComponentNamespace('Pagination'),
  props: paginationProps,
  emits: [
    'page-change',
    'page-size-change',
    'prev',
    'next'
  ],
  setup(props, {emit}) {
    const ns = getNamespace('pagination')
    const cls = computed(() => [
      ns,
    ])

    // page
    const currentPageBridge = computed<number>({
      get() {
        return props.pageConfig.page as number
      },
      set(v) {
        let newCurrentPage = v
        if (v < 1) {
          newCurrentPage = 1
        } else if (v > pageCountBridge.value) {
          newCurrentPage = pageCountBridge.value
        }
        props.pageConfig.page = newCurrentPage
      },
    })

    // pageSize
    const pageSizeBridge = computed({
      get() {
        return props.pageConfig.pageSize
      },
      set(v: number) {  
        props.pageConfig.pageSize = v
      },
    })

    // 一共多少页
    const pageCountBridge = computed<number>(() => {
      let pageCount = Math.max(1, Math.ceil((props.pageConfig.total as number) / pageSizeBridge.value!))
      return pageCount
    })

    const handleSizeChange = (val: number) => {
      pageSizeBridge.value = val
      const newPageCount = pageCountBridge.value
      if (currentPageBridge.value > newPageCount) {
        // pageSize发生变化了 将page直接设为1
        currentPageBridge.value = 1
      }
      emit('page-size-change', pageSizeBridge.value )
    }

    // event
    const handleCurrentChange = (val:number) => {
      currentPageBridge.value = val
      emit('page-change', currentPageBridge.value)

    }

    const prev = () => {
      if (props.disabled) return
      currentPageBridge.value -= 1
      emit('prev', currentPageBridge.value)
      emit('page-change', currentPageBridge.value)
    }

    const next = () => {
      if (props.disabled) return
      currentPageBridge.value += 1
      emit('next', currentPageBridge.value)
      emit('page-change', currentPageBridge.value)
    }

    return () => {
      if (!props.layout) return null

      const renderChildren:Array<VNode | VNode[] | null> = []
      const layoutRenderMap: Record<string,VNode> = {
        jumper:h(LayoutComponentJumper, {
          onChange: handleCurrentChange,
          currentPage: currentPageBridge.value,
          pageCount: pageCountBridge.value,
          disabled: props.disabled,
          pageSize: pageSizeBridge.value,
        }),
        sizes: h(LayoutComponentSizes, {
          pageSize: pageSizeBridge.value,
          pageSizes: props.pageSizes,
          disabled: props.disabled,
          onChange: handleSizeChange
        }),
        prev: h(LayoutComponentPrev, {
          disabled: props.disabled,
          currentPage: currentPageBridge.value,
          onClick: prev,
        }),
        next: h(LayoutComponentNext, {
          disabled: props.disabled,
          currentPage: currentPageBridge.value,
          pageCount: pageCountBridge.value,
          onClick: next,
        }),
        pager: h(LayoutComponentPager, {
          currentPage: currentPageBridge.value,
          pageCount: pageCountBridge.value,
          pagerCount: 7,
          onChange: handleCurrentChange,
          disabled: props.disabled,
        }),
        total: h(LayoutComponentTotal, { total: props.pageConfig.total || 0 }),
      }

      const needRenderComponents = props.layout
      .split(',')
      .map((item: string) => item.trim()) as LayoutKey[]

      needRenderComponents.forEach((layoutName: LayoutKey) => {
        if(layoutRenderMap[layoutName]) {
          renderChildren.push(layoutRenderMap[layoutName])
        }
      })

      return <div class={cls.value}>
        { renderChildren }
      </div>
    }

  }

})