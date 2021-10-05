import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';

describe('3 - Testa o componente FavoritePokemons.js', () => {
  beforeEach(() => {
    render(<FavoritePokemons />);
  });
  test('Deve haver o texto "No favorite pokemon found" quando não há favoritos', () => {
    const noFavoritesText = screen.getByText('No favorite pokemon found');

    expect(noFavoritesText).toBeInTheDocument();
  });
});
