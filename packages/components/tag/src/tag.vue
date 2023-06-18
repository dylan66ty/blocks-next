<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
  import CloseIcon from '../../icon/src/base/close.vue'
  import { tagProps } from './props'

  export default defineComponent({
    name: getComponentNamespace('Tag'),
    components: {
      CloseIcon
    },
    props: tagProps,
    emits: ['close'],
    setup(props, { emit }) {
      const ns = getNamespace('tag')
      const cls = computed(() => [
        ns,
        props.type && `${ns}--${props.type}`,
        props.size && `${ns}--${props.size}`,
        props.closeable && `is-closeable`,
        props.effect && `is-${props.effect}`,
        props.round && `is-round`
      ])

      const handleClose = (e: Event) => {
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

<template>
  <div :class="cls">
    <span v-if="icon || $slots.icon" :class="[`${ns}__prefix-icon`]">
      <slot name="icon">
        <component :is="icon" v-if="icon"></component>
      </slot>
    </span>
    <span :class="[`${ns}__content`]">
      <slot></slot>
    </span>

    <CloseIcon v-if="closeable" :class="[`${ns}__close`]" @click.stop="handleClose" />
  </div>
</template>
