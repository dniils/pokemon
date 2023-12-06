import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import {
  getPokemonData,
  getPokemonsData,
  getAllPokemonsData,
} from '../api/index.ts';
import { InitPokeInterface, PokemonInterface } from '../types/pokemonInterface';

export const usePokemonStore = defineStore('pokemons', () => {
  const pokemons = ref<PokemonInterface[]>([]);
  const currentPage: Ref<number> = ref(1);
  const allPokemonsNames = ref<string[]>([]);

  const savedPage = localStorage.getItem('page');

  if (savedPage) {
    currentPage.value = +savedPage;
  }

  async function getAllPokemonsNames() {
    const allPokeData = await getAllPokemonsData();
    allPokemonsNames.value = allPokeData.results.map(
      (poke: InitPokeInterface) => poke.name
    );
  }

  async function getPokemons(page: number): Promise<void> {
    if (currentPage.value > 0) {
      const pokemonData = await getPokemonsData(page);
      pokemons.value = pokemonData;

      localStorage.setItem('page', page.toString());
    }
  }

  async function getPokemon(name: string): Promise<void> {
    if (!pokemons.value.find((poke) => poke.name === name)) {
      const pokemonData = await getPokemonData(name);
      pokemons.value.push(pokemonData);
    }
  }

  return {
    pokemons,
    currentPage,
    allPokemonsNames,
    getPokemon,
    getPokemons,
    getAllPokemonsNames,
  };
});
