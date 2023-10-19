<script setup lang="ts">
import SearchPokemon from "../components/SearchPokemon.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import { defineAsyncComponent } from "vue";

const SearchResults = defineAsyncComponent(
  () => import("../components/SearchResults.vue")
);
</script>

<template>
  <div class="home-view-container">
    <SearchPokemon></SearchPokemon>
    <!-- <SearchResults></SearchResults> -->
    <Suspense>
      <template #default>
        <SearchResults></SearchResults>
      </template>
      <template #fallback>
        <LoadingSpinner></LoadingSpinner>
      </template>
    </Suspense>
  </div>
</template>

<style lang="scss" scoped>
.home-view-container {
  padding: 1rem 3vw;
}
</style>
