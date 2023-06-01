<template>
  <div :class="cls">
    <div :class="[`${ns}__image`]" :style="imageStyle">
      <slot name="image">
        <EmptyIcon />
      </slot>
    </div>
    <div :class="[`${ns}__description`]">
      <slot name="description">
        {{description}}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { StyleValue, computed, defineComponent } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import EmptyIcon from '../../icon/src/base/empty.vue'
import { addUnit } from '../../../shared/utils'

export default defineComponent({
  name: getComponentNamespace('Empty'),
  components: {
    EmptyIcon
  },
  props: {
    iconSize: {
      type: Number,
      default: 48
    },
    description: {
      type: [String, Number],
      default: '暂无数据'
    }
  },
  setup(props) {
    const ns = getNamespace('empty')
    const cls = computed(() => [
      ns
    ])

    const imageStyle = computed(() => {
      const style:StyleValue = {
        fontSize: addUnit(props.iconSize)
      } 
      return style
    })

    return {
      ns,
      cls,
      imageStyle
    }
  }
})
</script>