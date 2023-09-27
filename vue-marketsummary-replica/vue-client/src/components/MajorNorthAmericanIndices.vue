<script setup>
  import ComponentHeader from './ComponentHeader.vue'
    import '../assets/main.scss';
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    //make data a reactive variable - if it changes in the future, the dom renders
    const data = ref({results: null});

    //function to call the API and get the symbol data
    async function getNAIndices() {
        try {
            const response = await axios.get(`http://127.0.0.1:3030/snap-quotes?location=NA`);
            data.value.results = response.data.results;
        } catch (error) {
        console.error(`Error fetching data for NA indices`, error);
        return null; // Return null or handle the error as needed
        }
    }

    function formatNumberWithTotalDigits(number, desiredTotalDigits) {
        const numberString = number.toString();
        const [integerPart, decimalPart] = numberString.split('.');

        let formattedNumber = integerPart;

        if (decimalPart !== undefined) {
            // Calculate how many decimal digits to keep
            const decimalDigits = Math.max(desiredTotalDigits - integerPart.length, 0);

            // Append decimal part with the calculated precision
            formattedNumber += `.${decimalPart.slice(0, decimalDigits)}`;
        }

        // Pad with zeros if the formatted number is shorter than desiredTotalDigits
        while (formattedNumber.length < desiredTotalDigits) {
            formattedNumber += '0';
        }

        return formattedNumber;
    }
    
    const isNegative = (number) => {
      return number < 0;
    };

    //saving all the api calls into a variable called data
    async function fetchData() {
        getNAIndices()
    }

    // fetchs data right when component is mounted.
    onMounted(() => {
        fetchData();
    });
</script>


<template>
    <ComponentHeader>Major North American Indices </ComponentHeader>
    <div class="main-container">
        <table class="main-container__table" v-if="data.results">
            <thead>
                <tr>
                    <th class="spacing"></th>
                    <th class="table-header textl">Name</th>
                    <th class="table-header textr">Symbol</th>
                    <th class="table-header textr">Last</th>
                    <th class="table-header textr">$ Chg</th>
                    <th class="table-header textr">% Chg</th>
                    <th class="table-header textr">Prev. Close</th>
                </tr>
            </thead>
            
            <tbody class="table-body">
                <tr v-for="(item, index) in data.results.quote" :key="index">
                    <td class="textl">{{ item.equityinfo.longname }}</td>
                    <td class="textl">{{ item.key.symbol }}</td>
                    <td class="textr">{{ formatNumberWithTotalDigits(item.pricedata.last, 7) }}</td>
                    <td class="textr" :class="{ 'isnegative': isNegative(item.pricedata.change), 'ispositive':!isNegative(item.pricedata.change) }">{{ formatNumberWithTotalDigits(item.pricedata.change, 5) }}</td>
                    <td class="textr" :class="{ 'isnegative': isNegative(item.pricedata.changepercent), 'ispositive':!isNegative(item.pricedata.changepercent) }">{{ formatNumberWithTotalDigits(item.pricedata.changepercent, 5) }}%</td>
                    <td class="textr">{{ formatNumberWithTotalDigits(item.pricedata.prevclose, 7) }}</td>
                </tr>
            </tbody>
            
        </table>
        <div v-else>
                <!-- Show a loading message or handle the absence of data as needed -->
                Loading data...
        </div> 
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

    td {
        font-size: 75%;
        font-weight: 400;
        padding: 10px 12px 10px 5px;
        border-bottom: 1px solid #eeeeee;
        white-space: nowrap;
    }

    .isnegative {
        color: red;
    }
    
    .ispositive {
        color:green
    }

</style>