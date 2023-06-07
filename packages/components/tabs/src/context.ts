import type { InjectionKey } from 'vue'
import { TabPaneData } from './types'

export interface TabsContext {
  destroyOnHide: boolean;
  activeKey: string | number;
  addPane: (id: number, data: TabPaneData) => void;
  removePane: (id: number) => void;
}

export const tabsInjectionKey: InjectionKey<TabsContext> = Symbol('tabs');
