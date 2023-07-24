<script lang="tsx" setup>
  import { MessageBox, Button, Space } from 'blocks-next'

  const success = () => {
    MessageBox({
      title: '已收到您的订单纸质发票申请',
      content: '发票类型：增值税普通发票',
      type: 'success',
      popupClass: 'test',
      onCancel() {
        console.log('onCancel')
      },
      onOk() {
        console.log('onOk')
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
        console.log('onOk')
      }
    })
  }

  const warning = () => {
    MessageBox({
      title: <div class="text-2xl font-[600]">This is title</div>,
      content: <div>This is content</div>,
      type: 'warning',
      // 自定义footer
      footer: (scoped) => {
        return (
          <Space>
            <Button onclick={scoped.cancel}>取消</Button>
            <Button onclick={scoped.ok} type="primary">
              确认
            </Button>
          </Space>
        )
      }
    })
  }

  const error = () => {
    MessageBox({
      title: '这是一条错误信息',
      type: 'error',
      hideOk: true
    })
  }

  const info = () => {
    MessageBox({
      title: 'This is the message ',
      type: 'info'
    })
  }
</script>

<template>
  <BnSpace>
    <BnButton size="small" type="success" @click="success">success</BnButton>
    <BnButton size="small" type="strong" @click="strong">strong</BnButton>
    <BnButton size="small" type="warning" @click="warning">warning(TSX渲染)</BnButton>
    <BnButton size="small" type="danger" @click="error">error</BnButton>
    <BnButton size="small" type="info" @click="info">info</BnButton>
  </BnSpace>
</template>

<style lang="scss"></style>
