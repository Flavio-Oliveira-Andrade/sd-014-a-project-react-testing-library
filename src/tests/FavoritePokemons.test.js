import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';

const testMons = [{
  averageWeight: 0,
  id: 1,
  image: 'teste1.png',
  name: 'teste1',
  type: 'teste1',
}, {
  averageWeight: 1,
  id: 2,
  image: 'teste2.png',
  name: 'teste2',
  type: 'teste2',
}];

const renderFavoritePage = (mok) => render(
  <Router history={ createMemoryHistory() }>
    <FavoritePokemons pokemons={ mok } />
  </Router>,
);

test('Teste se é exibido na tela a mensagem "No favorite pokemon found",'
+ 'se a pessoa não tiver pokémons favoritos.', () => {
  renderFavoritePage();
  const nenhumEncontrado = screen.getByText('No favorite pokemon found');
  expect(nenhumEncontrado).toBeInTheDocument();
});
test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  renderFavoritePage(testMons);
  const nenhumEncontrado = screen.getAllByText(/more details/i);
  expect(nenhumEncontrado).toHaveLength(2);
});
