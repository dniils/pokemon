import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { getPokemonsData } from "../api/index.ts";
import { PokemonInterface } from "../types/pokemonInterface";

export const usePokemonStore = defineStore("pokemons", () => {
  const pokemons = ref<PokemonInterface[]>([]);
  const currentPage: Ref<number> = ref(1);
  const savedPage = localStorage.getItem("page");

  if (savedPage) {
    currentPage.value = +savedPage;
  }

  async function getPokemons(page: number): Promise<void> {
    // prevent negative "page" requests
    if (currentPage.value > 0) {
      const pokemonData = await getPokemonsData(page);
      pokemons.value = pokemonData;
    }
  }

  return { pokemons, currentPage, getPokemons };
});
