<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppCustomer',
    props: {
      size: {
        type: [Number, String],
        default: undefined
      },
      rotate: {
        type: Number,
        default: undefined
      },
      spin: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: undefined
      }
    },
    setup(props) {
      const ns = getNamespace('icon')

      const styles = computed(() => {
        const styles: StyleValue = {}
        if (props.size) {
          styles.fontSize = addUnit(props.size)
        }

        if (props.rotate) {
          styles.transform = `rotate(${props.rotate}deg)`
        }

        if (props.color) {
          styles.color = props.color
        }
        return styles
      })

      const cls = computed(() => [
        ns,
        {
          [`${ns}-loading`]: props.spin
        }
      ])

      return {
        cls,
        styles
      }
    }
  })
</script>

<template>
  <i :class="cls" :style="styles">
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <title>客户管理</title>
      <g id="图标" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g
          id="图标1"
          transform="translate(-460.000000, -203.000000)"
          stroke="#242934"
          stroke-width="2"
        >
          <g id="一级-客户管理" transform="translate(438.000000, 189.000000)">
            <g id="客户管理" transform="translate(22.000000, 14.000000)">
              <circle id="椭圆形" cx="10.5" cy="8.5" r="3.5"></circle>
              <path
                id="路径"
                d="M4,21 L4,18 C4,16.3431458 5.34314575,15 7,15 L14,15 C15.6568542,15 17,16.3431458 17,18 L17,21"
              ></path>
              <path
                id="路径"
                d="M15.5,12 C17.4329966,12 19,10.4329966 19,8.5 C19,6.56700338 17.4329966,5 15.5,5"
              ></path>
              <path
                id="路径"
                d="M18.0069596,15 C18.7847374,15 19.1157509,15 19,15 C20.6568542,15 22,16.3431458 22,18 L22,21"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
