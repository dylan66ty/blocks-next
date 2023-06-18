<script lang="ts">
  import { defineComponent } from 'vue'
  import IconComponent from '../icon-component.vue'
  import { iconProps } from '../icon-props'
  export default defineComponent({
    name: 'AppPie',
    components: {
      IconComponent
    },
    inheritAttrs: false,
    props: iconProps
  })
</script>

<template>
  <IconComponent v-bind="{ ...$props, ...$attrs }">
    <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>营销中心</title>
      <g id="图标" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="图标1" transform="translate(-593.000000, -203.000000)" fill="#242934">
          <g id="一级-营销中心" transform="translate(571.000000, 189.000000)">
            <g id="营销中心" transform="translate(22.000000, 14.000000)">
              <g id="编组-3" transform="translate(3.000000, 3.000000)">
                <path
                  id="路径"
                  d="M9,0 C13.9705627,0 18,4.02943725 18,9 C18,13.9705627 13.9705627,18 9,18 C4.02943725,18 0,13.9705627 0,9 C0,4.02943725 4.02943725,0 9,0 Z M9,2 C5.13400675,2 2,5.13400675 2,9 C2,12.8659932 5.13400675,16 9,16 C12.8659932,16 16,12.8659932 16,9 C16,5.13400675 12.8659932,2 9,2 Z"
                  fill-rule="nonzero"
                ></path>
                <rect id="矩形" x="8" y="8" width="9" height="2"></rect>
                <polygon
                  id="矩形"
                  transform="translate(9.000000, 4.584926) scale(-1, 1) translate(-9.000000, -4.584926) "
                  points="8 0.169851496 10 0.169851496 10 9 8 9"
                ></polygon>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg> </IconComponent
></template>
