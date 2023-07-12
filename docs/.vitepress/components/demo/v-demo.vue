<template>
  <ClientOnly>
    <p text="sm" v-html="decodedDescription" />
    <div class="example">
      <Example :file="pathName" :demo="formatPathDemos[pathName]" />
      <div class="op-btns" v-if="hiddenOps">
        <bn-space>
          <bn-tooltip :content="sourceVisible ? '隐藏源代码' : '查看源代码'" size="mini">
            <bn-button
              :type="sourceVisible ? 'primary' : ''"
              shape="circle"
              size="mini"
              @click="toggleSourceVisible"
            >
              <ExpandIcon />
            </bn-button>
          </bn-tooltip>
          <bn-tooltip content="复制代码" size="mini">
            <bn-button shape="circle" size="mini" @click="copyCode">
              <CopyIcon />
            </bn-button>
          </bn-tooltip>
        </bn-space>
      </div>
      <VTransition>
        <SourceCode v-if="sourceVisible" :source="source" />
      </VTransition>
    </div>
  </ClientOnly>
</template>
<script setup lang="ts">
  import { computed, ref } from 'vue'
  import Example from './v-example.vue'
  import SourceCode from './v-source-code.vue'
  import VTransition from './v-transition.vue'
  import message from '../message'
  import { copyStr } from '../../utils/helper'

  import ExpandIcon from '../icons/expand.vue'
  import CopyIcon from '../icons/copy.vue'

  const props = defineProps<{
    demos: Object
    source: string
    path: string
    pathName: string
    rawSource: string
    description?: string
  }>()

  const decodedDescription = computed(() => decodeURIComponent(props.description!))

  const hiddenOps = computed(() => !props.pathName.includes('hide-code'))

  const formatPathDemos = computed(() => {
    const demos: Object = {}
    Object.keys(props.demos).forEach((key: string) => {
      demos[key.split('./example/')[1].replace('.vue', '')] = props.demos[key].default
    })
    return demos
  })

  const copyCode = () => {
    copyStr(decodeURIComponent(props.rawSource)).then(() => {
      message.info('复制成功')
    })
  }

  const sourceVisible = ref<boolean>(false)

  const toggleSourceVisible = () => {
    sourceVisible.value = !sourceVisible.value
  }
</script>
<style lang="scss">
  .example {
    border-radius: 8px;

    .op-btns {
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 2.5rem;
      font-size: 14px;
    }
  }
</style>
