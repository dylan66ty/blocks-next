import type { Arrayable } from '../../../utils/types'
import type { FormItemContext } from './types'
import type { FormItemProp } from './form-item'

export const filterFields = (fields: FormItemContext[], props: Arrayable<FormItemProp>) => {
  return props.length > 0 ? fields.filter((field) => field.prop && props.includes(field.prop as any)) : fields
}
