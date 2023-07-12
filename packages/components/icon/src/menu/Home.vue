<script lang="ts">
  import { defineComponent } from 'vue'
  import IconComponent from '../icon-component.vue'
  import { iconProps } from '../icon-props'
  export default defineComponent({
    name: 'AppHome',
    components: {
      IconComponent
    },
    inheritAttrs: false,
    props: iconProps
  })
</script>

<template>
  <IconComponent v-bind="{ ...$props, ...$attrs }">
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <title>首页</title>
      <g id="图标" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="图标1" transform="translate(-194.000000, -203.000000)">
          <g id="一级-首页" transform="translate(172.000000, 189.000000)">
            <g id="首页" transform="translate(22.000000, 14.000000)">
              <path
                id="矩形"
                d="M13.1469247,3.80284728 L20.1469247,8.70284728 C20.681578,9.07710463 21,9.68868353 21,10.3413111 L21,19 C21,20.1045695 20.1045695,21 19,21 L5,21 C3.8954305,21 3,20.1045695 3,19 L3,10.3413111 C3,9.68868353 3.31842196,9.07710463 3.85307531,8.70284728 L10.8530753,3.80284728 C11.5417156,3.32079907 12.4582844,3.32079907 13.1469247,3.80284728 Z M19,10.3413111 L12,5.44131112 L5,10.3413111 L5,19 L19,19 L19,10.3413111 Z"
                fill="#242934"
                fill-rule="nonzero"
              ></path>
              <rect id="矩形" fill="#212325" x="11" y="15" width="2" height="3"></rect>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </IconComponent>
</template>
