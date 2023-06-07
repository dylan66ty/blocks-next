<script lang="ts" setup>

</script>

<template>
    <div :style="{position: 'relative', width: '440px', height: '280px'}">
    <bn-popconfirm content="This is a confirm" position="tl">
      <span class="button" :style="{position: 'absolute',top:'0',left:'70px'}">TL</span>
    </bn-popconfirm>
    <bn-popconfirm content="This is a confirm" position="top">
      <span class="button" :style="{position: 'absolute',top:'0',left:'180px'}">TOP</span>
    </bn-popconfirm>
    <bn-popconfirm content="This is a confirm" position="tr">
      <span class="button" :style="{position: 'absolute',top:'0',left:'290px'}">TR</span>
    </bn-popconfirm>
    <bn-popconfirm content="This is a confirm" position="bl">
      <span class="button" :style="{position: 'absolute',top:'240px',left:'70px'}">BL</span>
    </bn-popconfirm>
    <bn-popconfirm content="This is a confirm" position="bottom">
      <span class="button" :style="{position: 'absolute',top:'240px',left:'180px'}">BOTTOM</span>
    </bn-popconfirm>
    <bn-popconfirm content="This is a confirm" position="br">
      <span class="button" :style="{position: 'absolute',top:'240px',left:'290px'}">BR</span>
    </bn-popconfirm>
    <bn-popconfirm content="This is a confirm" position="lt">
      <span class="button" :style="{position: 'absolute',top:'60px',left:'10px'}">LT</span>
    </bn-popconfirm>
    <bn-popconfirm content="This is a confirm" position="left">
      <span class="button" :style="{position: 'absolute',top:'120px',left:'10px'}">LEFT</span>
    </bn-popconfirm>
    <bn-popconfirm content="This is a confirm" position="lb">
      <span class="button" :style="{position: 'absolute',top:'180px',left:'10px'}">LB</span>
    </bn-popconfirm>
    <bn-popconfirm content="This is a confirm" position="rt">
      <span class="button" :style="{position: 'absolute',top:'60px',left:'350px'}">RT</span>
    </bn-popconfirm>
    <bn-popconfirm content="This is a confirm" position="right">
      <span class="button" :style="{position: 'absolute',top:'120px',left:'350px'}">RIGHT</span>
    </bn-popconfirm>
    <bn-popconfirm content="This is a confirm" position="rb">
      <span class="button" :style="{position: 'absolute',top:'180px',left:'350px'}">RB</span>
    </bn-popconfirm>
  </div>
</template>

<style lang="scss">
.button {
  display: inline-flex;
  width: 100px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
}
</style>