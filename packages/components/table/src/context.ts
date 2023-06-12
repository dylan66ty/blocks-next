import type { InjectionKey, Slots } from 'vue';
import type { TableColumnData, TableData } from './types';

export interface TableContext {
  slots?: Slots;

  scroll?: {
    horScrollPosition?: 'left' | 'right' | 'middle';
  };

  sortStore?: {
    activeSort?: 'ascend' | 'descend' | '';
    activeProp?: string | number;
    isSortPopup?: boolean;
    handleSortChange?: (column: TableColumnData, direction?: 'ascend' | 'descend' | '') => void;
  };
  // checkbox 全选 半选
  opsStore?: {
    selectionRows?: TableData[];
    allEnabledSelectionRows?: TableData[];
    toggleSelectAll?: (v: boolean) => void;
    toggleSelect?: (row: TableData, v: boolean) => void;
  };
  // column resize width
  resizeStore?: {
    handleThMouseDown?: (prop: string, ev: MouseEvent) => void;
    prop?: string | number;
  };
}

export interface TableColumnContext {
  addChild?: (id: number, column: TableColumnData) => void;
  removeChild?: (id: number) => void;
  groupColumns?: TableColumnData[];
  handleUpdateColumn?: (v: string[]) => void;
}

export const tableInjectionKey: InjectionKey<TableContext> = Symbol('table');

export const tableColumnInjectionKey: InjectionKey<TableColumnContext> = Symbol('tableColumn');
