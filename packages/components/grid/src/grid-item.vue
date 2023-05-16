<script lang="ts">
  import type { StyleValue } from 'vue';
  import { computed, defineComponent } from 'vue';

  export default defineComponent({
    name: 'BnGridItem',
    props: {
      place: String,
      colSpan: Number,
      rowSpan: Number,
      colOffset: Number,
      rowOffset: Number,
      block: Boolean,
    },
    setup(props) {
      const styles = computed(() => {
        const style: StyleValue = {};

        if (props.place !== undefined) style['--bn-grid-item-place'] = props.place;
        if (props.rowSpan !== undefined) style['--bn-grid-row-span'] = props.rowSpan;
        if (props.rowOffset !== undefined) style['--bn-grid-row-offset'] = props.rowOffset;

        if (props.block) {
          style['--bn-grid-col-offset'] = 1;
          style['--bn-grid-col-span'] = 'var(--bn-grid-cols)';
        }
        if (props.colSpan !== undefined && !props.block)
          style['--bn-grid-col-span'] = props.colSpan;
        if (props.colOffset !== undefined && !props.block)
          style['--bn-grid-col-offset'] = props.colOffset;
        return style;
      });

      return {
        styles,
      };
    },
  });
</script>

<template>
  <div class="bn-grid-item" :style="styles">
    <slot></slot>
  </div>
</template>
