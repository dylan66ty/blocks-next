import type { bnOptions } from './types'
const COMPONENT_PREFIX = 'bn'

export const getComponentPrefix = (options?: bnOptions) => {
  return options?.componentPrefix ?? COMPONENT_PREFIX;
}

export const getNamespaced = (name?: string): string => {
  return name ? COMPONENT_PREFIX + '-' + name : (name || '')
};

