const COMPONENT_PREFIX = 'Bn'
const NAMESPACE_PREFIX = 'bn'

export const COMPONENT_INSTALLED_KEY = Symbol('COMPONENT_INSTALLED_KEY')

export const getNamespace = (name?: string): string => {
  return name ? NAMESPACE_PREFIX + '-' + name : name || ''
}

export const getComponentNamespace = (name: string): string => {
  return COMPONENT_PREFIX + name
}
