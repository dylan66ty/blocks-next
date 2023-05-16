import { cloneVNode } from 'vue';
import type { VNodeTypes, VNode, PropType, Component, Slots } from 'vue';
import type { SFCWithInstall, Data } from './types';
import { isArray, isFunction } from './is';

export enum ShapeFlags {
  ELEMENT = 1,
  FUNCTIONAL_COMPONENT = 1 << 1,
  STATEFUL_COMPONENT = 1 << 2,
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT,
  TEXT_CHILDREN = 1 << 3,
  ARRAY_CHILDREN = 1 << 4,
  SLOTS_CHILDREN = 1 << 5,
  TELEPORT = 1 << 6,
  SUSPENSE = 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  COMPONENT_KEPT_ALIVE = 1 << 9,
}

export const isElement = (vn: VNode) => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.ELEMENT);
};

export const isComponent = (vn: VNode, type?: VNodeTypes): type is Component => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.COMPONENT);
};

export const isNamedComponent = (child: VNode, name: string) => {
  return isComponent(child, child.type) && child.type.name === name;
};

export const isTextChildren = (child: VNode, children: VNode['children']): children is string => {
  return Boolean(child && child.shapeFlag & 8);
};

export const isArrayChildren = (vn: VNode, children: VNode['children']): children is VNode[] => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.ARRAY_CHILDREN);
};

export const isSlotsChildren = (vn: VNode, children: VNode['children']): children is Slots => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.SLOTS_CHILDREN);
};

export const getFirstComponent = (children: VNode[] | undefined): VNode | undefined => {
  if (!children) {
    return undefined;
  }

  for (const child of children) {
    if (isElement(child) || isComponent(child)) {
      return child;
    }
    if (isArrayChildren(child, child.children)) {
      const result = getFirstComponent(child.children);
      if (result) return result;
    } else if (isSlotsChildren(child, child.children)) {
      const children = child.children.default?.();
      if (children) {
        const result = getFirstComponent(children);
        if (result) return result;
      }
    } else if (isArray(child)) {
      const result = getFirstComponent(child);
      if (result) return result;
    }
  }

  return undefined;
};

export const getAllElements = (children: VNode[] | undefined, includeText = false) => {
  const results: VNode[] = [];
  for (const item of children ?? []) {
    if (
      isElement(item) ||
      isComponent(item) ||
      (includeText && isTextChildren(item, item.children))
    ) {
      results.push(item);
    } else if (isArrayChildren(item, item.children)) {
      results.push(...getAllElements(item.children, includeText));
    } else if (isSlotsChildren(item, item.children)) {
      results.push(...getAllElements(item.children.default?.(), includeText));
    } else if (isArray(item)) {
      results.push(...getAllElements(item, includeText));
    }
  }
  return results;
};

export const getChildrenArray = (vn: VNode): VNode[] | undefined => {
  if (isArrayChildren(vn, vn.children)) {
    return vn.children;
  }
  if (isArray(vn)) {
    return vn;
  }
  return undefined;
};

export const getFirstElementFromVNode = (vn: VNode): HTMLElement | undefined => {
  if (isElement(vn)) {
    return vn.el as HTMLElement;
  }
  if (isComponent(vn)) {
    if ((vn.el as Node)?.nodeType === 1) {
      return vn.el as HTMLElement;
    }
    if (vn.component?.subTree) {
      const ele = getFirstElementFromVNode(vn.component.subTree);
      if (ele) return ele;
    }
  } else {
    const children = getChildrenArray(vn);
    return getFirstElementFromChildren(children);
  }
  return undefined;
};

export const getFirstElementFromChildren = (
  children: VNode[] | undefined,
): HTMLElement | undefined => {
  if (children && children.length > 0) {
    for (const child of children) {
      const element = getFirstElementFromVNode(child);
      if (element) return element;
    }
  }
  return undefined;
};

export const mergeFirstChild = (
  children: VNode[] | undefined,
  extraProps: Data | ((vn: VNode) => Data),
): boolean => {
  if (children && children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (isElement(child) || isComponent(child)) {
        const props = isFunction(extraProps) ? extraProps(child) : extraProps;
        children[i] = cloneVNode(child, props, true);
        return true;
      }
      const _children = getChildrenArray(child);
      if (_children && _children.length > 0) {
        const result = mergeFirstChild(_children, extraProps);
        if (result) return true;
      }
    }
  }
  return false;
};

export const getFirstElement = (vn: VNode | VNode[]): HTMLElement | null => {
  if (isArray(vn)) {
    for (const child of vn) {
      const result = getFirstElement(child);
      if (result) return result;
    }
  } else if (isElement(vn)) {
    return vn.el as HTMLElement;
  } else if (isComponent(vn)) {
    if ((vn.el as Node).nodeType === 1) {
      return vn.el as HTMLElement;
    }
    if (vn.component) {
      const result = getFirstElement(vn.component.subTree);
      if (result) return result;
    }
  } else if (isArrayChildren(vn, vn.children)) {
    for (const child of vn.children) {
      const result = getFirstElement(child);
      if (result) return result;
    }
  }
  return null;
};

export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
  (main as SFCWithInstall<T>).install = (app): void => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp);
    }
  };

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      (main as any)[key] = comp;
    }
  }
  return main as SFCWithInstall<T> & E;
};

export const definePropType = <T>(val: any): PropType<T> => val;
