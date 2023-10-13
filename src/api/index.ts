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

      return {
        url: pokemon.url,
        id: pokemon.url.split("/")[6],
        name: pokemonData.name,
        image: pokemonData.sprites.other["official-artwork"]["front_default"],
      };
    }
  );

  const pokemonDataArray = await Promise.all(pokemonDataPromises);
  return pokemonDataArray;
}

export async function getPokemon(id: string): Promise<PokemonInterface> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data = await response.json();

  console.log(data);
  return data;
}
