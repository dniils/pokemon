import { defineStore } from "pinia";
import { ref } from "vue";
import getPokemonsData from "../api/index.ts";
import { PokemonInterface } from "../types/pokemonInterface";

export const usePokemonStore = defineStore("pokemons", () => {
  const pokemons = ref<PokemonInterface[]>([]);

  async function getPokemons() {
    const pokemonData = await getPokemonsData();
    pokemons.value = pokemonData;
  }

  return { pokemons, getPokemons };
});
