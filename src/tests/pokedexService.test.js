import {
  readFavoritePokemonIds,
  updateFavoritePokemons,
} from '../services/pokedexService';

describe('serviço pokedexService', () => {
  const PIKACHU_ID = 25;
  const CHAMANDER_ID = 4;
  const RAPIDASH_ID = 78;
  const POKE_FAVORITES = [PIKACHU_ID, CHAMANDER_ID];
  const LOCALSTORAGE_KEY = 'favoritePokemonIds';

  // Mockando localStorage
  // https://javascript.plainenglish.io/testing-local-storage-with-testing-library-580f74e8805b
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => JSON.stringify(POKE_FAVORITES)),
      setItem: jest.fn(),
    },
    writable: true,
  });

  test('readFavoritePokemonIds deve pegar os pokéFavoritos da localStorage', () => {
    const result = readFavoritePokemonIds();

    expect(localStorage.getItem)
      .toBeCalledWith(LOCALSTORAGE_KEY);

    expect(result).toEqual(POKE_FAVORITES);
  });

  test('updateFavoritePokemons deve adicionar pokéFavoritos', () => {
    updateFavoritePokemons(RAPIDASH_ID, true);
    expect(localStorage.getItem).toBeCalledWith(LOCALSTORAGE_KEY);

    expect(localStorage.setItem).toBeCalledWith(
      LOCALSTORAGE_KEY, JSON.stringify([...POKE_FAVORITES, RAPIDASH_ID]),
    );
  });

  test('updateFavoritePokemons deve remover pokéFavoritos', () => {
    updateFavoritePokemons(PIKACHU_ID, false);
    expect(localStorage.getItem).toBeCalledWith(LOCALSTORAGE_KEY);

    expect(localStorage.setItem).toBeCalledWith(
      LOCALSTORAGE_KEY, JSON.stringify([CHAMANDER_ID]),
    );
  });
});
