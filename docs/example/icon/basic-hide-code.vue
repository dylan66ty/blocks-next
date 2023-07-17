<script lang="ts">
import { defineComponent, getCurrentInstance, h } from 'vue'

const formatSvgName = (svgName) => {
  return svgName
    .split('-')
    .map((word) => {
      return word
        .split('')
        .map((v, i) => {
          if (i === 0) return v.toUpperCase()
          return v
        })
        .join('')
    })
    .join('')
}

const icons: Array<Record<string, any>> = [
  'eye-open',
  'eye-close',
  'plus',
  'minus',
  'search',
  'loading',
  'caret',
  'caret-fill',
  'prompt',
  'close',
  'close-fill',
  'delete',
  'setting',
  'check'
].map((svgName) => {
  return {
    n: 'bn-icon-' + svgName,
    c: 'BnIcon' + formatSvgName(svgName)
  }
})

export default defineComponent({
  setup() {
    const instance = getCurrentInstance()
    const message = instance?.appContext.config.globalProperties.message
    const copyStr = instance?.appContext.config.globalProperties.copyStr
    const components = instance?.appContext.components || {}

    const handleCopy = async (name) => {
      const content = '<' + name + ' />'

      copyStr(content)
        .then(() => {
          message.info('复制成功 ' + content)
        })
        .catch(() => {
          message.error('复制失败')
        })
    }
    return {
      handleCopy,
      components,
      icons
    }
  }
})
</script>


<template>
  <div class="icon-wrapper">
    <div class="icon-group">
      <div class="icon-group-name">基础图标</div>
      <div class="icon-group-content">
        <div class="icon-item" v-for="item in icons" :key="item.n" @click="handleCopy(item.n)">
          <component class="icon" :is="components[item.c]"></component>
          <div class="icon-name">{{ item.n }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.icon-wrapper {


  .icon-group-name {
    padding: 12px;
    width: calc(100% - 5px);
    border: 1px solid #ddd;  
    color: var(--color-text-1);
    font-weight: 500;
    box-sizing: border-box;
  }

  .icon-group-content {
    display: flex;
    flex-wrap: wrap;
    .icon-item {
      position: relative;
      border: 1px solid #ddd;
      width: 16.667%;
      height: 120px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      margin-top: -1px;
      margin-right: -1px;

      &:hover {
        background-color: #f2f3f5;
      }

      .icon {
        font-size: 26px;
        transition: all 0.3s ease;
      }

      .icon-name {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        margin: 0;
        padding: 12px;
        overflow: hidden;
        color: var(--color-text-1);
        font-size: 12px;
        white-space: nowrap;
        text-align: center;
        text-overflow: ellipsis;
        line-height: initial;
      }
    }
  }


}
</style>
