<script lang="ts" setup>
  import { MessageBox } from '@blocks-next/index'
  import { h, defineComponent } from 'vue'

  const Test = defineComponent({
    name: 'Test',
    render() {
      return h('div', null, '1111')
    }
  })

  const handler = () => {
    // MessageBox({
    //   // title: 'Success Notification',
    //   content: 'content',
    //   beforeOnCancel(){
    //     return true
    //   },
    //   onCancel(){
    //     console.log('cancel')
    //   },
    //   beforeOnOk(){
    //     return new Promise(resolve => {
    //       setTimeout(() => {
    //         resolve(true)
    //       }, 300);
    //     })
    //   },
    //   onOk() {
    //     console.log('ok');
    //   }
    // })

    MessageBox.info('dadaaas')
      .cancel(
        () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(true)
            }, 300)
          })
        },
        () => {}
      )
      .ok(() => {
        console.log('ok')
      })
  }
</script>

<template>
  <div>
    <bn-button type="primary" @click="handler">messageBox</bn-button>
  </div>
</template>

<style lang="scss"></style>
