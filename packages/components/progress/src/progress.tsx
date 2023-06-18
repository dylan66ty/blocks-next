import { computed, defineComponent } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'

import ProgressLine from './line.vue'
import ProgressCircle from './circle.vue'

import { progressProps } from './props'

export default defineComponent({
  name: getComponentNamespace('Progress'),
  props: progressProps,
  setup(props, { slots }) {
    const ns = getNamespace('progress')
    const cls = computed(() => [ns])

    const computedPercent = computed(() => {
      let percent = Number((props.percent * 100).toFixed(2))
      if (percent <= 0) percent = 0
      if (percent >= 100) percent = 100
      return percent
    })

    const renderContent = () => {
      if (props.type === 'line') {
        return (
          <ProgressLine
            v-slots={{
              text: slots.text
            }}
            percent={computedPercent.value}
            animation={props.animation}
            size={props.size}
            strokeWidth={props.strokeWidth}
            width={props.width}
            color={props.color}
            trackColor={props.trackColor}
            status={props.status}
            showText={props.showText}
            formatText={props.formatText}
          />
        )
      }

      if (props.type === 'circle') {
        return (
          <ProgressCircle
            v-slots={{
              text: slots.text
            }}
            percent={computedPercent.value}
            size={props.size}
            strokeWidth={props.strokeWidth}
            width={props.width}
            color={props.color}
            trackColor={props.trackColor}
            status={props.status}
            showText={props.showText}
            formatText={props.formatText}
          />
        )
      }

      return '无效的progress类型'
    }

    return () => {
      return <div class={cls.value}>{renderContent()}</div>
    }
  }
})
