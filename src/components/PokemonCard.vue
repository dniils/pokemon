<script setup lang="ts">
import { usePokemonStore } from "../store";
import { useRoute } from "vue-router";
const route = useRoute();

const store = usePokemonStore();
const pokemonToDisplay = store.pokemons.find(
  (pokemon) => pokemon.number === route.params.id
);
</script>

<template>
  <h2>Here will be a detailed view for pokemon</h2>
  <ul>
    <li>Number: {{ pokemonToDisplay?.number }}</li>
    <li>Name: {{ pokemonToDisplay?.name }}</li>
    <li>
      Image:
      <img
        :src="pokemonToDisplay?.image"
        :alt="`${pokemonToDisplay?.name} pokemon image`"
      />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
li {
  display: flex;
  flex-direction: row;
}
</style>
