import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testando a página \'Favorite Pokémons\'', () => {
  test('Caso não possuir Pokémons favoritos,'
    + 'aparecer o texto \'No favorite pokemon found\'', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavoritesFound = screen.getByText('No favorite pokemon found');
    expect(noFavoritesFound).toBeInTheDocument();
  });
});
