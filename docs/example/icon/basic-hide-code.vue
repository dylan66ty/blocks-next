<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import iconJson from '@blocks-next/components/icon/icon.json'




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


    const transIcons = (filenames: string[]) => {
      return filenames.map((svgName) => {
        const n = 'bn-icon-' + svgName
        return {
          n,
          c: formatSvgName(n)
        }
      })
    }


    const iconGroupData = iconJson as any

    return {
      handleCopy,
      components,
      iconGroupData,
      transIcons
    }
  }
})
</script>


<template>
  <div class="icon-wrapper">
    <div class="icon-group" v-for="(group, key) in iconGroupData" :key="key">
      <div class="icon-group-name">{{ group.label }}</div>
      <div class="icon-group-content">
        <div class="icon-item" v-for="item in transIcons(group.filenames)" :key="item.n" @click="handleCopy(item.n)">
          <component class="icon" :is="components[item.c]"></component>
          <div class="icon-name">{{ item.n }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.icon-wrapper {
  .icon-group+.icon-group {
    margin-top: 30px;
  }

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
