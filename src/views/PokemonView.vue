<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import PokemonCardSkeleton from "../components/PokemonCardSkeleton.vue";

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
      <PokemonCardSkeleton></PokemonCardSkeleton>
    </template>
  </Suspense>
</template>
