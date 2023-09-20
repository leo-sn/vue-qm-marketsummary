<script setup>
    import axios from 'axios';
    import ComponentHeader from './ComponentHeader.vue';
    import '../assets/main.scss';
</script>


<template>
    <ComponentHeader>Market Summary</ComponentHeader>
    <div class="main-content">
        <div class="main-content-title"> Title </div>
        <div class="main-content-price"> Price </div>
        <div class="main-content-chart"> Chart </div>
    </div>
</template>

<style lang="scss" scoped>
    .main-content {
        height: 290px;
    }
</style>