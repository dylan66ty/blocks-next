<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppMinus',
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
      width="23px"
      height="22px"
      viewBox="0 0 23 22"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <title>删除条件 2</title>
      <g id="抓潜拓客" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g
          id="条件查询-已设置过行业信息"
          transform="translate(-1134.000000, -1068.000000)"
          stroke="#0056FF"
        >
          <g id="编组-2" transform="translate(471.000000, 945.000000)">
            <g id="删除条件-2" transform="translate(664.000000, 123.000000)">
              <g id="编组-8" transform="translate(1.000000, 1.000000)">
                <circle id="椭圆形" cx="10" cy="10" r="9.5"></circle>
                <line
                  id="路径-8"
                  x1="10.000351"
                  y1="6"
                  x2="10.000351"
                  y2="14"
                  transform="translate(10.000351, 10.000000) rotate(-90.000000) translate(-10.000351, -10.000000) "
                ></line>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
