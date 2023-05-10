<template>
  <div :class="['bn-form',title?'bn-form-hasheader':'']">
      <div class="bn-form-header" v-if="title">{{title}}</div>
      <f-grid padding="0" :sm="sm" :md="md" :lg="lg" :xl="xl"><slot></slot></f-grid>
      <div class="bn-form-action" v-if="$slots.action">
          <slot name="action"></slot>
      </div>
  </div>
  </template>
  <script lang="ts">
  import { provide , defineComponent} from 'vue'
  import FGrid from '../../grid/src/grid.vue'

  export default defineComponent({
    name: 'Form',
    components: {
      FGrid
    },
    props: {
      title:String,
      sm:{type:Number,default:1},
      md:{type:Number,default:2},
      lg:{type:Number,default:2},
      xl:{type:Number,default:3},
    },
    setup() {
      provide('validator',null)
      return {}
    }
  })
  
  </script>