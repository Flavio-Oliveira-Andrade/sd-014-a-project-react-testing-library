import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import FavoritePokemons from '../components/FavoritePokemons';

describe('3º ao receber array de pokemons'
+ 'o component FavoritePokemons renderiza os', () => {
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
    }, {
      averageWeight: {
        measurementUnit: 'kg',
        value: '2.9',
      },
      id: 10,
      image: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png',
      name: 'Caterpie',
      type: 'Bug',
    }];
    renderWithRouter(<FavoritePokemons pokemons={ pokemonsFavorited } />);
    const namesFavorited = screen.getAllByTestId('pokemon-name');
    const typeFavorited = screen.getAllByTestId('pokemon-type');
    const weightFavorited = screen.getAllByTestId('pokemon-weight');

    pokemonsFavorited.forEach((pokemon, index) => {
      const { name, type, averageWeight: { measurementUnit, value } } = pokemon;
      expect(namesFavorited[index]).toBeInTheDocument();
      expect(namesFavorited[index]).toHaveTextContent(name);
      expect(typeFavorited[index]).toBeInTheDocument();
      expect(typeFavorited[index]).toHaveTextContent(type);
      expect(weightFavorited[index]).toBeInTheDocument();
      expect(weightFavorited[index])
        .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    });
  });
});
