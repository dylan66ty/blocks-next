<template>
  <bn-space direction="vertical">
    <bn-space size="small">
      <bn-button type="success" plain size="mini">呼叫</bn-button>
      <bn-button type="danger" size="small">去付款</bn-button>
      <bn-button type="primary">确认</bn-button>
      <bn-button type="primary" size="large">
        <bn-space :size="24">
          <span>添加客户</span>
          <bn-icon-plus />
        </bn-space>
      </bn-button>
    </bn-space>
  </bn-space>
</template>
