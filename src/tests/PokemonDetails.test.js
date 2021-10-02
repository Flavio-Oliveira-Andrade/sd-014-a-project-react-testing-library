import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import { pokemons, isPokemonFavoriteById } from './mocks/pokeMocks';

import PokemonDetails from '../components/PokemonDetails';

describe('Página PokemonDetails', () => {
  const mockOnUpdateFavoritePokemons = jest.fn();

  test('renderiza detalhes sobre um Pokémon', () => {
    const { id, name, summary } = pokemons[0];
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ { params: { id: String(id) } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ mockOnUpdateFavoritePokemons }
      />,
    );

    const detailsLink = screen.queryByRole('link', { name: /details/i });
    expect(detailsLink).not.toBeInTheDocument();

    const title = screen.getByRole('heading',
      { level: 2, name: `${name} Details` });
    expect(title).toBeInTheDocument();

    const subtitle = screen.getByRole('heading',
      { level: 2, name: 'Summary' });
    expect(subtitle).toBeInTheDocument();

    const summaryElement = screen.getByText(summary, { selector: 'p' });
    expect(summaryElement).toBeInTheDocument();
  });
});
