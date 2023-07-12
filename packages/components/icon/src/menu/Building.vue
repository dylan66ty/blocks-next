<script lang="ts">
  import { defineComponent } from 'vue'
  import IconComponent from '../icon-component.vue'
  import { iconProps } from '../icon-props'
  export default defineComponent({
    name: 'AppBuilding',
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
      <title>生产中心</title>
      <g id="图标" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="图标1" transform="translate(-859.000000, -203.000000)" fill="#242934">
          <g id="一级-生产中心" transform="translate(837.000000, 189.000000)">
            <g id="生产中心" transform="translate(22.000000, 14.000000)">
              <path
                id="形状结合"
                d="M3,20.8995854 L21,20.8995854 L21,18.9356991 L3,18.9356991 L3,20.8995854 Z M16.3628716,17.4776117 L14.3734548,17.4776117 L12.3398505,5.06388631 L7.72668158,5.06388631 L5.86688124,17.4776117 L3.88237412,17.4776117 L6.03479352,3.1 L14.0081719,3.1 L14.763,7.712 L18.5187278,7.71257978 L20.1183132,17.4780045 L18.1288964,17.4780045 L16.8504064,9.6764661 L15.085,9.676 L16.3628716,17.4776117 Z M12.0751187,14.5159729 L12.0751187,16.4798593 L7.86061862,16.4798593 L7.86061862,14.5159729 L12.0751187,14.5159729 Z M11.7461677,11.3511701 L11.7461677,13.3150565 L8.18956958,13.3150565 L8.18956958,11.3511701 L11.7461677,11.3511701 Z M11.2993836,8.1873493 L11.2993836,10.1512356 L8.63733566,10.1512356 L8.63733566,8.1873493 L11.2993836,8.1873493 Z"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </IconComponent>
</template>
