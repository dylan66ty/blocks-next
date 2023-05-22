<script lang="ts">
  import { defineComponent, computed, ref, shallowRef, nextTick, onMounted, watch } from 'vue';
  import { getNamespace, getComponentNamespace } from '../../../utils/global-config';
  import { isClient } from '../../../utils/browser';
  import { isObject } from '../../../utils/is';
  import { throttle } from '../../../utils/throttle-debounce';
  import { NOOP } from '../../../shared/utils';
  import EyeOpen from '../../icon/src/base/eye-open.vue'
  import EyeClose from '../../icon/src/base/eye-close.vue'


  import { useFormItem } from '../../form/src/hooks/use-form-item';
  import { inputProps } from './input';
  import { calcTextareaHeight } from './utils';

  type TargetElement = HTMLInputElement | HTMLTextAreaElement;

  export default defineComponent({
    name: getComponentNamespace('Input'),
    components: {
      EyeOpen,
      EyeClose,
    },
    props: inputProps,
    emits: ['update:modelValue', 'input', 'change', 'focus', 'blur', 'clear'],
    setup(props, { emit, slots }) {
      const ns = getNamespace('input');
      const mergeDisable = computed(() => props.disabled)
      const cls = computed(() => [
        ns,
        mergeDisable.value && 'is-disabled',
        props.error && 'is-error',
        props.size && `${ns}--${props.size}`,
        props.prefixIcon && `${ns}--prefix`,
        props.suffixIcon && `${ns}--suffix`,
        isHover.value && 'is-hover',
        isFocus.value && 'is-focus'
        
      ]);
      const eyeStatus = ref(false);
      const isHover = ref(false);
      const isFocus = ref(false);
      
      const inputType = computed(() => {
        if (props.showPassword) {
          return eyeStatus.value ? 'text' : 'password';
        }
        return props.type;
      });
      const handleEye = () => {
        eyeStatus.value = !eyeStatus.value;
        nextTick(() => {
          inputRef.value?.focus()
        })
      };
      const inputRef = shallowRef<HTMLInputElement>();

      const { formItem } = useFormItem();

      // icon show
      const hasPrefixIcon = computed(() => {
        return props.prefixIcon || slots['prefix-icon'];
      });
      const hasSuffixIcon = computed(() => {
        return props.suffixIcon || slots['suffix-icon'];
      });
      const hasClearableIcon = computed(() => {
        return props.clearable && isHover.value && !!props.modelValue
      })

      // event
      const inputEvt = (e: Event) => {
        let { value } = e.target as TargetElement;

        // 过滤器
        if (props.formatter) {
          value = props.formatter(value);
        }

        emit('update:modelValue', value);
        emit('input', value);
      };

      const handleInput = props.throttle ? throttle(inputEvt, +props.throttle) : inputEvt;

      const handleChange = (event: Event) => {
        emit('change', (event.target as TargetElement).value);
      };

      const handleFocus = (event: Event) => {
        isFocus.value = true
        emit('focus', event);
      };

      const handleBlur = (event: Event) => {
        isFocus.value = false
        emit('blur', event);
        if (props.validateEvent) {
          formItem?.validate?.('blur').catch(NOOP);
        }
        
      };

      const handleMouseEnter = () => {
        isHover.value = true
      }

      const handleMouseLeave = () => {
        isHover.value = false
      }

      // 清空
      const handleClear = () => {
        emit('update:modelValue','')
        emit('clear', '')
        nextTick(() => {
          inputRef.value?.focus()
        })
      }

      // textarea
      const textareaRef = shallowRef<HTMLTextAreaElement>();
      const textareaCalcStyle = shallowRef({});
      const textareaStyle = computed(() => [textareaCalcStyle.value, { resize: props.resize }]);

      const resizeTextarea = () => {
        const { type, autosize } = props;

        if (!isClient || type !== 'textarea' || !textareaRef.value) return;

        if (autosize) {
          const minRows = isObject(autosize) ? autosize.minRows : undefined;
          const maxRows = isObject(autosize) ? autosize.maxRows : undefined;
          const textareaStyle = calcTextareaHeight(textareaRef.value, minRows, maxRows);
          textareaCalcStyle.value = {
            overflowY: 'hidden',
            ...textareaStyle,
          };
          nextTick(() => {
            textareaRef.value!.offsetHeight;
            textareaCalcStyle.value = textareaStyle;
          });
        } else {
          textareaCalcStyle.value = {
            minHeight: calcTextareaHeight(textareaRef.value).minHeight,
          };
        }
      };

      onMounted(() => {
        // 完全获取dom
        nextTick(resizeTextarea);
      });

      watch(
        () => props.type,
        async () => {
          await nextTick();
          resizeTextarea();
        },
      );

      watch(
        () => props.modelValue,
        () => {
          nextTick(() => resizeTextarea());

          if (props.validateEvent) {
            formItem?.validate?.('change').catch(NOOP);
          }
        },
      );

      return {
        eyeStatus,
        cls,
        ns,
        inputType,
        inputRef,
        handleEye,
        textareaStyle,
        textareaRef,
        mergeDisable,
        // event
        handleInput,
        handleChange,
        handleFocus,
        handleBlur,
        hasPrefixIcon,
        hasSuffixIcon,
        handleClear,
        hasClearableIcon,
        handleMouseEnter,
        handleMouseLeave
      };
    },
  });
</script>

<template>
  <div :class="cls" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <span v-if="hasPrefixIcon" :class="[`${ns}__prefix ${ns}__icon`]">
        <slot name="prefix-icon">
          <component :is="prefixIcon"></component>
        </slot>
      </span>

      <input
        ref="inputRef"
        :class="[`${ns}__inner`]"
        v-bind="$attrs"
        :placeholder="placeholder"
        :disabled="mergeDisable"
        :type="inputType"
        :value="modelValue"
        :readonly="readonly"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <span v-if="hasSuffixIcon && !showPassword && !hasClearableIcon" :class="[`${ns}__suffix ${ns}__icon`]">
        <slot name="suffix-icon">
          <component :is="suffixIcon"></component>
        </slot>
      </span>

      <template v-if="showPassword">
        <span :class="[`${ns}__suffix ${ns}__icon ${ns}__eye`]" @click.stop="handleEye">
          <EyeOpen v-if="!eyeStatus" />
          <EyeClose v-else />
        </span>
      </template>

      <template v-if="hasClearableIcon">
        <span :class="[`${ns}__suffix ${ns}__icon`]" @click.stop="handleClear">
          <span :class="[`${ns}__clearable`]"></span>
        </span>
      </template>

      
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        ref="textareaRef"
        class="bn-textarea__inner"
        v-bind="$attrs"
        :disabled="mergeDisable"
        :style="textareaStyle"
        :placeholder="placeholder"
        :value="modelValue"
        :readonly="readonly"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>
  </div>
</template>
