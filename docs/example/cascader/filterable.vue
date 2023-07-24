<script lang="ts" setup>
  import { ref, watch } from 'vue'

  const single = ref([])
  const multiple = ref([])

  watch(single, (val) => {
    console.log('single', val)
  })

  watch(multiple, (val) => {
    console.log('multiple', val)
  })

  const options = [
    {
      label: '首页',
      value: 'index'
    },
    {
      label: '指南',
      value: 'guide',
      children: [
        {
          label: '快速开始',
          value: 'getting-started'
        },
        {
          label: '升级指南',
          value: 'upgrade-guide'
        },
        {
          label: '组件提示',
          value: 'component-prompt'
        },
        {
          label: '更新日志',
          value: 'changelogs'
        }
      ]
    },
    {
      label: '组件',
      value: 'components',
      children: [
        {
          label: '基础组件',
          value: 'base',
          children: [
            {
              label: '按钮 Button',
              value: 'button'
            },
            {
              label: '间距 Space',
              value: 'space'
            },
            {
              label: '图标 Icon',
              value: 'icon'
            }
          ]
        },
        {
          label: '表单组件',
          value: 'formComponent',
          children: [
            {
              label: '输入框 Input',
              value: 'input'
            },
            {
              label: '复选框 Checkbox',
              value: 'checkbox'
            },
            {
              label: '单选框 Radio',
              value: 'radio'
            },
            {
              label: '选择器 Select',
              value: 'select',
              promotion: 'enhanced'
            },
            {
              label: '级联选择 Cascader',
              value: 'cascader'
            },
            {
              label: '开关 Switch',
              value: 'switch'
            },
            {
              label: '表单 Form',
              value: 'form'
            }
          ]
        },
        {
          label: '反馈',
          value: 'feedback',
          children: [
            {
              label: '对话框 Dialog',
              value: 'dialog'
            },
            {
              label: '消息通知 Message',
              value: 'message'
            },
            {
              label: '弹框 MessageBox',
              value: 'messageBox'
            },
            {
              label: '抽屉 Drawer',
              value: 'drawer'
            },
            {
              label: '通知 Notification',
              value: 'notification'
            },
            {
              label: '气泡确认框 Popconfirm',
              value: 'popconfirm'
            },
            {
              label: '加载 Loading',
              value: 'loading'
            },
            {
              label: '进度条 Progress',
              value: 'progress'
            }
          ]
        },
        {
          label: '数据展示',
          value: 'data',
          children: [
            {
              label: '空状态 Empty',
              value: 'empty'
            },
            {
              label: '表格 Table',
              value: 'table'
            },
            {
              label: '标签页 Tabs',
              value: 'tabs'
            },
            {
              label: '分页器 Pagination',
              value: 'pagination'
            },
            {
              label: '文字气泡 Tooltip',
              value: 'tooltip'
            },
            {
              label: '标签 Tag',
              value: 'tag'
            },
            {
              label: '数字角标 Badge',
              value: 'badge'
            },
            {
              label: '描述列表 Descriptions',
              value: 'descriptions'
            },
            {
              label: '下拉菜单 Dropdown',
              value: 'dropdown'
            }
          ]
        },
        {
          label: '其他',
          value: 'other',
          children: [
            {
              label: '滚动条 Scrollbar',
              value: 'scrollbar'
            },
            {
              label: '弹出层 Popup',
              value: 'popup'
            }
          ]
        }
      ]
    }
  ]
</script>

<template>
  <div class="flex gap-x-5">
    <div class="flex flex-col">
      <span class="mb-2">Search [Single selection]</span>
      <bn-cascader v-model="single" :data="options" filterable clearable></bn-cascader>
    </div>
    <div class="flex flex-col">
      <span class="mb-2">Search [Multiple selection]</span>
      <bn-cascader v-model="multiple" :data="options" multiple filterable clearable></bn-cascader>
    </div>
  </div>
</template>
