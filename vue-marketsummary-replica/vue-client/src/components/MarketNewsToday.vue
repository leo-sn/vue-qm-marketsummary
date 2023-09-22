<script setup>
    import ComponentHeader from './ComponentHeader.vue'
    import '../assets/main.scss';

    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    //make data a reactive variable - if it changes in the future, the dom renders
    const data = ref({results: null});

    //function to call the API and get the symbol data
    async function getMarketNews() {
        try {
            const response = await axios.get(`http://127.0.0.1:3030/headlines`);
            data.value.results = response.data.results;
        } catch (error) {
            console.error(`Error fetching data`, error);
            return null; // Return null or handle the error as needed
        }
    }

    //fetching data and adding into a reactive variable = data
    async function fetchData() {
        await getMarketNews();
    }

    // formatting date api output.
    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format

        return `${month} ${day}, ${year} ${formattedHours}:${minutes} ${ampm} ET`;
    }

    //fetchs data right when component is mounted.
    onMounted(() => {
        fetchData();
        console.log(data.value)
    });

</script>


<template>
    <ComponentHeader>Market News Today</ComponentHeader>
    <div class="main-container">
        <div class="news-container" v-if="data.results" v-for="(newsItem, index) in data.results.news[0].newsitem" :key="index">
            <div class="news-container--header">
                <div class="news-container__title">
                    {{ newsItem.headline }}
                </div>
                <div class="news-container__news-date">
                    {{ formatDate(newsItem.datetime) }}
                </div>
            </div>
            <div class="news-container__news-body">
                {{ newsItem.qmsummary }}
            </div>
            <div class="news-container__read-more">
                <a :href="newsItem.storyurl">Read More</a>
            </div>
        </div>
        <div v-else>
            <!-- Show a loading message or handle the absence of data as needed -->
            Loading data...
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main-container {
    padding: 0px 15px;
    margin-bottom: 20px;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
}

.news-container {
    width: 50%;
    padding: 5px;
    font-family: var(--QMOD-font-family);
    font-size: 82%;

    &--header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-weight: 700;
        margin-bottom: 20px;
    }

    &__title {
        width: 50%;
    }

    &__news-body {
        margin-bottom: 3%;
    }

    &____news-date {
        width: 50%;
    }

    &__read-more {
        text-align: right;
        align-self: flex-end;
        font-size: 110%;

        &>a{
            color: var(--QMOD-primary-color);
        }
    }
}
</style>