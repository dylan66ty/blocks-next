<script lang="tsx" setup>

const data = [
  {
    label: '任务名称',
    value: 'Descriptions组件开发',
  },
  {
    label: '组件进度',
    renderLabel: ({ label }) => <>
      {label}
      <bn-tag type="danger">TSX渲染</bn-tag>
    </>,
    renderValue: ({ value }) => <>
      <bn-progress percent={0.95}></bn-progress>
    </>
  },
  {
    label: '文档进度',
    renderValue: ({ value }) => <>
      <bn-progress percent={0.95} color="green"></bn-progress>
    </>
  },
  {
    label: '难点',
    valueSlotName: 'coreValue',
    labelSlotName: 'coreLabel',
  }
]

</script>

<template>
  <div>
    <bn-tag type="primary">DescriptionsItem渲染</bn-tag>
    <bn-descriptions border :column="1" size="large">
      <bn-descriptions-item>
        <template #label>
          <span>任务名称</span>
        </template>
        Descriptions组件开发
      </bn-descriptions-item>
      <bn-descriptions-item>
        <template #label>
          <span>组件进度</span>
        </template>
        <bn-progress :percent="0.95"></bn-progress>
      </bn-descriptions-item>
      <bn-descriptions-item>
        <template #label>
          <span>文档进度</span>
        </template>
        <bn-progress :percent="0.8" color="green"></bn-progress>
      </bn-descriptions-item>
      <bn-descriptions-item>
        <template #label>
          <span>难点</span>
        </template>
        <bn-space>
          <bn-tag effect="dark" type="primary">vnodes生成二维数组的边界处理</bn-tag>
          <bn-tag effect="dark" type="primary">td标签colspan合并策略</bn-tag>
          <bn-tag effect="dark" type="primary">vertical布局</bn-tag>
        </bn-space>
      </bn-descriptions-item>
    </bn-descriptions>
  </div>

  
  <div style="margin-top: 30px;">
    <bn-tag type="primary">通过data渲染</bn-tag>
    <bn-descriptions border size="large" :column="1" :data="data">
      <template #coreLabel="{ label }"> {{ label }} <bn-tag type="primary">具名插槽渲染</bn-tag></template>
      <template #coreValue>
        <bn-space>
          <bn-tag effect="dark" type="primary">vnodes生成二维数组的边界处理</bn-tag>
          <bn-tag effect="dark" type="primary">td标签colspan合并策略</bn-tag>
          <bn-tag effect="dark" type="primary">vertical布局</bn-tag>
        </bn-space>
      </template>
    </bn-descriptions>
  </div>
</template>

<style lang="scss"></style>