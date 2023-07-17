<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppTodo',
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
      <title>钉住</title>
      <g id="CRM" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="线索管理-拨打电话" transform="translate(-1689.000000, -631.000000)" fill="#9CA6B9">
          <g id="编组-21" transform="translate(1316.000000, 615.000000)">
            <g id="编组-33" transform="translate(340.000000, 0.000000)">
              <g id="钉住" transform="translate(33.000000, 16.000000)">
                <g id="编组-35" transform="translate(3.000000, 3.000000)">
                  <path
                    id="形状结合"
                    d="M14,4.08562073e-14 C15.1045695,4.06533012e-14 16,0.8954305 16,2 L16.000576,7.49840358 C15.2308293,7.17731659 14.3861219,7 13.5,7 C9.91014913,7 7,9.91014913 7,13.5 C7,15.2469007 7.68912635,16.8328473 8.81035876,18.0008195 L2,18 C0.8954305,18 -6.94420253e-13,17.1045695 -6.94555524e-13,16 L-6.94555524e-13,2 C-6.94690795e-13,0.8954305 0.8954305,4.10591134e-14 2,4.08562073e-14 L14,4.08562073e-14 Z M6,6 L2,6 L2,7.5 L6,7.5 L6,6 Z M8,3 L2,3 L2,4.5 L8,4.5 L8,3 Z"
                  ></path>
                  <path
                    id="形状结合"
                    d="M13.5,8 C16.5375661,8 19,10.4624339 19,13.5 C19,16.5375661 16.5375661,19 13.5,19 C10.4624339,19 8,16.5375661 8,13.5 C8,10.4624339 10.4624339,8 13.5,8 Z M14.25,11.0001995 L12.75,11.0001995 L12.75,15.0077747 L15.721457,16.1963575 L16.278543,14.8036425 L14.25,13.992 L14.25,11.0001995 Z"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
