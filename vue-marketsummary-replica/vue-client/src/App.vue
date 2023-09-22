<script setup>
import MarketSummary from './components/MarketSummary.vue';
import MarketDiary from './components/MarketDiary.vue';
import MarketNewsToday from './components/MarketNewsToday.vue';
import MajorNorthAmericanIndices from './components/MajorNorthAmericanIndices.vue';
import MarketMovers from './components/MarketMovers.vue';
import Forex from './components/Forex.vue';
import './assets/main.scss'

const marketDiarySymbol = ['TSX', 'TSV', 'NYE', 'AMX', 'NSD'];

</script>

<template>
  <body>
    <div class="main-container">
      <MarketSummary />
      <MarketDiary :symbol="marketDiarySymbol"/>
      <MarketNewsToday />
      <MajorNorthAmericanIndices />
      <MarketMovers />
      <Forex />
    </div>
  </body>
</template>

<style lang="scss">



  .main-container {
    height: 100vh;
  }
</style>
