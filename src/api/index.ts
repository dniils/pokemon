import { PokemonInterface } from "../types/pokemonInterface";
import { ref } from "vue";

export async function getPokemonsData(
  page: number
): Promise<PokemonInterface[]> {
  const cardsPerPage = ref(10);
  if (window.innerWidth >= 769) cardsPerPage.value = 12;
  if (window.innerWidth >= 1650) cardsPerPage.value = 20;
  if (window.innerWidth >= 1920) cardsPerPage.value = 30;
  if (window.innerWidth >= 2000) cardsPerPage.value = 35;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${cardsPerPage.value}&offset=${
      (page - 1) * cardsPerPage.value
    }`
  );
  const data = await response.json();

  const pokemonDataPromises = data.results.map(
    async (pokemon: PokemonInterface) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();

      return pokemonData;
    }
  );

  const pokemonDataArray = await Promise.all(pokemonDataPromises);
  return pokemonDataArray;
}

export async function getPokemonData(name: string): Promise<PokemonInterface> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
  const data = await response.json();

  return data;
}
