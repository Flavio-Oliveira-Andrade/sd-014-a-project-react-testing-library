import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './utils/renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('No favorite pokemon found, se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavorites = screen.getByText('No favorite pokemon found');
    expect(noFavorites).toBeInTheDocument();
  });
});
