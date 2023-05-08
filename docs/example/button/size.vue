<template>
    <div class="size-wrapper">
        <bn-button type="primary" size="mini">Mini</bn-button>
        <bn-button type="primary" size="small">Small</bn-button>
        <bn-button type="primary">Normal</bn-button>
        <bn-button type="primary" size="large">Large</bn-button>
    </div>
</template>

<style lang="scss">
.size-wrapper {
    .bn-btn + .bn-btn {
        margin-left: 8px;
    }
    margin-top: 10px;
}

</style>