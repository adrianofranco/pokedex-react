import axios from "axios";

//CARREGA TODOS OS POKEMONS

export const loadPokemons = async (offset, perpage) => {
  const pokemonsResponse = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${perpage}`
  );

  const [pokemons] = await Promise.all([pokemonsResponse]);

  return await pokemons.data["results"];
};

//CARREGA POKEMON SINGLE

export const loadPokemon = async (pokemonid) => {
  const pokemonResponse = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-form/${pokemonid}`
  );

  const [pokemon] = await Promise.all([pokemonResponse]);

  return await pokemon.data;
};
