import { VNode, computed, defineComponent, nextTick, onMounted, onUpdated, provide, reactive, ref, toRefs, watch } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import { tabsProps } from './tabs-props'
import { tabsInjectionKey } from './context'
import { isUndefined, isArray } from '../../../utils/is'
import { isComponent} from '../../../utils/vue-utils'
import { TabPaneData } from './types'


import TabNavs from './tab-navs'

export default defineComponent({
  name: getComponentNamespace('Tabs'),
  props: tabsProps,
  emits: ['update:activeKey', 'change'],
  setup(props, { slots, emit }) {
    const ns = getNamespace('tabs')
    const { destroyOnHide } = toRefs(props)

    const _activeKey = ref()

    const vnodes = {
      panes: [] as VNode[]
    }
    const panesMap = new Map()

    const paneComponents = ref<number[]>([])

    const getPaneComponents = () => {
      const _paneComponents: number[] = []
      const traverse = (vns: VNode[]) => {
        vns.forEach(vn => {
          if (isComponent(vn, vn.type) && vn.type.name === 'BnTabPane') {
            if (vn.component?.uid) {
              _paneComponents.push(vn.component.uid)
            }
          }
          if (isArray(vn.children) && vn.children.length) {
            traverse(vn.children as VNode[])
          }
        })
      }
      traverse(vnodes.panes)
      paneComponents.value = _paneComponents
    }

    const renderTabsNavsData = computed(() => {
      const tabPaneData: TabPaneData[] = [];
      paneComponents.value.forEach((id) => {
        const tab = panesMap.get(id);
        if (tab) tabPaneData.push(tab);
      });
      return tabPaneData;
    });

    const panesKeys = computed(() => renderTabsNavsData.value.map((item) => item.key))

    const computedActiveKey = computed(() => {
      const activeKey = props.activeKey ?? _activeKey.value;
      if (isUndefined(activeKey)) {
        return panesKeys.value[0];
      }
      return activeKey;
    });


    // 每个pane创建时保存TabPaneData
    const addPane = (uid: number, paneData: TabPaneData) => {
      panesMap.set(uid, paneData)
    }
    const removePane = (uid: number) => {
      panesMap.delete(uid)
    }

    const activeIndex = computed(() => {
      const index = panesKeys.value.indexOf(computedActiveKey.value);
      if (index === -1) {
        return 0;
      }
      return index;
    });

    const renderPanes = () => {
      return (
        <div class={[`${ns}__panes-viewport`]} v-show={!props.hidePanes}>
          <div class={[
            `${ns}__panes`,
            props.animation && `is-animation`,
          ]}
            style={{
              transform: `translate(-${activeIndex.value * 100}%, 0)`
            }}
          >
            {vnodes.panes}
          </div>
        </div>
      )
    }

    const renderNav = () => {
      const handleChangeActiveKey = (key: string | number) => {
        if (key !== computedActiveKey.value) {
          _activeKey.value = key;
          emit('update:activeKey', key);
          emit('change', key);
        }

      }

      return (
         <TabNavs
         tabs={renderTabsNavsData.value}
         type={props.type}
         activeKey={computedActiveKey.value}
         changeActiveKey={handleChangeActiveKey}
         animation={props.animation}
       />
      )
    }

    watch(() => props.type, () => {
      getPaneComponents()
    })

    onMounted(() => {
      getPaneComponents()
    })

    watch(() => slots.default?.(), () => {
      // NOTE 应该让pane先注册 然后在获取tabs
      nextTick(() => {
        getPaneComponents()
      })
    })


    provide(tabsInjectionKey, reactive({
      destroyOnHide: destroyOnHide,
      activeKey: computedActiveKey,
      addPane,
      removePane
    }))

    return () => {
      vnodes.panes = slots.default?.() || []

      return (
        <div class={[ns]}>
          {renderNav()}
          {renderPanes()}
        </div>
      )
    }
  }
})