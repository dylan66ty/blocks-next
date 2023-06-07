<template>
  <div :class="cls">
    <slot v-if="mounted"></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, inject,reactive, toRefs ,onBeforeUnmount, watch, ref, nextTick } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import { tabsInjectionKey } from './context'
import { isUndefined } from '../../../utils/is';

export default defineComponent({
  name: getComponentNamespace('TabPane'),
  props: {
    disabled: {
      type:Boolean,
      default: false
    },
    title: {
      type:String,
      default: ''
    },
    destroyOnHide: {
      type:Boolean,
      default:undefined
    }
  },
  setup(props, {slots}) {
    const { title, disabled } = toRefs(props);
    const ns = getNamespace('tabs')
    const instance = getCurrentInstance()
    const key = computed(() => instance?.vnode.key as string | number)

    const tabsContext = inject(tabsInjectionKey)
  
    const isActive = computed(() => tabsContext?.activeKey === key.value)

    const mergeDestroyOnHide = computed(() => {
      if(!isUndefined(props.destroyOnHide)) return props.destroyOnHide
      if(!isUndefined(tabsContext?.destroyOnHide)) return tabsContext?.destroyOnHide
      return false
    })

    const mounted = ref(!mergeDestroyOnHide.value)
    
    const data = reactive({
      key,
      title,
      disabled,
      paneSlots: slots
    });

    if (instance?.uid) {
      tabsContext?.addPane(instance.uid, data);
    }
    
    onBeforeUnmount(() => {
      if (instance?.uid) {
        tabsContext?.removePane?.(instance.uid);
      }
    });

    const cls = computed(() => {
      return [
      `${ns}__pane`,
       isActive.value && `is-active`
      ]
    })


    watch(isActive, (active) => {
      if (active) {
        if (!mounted.value) {
          mounted.value = true;
        }
      } else if (props.destroyOnHide || tabsContext?.destroyOnHide) {
        mounted.value = false;
      }
    });
    

    return {
      cls,
      ns,
      isActive,
      mounted
    }
  }
})
</script>