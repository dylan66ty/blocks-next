<script lang="ts" setup>
import { Message, IMessageType } from '@blocks-next/index'
const handler = (type:IMessageType) => {
  Message({
    message: '起床上班了',
    type,
  })
}

</script>

<template>
  <div>
    <bn-button @click="handler('success')" type="success">success</bn-button>
    <bn-button @click="handler('warning')" type="warning">warning</bn-button>
    <bn-button @click="handler('strong')" type="strong">strong</bn-button>
    <bn-button @click="handler('danger')" type="danger">danger</bn-button>
    <bn-button @click="handler('info')">info</bn-button>


  </div>
</template>

<style lang="scss"></style>