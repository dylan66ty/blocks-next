<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref, watch } from 'vue';
import type { StyleValue } from 'vue';
import { getComponentNamespace, getNamespace } from '../../../utils/global-config';
import { isObject } from '../../../utils/is';
import ResizeObserver from '../../../shared/resize-observer';
import { scrollbarProps } from './scrollbar';
import { TRACK_SIZE } from './constant';
import Thumb from './thumb.vue';

import type { ThumbData } from './types';

export default defineComponent({
  name: getComponentNamespace('Scrollbar'),
  components: {
    Thumb,
    ResizeObserver,
  },
  inheritAttrs: false,
  props: scrollbarProps,
  emits: {
    scroll: (ev: Event) => true,
  },
  setup(props, { emit, slots }) {
    const ns = getNamespace('scrollbar');
    const cls = computed(() => [
      ns,
      props.outerClass,
      isBoth.value && 'is-both',
      `${ns}__${props.type}`,
    ]);

    const containerRef = ref<HTMLElement>();
    const horizontalData = ref<ThumbData>();
    const verticalData = ref<ThumbData>();
    const horizontalThumbRef = ref();
    const verticalThumbRef = ref();

    const _hasHorizontalScrollbar = ref(false);
    const _hasVerticalScrollbar = ref(false);
    const hasHorizontalScrollbar = computed(
      () => _hasHorizontalScrollbar.value && !props.disableHorizontal,
    );
    const hasVerticalScrollbar = computed(
      () => _hasVerticalScrollbar.value && !props.disableVertical,
    );

    const isBoth = ref(false);

    const getContainerSize = () => {
      if (containerRef.value) {
        const {
          clientWidth,
          clientHeight,
          offsetWidth,
          offsetHeight,
          scrollWidth,
          scrollHeight,
          scrollTop,
          scrollLeft,
        } = containerRef.value;
        _hasHorizontalScrollbar.value = scrollWidth > clientWidth;
        _hasVerticalScrollbar.value = scrollHeight > clientHeight;
        isBoth.value = hasHorizontalScrollbar.value && hasVerticalScrollbar.value;
        const horizontalTrackWidth =
          props.type === 'embed' && isBoth.value ? offsetWidth - TRACK_SIZE : offsetWidth;
        const verticalTrackHeight =
          props.type === 'embed' && isBoth.value ? offsetHeight - TRACK_SIZE : offsetHeight;

        const horizontalThumbWidth = Math.round(
          horizontalTrackWidth /
          Math.min(scrollWidth / clientWidth, horizontalTrackWidth),
        );
        const maxHorizontalOffset = horizontalTrackWidth - horizontalThumbWidth;
        const horizontalRatio = (scrollWidth - clientWidth) / maxHorizontalOffset;
        const verticalThumbHeight = Math.round(
          verticalTrackHeight /
          Math.min(scrollHeight / clientHeight, verticalTrackHeight),
        );
        const maxVerticalOffset = verticalTrackHeight - verticalThumbHeight;
        const verticalRatio = (scrollHeight - clientHeight) / maxVerticalOffset;

        horizontalData.value = {
          ratio: horizontalRatio,
          thumbSize: horizontalThumbWidth,
          max: maxHorizontalOffset,
        };
        verticalData.value = {
          ratio: verticalRatio,
          thumbSize: verticalThumbHeight,
          max: maxVerticalOffset,
        };
        if (scrollTop > 0) {
          const verticalOffset = Math.round(scrollTop / (verticalData.value?.ratio ?? 1));
          verticalThumbRef.value?.setOffset(verticalOffset);
        }
        if (scrollLeft > 0) {
          const horizontalOffset = Math.round(scrollLeft / (verticalData.value?.ratio ?? 1));
          horizontalThumbRef.value?.setOffset(horizontalOffset);
        }
      }
    };

    const handleResize = () => {
      getContainerSize();
    };

    onMounted(() => {
      getContainerSize();
    });



    const handleVerticalScroll = (offset: number) => {
      if (containerRef.value) {
        containerRef.value.scrollTo({
          top: offset * (verticalData.value?.ratio ?? 1),
        });
      }
    };

    const handleHorizontalScroll = (offset: number) => {
      if (containerRef.value) {
        containerRef.value.scrollTo({
          left: offset * (horizontalData.value?.ratio ?? 1),
        });
      }
    };

    const style = computed(() => {
      const style: StyleValue = {};
      if (props.type === 'track') {
        if (hasHorizontalScrollbar.value) {
          style.paddingBottom = `${TRACK_SIZE}px`;
        }
        if (hasVerticalScrollbar.value) {
          style.paddingRight = `${TRACK_SIZE}px`;
        }
      }
      return [style, props.outerStyle];
    });

    const handleScroll = (ev: Event) => {
      if (containerRef.value) {
        if (hasHorizontalScrollbar.value && !props.disableHorizontal) {
          const horizontalOffset = Math.round(
            containerRef.value.scrollLeft / (horizontalData.value?.ratio ?? 1),
          );
          horizontalThumbRef.value?.setOffset(horizontalOffset);
        }
        if (hasVerticalScrollbar.value && !props.disableVertical) {
          const verticalOffset = Math.round(
            containerRef.value.scrollTop / (verticalData.value?.ratio ?? 1),
          );
          verticalThumbRef.value?.setOffset(verticalOffset);
        }
      }
      emit('scroll', ev);
    };

    return {
      ns,
      cls,
      style,
      containerRef,
      horizontalThumbRef,
      verticalThumbRef,
      horizontalData,
      verticalData,
      isBoth,
      hasHorizontalScrollbar,
      hasVerticalScrollbar,
      handleScroll,
      handleHorizontalScroll,
      handleVerticalScroll,
      handleResize,
    };
  },
  methods: {
    scrollTo(
      options?:
        | number
        | {
          left?: number;
          top?: number;
        },
      y?: number,
    ) {
      if (isObject(options)) {
        (this.$refs.containerRef as HTMLElement)?.scrollTo(options);
      } else if (options || y) {
        (this.$refs.containerRef as HTMLElement)?.scrollTo(options as number, y as number);
      }
    },
    scrollTop(top: number) {
      (this.$refs.containerRef as HTMLElement)?.scrollTo({
        top,
      });
    },
    scrollLeft(left: number) {
      (this.$refs.containerRef as HTMLElement)?.scrollTo({
        left,
      });
    },
  },
});
</script>

<template>
  <div :class="cls" :style="style">
    <ResizeObserver @resize="handleResize">
      <div ref="containerRef" :class="`${ns}__container`" v-bind="$attrs" @scroll="handleScroll">
        <slot></slot>
      </div>
    </ResizeObserver>

    <Thumb v-if="!hide && hasHorizontalScrollbar" ref="horizontalThumbRef" :data="horizontalData" direction="horizontal"
      :both="isBoth" @scroll="handleHorizontalScroll" />
    <Thumb v-if="!hide && hasVerticalScrollbar" ref="verticalThumbRef" :data="verticalData" direction="vertical"
      :both="isBoth" @scroll="handleVerticalScroll" />
  </div>
</template>
