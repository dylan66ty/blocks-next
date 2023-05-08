<template>
    <div class="default-wrapper">
        <bn-button>默认</bn-button>
        <bn-button type="info">主题</bn-button>
        <bn-button type="success">成功</bn-button>
        <bn-button type="warning">警告</bn-button>
        <bn-button type="strong">强烈警告</bn-button>
        <bn-button type="danger">危险</bn-button>
    </div>
</template>

<style lang="scss">
.default-wrapper {
    .bn-btn + .bn-btn {
        margin-left: 8px;
    }
}
</style>