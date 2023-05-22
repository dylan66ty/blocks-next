<script lang="ts">
import { computed, defineComponent, ref, provide, reactive, watch, onMounted, nextTick } from 'vue';
import { getComponentNamespace, getNamespace } from '../../../utils/global-config';

import Trigger from '../../trigger/src/trigger';
import Input from '../../input/src/input.vue';

import CaretIcon from '../../icon/src/base/caret.vue';
import LoadingIcon from '../../icon/src/base/loading.vue';

import { isNumber } from '../../../utils/is';

import Scrollbar from '../../scrollbar/src/scrollbar.vue';

// 表单
import { useFormItem } from '../../form/src/hooks/use-form-item';
import { NOOP } from '../../../shared/utils';
import Options from './options';
import Menu from './menu.vue';
import type { SelectContext, SelectOptionProxy, ValueKey } from './types';
import { selectKey } from './constant';
import { selectProps } from './select';

export default defineComponent({
  name: getComponentNamespace('Select'),
  components: {
    Trigger,
    Input,
    CaretIcon,
    Menu,
    Options,
    Scrollbar,
    LoadingIcon,
  },
  props: selectProps,
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const ns = getNamespace('select');
    const cls = computed(() => [ns, mergeDisabled.value && 'is-disabled']);

    const states = reactive({
      // popover状态
      popupVisible: false,
      options: new Map(),
      cachedOptions: new Map(),
      // 多选todo
      selected: props.multiple ? [] : ({} as any),
      optionsCount: 0,
      // 单选选中的label
      selectedLabel: '',
      hoverIndex: -1,
      filteredOptionsCount: 0,
    });

    const scrollbarRef = ref<HTMLElement>();
    const inputRef = ref<any>();

    // TODO 从表单合并 disabled 属性
    const mergeDisabled = computed(() => props.disabled);
    const mergeSize = computed(() => props.size);

    // readonly
    const inputReadonly = computed(() => !props.multiple);

    // 存储option每一项的label
    const optionList = ref<string[]>([]);

    const emptyText = computed(() => {
      if (props.loading) {
        return props.loadingText;
      } else {
        if (states.options.size === 0) {
          return props.noDataText;
        }
      }
      return null;
    });

    // 筛选出存在于optionList中的label
    const optionsArray = computed(() => {
      const list = Array.from(states.options.values());
      const newList: any = [];
      optionList.value.forEach((label) => {
        const index = list.findIndex((i) => i.currentLabel === label);
        if (index > -1) {
          newList.push(list[index]);
        }
      });
      return newList.length ? newList : list;
    });

    // 缓存的optionList
    const cachedOptionsArray = computed(() => Array.from(states.cachedOptions.values()));

    const getOption = (value: any) => {
      const option = cachedOptionsArray.value.find((option) => option.currentValue === value);
      if (option) return option;
    };
    
    const handleClearSelectLabel = () => {
        emit('update:modelValue','')
        emit('change','')
    }

    const setSelected = () => {
      if (!props.multiple) {
        const option = getOption(props.modelValue);
        if (!option) {
          states.selectedLabel = '';
          states.selected = null;
          return;
        }
        states.selectedLabel = option?.currentLabel;
        states.selected = option;
        return;
      }
      // TODO
      // states.selectedLabel = ''
      // const result: any[] = []
      // if (Array.isArray(props.modelValue)) {
      //   props.modelValue.forEach((value) => {
      //     result.push(getOption(value))
      //   })
      // }
      // states.selected = result
    };

    // 每个option创建后添加到options set中
    const optionItemCreate = (vm: SelectOptionProxy) => {
      states.optionsCount++;
      states.filteredOptionsCount++;
      states.options.set(vm.value, vm);
      states.cachedOptions.set(vm.value, vm);
    };

    // option删除从options set中移除
    const optionItemDestroy = (key: ValueKey, vm: SelectOptionProxy) => {
      if (states.options.get(key) === vm) {
        states.optionsCount--;
        states.filteredOptionsCount--;
        states.options.delete(key);
      }
    };

    const optionItemDestroyInCache = (key: ValueKey, vm: SelectOptionProxy) => {
      // TODO
    };

    const onUpdateOptionsToRender = (value: string[]) => {
      optionList.value = value;
    };

    const optionsItemHoverIndexChange = (vm: SelectOptionProxy) => {
      states.hoverIndex = optionsArray.value.indexOf(vm);
    };

    // 关闭Trigger
    const handleCloseTrigger = () => {
      states.popupVisible = false;
    };

    const handleOptionSelect = (vm: SelectOptionProxy, byClick: boolean) => {
      emit('update:modelValue', vm.currentValue);
      emit('change', vm.currentValue);

      nextTick(() => {
        // 激活input
        inputRef.value?.inputRef.focus()
      })
      handleCloseTrigger();
    };

    onMounted(() => {
      setSelected();
    });

    // 表单验证
    const { formItem } = useFormItem();

    // option插槽数据变化
    watch(
      () => optionList.value,
      (newVal) => {
        if (newVal.length > 0) {
          setSelected();
        }
      },
    );

    // hover激活
    watch(
      () => states.hoverIndex,
      (val) => {
        let hoverOption: any = null;
        if (isNumber(val) && val > -1) {
          hoverOption = optionsArray.value[val] || {};
        } else {
          hoverOption = {};
        }
        optionsArray.value.forEach((option: SelectOptionProxy) => {
          option.isHover = hoverOption === option;
        });
      },
    );

    // 数据发生变化
    watch(
      () => props.modelValue,
      (val, oldVal) => {
        setSelected();
        // 触发表单验证
        if (props.validateEvent) {
          formItem?.validate('change').catch(NOOP);
        }
      },
      {
        flush: 'post',
        deep: true,
      },
    );

    provide(
      selectKey,
      reactive({
        props,
        optionsArray,
        optionItemCreate,
        optionItemDestroy,
        handleOptionSelect,
        optionsItemHoverIndexChange,
      }) as SelectContext,
    );

    return {
      ns,
      cls,
      states,
      emptyText,
      onUpdateOptionsToRender,
      // 重写
      mergeDisabled,
      mergeSize,
      handleCloseTrigger,
      scrollbarRef,
      inputReadonly,
      inputRef,
      handleClearSelectLabel
    };
  },
});
</script>

