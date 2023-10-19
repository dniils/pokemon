import { PokemonInterface } from "../types/pokemonInterface";

export async function getPokemonsData(
  page: number
): Promise<PokemonInterface[]> {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${(page - 1) * 10}`
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

  // console.log(data);
  return data;
}
