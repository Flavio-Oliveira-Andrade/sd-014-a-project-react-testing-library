import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente <FavoritePokemons />', () => {
  test('Testa se é exibido na tela a mensagem "No favorite pokemon found", se a pessoa'
  + 'não tiver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavorite = screen.getByText('No favorite pokemon found');

    expect(noFavorite).toBeInTheDocument();
  });
});
