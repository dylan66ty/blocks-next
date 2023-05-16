<script lang="ts">
  import { computed, defineComponent } from 'vue';
  export default defineComponent({
    name: 'BnGrid',
    props: {
      colGap: String, //列间距16px
      rowGap: String, //行间距16px
      radius: String, //item 圆角 4px
      padding: String, //item padding
      border: Boolean, //item border 启用 ，false
      shadow: Boolean, //item hover 阴影启用 false

      //不同分辨率下 的列数
      all: Number, //所有分辨率 自适应优先级
      xs: Number, //480
      sm: Number, //768
      md: Number, //992
      lg: Number, //1200
      xl: Number, //1920
    },
    setup(props) {
      const cns = computed(() => {
        return {
          'bn-grid': true,
          'bn-auto-fit': props.all === undefined,
        };
      });
      const style = computed(() => {
        const style: any = {};
        if (props.all !== undefined) style['--bn-grid-cols-all'] = props.all;
        if (props.xs !== undefined) style['--bn-grid-cols-xs'] = props.xs;
        if (props.sm !== undefined) style['--bn-grid-cols-sm'] = props.sm;
        if (props.md !== undefined) style['--bn-grid-cols-md'] = props.md;
        if (props.lg !== undefined) style['--bn-grid-cols-lg'] = props.lg;
        if (props.xl !== undefined) style['--bn-grid-cols-xl'] = props.xl;

        if (props.colGap !== undefined) style['--bn-grid-cgap'] = props.colGap;
        if (props.rowGap !== undefined) style['--bn-grid-rgap'] = props.rowGap;
        if (props.radius !== undefined) style['--bn-grid-item-radius'] = props.radius;
        if (props.padding !== undefined) style['--bn-grid-item-padding'] = props.padding;
        return style;
      });

      return {
        cns,
        style,
      };
    },
  });
</script>

<template>
  <div :class="cns" :style="style" :border="border" :shadow="shadow">
    <slot></slot>
  </div>
</template>
