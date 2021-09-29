import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import FavoritePokemons from '../components/FavoritePokemons';

describe('ao receber lista de pokemnos o component FavoritePokemons renderiza os', () => {
  test('quando não há pokemons favoritado, renderizar a msg correta', () => {
    render(<FavoritePokemons />);
    const mensagemNotFound = screen.getByText('No favorite pokemon found');
    expect(mensagemNotFound).toBeInTheDocument();
  });
  test('quando há pokemons favoritado, renderizar cards', () => {
    const pokemonsFavorited = [{
      averageWeight: {
        measurementUnit: 'kg',
        value: '6.0',
      },
      id: 25,
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      name: 'Pikachu',
      type: 'Electric',
    }];
    renderWithRouter(<FavoritePokemons pokemons={ pokemonsFavorited } />);
    const namesFavorited = screen.getAllByTestId('pokemon-name');
    expect(namesFavorited)
    const typeFavorited = screen.getAllByTestId('pokemon-type');
    const weightFavorited = screen.getAllByTestId('pokemon-weight');

    expect(namesFavorited[0]).toHaveTextContent(/pikachu/i);
  });
});
