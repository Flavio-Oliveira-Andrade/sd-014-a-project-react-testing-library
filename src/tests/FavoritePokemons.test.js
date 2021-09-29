import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';

const testMons = {
  id: 0,
  name: 'test',

}

const renderFavoritePage = (pokemons) => render(
  <Router history={ createMemoryHistory() }>
    <FavoritePokemons favoritePokemons={pokemons} />
  </Router>,
);

test('Teste se é exibido na tela a mensagem "No favorite pokemon found",'
+ 'se a pessoa não tiver pokémons favoritos.', () => {
  renderFavoritePage();
  const nenhumEncontrado = screen.getByText('No favorite pokemon found');
  expect(nenhumEncontrado).toBeInTheDocument();
});
test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  renderFavoritePage();
});
