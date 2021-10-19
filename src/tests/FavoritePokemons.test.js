import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';

describe('Testa o componente FavoritePokemons.js', () => {
  test('Testa se é exibido na tela a mensagem "No favorite pokemon found",'
   + 'se a pessoa não tiver pokémons favoritos',
  () => {
    render(<FavoritePokemons />);
    const favoriteNotFound = screen.getByText(/No favorite pokemon found/i);
    expect(favoriteNotFound).toBeInTheDocument();
  });
});
