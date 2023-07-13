<script lang="tsx" setup>

const data = [
  {
    label: '统一社会信用代码',
    value: '91440300MA5Fxxxxxxx'
  },
  {
    label: '注册号',
    value: '4040400400000'
  },
  {
    label: '组织机构代码',
    value: '00896xxx-x'
  },
  {
    label: '经营状态',
    value: '续存'
  },
  {
    label: '法人代表',
    value: 'dylan66ty'
  },
  {
    label: '注册资本',
    value: '1元'
  },
  {
    label: '企业类型',
    value: '有限责任公司'
  },
  {
    label: '成立日期',
    value: '2023-07-13'
  },
  {
    label: '所属行业',
    value: '软件和信息技木服务业',
    span: 2
  },
  {
    label: '通讯地址',
    value: '合肥市xxxx',
    span: 2
  },
  {
    label: '经营范围',
    value: '电商服务，软件开发',
    span: 2
  }
]

</script>

<template>
  <div>
    <bn-tag type="primary">通过 bn-descriptions-item 渲染</bn-tag>
    <bn-descriptions cell-height="60" border>
      <bn-descriptions-item v-for="(item, index) in data" :key="index" :label="item.label" :value="item.value"
        :span="item.span"></bn-descriptions-item>
    </bn-descriptions>
  </div>

  <div style="margin-top: 30px;">
    <bn-tag type="primary">通过data渲染</bn-tag>
    <bn-descriptions cell-height="60" border :data="data"></bn-descriptions>
  </div>
</template>

<style lang="scss"></style>