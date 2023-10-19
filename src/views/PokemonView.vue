<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";

const PokemonCard = defineAsyncComponent(
  () => import("../components/PokemonCard.vue")
);
</script>

<template>
  <Suspense>
    <template #default>
      <PokemonCard></PokemonCard>
    </template>
    <template #fallback>
      <!-- put pokemon card skeleton here -->
      <LoadingSpinner></LoadingSpinner>
    </template>
  </Suspense>
</template>
