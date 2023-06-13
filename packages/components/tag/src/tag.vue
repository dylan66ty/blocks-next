<template>
  <div :class="cls">
    <span :class="[`${ns}__prefix-icon`]" v-if="icon || $slots.icon">
      <slot name="icon">
        <component v-if="icon" :is="icon"></component>
      </slot>
    </span>
    <span :class="[`${ns}__content`]" >
      <slot></slot>
    </span>


    <CloseIcon :class="[`${ns}__close`]" v-if="closeable" @click.stop="handleClose"/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import { tagProps } from './props'
import CloseIcon from '../../icon/src/base/close.vue'

export default defineComponent({
  name: getComponentNamespace('Tag'),
  components: {
    CloseIcon
  },
  props: tagProps,
  emits:['close'],
  setup(props, {emit}) {
    const ns = getNamespace('tag')
    const cls = computed(() => [
      ns,
      props.type && `${ns}--${props.type}`,
      props.size && `${ns}--${props.size}`,
      props.closeable && `is-closeable`,
      props.effect && `is-${props.effect}`,
      props.round && `is-round`

    ])

    const handleClose = (e:Event) => {
      emit('close', e)
    } 
    return {
      ns,
      cls,
      handleClose
    }
  }
})
</script>