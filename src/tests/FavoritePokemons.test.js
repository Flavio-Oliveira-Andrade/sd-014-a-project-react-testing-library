// test('', () => {});
import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

describe('2- Teste FavoritePokemons.js', () => {
  test('Teste se renderiza a mensagem "No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavorites = screen.getByText(/No favorite pokemon found/i);
    expect(noFavorites).toBeInTheDocument();
  });

  test('Teste se os pokemons favoritados rendeziram', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    expect(screen.getByText('Caterpie')).toBeInTheDocument();
    expect(screen.getByText('Ekans')).toBeInTheDocument();
  });
});
