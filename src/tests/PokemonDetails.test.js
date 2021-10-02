import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import { pokemons, isPokemonFavoriteById } from './mocks/pokeMocks';

import PokemonDetails from '../components/PokemonDetails';

describe('Página PokemonDetails', () => {
  const mockOnUpdateFavoritePokemons = jest.fn();

  test('renderiza detalhes sobre um Pokémon', () => {
    const { id, name } = pokemons[0];
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ { params: { id: String(id) } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ mockOnUpdateFavoritePokemons }
      />,
    );

    const title = screen.getByRole('heading',
      { name: `${name} Details` });
    expect(title).toBeInTheDocument();
  });
});
