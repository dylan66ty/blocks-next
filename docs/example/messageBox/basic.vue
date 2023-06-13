<script lang="ts" setup>
import { MessageBox } from 'blocks-next'
import { h, getCurrentInstance } from 'vue'



const success = () => {
  MessageBox({
    title: '已收到您的订单纸质发票申请',
    content: '发票类型：增值税普通发票',
    type: 'success',
    popupClass:'test',
    onCancel() {
      console.log('onCancel');
    },
    onOk() {
      console.log('onOk');
    }
  })
}

const strong = () => {
  MessageBox({
    title: '您提交的文件有误',
    content: '格式错误',
    type: 'strong',
    hideCancel: true,
    okText: '重新上传',
    onOk() {
      console.log('onOk');
    }
  })
}

const instance = getCurrentInstance()
const { BnButton, BnSpace } = instance?.appContext.components

const warning = () => {
  MessageBox({
    title: h('div', { style: { fontWeight: 700, fontSize: '20px' } }, 'title renderFunction'),
    content: h('div', null, 'content renderFunction'),
    type: 'warning',
    // 自定义footer
    footer: (scoped) => {
      const onOk = (e: Event) => {
        scoped.ok(e)
      }
      const onCancel = (e: Event) => {
        scoped.cancel(e)
      }
      return h(BnSpace, {}, {
        default: () => [
          h(BnButton, { onClick: onCancel, 'fill-mode': 'outline' }, {
            default: () => 'Cancel'
          }),
          h(BnButton, { onClick: onOk, type: 'primary' }, {
            default: () => 'ok'
          })
        ]
      })
    },
  })
}


const error = () => {
  MessageBox({
    title: '这是一条错误信息',
    type: 'error',
    hideOk: true,
  })
}

const info = () => {
  MessageBox({
    title: '优于别人，并不高贵，真正的高贵应该是优于过去的自己。',
    type: 'info'
  })
}



</script>

<template>
  <bn-space>
    <bn-button  size="small" type="success" @click="success">success</bn-button>
    <bn-button  size="small" type="strong" @click="strong">strong</bn-button>
    <bn-button  size="small" type="warning" @click="warning">warning(renderFunction渲染)</bn-button>
    <bn-button  size="small" type="danger" @click="error">error</bn-button>
    <bn-button  size="small" type="info" @click="info">info</bn-button>

  </bn-space>
</template>

<style lang="scss"></style>