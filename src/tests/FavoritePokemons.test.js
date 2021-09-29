import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './utils/renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Testa o componente FavoritePokemons', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);

    const favoriteNotFound = screen.getByText(/No favorite pokemon found/i);
    expect(favoriteNotFound).toBeInTheDocument();
  });
});
