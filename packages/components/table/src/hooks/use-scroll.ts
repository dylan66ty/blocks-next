import type { ComponentPublicInstance, Ref } from 'vue'
import { ref, onMounted, watch } from 'vue'
import type { TableColumnData } from '../types'

export const useScroll = (renderDataColumns: Ref<TableColumnData[]>) => {
  const tbodyComRef = ref<ComponentPublicInstance>()
  // 当前滚动条的位置
  const horScrollPosition = ref<'left' | 'right' | 'middle'>()
  //body水平滚动来控制header区域的水平滚动
  const theadComRef = ref<ComponentPublicInstance & { scrollLeft: (v: number) => void }>()
  // 用body的水平滚动来控制header的水平滚动
  const onTbodyScroll = (e: Event) => {
    const target = e.target as HTMLDivElement
    const { scrollLeft } = target
    // 触发header滚动条滚动
    theadComRef.value?.scrollLeft(scrollLeft)
    setHorScrollPosition(target)
  }

  const setHorScrollPosition = (scrollContainer: HTMLDivElement) => {
    const { scrollLeft, clientWidth } = scrollContainer
    const horScrollWidth = scrollContainer.firstElementChild!.clientWidth - clientWidth

    if (horScrollWidth === 0) return

    if (scrollLeft === 0) {
      horScrollPosition.value = 'left'
    } else if (scrollLeft === horScrollWidth) {
      horScrollPosition.value = 'right'
    } else {
      horScrollPosition.value = 'middle'
    }
  }

  const updateHorScrollPosition = () => {
    const scrollContainer = tbodyComRef.value?.$el?.firstElementChild
    scrollContainer && setHorScrollPosition(scrollContainer)
  }

  onMounted(() => {
    updateHorScrollPosition()
  })

  watch(
    () => renderDataColumns.value,
    () => {
      updateHorScrollPosition()
    }
  )

  return {
    theadComRef,
    tbodyComRef,
    onTbodyScroll,
    horScrollPosition
  }
}
