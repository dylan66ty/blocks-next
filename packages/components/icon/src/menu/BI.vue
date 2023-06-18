<script lang="ts">
  import { defineComponent } from 'vue'
  import IconComponent from '../icon-component.vue'
  import { iconProps } from '../icon-props'
  export default defineComponent({
    name: 'AppBi',
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
      <title>BI分析中心</title>
      <g id="图标" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="图标1" transform="translate(-1267.000000, -203.000000)">
          <g id="一级-BI分析中心" transform="translate(1245.000000, 189.000000)">
            <g id="BI分析中心" transform="translate(22.000000, 14.000000)">
              <path
                id="形状结合"
                d="M18.444301,3.1 C19.8560372,3.1 21,4.24447927 21,5.65670913 L21,14.9198552 C21,16.3305698 19.8555323,17.4755542 18.444301,17.4755542 L5.55670913,17.4755542 C4.14548954,17.4755542 3,16.3305813 3,14.9198552 L3,5.65670913 C3,4.24446777 4.14498423,3.1 5.55670913,3.1 Z M18.444301,5.12031539 L5.55670913,5.12031539 C5.26056962,5.12031539 5.02031539,5.36046125 5.02031539,5.65670913 L5.02031539,14.9198552 C5.02031539,15.2145879 5.26107493,15.4552388 5.55670913,15.4552388 L7.415,15.455 L7.41590437,10.7960884 L9.43621977,10.7960884 L9.436,15.455 L10.99,15.455 L10.9904484,8.22624726 L13.0107638,8.22624726 L13.01,15.455 L14.564,15.455 L14.5649924,12.3517313 L16.5853078,12.3517313 L16.585,15.455 L18.444301,15.4552388 C18.710015,15.4552388 18.9311045,15.2606328 18.9726653,15.0065624 L18.9796846,14.9198552 L18.9796846,5.65670913 C18.9796846,5.36006457 18.7400436,5.12031539 18.444301,5.12031539 Z M17.7722431,18.8743195 L17.7722431,20.8946349 L6.22917111,20.8946349 L6.22917111,18.8743195 L17.7722431,18.8743195 Z"
                fill="#272636"
                fill-rule="nonzero"
              ></path>
              <g id="编组" transform="translate(3.000000, 3.100000)"></g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </IconComponent>
</template>
