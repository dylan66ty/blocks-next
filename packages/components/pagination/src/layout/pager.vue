<template>
  <ul :class="cls" @click="onPagerClick">
    <li v-if="pageCount > 0" :class="[
      currentPage === 1 && 'is-active',
      disabled && 'is-disabled',
      'number'
    ]">
      1
    </li>
    <li v-if="showPrevMore" :class="[
      'more quickprev',
      disabled && 'is-disabled'
    ]">
    </li>
    <li v-for="pager in pagers" :key="pager" :class="[
      currentPage === pager && 'is-active',
      disabled && 'is-disabled'
    ]" class="number">
      {{ pager }}
    </li>
    <li v-if="showNextMore" :class="[
      'more quicknext',
      disabled && 'is-disabled'
    ]">
    </li>
    <li v-if="pageCount > 1" :class="[
      currentPage === pageCount && 'is-active',
      disabled && 'is-disabled'
    ]" class="number">
      {{ pageCount }}
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue'
import { getNamespace } from '../../../../utils/global-config';
export default defineComponent({
  name: 'PaginationPager',
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    pagerCount: {
      type: Number,
      default: 7,
    },
    disabled: Boolean,
  },
  emits: ['change'],
  setup(props, {emit}) {
    const ns = getNamespace('pagination-pager')
    const cls = computed(() => [
      ns
    ])

    const showPrevMore = ref(false)
    const showNextMore = ref(false)

    const pagers = computed(() => {
      const pagerCount = props.pagerCount
      const halfPagerCount = (pagerCount - 1) / 2
      const currentPage = Number(props.currentPage)
      const pageCount = Number(props.pageCount)
      let showPrevMore = false
      let showNextMore = false
      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore = true
        }
        if (currentPage < pageCount - halfPagerCount) {
          showNextMore = true
        }
      }
      const array: number[] = []
      if (showPrevMore && !showNextMore) {
        const startPage = pageCount - (pagerCount - 2)
        for (let i = startPage; i < pageCount; i++) {
          array.push(i)
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i)
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i)
        }
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push(i)
        }
      }
      return array
    })

    // events 
    const onPagerClick = (event: UIEvent) => {
      const target = event.target as HTMLElement
      if (target.tagName.toLowerCase() === 'ul' || props.disabled) {
        return
      }
      let newPage = Number(target.textContent)
      const pageCount = props.pageCount!
      const currentPage = props.currentPage
      const pagerCountOffset = props.pagerCount - 2
      if (target.className.includes('more')) {
        if (target.className.includes('quickprev')) {
          newPage = currentPage - pagerCountOffset
        } else if (target.className.includes('quicknext')) {
          newPage = currentPage + pagerCountOffset
        }
      }
      if (!Number.isNaN(+newPage)) {
        if (newPage < 1) {
          newPage = 1
        }
        if (newPage > pageCount) {
          newPage = pageCount
        }
      }

      if (newPage !== currentPage) {
        emit('change', newPage)
      }

    }

    watchEffect(() => {
      const halfPagerCount = (props.pagerCount - 1) / 2
      showPrevMore.value = false
      showNextMore.value = false
      if (props.pageCount! > props.pagerCount) {
        if (props.currentPage > props.pagerCount - halfPagerCount) {
          showPrevMore.value = true
        }
        if (props.currentPage < props.pageCount! - halfPagerCount) {
          showNextMore.value = true
        }
      }
    })




    return {
      cls,
      showPrevMore,
      showNextMore,
      pagers,
      onPagerClick
    }

  }
})
</script>