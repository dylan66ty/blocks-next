import type { VNode } from 'vue'
import { computed, defineComponent, provide, reactive, ref, toRefs } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import { isUndefined } from '../../../utils/is'
import { getAllElements, isComponent } from '../../../utils/vue-utils'
import { tabsProps } from './props'
import { tabsInjectionKey } from './context'
import type { TabPaneData } from './types'
import TabNavs from './tab-navs'

export default defineComponent({
  name: getComponentNamespace('Tabs'),
  props: tabsProps,
  emits: ['update:activeKey', 'change'],
  setup(props, { slots, emit }) {
    const ns = getNamespace('tabs')
    const { destroyOnHide } = toRefs(props)

    const _activeKey = ref()
    const panesMap = ref<Map<number, any>>(new Map())

    const renderTabsNavsData = computed(() => {
      return Array.from(panesMap.value.values())
    })

    const panesKeys = computed(() => renderTabsNavsData.value.map((item) => item.key))

    const computedActiveKey = computed(() => {
      const activeKey = props.activeKey ?? _activeKey.value
      if (isUndefined(activeKey)) {
        return panesKeys.value[0]
      }
      return activeKey
    })

    // 每个pane创建时保存TabPaneData
    const addPane = (uid: number, paneData: TabPaneData) => {
      panesMap.value.set(uid, paneData)
    }
    const removePane = (uid: number) => {
      panesMap.value.delete(uid)
    }

    const activeIndex = computed(() => {
      const index = panesKeys.value.indexOf(computedActiveKey.value)
      if (index === -1) {
        return 0
      }
      return index
    })

    const renderPanes = (children: VNode[]) => {
      return (
        <div class={[`${ns}__panes-viewport`]} v-show={!props.hidePanes}>
          <div
            class={[`${ns}__panes`, props.animation && `is-animation`]}
            style={{
              transform: `translate(-${activeIndex.value * 100}%, 0)`
            }}
          >
            {children}
          </div>
        </div>
      )
    }

    const renderNav = () => {
      const handleChangeActiveKey = (key: string | number) => {
        if (key !== computedActiveKey.value) {
          _activeKey.value = key
          emit('update:activeKey', key)
          emit('change', key)
        }
      }
      if (slots.extra) {
        return (
          <div class={[`${ns}__extra-wrapper`]}>
            <TabNavs
              tabs={renderTabsNavsData.value}
              type={props.type}
              size={props.size}
              activeKey={computedActiveKey.value}
              changeActiveKey={handleChangeActiveKey}
              animation={props.animation}
            />
            {slots.extra && <div class={[`${ns}__extra`]}>{slots.extra()}</div>}
          </div>
        )
      }

      return (
        <TabNavs
          tabs={renderTabsNavsData.value}
          type={props.type}
          size={props.size}
          activeKey={computedActiveKey.value}
          changeActiveKey={handleChangeActiveKey}
          animation={props.animation}
        />
      )
    }

    provide(
      tabsInjectionKey,
      reactive({
        destroyOnHide: destroyOnHide,
        activeKey: computedActiveKey,
        addPane,
        removePane
      })
    )

    return () => {
      const paneChildren = getAllElements(slots.default?.()).filter(
        (vn) => isComponent(vn, vn.type) && vn.type.name === 'BnTabPane'
      )
      return (
        <div class={[ns]}>
          {renderNav()}
          {renderPanes(paneChildren)}
        </div>
      )
    }
  }
})
