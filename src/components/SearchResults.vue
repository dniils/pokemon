<script setup lang="ts">
import { usePokemonStore } from "../store";
import PokemonPreview from "./PokemonPreview.vue";

const store = usePokemonStore();

if (!store.pokemons.length) {
  store.getPokemons();
}

function capitalizeFirstLetter(s: string): string {
  return s[0].toUpperCase() + s.slice(1).toLowerCase();
}
</script>

<template>
  <div class="search-results">
    <PokemonPreview
      v-for="pokemon in store.pokemons"
      :imageSource="pokemon.image"
    >
      <template #pokemon-number>
        {{ pokemon.url }}
      </template>
      <template #pokemon-name>
        {{ capitalizeFirstLetter(pokemon.name) }}
      </template>
    </PokemonPreview>
  </div>
</template>

<style lang="scss">
.search-results {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