<template>
  <div :class="cls">
    <Trigger v-model:popupVisible="states.popupVisible" position="bl" trigger="click" :unmount-on-close="false"
      animation-name="bn-slide-dynamic-origin" auto-fit-popup-min-width :popup-offset="8" :disabled="mergeDisabled">
      <template #default>
        <div :class="[`${ns}__trigger`]">
          <div v-if="multiple" :class="[`${ns}__multiple-wrapper`]"></div>
          <Input v-model="states.selectedLabel" :disabled="mergeDisabled" :size="mergeSize" :readonly="inputReadonly"
            :placeholder="placeholder" :clearable="clearable" ref="inputRef" @clear="handleClearSelectLabel">
          <template #suffix-icon>
            <CaretIcon :class="[{ 'is-rotate': states.popupVisible }, `${ns}__icon-caret`]" />
          </template>
          </Input>
        </div>
      </template>

      <template #content>
        <Menu>
          <Scrollbar ref="scrollbarRef" style="max-height: 224px">
            <Options @update-options="onUpdateOptionsToRender">
              <slot v-if="!loading"></slot>
            </Options>
            <template v-if="emptyText">
              <p :class="[`${ns}__empty-text`]" @click="handleCloseTrigger">
                <slot name="empty">
                  {{ emptyText }}
                </slot>
                <LoadingIcon v-if="loading" />
              </p>
            </template>
          </Scrollbar>
        </Menu>
      </template>
    </Trigger>
  </div>
</template>
