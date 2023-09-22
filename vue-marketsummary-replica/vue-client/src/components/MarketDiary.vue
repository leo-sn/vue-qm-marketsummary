<script setup>
    import ComponentHeader from './ComponentHeader.vue'
    import '../assets/main.scss';
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    //make data a reactive variable - if it changes in the future, the dom renders
    const data = ref([]);

    //function to call the API and get the symbol data
    async function getMarketDairyData(symbol) {
        try {
        const response = await axios.get(`http://127.0.0.1:3030/market-activity-stats?symbol=${symbol}`);
        return response.data;
        } catch (error) {
        console.error(`Error fetching data for symbol ${symbol}:`, error);
        return null; // Return null or handle the error as needed
        }
    }

    //getting parent passed props = symbols to load
    const props = defineProps(['symbol'])

    //saving all the api calls into a variable called data
    async function fetchData() {
        for (let i = 0; i < props.symbol.length; i++) {
            const info = await getMarketDairyData(props.symbol[i]);
            if (info !== null) {
                data.value.push(info);
            }
        }
    }


    //fetchs data right when component is mounted.
    onMounted(() => {
        fetchData();
    });

</script>


<template>
    <ComponentHeader>Market Dairy</ComponentHeader>
    <div class="main-container">
        <table class="main-container__table">
            <thead>
                <tr>
                    <th class="spacing"></th>
                    <th class="table-header textl">Exchange</th>
                    <th class="table-header textr">Adv.</th>
                    <th class="table-header textr">Dec.</th>
                    <th class="table-header textr">Unchg</th>
                    <th class="table-header textr">Adv. Vol</th>
                    <th class="table-header textr">Dec. Vol</th>
                    <th class="table-header textr">Total Volume</th>
                    <th class="table-header textr">52w Hi</th>
                    <th class="table-header textr">52w Lo</th>
                </tr>
            </thead>
            
            <tbody class="table-body">
                <tr v-for="(item, index) in data" :key="index">
                    <td class="textl">{{ item.results.marketactivity.exShName }}</td>
                    <td class="textr">{{ item.results.marketactivity.issuesadvanced.toLocaleString("en-US") }}</td>
                    <td class="textr">{{ item.results.marketactivity.issuesdeclined.toLocaleString("en-US") }}</td>
                    <td class="textr">{{ item.results.marketactivity.issuesunchanged.toLocaleString("en-US") }}</td>
                    <td class="textr">{{ item.results.marketactivity.advancedsharevolume.toLocaleString("en-US") }}</td>
                    <td class="textr">{{ item.results.marketactivity.declinedsharevolume.toLocaleString("en-US") }}</td>
                    <td class="textr">{{ item.results.marketactivity.totalsharevolume.toLocaleString("en-US") }}</td>
                    <td class="textr">{{ item.results.marketactivity.issues52weekhigh.toLocaleString("en-US") }}</td>
                    <td class="textr">{{ item.results.marketactivity.issues52weeklow.toLocaleString("en-US") }}</td>
                </tr>
            </tbody>
            
        </table>
    </div>
</template>

<style lang="scss" scoped>

    .main-container {
        padding: 10px 20px;
        margin-bottom: 20px;
        height: fit-content;

        font-family: var(--QMOD-font-family);

        &__table {
            width: 100%;
            border-collapse: collapse; 
        }
    }

    .textr {
        text-align: right;
    }

    .textl {
        text-align: left;
    }
    .spacing {
        display: none;
    }

    .table-header {
        border-bottom: 1px solid #ccc;
        font-size: 81%;

        &:hover {
            border-bottom: 2px solid var(--QMOD-primary-color);
        }
    }

    th {
        width: fit-content;
        margin: 0;
        padding: 4px 18px 4px 4px;
        min-width: 50px;
        font-size: 70%;
        font-weight: bold;
    }

    .table-body {
        &::before {
        height: 0.688em;
        display: table-row;
        content: "";
        }
    }

    td {
        font-size: 75%;
        font-weight: 400;
        padding: 10px 12px 10px 5px;
        border-bottom: 1px solid #eeeeee;
        white-space: nowrap;
    }
</style>