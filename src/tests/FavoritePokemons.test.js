import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

// Requisito 3
test('testa se é exibido na tela a mensagem No favorite pokemon found, '
+ 'se a pessoa não tiver pokémons favoritos', () => {
  render(<FavoritePokemons />);

  const noFavoritePokemon = screen.getByText('No favorite pokemon found');
  expect(noFavoritePokemon).toBeInTheDocument();
});

// Requisito 3
// Referência: Text Match Options (https://testing-library.com/docs/react-testing-library/cheatsheet)
test('se é exibido todos os cards de pokémons favoritados', () => {
  render(<FavoritePokemons />);

  const FavoritePokemon = screen.getByText('No favorite pokemon found', {
    exact: false,
  });
  expect(FavoritePokemon).toBeInTheDocument();
});
