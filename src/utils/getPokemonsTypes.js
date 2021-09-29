const getPokemonsTypes = (pokemons) => {
  const types = {};
  pokemons.forEach(({ type }) => { types[type] = (types[type] + 1) || 1; });
  return types;
};

export default getPokemonsTypes;
