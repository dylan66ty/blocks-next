<script lang="ts" setup>
  import { MessageBox, Message } from 'blocks-next'

  const info = () => {
    MessageBox.info('这是一条信息', 'content')
      .cancel(() => {
        console.log('cancel')
      })
      .ok(() => {
        console.log('ok')
      })
  }

  const success = () => {
    MessageBox.success('这是一条成功信息').ok(
      () => {
        // 返回一个boolean值或者一个Promise<boolean>
        Message.error('点击确认被拦截了')
        return false
      },
      () => {
        console.log('success ok!!!')
      }
    )
  }

  const error = () => {
    MessageBox.error('这是一条错误信息').cancel(
      () => {
        Message.error('点击取消被拦截了')
        return false
      },
      () => {
        console.log('error cancel')
      }
    )
  }
  const warning = () => {
    MessageBox.warning('这是一条警告信息')
      .cancel(
        () => {
          return new Promise((resolve) =>
            setTimeout(() => {
              resolve(true)
            }, 1000)
          )
        },
        () => {
          console.log('warning cancel')
        }
      )
      .ok(
        () => {
          return new Promise((resolve) =>
            setTimeout(() => {
              resolve(true)
            }, 1000)
          )
        },
        () => {
          console.log('warning ok!!!')
        }
      )
  }

  const strong = () => {
    MessageBox.strong('这是一条严重警告信息')
  }
</script>

<template>
  <bn-space>
    <bn-button size="small" @click="info">正常触发回调</bn-button>
    <bn-button size="small" type="success" @click="success">确认被拦截</bn-button>
    <bn-button size="small" type="danger" @click="error">取消被拦截</bn-button>
    <bn-button size="small" type="warning" @click="warning">拦截1000ms</bn-button>
    <bn-button size="small" type="strong" @click="strong">strong</bn-button>
  </bn-space>
</template>

<style lang="scss"></style>
