import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import { pokemons, isPokemonFavoriteById } from './mocks/pokeMocks';

import Pokemon from '../components/Pokemon';

describe('Componente Pokemon', () => {
  test('renderiza card com informações sobre um Pokémon', () => {
    const { id, name, type, averageWeight, image: imagePath } = pokemons[0];
    const { value, measurementUnit } = averageWeight;

    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isPokemonFavoriteById[id] }
      />,
    );

    const pkmnName = screen.getByTestId('pokemon-name').innerHTML;
    const pkmnType = screen.getByTestId('pokemon-type').innerHTML;
    const pkmnWeight = screen.getByTestId('pokemon-weight').innerHTML;
    const pkmnImage = screen.getByRole('img', { name: `${name} sprite` });

    expect(pkmnName).toBe(name);
    expect(pkmnType).toBe(type);
    expect(pkmnWeight).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(pkmnImage.src).toBe(imagePath);
  });
});
