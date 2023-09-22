<script setup>
import '../assets/main.scss';

</script>


<template>
    <div class="component-header">
        <slot></slot>
    </div>
</template>


<style lang="scss" scoped>
.component-header {
    background-color: #f0f0f0;
    padding: 8px 20px;
    font-weight: 700;
    font-size: 110%;

    font-family: var(--QMOD-font-family);
}
</style>