import React from 'react';
import { screen } from '@testing-library/react';

import FavoritePokemons from '../components/FavoritePokemons';

import renderWithRouter from './renderWithRouter';

import pokemons from '../data';

describe('3- Testando FavoritePokemons', () => {
  test('3.1 Testa se é exibida uma mensagem caso não tenha um pokémon favorito', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const noFavorites = screen.getByText('No favorite pokemon found');

    expect(noFavorites).toBeInTheDocument();
  });

  test('3.2 - se são exibidos todos os pokémons favoritados', () => {
    const PIKACHU_ID = 25;
    const CATERPIE_ID = 10;
    const EKANS_ID = 23;

    const favoritePokemon = pokemons.filter(
      ({ id }) => id === PIKACHU_ID || id === CATERPIE_ID || id === EKANS_ID,
    );

    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemon } />);

    const pikachu = screen.getByText('Pikachu');
    const caterpie = screen.getByText('Caterpie');
    const ekans = screen.getByText('Ekans');

    expect(pikachu).toBeInTheDocument();
    expect(caterpie).toBeInTheDocument();
    expect(ekans).toBeInTheDocument();
  });
});
