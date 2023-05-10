import _Form from './src/form.vue'
import _FormLabel from './src/filed.vue'

import type { App } from 'vue'
import { getComponentPrefix } from '../../utils/global-config'


const Form = {
  ..._Form,
  install: (app: App): void => {
    const componentPrefix = getComponentPrefix()
    app.component(componentPrefix + _Form.name, _Form)
  }
}


const FormLabel = {
  ..._FormLabel,
  install: (app: App): void => {
    const componentPrefix = getComponentPrefix()
    app.component(componentPrefix + _FormLabel.name, _FormLabel)
  }
}


export type FormInstance = InstanceType<typeof _Form>
export type FromLabelInstance = InstanceType<typeof _FormLabel>

export {
  Form,
  FormLabel
}