<script lang="ts">
  import { computed, defineComponent, provide, reactive, toRefs, watch } from 'vue';
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config';
  import type { Arrayable } from '../../../utils/types';
  import { formContextKey } from './constants';

  import { formProps } from './form';
  import { filterFields } from './utils';

  import type { FormItemProp } from './form-item';
  import type {
    FormContext,
    FormItemContext,
    FormValidateCallback,
    FormValidateFailure,
    FormValidationResult,
  } from './types';

  export default defineComponent({
    name: getComponentNamespace('Form'),
    props: formProps,
    emits: ['validate'],
    setup(props, { emit }) {
      const ns = getNamespace('form');
      const cls = computed(() => [ns, `${ns}--${props.labelPosition}`]);

      const fields: FormItemContext[] = [];

      // 将form-item组件挂载的验证对象保存到form中，方便通过ref直接调用验证器
      const addField: FormContext['addField'] = (field) => {
        fields.push(field);
      };

      // 移除校验对象 在form-item组件销毁时调用
      const removeField: FormContext['removeField'] = (field) => {
        if (field.prop) {
          fields.splice(fields.indexOf(field), 1);
        }
      };

      // 重制表单验证对象
      const resetFields: FormContext['resetFields'] = (properties = []) => {
        if (!props.model) {
          console.error('请传入数据源，绑定到form上的model属性。');
          return;
        }
        filterFields(fields, properties).forEach((field) => field.resetField());
      };

      // 请空表单验证对象
      const clearValidate: FormContext['clearValidate'] = (props = []) => {
        filterFields(fields, props).forEach((field) => field.clearValidate());
      };

      const isValidatable = computed(() => {
        const hasModel = !!props.model;
        if (!hasModel) {
          console.log('model is required for validate to work.');
        }
        return hasModel;
      });

      // 通过props来筛选可以进行验证表单对象
      const obtainValidateFields = (props: Arrayable<FormItemProp>) => {
        if (fields.length === 0) return [];

        const filteredFields = filterFields(fields, props);
        if (!filteredFields.length) {
          console.error('请传入正确的校验属性，检查form上的rules对象和form-item上的prop属性');
          return [];
        }
        return filteredFields;
      };

      const doValidateField = async (props: Arrayable<FormItemProp>): Promise<boolean> => {
        if (!isValidatable.value) return false;

        const fields = obtainValidateFields(props);
        // 没有验证规则 直接通过验证
        if (fields.length === 0) return true;

        let validationErrors: any = {};
        for (const field of fields) {
          try {
            // 全部都需要验证 不指定trigger类型
            await field.validate('');
          } catch (fields) {
            // 合并所有的验证错误
            validationErrors = {
              ...validationErrors,
              ...(fields as any),
            };
          }
        }

        if (Object.keys(validationErrors).length === 0) return true;
        return Promise.reject(validationErrors);
      };

      const validateField: FormContext['validateField'] = async (modelProps = [], callback) => {
        try {
          const result = await doValidateField(modelProps);
          if (result === true) {
            callback?.(result);
          }
          return result;
        } catch (e) {
          // 验证失败
          if (e instanceof Error) throw e;
          callback?.(false, e);
          return false;
        }
      };

      // 验证器，可给外部提供这一方法，直接验证保存在fields中的验证对象
      const validate = async (callback?: FormValidateCallback): FormValidationResult =>
        validateField(undefined, callback);

      watch(
        () => props.rules,
        () => {
          if (props.validateOnRuleChange) {
            validate().catch((error: FormValidateFailure) => {
              console.log(error);
            });
          }
        },
        { deep: true },
      );

      const labelWidth = computed(() => {
        const labelWidth = props.labelWidth;
        return labelWidth;
      });

      provide(
        formContextKey,
        reactive({
          ...toRefs(props),
          emit,
          resetFields,
          clearValidate,
          validateField,
          addField,
          removeField,

          labelWidth,
        }),
      );

      return {
        cls,
        validate,
        resetFields,
        validateField,
        clearValidate,
      };
    },
    expose: ['validate', 'resetFields', 'validateField', 'clearValidate'],
  });
</script>

<template>
  <form :class="cls">
    <slot></slot>
  </form>
</template>
