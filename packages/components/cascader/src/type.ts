import type { RenderFunction } from 'vue'
export interface CascaderData {
  value?: string | number | Record<string, any>;
  label?: string;
  render?: RenderFunction;
  disabled?: boolean;
  children?: CascaderData[];
  isLeaf?: boolean;
  [other: string]: any;
}

export interface CascaderNode {
  key: string;
  parent?: CascaderNode | null;
  raw: CascaderData;

  label?: string;
  value?: string | number | Record<string, any>;
  render?: RenderFunction;
  isLeaf?: boolean;
  disabled?:boolean

  checked?: boolean;
  indeterminate?: boolean;
  checkValues?: [],
  enabledNodes?: CascaderNode[],

  level: number;
  index: number;
  pathNodes: CascaderNode[];
  pathValue?: any[],
  pathLabel?: string[],

  children?: CascaderNode[];
  hasChildren?: boolean
}

