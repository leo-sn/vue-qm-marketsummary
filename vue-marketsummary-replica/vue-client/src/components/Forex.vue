<script setup>
    import ComponentHeader from './ComponentHeader.vue'
    import '../assets/main.scss';
    import axios from 'axios';
    import { ref, onMounted, computed } from 'vue';
    import eu_svg from '../../public/icons/eu.svg'
    import au_svg from '../../public/icons/au.svg'
    import ca_svg from '../../public/icons/ca.svg'
    import ch_svg from '../../public/icons/ch.svg'
    import gb_svg from '../../public/icons/gb.svg'
    import hk_svg from '../../public/icons/hk.svg'
    import jp_svg from '../../public/icons/jp.svg'
    import nz_svg from '../../public/icons/nz.svg'
    
    const data = ref({results: null});

    async function getForexData() {
        try {
            const response = await axios.get(`http://127.0.0.1:3030/snap-quotes`);
            data.value.results = response.data.results;
            console.log(data.value.results)
        } catch (error) {
        console.error(`Error fetching data: `, error);
        return null; // Return null or handle the error as needed
        }
    }

    async function fetchData() {
        await getForexData();
    }

    function transformCurrencyName(currencyName) {
    // Split the input string by the hyphen character ("-")
        const parts = currencyName.split('-');
        
        // If there are two parts (e.g., "USA Dollars - EU Euro"), return the second part
        if (parts.length === 2) {
            return parts[1].trim(); // Remove leading/trailing spaces
        } else {
            // Return the original input if it doesn't match the expected format
            return currencyName;
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

    //splitting data to load into 2 different tables.
    const halfIndex = computed(() => Math.ceil(data.value.results.quote.length / 2));
    const firstHalf = computed(() => data.value.results.quote.slice(0, halfIndex.value));
    const secondHalf = computed(() => data.value.results.quote.slice(halfIndex.value));

    // Define a computed property to map longname to SVG path
    const getSVGPath = computed(() => (longname) => {
    // Map longname values to corresponding SVG paths
        const svgPaths = {
            "USA Dollars - EU Euro": eu_svg,
            "USA Dollars - Japan Yen": jp_svg,
            "USA Dollars - UK Pounds": gb_svg,
            "USA Dollars - Switzerland Francs": ch_svg,
            "USA Dollars - Canada Dollars": ca_svg,
            "USA Dollars - Australia Dollars": au_svg,
            "USA Dollars - New Zealand Dollars": nz_svg,
            "USA Dollars - Hong Kong Dollars": hk_svg,

        };

        // Return the SVG path based on longname (default to a generic path if not found)
        return svgPaths[longname] || null;
    });

    onMounted(() => {
        fetchData();
    });
    
    

</script>


<template>
    <ComponentHeader>Forex (USA Dollars)</ComponentHeader>
    <div class="main-container">
        <table class="main-container__table" v-if="data.results">
            <thead>
                <tr>
                    <th class="spacing"></th>
                    <th class="table-header textl">Currency</th>
                    <th class="table-header textr">Sell</th>
                    <th class="table-header textr">$ Chg</th>
                    <th class="table-header textr">% Chg</th>
                </tr>
            </thead>
            
            <tbody class="table-body">
                <tr v-for="(item, index) in firstHalf" :key="index" >
                    <td class="textl">
                        <span class="currency-container"><img class="flag-svg" :src="getSVGPath(item.equityinfo.longname)" alt="Currency Flag" />{{ transformCurrencyName(item.equityinfo.longname) }}</span>
                    </td>
                    <td class="textr">
                        {{ formatNumberWithTotalDigits(item.pricedata.last, 5) }}
                    </td>
                    <td class="textr" :class="{ 'isnegative': isNegative(item.pricedata.change), 'ispositive':!isNegative(item.pricedata.change) }">{{ formatNumberWithTotalDigits(item.pricedata.change, 6) }}</td>
                    <td class="textr" :class="{ 'isnegative': isNegative(item.pricedata.changepercent), 'ispositive':!isNegative(item.pricedata.changepercent) }">{{ formatNumberWithTotalDigits(item.pricedata.changepercent, 5) }}%</td>
                </tr>
            </tbody>
        </table>
        <div v-else>
                <!-- Show a loading message or handle the absence of data as needed -->
                Loading data...
        </div>  
        <table class="main-container__table" v-if="data.results">
            <thead>
                <tr>
                    <th class="spacing"></th>
                    <th class="table-header textl">Currency</th>
                    <th class="table-header textr">Sell</th>
                    <th class="table-header textr">$ Chg</th>
                    <th class="table-header textr">% Chg</th>
                </tr>
            </thead>
            
            <tbody class="table-body">
                <tr v-for="(item, index) in secondHalf" :key="index" >
                    <td class="textl">
                        <span class="currency-container"><img class="flag-svg" :src="getSVGPath(item.equityinfo.longname)" alt="Currency Flag" />{{ transformCurrencyName(item.equityinfo.longname) }}</span>
                    </td>
                    <td class="textr">{{ formatNumberWithTotalDigits(item.pricedata.last, 5) }}</td>
                    <td class="textr" :class="{ 'isnegative': isNegative(item.pricedata.change), 'ispositive':!isNegative(item.pricedata.change) }">{{ formatNumberWithTotalDigits(item.pricedata.change, 6) }}</td>
                    <td class="textr" :class="{ 'isnegative': isNegative(item.pricedata.changepercent), 'ispositive':!isNegative(item.pricedata.changepercent) }">{{ formatNumberWithTotalDigits(item.pricedata.changepercent, 5) }}%</td>
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
        padding: 10px 15px;
        height: fit-content;
        display: flex;
        justify-content: space-between;
        font-family: var(--QMOD-font-family);
        width: 100%;
        gap: 10px;

        &__table {
            border-collapse: collapse; 
            width: 50%;
            
        }
    }

    .textr {
        text-align: right;
    }

    .textl {
        text-align: left;
    }

    .currency-container {
        display: flex;
        align-items: center;
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

    .isnegative {
        color: red;
    }
    
    .ispositive {
        color:green
    }

    td {
        font-size: 75%;
        font-weight: 400;
        padding: 10px 12px 10px 5px;
        border-bottom: 1px solid #eeeeee;
        white-space: nowrap;
        
    }
    .flag-svg{
        width: 26px;
        height: 14px;
        margin-right: 3px;
    }
</style>