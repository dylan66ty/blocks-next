<template>
    <div class="has-outline-wrapper">
        <bn-button fill-mode="outline">Default</bn-button>
        <bn-button fill-mode="outline" type="primary">Primary</bn-button>
        <bn-button fill-mode="outline" type="success">Success</bn-button>
        <bn-button fill-mode="outline" type="warning">Warning</bn-button>
        <bn-button fill-mode="outline" type="strong">strong</bn-button>
        <bn-button fill-mode="outline" type="danger">Danger</bn-button>
    </div>
    <div class="no-outline-wrapper">
        <bn-button fill-mode="none">Default</bn-button>
        <bn-button fill-mode="none" type="primary">Primary</bn-button>
        <bn-button fill-mode="none" type="success">Success</bn-button>
        <bn-button fill-mode="none" type="warning">Warning</bn-button>
        <bn-button fill-mode="none" type="strong">strong</bn-button>
        <bn-button fill-mode="none" type="danger">Danger</bn-button>
    </div>
</template>

<style lang="scss">
.has-outline-wrapper {
    .bn-btn + .bn-btn {
        margin-left: 8px;
    }
}

.no-outline-wrapper {
    .bn-btn + .bn-btn {
        margin-left: 8px;
    }
    margin-top: 10px;
}
</style>
