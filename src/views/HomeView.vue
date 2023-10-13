<script setup lang="ts">
import SearchPokemon from "../components/SearchPokemon.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
// import SearchResults from "../components/SearchResults.vue";
import { defineAsyncComponent } from "vue";

const SearchResults = defineAsyncComponent(
  () => import("../components/SearchResults.vue")
);
</script>

<template>
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
</template>

<style lang="scss" scoped></style>
