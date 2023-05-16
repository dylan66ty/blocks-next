<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config';
  import { on, off } from '../../../utils/dom';
  import { thumbProps } from './thumb';
  import type { ThumbMap } from './types';

  export default defineComponent({
    name: getComponentNamespace('Thumb'),
    props: thumbProps,
    emits: ['scroll'],
    setup(props, { emit }) {
      const track_ns = getNamespace('scrollbar-track');
      const trackCls = computed(() => [track_ns, `${track_ns}__${props.direction}`]);
      const thumb_ns = getNamespace('scrollbar-thumb');
      const thumbCls = computed(() => [
        thumb_ns,
        `${thumb_ns}__${props.direction}`,
        isDragging.value && 'is-dragging',
      ]);

      const trackRef = ref<HTMLElement>();
      const thumbRef = ref<HTMLElement>();

      const thumbMap = computed<ThumbMap>(() => {
        if (props.direction === 'horizontal') {
          return {
            size: 'width',
            direction: 'left',
            offset: 'offsetWidth',
            client: 'clientX',
          };
        }
        return {
          size: 'height',
          direction: 'top',
          offset: 'offsetHeight',
          client: 'clientY',
        };
      });

      const offset = ref(0);

      const isDragging = ref(false);
      const mouseOffset = ref(0);

      const thumbStyle = computed(() => {
        return {
          [thumbMap.value.size]: `${props.data?.thumbSize ?? 0}px`,
          [thumbMap.value.direction]: `${offset.value}px`,
        };
      });

      const handleThumbMouseDown = (ev: MouseEvent) => {
        ev.preventDefault();
        if (thumbRef.value) {
          mouseOffset.value =
            ev[thumbMap.value.client] -
            thumbRef.value.getBoundingClientRect()[thumbMap.value.direction];
          isDragging.value = true;
          on(window, 'mousemove', handleMouseMove);
          on(window, 'mouseup', handleMouseUp);
          on(window, 'contextmenu', handleMouseUp);
        }
      };

      const handleTrackClick = (ev: MouseEvent) => {
        ev.preventDefault();

        if (thumbRef.value) {
          const _offset = getLegalOffset(
            ev[thumbMap.value.client] >
              thumbRef.value.getBoundingClientRect()[thumbMap.value.direction]
              ? offset.value + (props.data?.thumbSize ?? 0)
              : offset.value - (props.data?.thumbSize ?? 0),
          );
          if (_offset !== offset.value) {
            offset.value = _offset;
            emit('scroll', _offset);
          }
        }
      };

      const getLegalOffset = (offset: number) => {
        if (offset < 0) {
          return 0;
        }
        if (props.data && offset > props.data.max) {
          return props.data.max;
        }
        return offset;
      };

      const handleMouseMove = (ev: MouseEvent) => {
        if (trackRef.value && thumbRef.value) {
          const _offset = getLegalOffset(
            ev[thumbMap.value.client] -
              trackRef.value.getBoundingClientRect()[thumbMap.value.direction] -
              mouseOffset.value,
          );
          if (_offset !== offset.value) {
            offset.value = _offset;
            emit('scroll', _offset);
          }
        }
      };

      const handleMouseUp = () => {
        isDragging.value = false;
        off(window, 'mousemove', handleMouseMove);
        off(window, 'mouseup', handleMouseUp);
      };

      const setOffset = (_offset: number) => {
        if (!isDragging.value) {
          _offset = getLegalOffset(_offset);
          if (_offset !== offset.value) {
            offset.value = _offset;
          }
        }
      };

      return {
        trackCls,
        thumbCls,
        thumb_ns,
        trackRef,
        thumbRef,
        handleThumbMouseDown,
        handleTrackClick,
        thumbStyle,
        setOffset,
      };
    },
    expose: ['setOffset'],
  });
</script>

<template>
  <div ref="trackRef" :class="trackCls" @mousedown.self="handleTrackClick">
    <div ref="thumbRef" :class="thumbCls" :style="thumbStyle" @mousedown="handleThumbMouseDown">
    </div>
  </div>
</template>
