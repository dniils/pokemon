import { PokemonInterface } from "../types/pokemonInterface";

export default async function getPokemonsData(): Promise<PokemonInterface[]> {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10");
  const data = await response.json();

  const pokemonDataPromises = data.results.map(
    async (pokemon: PokemonInterface) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();

      return {
        name: pokemonData.name,
        // url: pokemonData.url,
        image: pokemonData.sprites.other["official-artwork"]["front_default"],
      };
    }
  );

  const pokemonDataArray = await Promise.all(pokemonDataPromises);
  return pokemonDataArray;
}
